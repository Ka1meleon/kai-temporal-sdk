/**
 * Meeting-related models
 */

import { User } from '@supabase/supabase-js';

import { MeetingQueryDto } from './meetings/meeting-query.dto';
import { MeetingDto } from './meetings/meeting.dto';
import { UpdateMeetingDto } from './meetings/update-meeting.dto';

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
