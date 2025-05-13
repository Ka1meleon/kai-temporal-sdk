/**
 * Central export file for all models in the Kai Temporal SDK
 */

import { PaginatedResponseDto } from './common';
import {
  GetMeetingAgendasParams,
  GetMeetingAgendaByIdParams,
  CreateMeetingAgendaParams,
  UpdateMeetingAgendaParams,
  DeleteMeetingAgendaParams,
} from './meeting-agenda.model';
import { MeetingAgendaDto } from './meeting-agendas/meeting-agenda.dto';
import {
  GetMeetingsParams,
  GetMeetingByIdParams,
  CreateMeetingParams,
  UpdateMeetingParams,
  DeleteMeetingParams,
} from './meeting.model';
import { MeetingDto } from './meetings/meeting.dto';
import { OpenAIToolCallParams } from './tools.model';
import { WorkflowFunction } from './workflow.model';

/**
 * Interface describing all available workflows and their parameter/result types
 */
export interface WorkflowRegistry {
  // Meeting workflows
  getMeetings: WorkflowFunction<GetMeetingsParams, PaginatedResponseDto<MeetingDto>>;
  getMeetingById: WorkflowFunction<GetMeetingByIdParams, MeetingDto | null>;
  createMeeting: WorkflowFunction<CreateMeetingParams, MeetingDto>;
  updateMeeting: WorkflowFunction<UpdateMeetingParams, MeetingDto>;
  deleteMeeting: WorkflowFunction<DeleteMeetingParams, { success: boolean }>;

  // Meeting Agenda workflows
  getMeetingAgendas: WorkflowFunction<
    GetMeetingAgendasParams,
    PaginatedResponseDto<MeetingAgendaDto>
  >;
  getMeetingAgendaById: WorkflowFunction<GetMeetingAgendaByIdParams, MeetingAgendaDto | null>;
  createMeetingAgenda: WorkflowFunction<CreateMeetingAgendaParams, MeetingAgendaDto>;
  updateMeetingAgenda: WorkflowFunction<UpdateMeetingAgendaParams, MeetingAgendaDto | null>;
  deleteMeetingAgenda: WorkflowFunction<DeleteMeetingAgendaParams, { success: boolean }>;

  // Other workflows
  askKai: WorkflowFunction<OpenAIToolCallParams, { text: string }>;
}
