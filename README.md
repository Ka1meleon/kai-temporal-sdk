# Kai Temporal SDK

A type-safe client for interacting with Temporal workflows.

## Installation

```bash
npm install @kaimeleon/temporal-sdk
```

Or with yarn:

```bash
yarn add @kaimeleon/temporal-sdk
```

## Usage

```typescript
import { KaiTemporalClient } from '@kai/temporal-sdk';

// Initialize the client
const temporalClient = new KaiTemporalClient({
  address: process.env.TEMPORAL_ADDRESS || 'localhost:7233',
  namespace: process.env.TEMPORAL_NAMESPACE || 'default',
});

// Use a workflow
async function getMeetingsData() {
  // You must provide a unique workflow ID
  const workflowId = `getMeetings-${user.id}-${Date.now()}`;

  const handle = await temporalClient.workflows.getMeetings(
    workflowId,
    {
      user,
      queryDto,
    }
  );

  return handle.result;
}
```

### Using OpenAI Tool Call Workflow

The OpenAI Tool Call workflow allows you to execute AI operations via Temporal:

```typescript
// Example of using the OpenAI tool call workflow
const workflowId = `openai-${user.id}-${Date.now()}`;

const result = await temporalClient.workflows.openAIToolCall(
  workflowId,
  {
    user,
    toolCallMessage: {
      workflowId: 'tool-call-123',
      message: 'Generate a summary of the meeting notes'
    }
  }
);

console.log('AI Response:', result.result.text);
```

## Adding a New Workflow

To add a new workflow to the SDK, you only need to modify the `kai-typed-workflows.ts` file:

1. Add the workflow parameter interface:

```typescript
export interface CreateMeetingParams {
  user: User;
  meetingData: MeetingDto;
}
```

2. Add the workflow to the WorkflowRegistry interface:

```typescript
export interface WorkflowRegistry {
  getMeetings: WorkflowFunction<GetMeetingsParams, PaginatedResponseDto<MeetingDto>>;
  createMeeting: WorkflowFunction<CreateMeetingParams, MeetingDto>;
  // Add more workflows here as needed
}

// Note that all workflow functions require a unique workflowId as their first parameter
export type WorkflowFunction<P, R> = (
  workflowId: string,
  params: P
) => Promise<WorkflowResult<R>>;
```

## Workflow Implementation Guidelines

When implementing workflows, always follow these guidelines:

1. **Use SDK interfaces**: Always use the exported interfaces from the SDK when defining workflow parameters:

```typescript
// In the workflow implementation file
import { SomeWorkflowParams } from '@kai/temporal-sdk';

export async function myWorkflow(
  user: User,
  params: SomeWorkflowParams['specialData'], // Use the nested property if needed
): Promise<ResultType> {
  // Implementation
}
```

2. **Use the central task queue**: All workflows should use the central `KAI_TASK_QUEUE` for consistency:

```typescript
import { KAI_TASK_QUEUE } from '@kai/temporal-sdk';

const { myActivity } = workflow.proxyActivities<typeof activities>({
  taskQueue: KAI_TASK_QUEUE,
  // Other options...
});
```

> **Important**: We maintain a single task queue (`KAI_TASK_QUEUE`) for all workflows in the system. This simplifies worker allocation and monitoring. Do not create new task queues unless absolutely necessary and approved.

3. **Handle errors properly**: Use `workflow.ApplicationFailure` for workflow errors to ensure proper error reporting in Temporal:

```typescript
try {
  // Workflow logic
} catch (error) {
  throw new workflow.ApplicationFailure(
    `Failed to execute: ${error.message}`,
    { cause: error }
  );
}
```

3. Implement the workflow in the `createWorkflows` function:

```typescript
export function createWorkflows(
  startWorkflow: <T>(workflowName: string, taskQueue: string, args: unknown[], options: WorkflowStartOptions) => Promise<WorkflowResult<T>>,
  ensureInitialized: () => Promise<void>
): WorkflowRegistry {
  return {
    // ...existing workflows
    
    createMeeting: async (
      workflowId: string,
      params: CreateMeetingParams
    ): Promise<WorkflowResult<MeetingDto>> => {
      await ensureInitialized();
      const { user, meetingData } = params;
      return startWorkflow<MeetingDto>(
        'createMeetingWorkflow',  // Workflow name in Temporal
        MEETING_TASK_QUEUE,      // Task queue
        [user, meetingData],     // Workflow arguments
        {
          workflowId, // Use the provided workflow ID
        }
      );
    },
  };
}
```

That's it! The new workflow will be available with full type safety through the client:

```typescript
const result = await temporalClient.workflows.createMeeting({
  user,
  meetingData,
});
```

## API Reference

### `KaiTemporalClient`

The main client class for interacting with Temporal.

#### Constructor

```typescript
constructor(options: KaiTemporalClientOptions = {})
```

Options:
- `address`: Temporal server address (default: 'localhost:7233')
- `namespace`: Temporal namespace (default: 'default')

#### Properties

- `workflows`: Type-safe access to all available workflows

#### Methods

- `startWorkflow<T>(workflowName, taskQueue, args, options)`: Start a workflow execution
- `signalWorkflow(workflowId, signalName, ...args)`: Signal a running workflow
- `terminateWorkflow(workflowId, reason)`: Terminate a running workflow