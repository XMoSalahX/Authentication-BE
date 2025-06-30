import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserStatus } from './enums/userStatus.enum';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { randomInt } from 'crypto';
import { CacheService } from '../cache/cache.service';
import { MailerService } from '../mailer/mailer.service';
import { emailVerificationTemplate } from '../utils/Templates/emailVerification';
import { AuthTemplateEnums } from '../utils/enums/auth-template.enums';
import { UsersDocument } from '../users/entities/user.entity';
import { Response } from 'express';
import { SystemControlValidationSignInDto } from './dto/systemControl.dto';
import { OperatingSystem } from '../utils/enums/systems-os.enums';
import { ErrorTypes } from '../utils/enums/error-code-name.enums';
import {
  EMAIL_VERIFICATION_DESCRIPTION,
  EMAIL_VERIFICATION_TITLE,
} from '../utils/constant/constant';
import { throwErrorFactory } from '../utils/Errors/throw-error-factory';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly cacheService: CacheService,
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(
      createUserDto.password,
      parseInt(process.env.SALT_ROUND ?? '10'),
    );
    createUserDto['userStatus'] = UserStatus.NOT_COMPLETED;

    // Check if the user already exists
    const user = await this.usersService.findOne({
      email: createUserDto.email,
      role: createUserDto.role,
    });

    if (user?.userStatus === UserStatus.ACTIVE) {
      throwErrorFactory(ErrorTypes.EMAIL_EXIST);
    }

    const otp = await this.generateOtp(4);

    // Add OTP to cache Database
    await this.cacheService.setCache(
      `otp:${createUserDto.email}`,
      otp,
      5 * 60, // 5 minutes expiration
    );

    // Send Email with OTP
    await this.mailerService.sendMail(
      createUserDto.email,
      EMAIL_VERIFICATION_TITLE,
      emailVerificationTemplate(
        EMAIL_VERIFICATION_TITLE,
        EMAIL_VERIFICATION_DESCRIPTION,
        otp,
        AuthTemplateEnums.CODE,
      ),
    );

    if (user?.userStatus === UserStatus.NOT_COMPLETED) {
      return 'User already exists, please check your email for verification instructions.';
    } else if (
      user?.userStatus === UserStatus.BLOCKED ||
      user?.userStatus === UserStatus.INACTIVE ||
      user?.userStatus === UserStatus.DELETED
    ) {
      throwErrorFactory(ErrorTypes.SUSPENDED);
    } else {
      await this.usersService.create(createUserDto);
      return 'User created successfully, please check your email for verification instructions.';
    }
  }

  // Generate Random OTP
  async generateOtp(length: number = 6): Promise<string> {
    let otp: string;
    do {
      otp = randomInt(10 ** length)
        .toString()
        .padStart(length, '0')
        .slice(0, length);
    } while (otp.startsWith('0'));
    return otp;
  }

  // Verify Email with OTP
  async verifyEmail(email: string, otp: number) {
    // Check if the OTP exists in cache
    const cachedOtp = await this.cacheService.getCache(`otp:${email}`);

    if (!cachedOtp) {
      throwErrorFactory(ErrorTypes.OTP_NOT_EXIST_OR_EXPIRED);
    }

    // Compare the OTPs
    if (cachedOtp !== otp.toString()) {
      throwErrorFactory(ErrorTypes.OTP_NOT_MATCH);
    }

    // Update user status to ACTIVE
    const user: UsersDocument = await this.usersService.findOne({
      email,
      userStatus: UserStatus.NOT_COMPLETED,
    });

    if (user) {
      await this.usersService.updateStatus(user.id, UserStatus.ACTIVE);
      return 'Email verified successfully';
    } else {
      throwErrorFactory(ErrorTypes.NOT_FOUND_USER);
    }
  }

  async signIn(
    headers: SystemControlValidationSignInDto,
    user: UsersDocument,
    res: Response,
  ) {
    if (
      [
        OperatingSystem.SWAGGER,
        OperatingSystem.ELASTIC,
        OperatingSystem.WEB,
      ].includes(headers.os)
    ) {
      res.cookie('access_token', (user as any).jwtToken, {
        httpOnly: true,
        secure: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'none',
      });

      res.cookie('refresh_token', (user as any).jwtRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'none',
      });

      // send CSRF token in response header
      res.setHeader('csrf-token', (user as any).jwtCSRFToken);

      delete (user as any).jwtToken;
      delete (user as any).jwtRefreshToken;
      delete (user as any).jwtCSRFToken;
    }

    const userData = JSON.parse(JSON.stringify(user));
    return userData;
  }

  async logout(
    user: UsersDocument,
    res: Response,
    headers: SystemControlValidationSignInDto,
    refreshToken?: string,
  ): Promise<void> {
    if (
      !refreshToken &&
      [OperatingSystem.IOS, OperatingSystem.ANDROID].includes(headers.os)
    ) {
      throw new BadRequestException(
        'Refresh token is required for mobile devices',
      );
    }

    await this.cacheService.deleteCache(refreshToken as string);

    if (
      [
        OperatingSystem.SWAGGER,
        OperatingSystem.ELASTIC,
        OperatingSystem.WEB,
      ].includes(headers.os)
    ) {
      res.clearCookie('access_token');
      res.clearCookie('refresh_token');
    } else {
      const decoded = await this.jwtService.verify(refreshToken as string, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      if (decoded._id !== user._id) {
        throwErrorFactory(ErrorTypes.NOT_ALLOWED);
      }
    }
  }
}
