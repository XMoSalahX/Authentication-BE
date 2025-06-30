import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from '../../utils/decorators/public.decorator';
import { UserStatus } from '../enums/userStatus.enum';
import { SKIP_JWT_TOKEN } from '../../utils/decorators/skip-jwt.decorator';
import { CacheService } from '../../cache/cache.service';
import { OperatingSystem } from '../../utils/enums/systems-os.enums';
import { UsersDocument } from '../../users/entities/user.entity';
import { Request, Response } from 'express';
import IRequestWithUser from '../interfaces/requestWithIUser.interface';
import { throwErrorFactory } from '../../utils/Errors/throw-error-factory';
import { ErrorTypes } from '../../utils/enums/error-code-name.enums';
import { IDecodedCsrf } from '../interfaces/csrf.interface';

@Injectable()
export class JWTDecodedAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly cacheService: CacheService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const handler = context.getHandler();
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, handler);
    const skipJwt = this.reflector.get(SKIP_JWT_TOKEN, handler);
    if (skipJwt) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const csrfToken = request.header('csrf-token');
    if (!csrfToken) {
      throwErrorFactory(ErrorTypes.CSRF_TOKEN_REQUIRED);
    }

    const { accessToken, refreshToken } = this.getTokens(request);

    if (!accessToken && !isPublic) {
      throwErrorFactory(ErrorTypes.TOKEN_REQUIRED);
    }

    if (isPublic === true && !accessToken) return true;

    const secret = process.env.JWT_SECRET;
    const csrfSecret = process.env.JWT_CSRF_SECRET;

    let decodedCsrf: IDecodedCsrf;

    try {
      decodedCsrf = await this.jwtService.verify(csrfToken, {
        secret: csrfSecret,
      });
    } catch (error) {
      console.error('CSRF token verification failed:', error);
      if (error.message === 'invalid token') {
        throwErrorFactory(ErrorTypes.CSRF_INVALID_TOKEN);
      } else {
        throwErrorFactory(ErrorTypes.CSRF_TOKEN_EXPIRED);
      }
    }

    console.log('Decoded CSRF Token:', decodedCsrf);

    try {
      const decoded: UsersDocument = await this.jwtService.verify(
        accessToken as string,
        {
          secret,
        },
      );

      this.checkUserStatus(decoded);

      console.log('Decoded User:', decoded);

      if (
        decodedCsrf.email !== decoded.email ||
        decodedCsrf.role !== decoded.role
      ) {
        throwErrorFactory(ErrorTypes.WRONG_CSRF_TOKEN);
      }

      (request as IRequestWithUser).user = decoded;
      return true;
    } catch (error) {
      const isExpire = await this.generateNewTokenOrThrowError(
        error,
        refreshToken,
        response,
        request,
        decodedCsrf,
      );
      if (isExpire) return true;
      console.error('JWT verification failed:', error);
      throwErrorFactory(ErrorTypes.INVALID_TOKEN);
    }
  }

  private getTokens(request: Request) {
    let accessToken: string | undefined;
    let refreshToken: string | undefined;

    if (request.cookies?.access_token) {
      accessToken = request.cookies.access_token;
    } else if (
      request.header('authorization') &&
      [OperatingSystem.IOS, OperatingSystem.ANDROID].includes(
        request.header('os') as OperatingSystem,
      )
    ) {
      const authHeader = request.header('authorization')?.split(' ');
      if (authHeader?.length === 2 && authHeader[0] === 'Bearer') {
        accessToken = authHeader[1];
      }
    }

    if (request.cookies?.refresh_token) {
      refreshToken = request.cookies.refresh_token;
    }

    return { accessToken, refreshToken };
  }

  private async generateNewTokenOrThrowError(
    error,
    refreshToken,
    response,
    request,
    decodedCsrf: IDecodedCsrf,
  ): Promise<boolean> {
    if (error.name === 'TokenExpiredError' && refreshToken) {
      try {
        const refreshSecret = process.env.JWT_REFRESH_SECRET;
        const decodedRefresh = await this.jwtService.verify(refreshToken, {
          secret: refreshSecret,
        });

        if (
          decodedCsrf.email !== decodedRefresh.email ||
          decodedCsrf.role !== decodedRefresh.role
        ) {
          throwErrorFactory(ErrorTypes.WRONG_CSRF_TOKEN);
        }

        const isTokenInCache = await this.cacheService.getCache(refreshToken);
        if (isTokenInCache === null) {
          throwErrorFactory(ErrorTypes.REFRESH_EXPIRED);
        }

        const { iat, exp, ...rest } = decodedRefresh;
        const newAccessToken = this.jwtService.sign(rest, {
          secret: process.env.JWT_SECRET,
          expiresIn: process.env.JWT_Expiry,
        });

        response.cookie('access_token', newAccessToken, {
          httpOnly: true,
          secure: true,
          sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'none',
        });

        request.user = rest;
        return true;
      } catch (refreshError) {
        console.error('Refresh token verification failed:', refreshError);
        throwErrorFactory(ErrorTypes.REFRESH_EXPIRED);
      }
    }
    return false;
  }

  private checkUserStatus(decoded: UsersDocument): void {
    if (decoded.userStatus === UserStatus.INACTIVE)
      throwErrorFactory(ErrorTypes.ACCOUNT_INACTIVE);

    if (decoded.userStatus === UserStatus.BLOCKED)
      throwErrorFactory(ErrorTypes.USER_BLOCKED);

    if (decoded.userStatus === UserStatus.DELETED)
      throwErrorFactory(ErrorTypes.USER_DELETED);
  }
}
