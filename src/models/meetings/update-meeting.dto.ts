import { MeetingDto } from './meeting.dto';

export class UpdateMeetingDto {
  id?: string;
  title?: string;
  date?: string;
  duration?: number;
  summary?: string;
  keyPoints?: string[];
  actionItems?: string[];
  decisionsMade?: string[];
  agenda?: MeetingDto['agenda'];
  transcription?: string;
  language?: string;
  createdAt?: string;
  updatedAt?: string;
}
