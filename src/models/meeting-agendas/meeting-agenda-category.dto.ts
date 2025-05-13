import { MeetingAgendaCategoryItem } from './meeting-agenda-category-item.dto';

export class MeetingAgendaCategoryDto {
  id?: string;
  category: string;
  items: MeetingAgendaCategoryItem[];
}
