import { WorkflowStartOptions } from '@temporalio/client';

import { WorkflowRegistry } from './models';
import {
  UpdateMeetingAgendaItemsParams,
  UpdateMeetingAgendaItemsResponseDto,
} from './models/meetings/update-meeting-agenda-items.dto';
import { OpenAIToolCallParams } from './models/tools.model';
import { WorkflowResult, KAI_TASK_QUEUE } from './models/workflow.model';

/**
 * Workflow implementation factory
 *
 * @param startWorkflow The function to start workflow executions
 * @param ensureInitialized The function to ensure client is initialized
 * @returns Implementations of all registered workflows
 */
export function createWorkflows(
  startWorkflow: <T>(
    workflowName: string,
    taskQueue: string,
    args: unknown[],
    options: WorkflowStartOptions,
  ) => Promise<WorkflowResult<T>>,
  ensureInitialized: () => Promise<void>,
): WorkflowRegistry {
  return {
    // Meeting workflows
    // getMeetings: async (
    //   workflowId: string,
    //   params: GetMeetingsParams,
    // ): Promise<WorkflowResult<PaginatedResponseDto<MeetingDto>>> => {
    //   await ensureInitialized();
    //   const { user, queryDto } = params;
    //   return startWorkflow<PaginatedResponseDto<MeetingDto>>(
    //     'getMeetingsWorkflow',
    //     KAI_TASK_QUEUE,
    //     [user, queryDto],
    //     {
    //       workflowId,
    //       taskQueue: KAI_TASK_QUEUE,
    //       workflowExecutionTimeout: 120000, // 2 minutes timeout for the entire workflow
    //     },
    //   );
    // },

    // getMeetingById: async (
    //   workflowId: string,
    //   params: GetMeetingByIdParams,
    // ): Promise<WorkflowResult<MeetingDto | null>> => {
    //   await ensureInitialized();
    //   const { user, meetingId } = params;
    //   return startWorkflow<MeetingDto | null>(
    //     'getMeetingByIdWorkflow',
    //     KAI_TASK_QUEUE,
    //     [user, meetingId],
    //     {
    //       workflowId,
    //       taskQueue: KAI_TASK_QUEUE,
    //       workflowExecutionTimeout: 60000, // 1 minute timeout
    //     },
    //   );
    // },

    // createMeeting: async (
    //   workflowId: string,
    //   params: CreateMeetingParams,
    // ): Promise<WorkflowResult<MeetingDto>> => {
    //   await ensureInitialized();
    //   const { user, meetingData } = params;
    //   return startWorkflow<MeetingDto>(
    //     'createMeetingWorkflow',
    //     KAI_TASK_QUEUE,
    //     [user, meetingData],
    //     {
    //       workflowId,
    //       taskQueue: KAI_TASK_QUEUE,
    //       workflowExecutionTimeout: 60000, // 1 minute timeout
    //     },
    //   );
    // },

    // updateMeeting: async (
    //   workflowId: string,
    //   params: UpdateMeetingParams,
    // ): Promise<WorkflowResult<MeetingDto>> => {
    //   await ensureInitialized();
    //   const { user, meetingId, meetingData } = params;
    //   return startWorkflow<MeetingDto>(
    //     'updateMeetingWorkflow',
    //     KAI_TASK_QUEUE,
    //     [user, meetingId, meetingData],
    //     {
    //       workflowId,
    //       taskQueue: KAI_TASK_QUEUE,
    //       workflowExecutionTimeout: 60000, // 1 minute timeout
    //     },
    //   );
    // },

    // deleteMeeting: async (
    //   workflowId: string,
    //   params: DeleteMeetingParams,
    // ): Promise<WorkflowResult<{ success: boolean }>> => {
    //   await ensureInitialized();
    //   const { user, meetingId } = params;
    //   return startWorkflow<{ success: boolean }>(
    //     'deleteMeetingWorkflow',
    //     KAI_TASK_QUEUE,
    //     [user, meetingId],
    //     {
    //       workflowId,
    //       taskQueue: KAI_TASK_QUEUE,
    //       workflowExecutionTimeout: 60000, // 1 minute timeout
    //     },
    //   );
    // },

    // // Meeting Agenda workflows
    // getMeetingAgendas: async (
    //   workflowId: string,
    //   params: GetMeetingAgendasParams,
    // ): Promise<WorkflowResult<PaginatedResponseDto<MeetingAgendaDto>>> => {
    //   await ensureInitialized();
    //   const { user, queryFilters } = params;
    //   return startWorkflow<PaginatedResponseDto<MeetingAgendaDto>>(
    //     'getMeetingAgendasWorkflow',
    //     KAI_TASK_QUEUE,
    //     [user, queryFilters],
    //     {
    //       workflowId,
    //       taskQueue: KAI_TASK_QUEUE,
    //       workflowExecutionTimeout: 120000, // 2 minutes timeout
    //     },
    //   );
    // },

    // getMeetingAgendaById: async (
    //   workflowId: string,
    //   params: GetMeetingAgendaByIdParams,
    // ): Promise<WorkflowResult<MeetingAgendaDto | null>> => {
    //   await ensureInitialized();
    //   const { user, agendaId } = params;
    //   return startWorkflow<MeetingAgendaDto | null>(
    //     'getMeetingAgendaByIdWorkflow',
    //     KAI_TASK_QUEUE,
    //     [user, agendaId],
    //     {
    //       workflowId,
    //       taskQueue: KAI_TASK_QUEUE,
    //       workflowExecutionTimeout: 60000, // 1 minute timeout
    //     },
    //   );
    // },

    // createMeetingAgenda: async (
    //   workflowId: string,
    //   params: CreateMeetingAgendaParams,
    // ): Promise<WorkflowResult<MeetingAgendaDto>> => {
    //   await ensureInitialized();
    //   const { user, meetingAgendaData } = params;
    //   return startWorkflow<MeetingAgendaDto>(
    //     'createMeetingAgendaWorkflow',
    //     KAI_TASK_QUEUE,
    //     [user, meetingAgendaData],
    //     {
    //       workflowId,
    //       taskQueue: KAI_TASK_QUEUE,
    //       workflowExecutionTimeout: 60000, // 1 minute timeout
    //     },
    //   );
    // },

    // updateMeetingAgenda: async (
    //   workflowId: string,
    //   params: UpdateMeetingAgendaParams,
    // ): Promise<WorkflowResult<MeetingAgendaDto | null>> => {
    //   await ensureInitialized();
    //   const { user, agendaId, meetingAgendaData } = params;
    //   return startWorkflow<MeetingAgendaDto | null>(
    //     'updateMeetingAgendaWorkflow',
    //     KAI_TASK_QUEUE,
    //     [user, agendaId, meetingAgendaData],
    //     {
    //       workflowId,
    //       taskQueue: KAI_TASK_QUEUE,
    //       workflowExecutionTimeout: 60000, // 1 minute timeout
    //     },
    //   );
    // },

    // deleteMeetingAgenda: async (
    //   workflowId: string,
    //   params: DeleteMeetingAgendaParams,
    // ): Promise<WorkflowResult<{ success: boolean }>> => {
    //   await ensureInitialized();
    //   const { user, agendaId } = params;
    //   return startWorkflow<{ success: boolean }>(
    //     'deleteMeetingAgendaWorkflow',
    //     KAI_TASK_QUEUE,
    //     [user, agendaId],
    //     {
    //       workflowId,
    //       taskQueue: KAI_TASK_QUEUE,
    //       workflowExecutionTimeout: 60000, // 1 minute timeout
    //     },
    //   );
    // },

    // Other workflows
    askKai: async (
      workflowId: string,
      params: OpenAIToolCallParams,
    ): Promise<WorkflowResult<{ text: string }>> => {
      await ensureInitialized();
      const { user, toolCallMessage } = params;
      return startWorkflow<{ text: string }>(
        'askKaiWorkflow',
        KAI_TASK_QUEUE,
        [user, toolCallMessage],
        {
          workflowId,
          taskQueue: KAI_TASK_QUEUE,
          workflowExecutionTimeout: 120000, // 2 minutes timeout
        },
      );
    },

    updateMeetingAgendaItems: async (
      workflowId: string,
      params: UpdateMeetingAgendaItemsParams,
    ): Promise<WorkflowResult<UpdateMeetingAgendaItemsResponseDto>> => {
      await ensureInitialized();
      const { user, input } = params;
      return startWorkflow<UpdateMeetingAgendaItemsResponseDto>(
        'updateMeetingAgendaItemsWorkflow',
        KAI_TASK_QUEUE,
        [user, input],
        {
          workflowId,
          taskQueue: KAI_TASK_QUEUE,
          workflowExecutionTimeout: 120000, // 2 minutes timeout
        },
      );
    },
  };
}
