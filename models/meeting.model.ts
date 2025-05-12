/**
 * Meeting-related models
 */

import { User } from '@supabase/supabase-js';

import { MeetingAgenda } from './meeting-agenda.model';

/**
 * Meeting data transfer object
 */
export interface MeetingDto {
  id?: string;
  title: string;
  date?: string;
  duration?: number;
  summary?: string;
  keyPoints?: string[];
  actionItems?: string[];
  decisionsMade?: string[];
  agenda?: MeetingAgenda | null;
  transcription?: string;
  language?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Meeting update data transfer object
 */
export interface UpdateMeetingDto {
  title?: string;
  date?: string;
  duration?: number;
  summary?: string;
  keyPoints?: string[];
  actionItems?: string[];
  decisionsMade?: string[];
  agenda?: MeetingAgenda | null;
  transcription?: string;
  language?: string;
}

/**
 * Meeting query parameters
 */
export interface MeetingQueryDto {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  sortDirection?: string;
  year?: number;
  month?: number;
  week?: number;
  day?: number;
}

// Parameter types for specific workflows
export interface GetMeetingsParams {
  user: User;
  queryDto: MeetingQueryDto;
}

export interface GetMeetingByIdParams {
  user: User;
  meetingId: string;
}

export interface CreateMeetingParams {
  user: User;
  meetingData: MeetingDto;
}

export interface UpdateMeetingParams {
  user: User;
  meetingId: string;
  meetingData: UpdateMeetingDto;
}

export interface DeleteMeetingParams {
  user: User;
  meetingId: string;
}
