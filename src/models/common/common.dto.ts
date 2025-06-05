export interface PaginationDto {
  page?: number;
  limit?: number;
}

export interface SearchPaginationDto extends PaginationDto {
  search?: string;
  sort?: string;
  sortDirection?: SortDirection;
}

export interface PaginatedResponseDto<T> {
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
  ASC = 'ASC',
  DESC = 'DESC',
}
