import { SortDirection } from '../common';

export class MeetingAgendaQueryDto {
  page?: number = 1;
  limit?: number = 10;
  search?: string;
  sort?: string = 'createdAt';
  sortDirection?: SortDirection = SortDirection.DESC;
}
