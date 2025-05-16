export class PaginationDto {
  page?: number = 1;
  limit?: number = 10;
}

export class SearchPaginationDto extends PaginationDto {
  search?: string;
  sort?: string = 'createdAt';
  sortDirection?: SortDirection;
}

export class PaginatedResponseDto<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  search?: string;
  sort?: string;
  sortDirection?: SortDirection;
}
export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}
