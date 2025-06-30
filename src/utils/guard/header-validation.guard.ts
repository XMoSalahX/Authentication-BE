import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { SystemControlValidationDto } from '../dto/system-headers.dto';

@Injectable()
export class HeaderValidationGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const headersDto = plainToInstance(
      SystemControlValidationDto,
      request.headers,
      {
        enableImplicitConversion: true,
      },
    );

    const errors = await validate(headersDto);
    if (errors.length > 0) {
      throw new BadRequestException(
        errors.flatMap((error) => Object.values(error.constraints || {})),
      );
    }

    return true;
  }
}
