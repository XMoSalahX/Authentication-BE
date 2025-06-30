import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { OperatingSystem } from '../../utils/enums/systems-os.enums';
import { ApiHideProperty } from '@nestjs/swagger';

export class SystemControlValidationDto {
  @IsString()
  app: string;

  @IsString()
  version: string;

  @IsNotEmpty()
  @IsString()
  os: string;

  @IsString()
  authorization: string;
}

export class SystemControlValidationSignInDto {
  @IsString()
  app: string;

  @IsString()
  version: string;

  @IsString()
  @IsEnum(OperatingSystem)
  os: OperatingSystem;

  @ApiHideProperty()
  @IsOptional()
  @IsString()
  origin?: string;
}
