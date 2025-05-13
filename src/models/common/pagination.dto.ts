import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsInt, Min, Max, IsString } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    description: 'Page number (starts from 1)',
    default: 1,
    required: false,
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiProperty({
    description: 'Number of items per page',
    default: 10,
    required: false,
    example: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;
}

export class SearchPaginationDto extends PaginationDto {
  @ApiProperty({
    description: 'Keyword to search in the title, summary, and transcription',
    required: false,
    example: 'meeting',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({
    description: 'Field to sort by (e.g., createdAt, title)',
    required: false,
    default: 'createdAt',
    example: 'createdAt',
  })
  @IsOptional()
  @IsString()
  sort?: string = 'createdAt';

  @ApiProperty({
    description: 'Sort direction (asc or desc)',
    required: false,
    default: 'desc',
    example: 'desc',
  })
  @IsOptional()
  @IsString()
  sortDirection?: string = 'desc';
}

export class PaginatedResponseDto<T> {
  @ApiProperty({
    description: 'Array of items',
    example: [
      {
        id: '550e8400-e29b-41d4-a716-446655440000',
        title: 'Example Item',
      },
    ],
  })
  data: T[];

  @ApiProperty({
    description: 'Total number of items',
    example: 42,
  })
  total: number;

  @ApiProperty({
    description: 'Current page number',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
  })
  limit: number;

  @ApiProperty({
    description: 'Total number of pages',
    example: 5,
  })
  totalPages: number;

  @ApiProperty({
    description: 'Whether there is a next page',
    example: true,
  })
  hasNextPage: boolean;

  @ApiProperty({
    description: 'Whether there is a previous page',
    example: false,
  })
  hasPrevPage: boolean;

  @ApiProperty({
    description: 'Search query used for filtering',
    required: false,
  })
  search?: string;

  @ApiProperty({
    description: 'Field to sort by',
    required: false,
    example: 'createdAt',
  })
  sort?: string;

  @ApiProperty({
    description: 'Sort direction (asc or desc)',
    required: false,
    example: 'desc',
  })
  sortDirection?: string;
}
