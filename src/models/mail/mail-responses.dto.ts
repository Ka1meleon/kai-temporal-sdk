export interface MailWorkflowResponseDto {
  status: 'success' | 'error';
  message: string;
  workflowId: string;
}
