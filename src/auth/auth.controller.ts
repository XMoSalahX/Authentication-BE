import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiQuery,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { SKIP_JWT } from '../utils/decorators/skip-jwt.decorator';
import { BaseResponse } from '../utils/baseResponse';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { RateLimit } from 'nestjs-rate-limiter';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { AuthUser } from './decorators/user.decorator';
import { UsersDocument } from '../users/entities/user.entity';
import { SignInDto } from './dto/signin.dto';
import { Response } from 'express';
import { JWTAuthGuard } from './guards/jwt.auth.guard';
import { RequestHeaders } from './decorators/signup.decorator';
import { SystemControlValidationSignInDto } from './dto/systemControl.dto';
import { Roles } from './decorators/roles.decorator';
import { UserRolesEnums } from './enums/userRoles.enums';

@ApiBearerAuth()
@ApiTags('Auth')
@ApiSecurity('app')
@ApiSecurity('version')
@ApiSecurity('os')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SKIP_JWT()
  @RateLimit({ points: 60, duration: 60 })
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return BaseResponse.success(await this.authService.signUp(createUserDto));
  }

  @SKIP_JWT()
  @RateLimit({ points: 60, duration: 60 })
  @Patch('verify-email')
  async verifyEmail(@Body() body: VerifyEmailDto) {
    const { email, otp } = body;

    return BaseResponse.success(await this.authService.verifyEmail(email, otp));
  }

  @SKIP_JWT()
  @UseGuards(JWTAuthGuard)
  @RateLimit({ points: 60, duration: 60 })
  @Post('signin')
  async signIn(
    @AuthUser() user: UsersDocument,
    @Body() SignInDto: SignInDto,
    @Res() res: Response,
    @RequestHeaders(new ValidationPipe({ validateCustomDecorators: true }))
    headers: SystemControlValidationSignInDto,
  ) {
    const userData = await this.authService.signIn(headers, user, res);
    res.json(BaseResponse.success({ user: userData }));
  }

  // Get profile of the authenticated user
  @RateLimit({ points: 60, duration: 60 })
  @Roles(UserRolesEnums.USER, UserRolesEnums.SELLER)
  @ApiHeader({
    name: 'csrf-token',
    description: 'CSRF token',
    required: true,
  })
  @Get('check-auth')
  checkAuth(@AuthUser() user: UsersDocument) {
    return BaseResponse.success('User Authenticated');
  }

  @RateLimit({ points: 60, duration: 60 })
  @ApiHeader({
    name: 'csrf-token',
    description: 'CSRF token',
    required: true,
  })
  @Delete('logout')
  @ApiQuery({ name: 'refreshToken', required: false })
  async logout(
    @AuthUser() user: UsersDocument,
    @Res() res: Response,
    @RequestHeaders(new ValidationPipe({ validateCustomDecorators: true }))
    headers: SystemControlValidationSignInDto,
    @Query('refreshToken') refreshToken?: string,
  ) {
    await this.authService.logout(user, res, headers, refreshToken);
    res.json(BaseResponse.success('Logout successfully'));
  }
}
