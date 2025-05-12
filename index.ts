/**
 * Kai Temporal SDK
 *
 * The SDK provides a clean, type-safe interface for client code to interact with workflows.
 * It abstracts away the details of the Temporal API and provides a simple, intuitive way
 * to execute workflows.
 *
 * Usage:
 * ```typescript
 * import { KaiTemporalClient } from '@kai/temporal-sdk';
 *
 * // Initialize the client
 * const temporalClient = new KaiTemporalClient({
 *   address: process.env.TEMPORAL_ADDRESS || 'localhost:7233',
 *   namespace: process.env.TEMPORAL_NAMESPACE || 'default',
 * });
 *
 * // Use a workflow
 * const workflowId = `workflow-${Date.now()}`;
 * const handle = await temporalClient.workflows.someWorkflow(workflowId, {
 *   param1: 'value1',
 *   param2: 'value2',
 * });
 *
 * return handle.result;
 * ```
 *
 * When implementing workflows for this SDK, follow these guidelines:
 * 1. Use SDK interfaces for parameter and return types
 * 2. Use the central KAI_TASK_QUEUE for consistency
 * 3. Handle errors properly using workflow.ApplicationFailure
 */

export { KaiTemporalClient } from './kai-temporal-client';

// Export all models
export * from './models';
