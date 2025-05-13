/**
 * Meeting agenda-related models
 */

import { User } from '@supabase/supabase-js';

import { MeetingAgendaDto, MeetingAgendaQueryDto } from './meeting-agendas';

// Parameter types for specific workflows
export interface GetMeetingAgendasParams {
  user: User;
  queryFilters: MeetingAgendaQueryDto;
}

export interface GetMeetingAgendaByIdParams {
  user: User;
  agendaId: string;
}

export interface CreateMeetingAgendaParams {
  user: User;
  meetingAgendaData: MeetingAgendaDto;
}

export interface UpdateMeetingAgendaParams {
  user: User;
  agendaId: string;
  meetingAgendaData: Partial<MeetingAgendaDto>;
}

export interface DeleteMeetingAgendaParams {
  user: User;
  agendaId: string;
}
