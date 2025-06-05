import { MeetingAgendaRefDto } from './meeting.dto';

export interface PostMeetingRequestDto {
  title: string;
  date?: string;
  duration?: number;
  summary?: string;
  keyPoints?: string[];
  actionItems?: string[];
  decisionsMade?: string[];
  agenda?: MeetingAgendaRefDto;
  language?: string;
}

export interface PutMeetingRequestDto {
  title?: string;
  date?: string;
  duration?: number;
  summary?: string;
  keyPoints?: string[];
  actionItems?: string[];
  decisionsMade?: string[];
  agenda?: MeetingAgendaRefDto;
  language?: string;
}

export interface PutMeetingTranscriptionRequestDto {
  transcription: string;
  language?: string;
}

export interface PostMeetingVerifyAgendaItemsRequestDto {
  transcriptionChunk: string;
}

export type UpdateMeetingDto = PutMeetingRequestDto;
