import { IsInt, Min, IsOptional, IsString, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryOptions {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(500)
  pageSize: number;

  @IsOptional()
  @IsString()
  search: string;
}
