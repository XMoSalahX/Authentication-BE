import { IsEmail, IsEnum, IsStrongPassword } from 'class-validator';
import { UserSignupEnum } from '../enums/userRoles.enums';

export class SignInDto {
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

  @IsEnum(UserSignupEnum)
  role: UserSignupEnum;
}
