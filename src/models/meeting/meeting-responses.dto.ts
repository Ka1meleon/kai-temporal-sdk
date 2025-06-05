import { MeetingDto } from './meeting.dto';
import { UpdateMeetingAgendaItemDto } from './update-meeting-agenda-items.dto';
import { SortDirection } from '../common/common.dto';

export type PostMeetingResponseDto = MeetingDto;

export type PutMeetingResponseDto = MeetingDto;

export type GetMeetingResponseDto = MeetingDto;

export interface GetMeetingsResponseDto {
  data: MeetingDto[];
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

export interface DeleteMeetingResponseDto {
  id: string;
  success: boolean;
}

export type PutMeetingTranscriptionResponseDto = MeetingDto;

export interface PostMeetingVerifyAgendaItemsResponseDto {
  verifiedItems: UpdateMeetingAgendaItemDto[];
}

export interface GetMeetingGenerateSummaryResponseDto {
  summary: string;
  keyPoints: string[];
  actionItems: string[];
  decisionsMade: string[];
}
