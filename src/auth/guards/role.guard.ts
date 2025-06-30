import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { throwErrorFactory } from '../../utils/Errors/throw-error-factory';
import { ErrorTypes } from '../../utils/enums/error-code-name.enums';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const roles = this.reflector.get<string[]>('roles', context.getHandler());
      console.log('Roles Guard:', roles);
      if (!roles?.length) {
        return true;
      }
      const request = context.switchToHttp().getRequest();
      const user = request.user;

      if (roles.find((item) => item === user.role)) {
        return true;
      } else {
        throwErrorFactory(ErrorTypes.NOT_ALLOWED);
      }
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
}
