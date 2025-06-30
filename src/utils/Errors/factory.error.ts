import { HttpStatus } from '@nestjs/common';
import {
  ACCESS_NOT_ALLOW_MESSAGE,
  CLOSED_ORDER_MESSAGE,
  COMPANY_ISSUE_MESSAGE,
  DUPLICATED_ERROR_MESSAGE,
  ERROR_IN_UPDATE_MESSAGE,
  EXIST_EMAIL_MESSAGE,
  EXIST_PHONE_MESSAGE,
  INVALID_URL_PARAMS_MESSAGE,
  MANY_ATTEMPT_MESSAGE,
  NOT_FOUND_MESSAGE,
  PERMISSION_DENIED_MESSAGE,
  THERE_IS_PENDING_REQUEST,
  USER_NOT_FOUND_MESSAGE,
  TOKEN_REQUIRED_MESSAGE,
  NOT_ALLOWED_MESSAGE,
  USER_GOV_DIS_NOT_FOUND_MESSAGE,
  NOT_FOUND_PRODUCT_MESSAGE,
  OTP_NOT_MATCH_WITH_CURRENT_OTP,
  ACCOUNT_SUSPENDED_MESSAGE,
  USER_DELETED_MESSAGE,
  USER_BLOCKED_MESSAGE,
  PASSWORD_NOT_VALID_MESSAGE,
  APPLICATION_STOPPED_MESSAGE,
  APPLICATION_MAINTENANCE_MESSAGE,
  ANDROID_CRITICAL_UPDATE_MESSAGE,
  IOS_CRITICAL_UPDATE_MESSAGE,
  REFRESH_EXPIRED_MESSAGE,
  ACCOUNT_INACTIVE_MESSAGE,
  INVALID_TOKEN_MESSAGE,
  TOKEN_EXPIRED_MESSAGE,
  OTP_NOT_EXIST_OR_EXPIRED_MESSAGE,
  CSRF_TOKEN_REQUIRED_MESSAGE,
  CSRF_INVALID_TOKEN_MESSAGE,
  CSRF_TOKEN_EXPIRED_MESSAGE,
  WRONG_CSRF_TOKEN_MESSAGE,
} from '../../utils/messages/messages.constant';
import { ErrorTypes } from '../enums/error-code-name.enums';
import { ErrorConfig } from '../types/error-config';

