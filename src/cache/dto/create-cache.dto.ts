import { IsString } from 'class-validator';

export class CreateCacheDto {
  @IsString()
  key: string;

  @IsString()
  value: string;
}
