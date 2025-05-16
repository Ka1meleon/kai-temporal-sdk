import { SortDirection } from '../common';

export class MeetingQueryDto {
  page?: number = 1;
  limit?: number = 10;
  search?: string;
  sort?: string = 'createdAt';
  sortDirection?: SortDirection = SortDirection.DESC;
  fromDate?: string;
  toDate?: string;
}
