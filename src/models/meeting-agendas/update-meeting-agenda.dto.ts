import { MeetingAgendaDto } from './meeting-agenda.dto';

export class UpdateMeetingAgendaDto {
  id?: string;
  title?: string;
  categories?: MeetingAgendaDto['categories'];
  createdAt?: string;
  updatedAt?: string;
}
