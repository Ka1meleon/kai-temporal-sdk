import { MeetingAgendaCategoryDto } from './meeting-agenda.dto';

export interface PostMeetingAgendaRequestDto {
  title: string;
  categories: MeetingAgendaCategoryDto[];
}

export interface PutMeetingAgendaRequestDto {
  title?: string;
  categories?: MeetingAgendaCategoryDto[];
}
