export class MeetingQueryDto {
  page?: number = 1;
  limit?: number = 10;
  search?: string;
  sort?: string = 'createdAt';
  sortDirection?: string = 'desc';
  year?: number;
  month?: number;
  week?: number;
  day?: number;
}
