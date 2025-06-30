import {
  IsEmail,
  IsEnum,
  IsStrongPassword,
  Matches,
  MinLength,
} from 'class-validator';
import { UserSignupEnum } from '../../auth/enums/userRoles.enums';

export class CreateUserDto {
  @Matches(/^[\p{L} ]+$/u, {
    message: 'Full name must contain only letters and spaces',
  })
  @MinLength(3, { message: 'Full name must be at least 3 characters' })
  fullName: string;

  @IsEnum(UserSignupEnum)
  role: UserSignupEnum;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;
}
