import { IsEnum, IsString } from 'class-validator';
import { OperatingSystem } from '../enums/systems-os.enums';

export class SystemControlValidationDto {
  @IsString()
  app: string;

  @IsString()
  @IsEnum(OperatingSystem)
  os: OperatingSystem;

  @IsString()
  version: string;
}
