/**
 * Central export file for all models in the Kai Temporal SDK
 */

export * from './workflow.model';
export * from './meeting.model';
export * from './meeting-agenda.model';
export * from './pagination.model';
export * from './tools.model';

// Define registry after importing all component types
import {
  GetMeetingAgendasParams,
  GetMeetingAgendaByIdParams,
  CreateMeetingAgendaParams,
  UpdateMeetingAgendaParams,
  DeleteMeetingAgendaParams,
  MeetingAgenda,
} from './meeting-agenda.model';
import {
  GetMeetingsParams,
  GetMeetingByIdParams,
  CreateMeetingParams,
  UpdateMeetingParams,
  DeleteMeetingParams,
  MeetingDto,
} from './meeting.model';
import { PaginatedResponseDto } from './pagination.model';
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
  getMeetingAgendas: WorkflowFunction<GetMeetingAgendasParams, PaginatedResponseDto<MeetingAgenda>>;
  getMeetingAgendaById: WorkflowFunction<GetMeetingAgendaByIdParams, MeetingAgenda | null>;
  createMeetingAgenda: WorkflowFunction<CreateMeetingAgendaParams, MeetingAgenda>;
  updateMeetingAgenda: WorkflowFunction<UpdateMeetingAgendaParams, MeetingAgenda | null>;
  deleteMeetingAgenda: WorkflowFunction<DeleteMeetingAgendaParams, { success: boolean }>;

  // Other workflows
  askKai: WorkflowFunction<OpenAIToolCallParams, { text: string }>;
}
