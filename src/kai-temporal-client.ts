import { Connection, Client, WorkflowStartOptions } from '@temporalio/client';

import { createWorkflows } from './kai-typed-workflows';
import { WorkflowRegistry } from './models';
import { KaiTemporalClientOptions, WorkflowResult } from './models/workflow.model';

/**
 * A client for Temporal that provides type-safe access to workflows
 */
export class KaiTemporalClient {
  private client: Client;
  private clientInitPromise: Promise<void>;
  public workflows: WorkflowRegistry;

  constructor(options: KaiTemporalClientOptions = {}) {
    this.clientInitPromise = this.initializeClient(options);
    this.initializeWorkflows();
  }

  private async initializeClient(options: KaiTemporalClientOptions): Promise<void> {
    try {
      const connection = await Connection.connect({
        address: options.address || 'localhost:7233',
        tls: options.tls || false,
        apiKey: options.apiKey || undefined,
        metadata: options.metadata || {},
      });

      this.client = new Client({
        connection,
        namespace: options.namespace || 'default',
      });
    } catch (error) {
      throw error;
    }
  }

  private async ensureInitialized(): Promise<void> {
    if (this.clientInitPromise) {
      await this.clientInitPromise;
    }
  }

  private initializeWorkflows(): void {
    this.workflows = createWorkflows(
      this.startWorkflow.bind(this),
      this.ensureInitialized.bind(this),
    );
  }

  /**
   * Start a workflow execution
   * @param workflowName Name of the workflow to execute
   * @param taskQueue The task queue to use
   * @param args Arguments to pass to the workflow
   * @param options Additional options for workflow execution
   * @returns The workflow execution result
   */
  async startWorkflow<T>(
    workflowName: string,
    taskQueue: string,
    args: unknown[],
    options: WorkflowStartOptions,
  ): Promise<WorkflowResult<T>> {
    await this.ensureInitialized();
    const { workflowId = `${workflowName}-${Date.now()}`, workflowExecutionTimeout } = options;

    try {
      // Start the workflow and get a handle
      const handle = await this.client.workflow.start(workflowName, {
        args,
        workflowId,
        taskQueue,
        workflowExecutionTimeout,
      });

      // Wait for the result - result() is a method, not a property
      const result = (await handle.result()) as T;

      return {
        workflowId: handle.workflowId,
        runId: handle.firstExecutionRunId,
        result,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Signal a running workflow
   * @param workflowId ID of the workflow to signal
   * @param signalName Name of the signal to send
   * @param args Arguments to pass with the signal
   */
  async signalWorkflow(workflowId: string, signalName: string, ...args: unknown[]): Promise<void> {
    await this.ensureInitialized();
    const handle = await this.client.workflow.getHandle(workflowId);
    await handle.signal(signalName, ...args);
  }

  /**
   * Terminate a running workflow
   * @param workflowId ID of the workflow to terminate
   * @param reason Reason for termination
   */
  async terminateWorkflow(workflowId: string, reason: string): Promise<void> {
    await this.ensureInitialized();
    const handle = await this.client.workflow.getHandle(workflowId);
    await handle.terminate(reason);
  }
}
