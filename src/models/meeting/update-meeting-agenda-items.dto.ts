export interface UpdateMeetingAgendaItemDto {
  id: string;
  title: string;
  discussed: boolean;
  order?: number;
}

export interface UpdateMeetingAgendaItemsResponseDto {
  items: UpdateMeetingAgendaItemDto[];
}
