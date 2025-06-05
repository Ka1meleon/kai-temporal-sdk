import {
  MeetingAgendaDto,
  GetMeetingAgendasQuery,
  GetMeetingAgendasResponseDto,
} from '../../models/meeting-agenda';

export interface IMeetingAgendaRepository {
  createForUser(userId: string, data: Partial<MeetingAgendaDto>): Promise<MeetingAgendaDto>;
  list(userId: string, query: GetMeetingAgendasQuery): Promise<GetMeetingAgendasResponseDto>;
  findByUserIdAndId(userId: string, agendaId: string): Promise<MeetingAgendaDto | null>;
  updateForUser(
    userId: string,
    agendaId: string,
    updates: Partial<MeetingAgendaDto>,
  ): Promise<MeetingAgendaDto | null>;
  deleteForUser(userId: string, agendaId: string): Promise<boolean>;
}
