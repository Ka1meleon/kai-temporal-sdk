import { MeetingMeetingAgendaCategory } from './meeting-meeting-agenda-category.dto';

export class MeetingMeetingAgenda {
  id?: string;
  title: string;
  categories: MeetingMeetingAgendaCategory[];
  createdAt?: string;
  updatedAt?: string;
}
