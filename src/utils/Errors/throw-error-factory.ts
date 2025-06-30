import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorTypes } from '../enums/error-code-name.enums';
import { errorConfigs } from './factory.error';

export function throwErrorFactory(errorType: ErrorTypes): never {
  const errorConfig = errorConfigs[errorType];
  if (!errorConfig) {
    throw new HttpException(
      { message: 'Unknown error', flag: 0 },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
  throw new HttpException(
    { message: errorConfig.message, flag: errorConfig.flag },
    errorConfig.status,
  );
}
