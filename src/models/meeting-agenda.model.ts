/**
 * Meeting agenda-related models
 */

import { User } from '@supabase/supabase-js';

import { MeetingAgendaQueryDto } from './meeting-agendas/meeting-agenda-query.dto';
import { MeetingAgendaDto } from './meeting-agendas/meeting-agenda.dto';

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
