/**
 * Meeting agenda-related models
 */

import { User } from '@supabase/supabase-js';

import { MeetingAgendaQueryDto } from './meeting-agendas';
import { MeetingMeetingAgenda } from './meetings';

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
  meetingAgendaData: MeetingMeetingAgenda;
}

export interface UpdateMeetingAgendaParams {
  user: User;
  agendaId: string;
  meetingAgendaData: Partial<MeetingMeetingAgenda>;
}

export interface DeleteMeetingAgendaParams {
  user: User;
  agendaId: string;
}
