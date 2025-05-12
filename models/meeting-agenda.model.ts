/**
 * Meeting agenda-related models
 */

import { User } from '@supabase/supabase-js';

/**
 * Meeting agenda item
 */
export interface MeetingAgendaItem {
  id?: string;
  title: string;
  discussed?: boolean;
}

/**
 * Meeting agenda category
 */
export interface MeetingAgendaCategory {
  id?: string;
  category: string;
  items: MeetingAgendaItem[];
}

/**
 * Meeting agenda
 */
export interface MeetingAgenda {
  id?: string;
  title: string;
  categories: MeetingAgendaCategory[];
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Meeting agenda query filters
 */
export interface MeetingAgendaQueryFilters {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  sortDirection?: string;
  meetingId?: string;
}

// Parameter types for specific workflows
export interface GetMeetingAgendasParams {
  user: User;
  queryFilters: MeetingAgendaQueryFilters;
}

export interface GetMeetingAgendaByIdParams {
  user: User;
  agendaId: string;
}

export interface CreateMeetingAgendaParams {
  user: User;
  meetingAgendaData: MeetingAgenda;
}

export interface UpdateMeetingAgendaParams {
  user: User;
  agendaId: string;
  meetingAgendaData: Partial<MeetingAgenda>;
}

export interface DeleteMeetingAgendaParams {
  user: User;
  agendaId: string;
}
