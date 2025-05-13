import { MeetingAgendaCategoryDto } from './meeting-agenda-category.dto';

export class MeetingAgendaDto {
  id?: string;
  title: string;
  categories: MeetingAgendaCategoryDto[];
  createdAt?: string;
  updatedAt?: string;
}
