import { SortDirection } from '../common';

export interface GetMeetingAgendasQuery {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  sortDirection?: SortDirection;
}
