export class MeetingQueryDto {
  page?: number = 1;
  limit?: number = 10;
  search?: string;
  sort?: string = 'createdAt';
  sortDirection?: string = 'desc';
  fromDate?: Date;
  toDate?: Date;
}
