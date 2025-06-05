export interface GetMeetingsQuery {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  sortDirection?: 'ASC' | 'DESC';
  fromDate?: string;
  toDate?: string;
  includeTranscription?: boolean;
}
