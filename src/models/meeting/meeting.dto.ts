import { TranscriptionParagraph } from '../transcriptions/transcription.dto';

export interface MeetingTableRow {
  id: string;
  user_id: string;
  transcription_id?: string;
  title: string;
  date?: string;
  duration?: number;
  summary?: string;
  key_points?: string[];
  action_items?: string[];
  decisions_made?: string[];
  language?: string;
  agenda?: MeetingAgendaRefDto;
  created_at: string;
  updated_at: string;
}

export interface MeetingDto {
  id: string;
  userId: string;
  transcriptionId?: string;
  title: string;
  date?: string;
  duration?: number;
  summary?: string;
  keyPoints?: string[];
  actionItems?: string[];
  decisionsMade?: string[];
  language?: string;
  agenda?: MeetingAgendaRefDto;
  transcription?: MeetingTranscriptionDto;
  createdAt: string;
  updatedAt: string;
}

export interface MeetingAgendaRefDto {
  id: string;
  title: string;
  categories: MeetingAgendaCategoryRefDto[];
  createdAt: string;
  updatedAt: string;
}

export interface MeetingAgendaCategoryRefDto {
  id?: string;
  category: string;
  items: MeetingAgendaItemRefDto[];
  order?: number;
}

export interface MeetingAgendaItemRefDto {
  id?: string;
  title: string;
  discussed: boolean;
  order?: number;
}

export interface MeetingTranscriptionDto {
  id: string;
  contextId: string;
  language: string;
  transcript: string;
  paragraphs: TranscriptionParagraph[];
  createdAt: string;
  updatedAt: string;
}
