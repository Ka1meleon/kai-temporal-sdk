import { MeetingMeetingAgenda } from './meeting-meeting-agenda.dto';

export class MeetingDto {
  id?: string;
  title: string;
  date?: string;
  duration?: number;
  summary?: string;
  keyPoints?: string[];
  actionItems?: string[];
  decisionsMade?: string[];
  agenda?: MeetingMeetingAgenda | null;
  transcription?: string;
  language?: string;
  createdAt?: string;
  updatedAt?: string;
}
