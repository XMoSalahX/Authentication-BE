import { IsNumber, Min, IsOptional, ValidateIf, IsBoolean } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class PaginationParams {
  @ValidateIf(o => o.allowPagination)
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number;

  @ValidateIf(o => o.allowPagination)
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ obj }) => {
    return [true, 'true'].indexOf(obj.allowPagination) > -1;
  })
  allowPagination?: boolean;
}
