/**
 * Central export file for all models in the Kai Temporal SDK
 */

import {
  UpdateMeetingAgendaItemsParams,
  UpdateMeetingAgendaItemsResponseDto,
} from './meetings/update-meeting-agenda-items.dto';
import { OpenAIToolCallParams } from './tools.model';
import { WorkflowFunction } from './workflow.model';

/**
 * Interface describing all available workflows and their parameter/result types
 */
export interface WorkflowRegistry {
  askKai: WorkflowFunction<OpenAIToolCallParams, { text: string }>;
  updateMeetingAgendaItems: WorkflowFunction<
    UpdateMeetingAgendaItemsParams,
    UpdateMeetingAgendaItemsResponseDto
  >;
}
