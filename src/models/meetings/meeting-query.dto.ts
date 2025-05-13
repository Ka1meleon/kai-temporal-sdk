import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min, Max, IsIn, ValidateIf } from 'class-validator';

export class MeetingQueryDto {
  @ApiPropertyOptional({
    description: 'Page number for pagination',
    example: 1,
    default: 1,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Items per page for pagination',
    example: 10,
    default: 10,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Search query to filter meetings by title or content',
    example: 'project',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Field to sort by (title, date, createdAt, updatedAt)',
    example: 'createdAt',
    default: 'createdAt',
  })
  @IsOptional()
  @IsString()
  @IsIn(['title', 'date', 'createdAt', 'updatedAt', 'created_at', 'updated_at'])
  sort?: string = 'createdAt';

  @ApiPropertyOptional({
    description: 'Sort direction (asc or desc)',
    example: 'desc',
    default: 'desc',
  })
  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  sortDirection?: string = 'desc';

  @ApiPropertyOptional({
    description: 'Filter by year (4-digit). Can be used alone or with month, week, or day',
    example: 2023,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(2000)
  @Max(2100)
  year?: number;

  @ApiPropertyOptional({
    description: 'Filter by month (1-12). Must be used with year',
    example: 4,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(12)
  @ValidateIf(o => o.year !== undefined)
  month?: number;

  @ApiPropertyOptional({
    description:
      'Filter by week of year (1-53). Must be used with year. Cannot be used with month or day',
    example: 15,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(53)
  @ValidateIf(o => o.year !== undefined && o.month === undefined && o.day === undefined)
  week?: number;

  @ApiPropertyOptional({
    description: 'Filter by day of month (1-31). Must be used with year and month',
    example: 15,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(31)
  @ValidateIf(o => o.year !== undefined && o.month !== undefined)
  day?: number;
}
