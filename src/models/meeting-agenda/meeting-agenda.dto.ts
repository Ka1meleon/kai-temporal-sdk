export interface MeetingAgendaTableRow {
  id: string;
  user_id: string;
  title: string;
  categories: MeetingAgendaCategoryDto[];
  created_at: string;
  updated_at: string;
}

export interface MeetingAgendaDto {
  id: string;
  userId: string;
  title: string;
  categories: MeetingAgendaCategoryDto[];
  createdAt: string;
  updatedAt: string;
}

export interface MeetingAgendaCategoryDto {
  id?: string;
  category: string;
  items: MeetingAgendaItemDto[];
  order?: number;
}

export interface MeetingAgendaItemDto {
  id?: string;
  title: string;
  duration?: number;
  order?: number;
}
