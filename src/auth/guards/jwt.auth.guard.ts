import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserStatus } from '../enums/userStatus.enum';
import { CacheService } from '../../cache/cache.service';
import { UsersService } from '../../users/users.service';
import { SignInDto } from '../dto/signin.dto';
import { UsersDocument } from '../../users/entities/user.entity';
import * as jwt from 'jsonwebtoken';
import { ErrorTypes } from '../../utils/enums/error-code-name.enums';
import { throwErrorFactory } from '../../utils/Errors/throw-error-factory';

@Injectable()
export class JWTAuthGuard implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
    private readonly cacheService: CacheService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const requestBody: SignInDto = context.switchToHttp().getRequest().body;

    let accountFromDb: UsersDocument = await this.usersService.findOne({
      email: requestBody.email,
      role: requestBody.role,
    });

    if (accountFromDb === null) {
      throwErrorFactory(ErrorTypes.NOT_FOUND_USER);
    } else if (accountFromDb.userStatus === UserStatus.DELETED) {
      throwErrorFactory(ErrorTypes.USER_DELETED);
    } else if (accountFromDb.userStatus === UserStatus.BLOCKED) {
      throwErrorFactory(ErrorTypes.USER_BLOCKED);
    }

    delete accountFromDb['__v'];

    const recordsToRedis = {};
    const isMatched: boolean = await bcrypt.compare(
      requestBody.password,
      accountFromDb.password,
    );

    if (isMatched) {
      const jwtToken = jwt.sign(accountFromDb, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_Expiry,
      });
      const jwtRefreshToken = jwt.sign(
        accountFromDb,
        process.env.JWT_REFRESH_SECRET,
        {
          expiresIn: process.env.JWT_Refresh_Expiry,
        },
      );
      const jwtCSRFToken = jwt.sign(
        { email: accountFromDb.email, role: accountFromDb.role },
        process.env.JWT_CSRF_SECRET,
        {
          expiresIn: process.env.JWT_Refresh_Expiry,
        },
      );

      const isActive = accountFromDb.userStatus !== UserStatus.INACTIVE;

      recordsToRedis[jwtRefreshToken] = 'true';

      accountFromDb = {
        ...accountFromDb,
        ...(isActive && { jwtToken }),
        ...(isActive && { jwtRefreshToken }),
        ...(isActive && { jwtCSRFToken }),
      } as any;
    }

    if (!isMatched) {
      throwErrorFactory(ErrorTypes.PASSWORD_NOT_VALID);
    }

    await this.cacheService.setMultipleCache(recordsToRedis, 604800); // 7 days

    ////////////////// _checking for application stopped ////////////////
    if (parseInt(process.env.APPLICATION_STATUS as string) === 0) {
      throwErrorFactory(ErrorTypes.APPLICATION_STOPPED);
    }
    ////////////////// _checking for application maintenance ////////////////
    if (parseInt(process.env.APPLICATION_STATUS as string) == 1) {
      throwErrorFactory(ErrorTypes.APPLICATION_MAINTENANCE);
    }
    // ///////////////////////////////// check_critical_android //////////////
    if (
      parseInt(process.env.ANDROID_CRITICAL_UPDATE as string) >
        parseInt(request.headers.version as string) &&
      request.headers.os === 'android'
    ) {
      throwErrorFactory(ErrorTypes.ANDROID_CRITICAL_UPDATE);
    }
    // ///////////////////////////////// check_critical_Ios //////////////
    if (
      parseInt(process.env.IOS_CRITICAL_UPDATE as string) >
        parseInt(request.headers.version as string) &&
      request.headers.os === 'ios'
    ) {
      throwErrorFactory(ErrorTypes.IOS_CRITICAL_UPDATE);
    }

    request.user = accountFromDb;
    return true;
  }
}
