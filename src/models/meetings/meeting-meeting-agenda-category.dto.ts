import { MeetingMeetingAgendaItem } from './meeting-meeting-agenda-item.dto';

export class MeetingMeetingAgendaCategory {
  id?: string;
  category: string;
  items: MeetingMeetingAgendaItem[];
}
