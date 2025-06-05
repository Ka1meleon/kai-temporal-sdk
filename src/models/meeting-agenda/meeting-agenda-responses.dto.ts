import { MeetingAgendaDto } from './meeting-agenda.dto';
import { SortDirection } from '../common/common.dto';

export type PostMeetingAgendaResponseDto = MeetingAgendaDto;

export type PutMeetingAgendaResponseDto = MeetingAgendaDto;

export type GetMeetingAgendaResponseDto = MeetingAgendaDto;

export interface GetMeetingAgendasResponseDto {
  data: MeetingAgendaDto[];
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

export interface DeleteMeetingAgendaResponseDto {
  id: string;
  success: boolean;
}
