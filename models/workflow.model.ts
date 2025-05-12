/**
 * Core workflow types and interfaces
 */

/**
 * The result of a workflow execution
 */
export interface WorkflowResult<T = any> {
  workflowId: string;
  runId: string;
  result: T;
}

/**
 * Configuration options for the Temporal client
 */
export interface KaiTemporalClientOptions {
  address?: string;
  namespace?: string;
}

/**
 * Options for starting a workflow
 */
export interface WorkflowStartOptions {
  workflowId?: string;
  workflowExecutionTimeout?: number;
}

/**
 * Type definition for a workflow function
 */
export type WorkflowFunction<P, R> = (workflowId: string, params: P) => Promise<WorkflowResult<R>>;

/**
 * Task queue name constant
 */
export const KAI_TASK_QUEUE = 'The Kai-munnication Pipeline';