export const errorConfigs: Record<ErrorTypes, ErrorConfig> = {
  [ErrorTypes.WRONG_CSRF_TOKEN]: {
    message: WRONG_CSRF_TOKEN_MESSAGE,
    flag: 134,
    status: HttpStatus.UNAUTHORIZED,
  },
  [ErrorTypes.CSRF_TOKEN_EXPIRED]: {
    message: CSRF_TOKEN_EXPIRED_MESSAGE,
    flag: 133,
    status: HttpStatus.UNAUTHORIZED,
  },
  [ErrorTypes.CSRF_INVALID_TOKEN]: {
    message: CSRF_INVALID_TOKEN_MESSAGE,
    flag: 132,
    status: HttpStatus.UNAUTHORIZED,
  },
  [ErrorTypes.CSRF_TOKEN_REQUIRED]: {
    message: CSRF_TOKEN_REQUIRED_MESSAGE,
    flag: 131,
    status: HttpStatus.UNAUTHORIZED,
  },
  [ErrorTypes.TOKEN_EXPIRED]: {
    message: TOKEN_EXPIRED_MESSAGE,
    flag: 130,
    status: HttpStatus.UNAUTHORIZED,
  },
  [ErrorTypes.INVALID_TOKEN]: {
    message: INVALID_TOKEN_MESSAGE,
    flag: 129,
    status: HttpStatus.UNAUTHORIZED,
  },
  [ErrorTypes.ACCOUNT_INACTIVE]: {
    message: ACCOUNT_INACTIVE_MESSAGE,
    flag: 101,
    status: HttpStatus.UNAUTHORIZED,
  },
  [ErrorTypes.REFRESH_EXPIRED]: {
    message: REFRESH_EXPIRED_MESSAGE,
    flag: 100,
    status: HttpStatus.UNAUTHORIZED,
  },
  [ErrorTypes.IOS_CRITICAL_UPDATE]: {
    message: IOS_CRITICAL_UPDATE_MESSAGE,
    flag: 102,
    status: 426,
  },
  [ErrorTypes.ANDROID_CRITICAL_UPDATE]: {
    message: ANDROID_CRITICAL_UPDATE_MESSAGE,
    flag: 103,
    status: 426,
  },
  [ErrorTypes.APPLICATION_MAINTENANCE]: {
    message: APPLICATION_MAINTENANCE_MESSAGE,
    flag: 104,
    status: HttpStatus.SERVICE_UNAVAILABLE,
  },
  [ErrorTypes.APPLICATION_STOPPED]: {
    message: APPLICATION_STOPPED_MESSAGE,
    flag: 105,
    status: HttpStatus.SERVICE_UNAVAILABLE,
  },
  [ErrorTypes.PASSWORD_NOT_VALID]: {
    message: PASSWORD_NOT_VALID_MESSAGE,
    flag: 106,
    status: HttpStatus.BAD_REQUEST,
  },
  [ErrorTypes.USER_BLOCKED]: {
    message: USER_BLOCKED_MESSAGE,
    flag: 107,
    status: HttpStatus.FORBIDDEN,
  },
  [ErrorTypes.USER_DELETED]: {
    message: USER_DELETED_MESSAGE,
    flag: 108,
    status: HttpStatus.GONE,
  },
  [ErrorTypes.SUSPENDED]: {
    message: ACCOUNT_SUSPENDED_MESSAGE,
    flag: 109,
    status: HttpStatus.LOCKED,
  },
  [ErrorTypes.OTP_NOT_MATCH]: {
    message: OTP_NOT_MATCH_WITH_CURRENT_OTP,
    flag: 110,
    status: HttpStatus.BAD_REQUEST,
  },
  [ErrorTypes.OTP_NOT_EXIST_OR_EXPIRED]: {
    message: OTP_NOT_EXIST_OR_EXPIRED_MESSAGE,
    flag: 111,
    status: HttpStatus.NOT_FOUND,
  },
  [ErrorTypes.ACCESS]: {
    message: ACCESS_NOT_ALLOW_MESSAGE,
    flag: 112,
    status: HttpStatus.FORBIDDEN,
  },
  [ErrorTypes.NOT_FOUND]: {
    message: NOT_FOUND_MESSAGE,
    flag: 113,
    status: HttpStatus.NOT_FOUND,
  },
  [ErrorTypes.NOT_FOUND_PRODUCT]: {
    message: NOT_FOUND_PRODUCT_MESSAGE,
    flag: 114,
    status: HttpStatus.NOT_FOUND,
  },
  [ErrorTypes.EMAIL_EXIST]: {
    message: EXIST_EMAIL_MESSAGE,
    flag: 115,
    status: HttpStatus.BAD_REQUEST,
  },
  [ErrorTypes.PHONE_EXIST]: {
    message: EXIST_PHONE_MESSAGE,
    flag: 116,
    status: HttpStatus.BAD_REQUEST,
  },
  [ErrorTypes.NOT_FOUND_USER]: {
    message: USER_NOT_FOUND_MESSAGE,
    flag: 117,
    status: HttpStatus.NOT_FOUND,
  },
  [ErrorTypes.MANY_ATTEMPT]: {
    message: MANY_ATTEMPT_MESSAGE,
    flag: 118,
    status: HttpStatus.NOT_ACCEPTABLE,
  },
  [ErrorTypes.PERMISSION]: {
    message: PERMISSION_DENIED_MESSAGE,
    flag: 119,
    status: HttpStatus.FORBIDDEN,
  },
  [ErrorTypes.NOT_COMPLETED]: {
    message: COMPANY_ISSUE_MESSAGE,
    flag: 120,
    status: HttpStatus.BAD_REQUEST,
  },
  [ErrorTypes.DUPLICATED]: {
    message: DUPLICATED_ERROR_MESSAGE,
    flag: 121,
    status: HttpStatus.BAD_REQUEST,
  },
  [ErrorTypes.ERROR_UPDATE]: {
    message: ERROR_IN_UPDATE_MESSAGE,
    flag: 122,
    status: HttpStatus.CONFLICT,
  },
  [ErrorTypes.PENDING_REQUESTS]: {
    message: THERE_IS_PENDING_REQUEST,
    flag: 123,
    status: HttpStatus.NOT_ACCEPTABLE,
  },
  [ErrorTypes.INVALID_URL_PARAMS]: {
    message: INVALID_URL_PARAMS_MESSAGE,
    flag: 124,
    status: HttpStatus.BAD_REQUEST,
  },
  [ErrorTypes.CLOSED_ORDER]: {
    message: CLOSED_ORDER_MESSAGE,
    flag: 125,
    status: HttpStatus.CONFLICT,
  },
  [ErrorTypes.TOKEN_REQUIRED]: {
    message: TOKEN_REQUIRED_MESSAGE,
    flag: 126,
    status: HttpStatus.UNAUTHORIZED,
  },
  [ErrorTypes.NOT_ALLOWED]: {
    message: NOT_ALLOWED_MESSAGE,
    flag: 127,
    status: HttpStatus.UNAUTHORIZED,
  },
  [ErrorTypes.USER_GOV_DIS_NOT_FOUND]: {
    message: USER_GOV_DIS_NOT_FOUND_MESSAGE,
    flag: 128,
    status: HttpStatus.BAD_REQUEST,
  },
};
