# Kai Temporal Module

This module provides a type-safe integration with Temporal for implementing durable, reliable workflows in the application. The structure is designed to provide a clean, maintainable approach to defining workflows and activities, with a simple interface for client code.

## Table of Contents

- [Module Structure](#module-structure)
- [Core Components](#core-components)
- [Adding New Activities](#adding-new-activities)
- [Adding New Workflows](#adding-new-workflows)
- [Using the SDK in Client Code](#using-the-sdk-in-client-code)
- [Data Validation with Zod](#data-validation-with-zod)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Module Structure

```
temporal/
├── activities/           # Activity implementations
│   ├── index.ts          # Exports all activities
│   └── get-meetings.activity.ts
├── interfaces/           # Shared interfaces
│   ├── index.ts
│   ├── meeting.interfaces.ts
│   └── workflow.interfaces.ts
├── sdk/                  # Client SDK for consuming workflows
│   ├── kai-temporal-client.ts  # Main client class
│   ├── kai-typed-workflows.ts  # Typed workflow definitions
│   └── index.ts          # SDK exports
├── workflows/            # Workflow implementations
│   ├── index.ts          # Exports all workflows
│   └── get-meetings.workflow.ts
├── temporal.module.ts    # NestJS module definition
└── README.md             # This file
```

## Core Components

### Activities

Activities are the individual units of work that are executed as part of a workflow. They are designed to be idempotent, and Temporal will handle retries automatically if they fail.

### Workflows

Workflows orchestrate activities in a durable, reliable way. They define the business logic and flow of execution, and Temporal ensures that they continue executing even in the face of failures.

### SDK

The SDK provides a clean, type-safe interface for client code to interact with workflows. It abstracts away the details of the Temporal API and provides a simple, intuitive way to execute workflows.

## Adding New Activities

1. **Create a new activity file** in the `activities` directory:

```typescript
// activities/create-meeting.activity.ts
import { User } from '@supabase/supabase-js';
import { MeetingDto } from '@api-gateway/dto/meeting';
import { supabaseClient } from '@common/libs/supabase';

export async function createMeeting(
  user: User,
  meetingData: MeetingDto
): Promise<MeetingDto> {
  console.log('Creating meeting for user:', user.id);
  
  // Implement activity logic here
  const { data, error } = await supabaseClient
    .from('meetings')
    .insert({
      user_id: user.id,
      title: meetingData.title,
      // ... other fields
    })
    .select()
    .single();
    
  if (error) {
    throw new Error(`Failed to create meeting: ${error.message}`);
  }
  
  return data;
}
```

2. **Export the activity** in the `activities/index.ts` file:

```typescript
// activities/index.ts
export * from './get-meetings.activity';
export * from './create-meeting.activity'; // Add your new activity
```

## Adding New Workflows

1. **Create a new workflow file** in the `workflows` directory:

```typescript
// workflows/create-meeting.workflow.ts
import { User } from '@supabase/supabase-js';
import * as workflow from '@temporalio/workflow';

import { MeetingDto } from '../../api-gateway/dto/meeting';
import { MEETING_TASK_QUEUE } from '../temporal.module';

import type * as activities from '../activities';

// Load Activities with Retry Policy
const { createMeeting } = workflow.proxyActivities<typeof activities>({
  retry: {
    initialInterval: '1 second',
    maximumInterval: '1 minute',
    backoffCoefficient: 2,
    maximumAttempts: 5,
  },
  startToCloseTimeout: '1 minute',
});

export async function createMeetingWorkflow(
  user: User,
  meetingData: MeetingDto
): Promise<MeetingDto> {
  try {
    // Call the activity with appropriate parameters
    const result = await createMeeting(user, meetingData);
    return result;
  } catch (error) {
    throw new workflow.ApplicationFailure('Failed to create meeting');
  }
}
```

2. **Export the workflow** in the `workflows/index.ts` file:

```typescript
// workflows/index.ts
export * from './get-meetings.workflow';
export * from './create-meeting.workflow'; // Add your new workflow
```

3. **Update the SDK** to include the new workflow:

   a. First, update the workflow interfaces in `sdk/kai-typed-workflows.ts`:

   ```typescript
   // Define the parameter type for your new workflow
   export interface CreateMeetingParams {
     user: User;
     meetingData: MeetingDto;
   }
   
   // Update the WorkflowRegistry to include your new workflow
   export interface WorkflowRegistry {
     getMeetings: WorkflowFunction<GetMeetingsParams, PaginatedResponseDto<MeetingDto>>;
     createMeeting: WorkflowFunction<CreateMeetingParams, MeetingDto>; // Add your new workflow
     // Add more workflows here as needed
   }
   ```

   b. Then, implement the workflow in the `createWorkflows` function:

   ```typescript
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
       // ... existing workflows
       
       createMeeting: async (
         workflowId: string,
         params: CreateMeetingParams,
       ): Promise<WorkflowResult<MeetingDto>> => {
         await ensureInitialized();
         const { user, meetingData } = params;
         return startWorkflow<MeetingDto>(
           'createMeetingWorkflow',
           MEETING_TASK_QUEUE,
           [user, meetingData],
           {
             workflowId,
             workflowExecutionTimeout: 120000, // 2 minutes timeout
           },
         );
       },
     };
   }
   ```

## Using the SDK in Client Code

To use the SDK in client code, follow these steps:

1. **Import the KaiTemporalClient**:

```typescript
import { KaiTemporalClient } from '@temporal/kai-temporal-sdk';
```

2. **Initialize the client**:

```typescript
const kaiTemporalClient = new KaiTemporalClient({
  address: process.env.TEMPORAL_ADDRESS || 'localhost:7233',
  namespace: process.env.TEMPORAL_NAMESPACE || 'default',
});
```

3. **Execute a workflow**:

```typescript
// Generate a unique workflow ID
const workflowId = Date.now().toString();

// Execute the workflow
const handle = await kaiTemporalClient.workflows.getMeetings(workflowId, {
  user,
  queryDto,
});

// Use the result
return handle.result as PaginatedResponseDto<MeetingDto>;
```

## Data Validation with Zod

The Temporal module uses Zod for runtime data validation within activities. This ensures that data passing through workflows is validated before processing, providing type safety and clear error messages.

### Validation Structure

1. **Schema Definition**: Each activity defines its own Zod schema for input validation.

```typescript
// Example schema for meeting creation
const createMeetingSchema = z.object({
  title: z.string().min(1, 'Title is required').describe('Title of the meeting'),
  date: z.string().optional().describe('Date and time of the meeting'),
  duration: z.number().positive().optional().describe('Duration of the meeting in minutes'),
  // Additional fields...
});
```

2. **Schema Usage**: Validation is applied at the beginning of each activity.

```typescript
export async function createMeeting(user: User, meetingData: MeetingDto): Promise<MeetingDto> {
  // Validate inputs
  const validUser = validateWithSchema(userSchema, user, 'createMeeting');
  const validMeetingData = validateWithSchema(createMeetingSchema, meetingData, 'createMeeting');

  // Proceed with validated data
  // ...
}
```

### Best Practices for Zod Schemas

1. **Add Descriptions**: Always use `.describe()` for every field to document the purpose.

```typescript
z.string().min(1).describe('Unique identifier for the meeting')
```

2. **Be Specific**: Use appropriate validators like `.min()`, `.email()`, `.url()` etc.

3. **Provide Error Messages**: Add custom error messages for better debugging.

```typescript
z.string().min(1, 'Title is required').describe('Title of the meeting')
```

4. **Place Near Components**: Keep schemas close to their related activities.

### Validation Helper Function

Activities use a shared validation helper function to handle schema validation consistently:

```typescript
// From src/temporal/utils/validation.ts
export function validateWithSchema<T>(
  schema: z.ZodType<T>,
  data: unknown,
  activityName: string,
): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Format error messages for better readability
      const formattedErrors = error.errors
        .map(err => `${err.path.join('.')}: ${err.message}`)
        .join('; ');

      // Create a non-retryable ApplicationFailure with the validation errors
      throw new ApplicationFailure(
        `Validation failed in ${activityName}: ${formattedErrors}`,
        'VALIDATION_ERROR',
        true, // non-retryable
        [`validation:${JSON.stringify(error.errors)}`],
      );
    }

    // Handle unexpected validation errors
    throw new ApplicationFailure(
      `Unexpected validation error in ${activityName}`,
      'UNEXPECTED_ERROR',
      false, // retryable
      [],
    );
  }
}
```

This utility centralizes input validation and provides consistent error messages and types.

### Error Handling with ApplicationFailure

All activities use structured error handling with Temporal's `ApplicationFailure`. Each error is categorized by type and includes appropriate retry behavior:

#### Error Types

- **VALIDATION_ERROR**: Schema validation failures (non-retryable)
- **DATABASE_ERROR**: Database interaction issues (retryable)
- **NOT_FOUND_ERROR**: Requested resource doesn't exist (non-retryable)
- **ACTIVITY_ERROR**: Unexpected errors in activities (retryable)

#### ApplicationFailure Structure

```typescript
throw new ApplicationFailure(
  `Clear error message with context`, // Human-readable message
  'ERROR_TYPE',                       // One of the categories above
  boolean,                            // nonRetryable flag (true = don't retry)
  [/* serializable error details */], // Array of error details for debugging
);
```

#### Try-Catch Pattern

All activities use consistent try-catch blocks for error handling:

```typescript
export async function someActivity(params) {
  try {
    // Validate inputs with Zod
    const validParams = validateWithSchema(schema, params, 'activityName');

    // Activity logic
    // ...

    // Handle expected errors (like database errors)
    if (someError) {
      throw new ApplicationFailure(
        `Descriptive message: ${someError.message}`,
        'ERROR_TYPE',
        true/false, // Whether this is non-retryable
        [JSON.stringify(someError)],
      );
    }

    return result;
  } catch (error) {
    // Pass through ApplicationFailures unchanged
    if (error instanceof ApplicationFailure) {
      throw error;
    }

    // Convert unexpected errors to ApplicationFailure
    throw new ApplicationFailure(
      `Error in activityName: ${error instanceof Error ? error.message : String(error)}`,
      'ACTIVITY_ERROR',
      false, // Retryable by default
      ['Unexpected error'],
    );
  }
}
```

## Best Practices

### Activity Design

- **Idempotent**: Activities should be designed to be idempotent, meaning they can be safely retried without causing unintended side effects.
- **Atomic**: Activities should perform a single unit of work.
- **Failure Handling**: Activities should handle failures gracefully and throw appropriate errors.

### Workflow Design

- **Deterministic**: Workflows must be deterministic, meaning they will produce the same result given the same inputs.
- **No Side Effects**: Workflows should not have side effects outside of activities.
- **Timeouts**: Always configure appropriate timeouts for workflows and activities.

### Error Handling

- **Activity Error Types**: Activities should use structured `ApplicationFailure` errors with appropriate types:
  - `VALIDATION_ERROR`: Input validation failures (non-retryable)
  - `DATABASE_ERROR`: Database issues (retryable)
  - `NOT_FOUND_ERROR`: Resource not found (non-retryable)
  - `ACTIVITY_ERROR`: Other unexpected errors (retryable by default)

- **Retry Behavior**: Use the `nonRetryable` flag appropriately:
  - `true` for errors that won't resolve with retries (validation, not found)
  - `false` for transient errors that might resolve (database timeouts, network issues)

- **Exception Handling**: Activities must have comprehensive try-catch blocks to:
  - Pass through existing `ApplicationFailure` errors
  - Convert unexpected errors to properly formatted `ApplicationFailure` errors

- **Workflow Error Handling**: Workflows should catch activity errors and:
  - Use `ApplicationFailure.nonRetryable` to determine retry strategy
  - Extract error details when available for better error reporting
  - Apply business logic to determine whether to continue, retry, or fail the workflow

## Troubleshooting

### Workflow Execution Failures

- **Check Task Queue**: Make sure the workflow and activity are using the same task queue.
- **Check Workflow ID**: Ensure the workflow ID is unique.
- **Check Logs**: Look for error messages in the logs.
- **Check Temporal UI**: The Temporal UI provides detailed information about workflow executions.

### Activity Failures

- **Check Activity Parameters**: Make sure the parameters passed to the activity are correct.
- **Check Database Connection**: If the activity interacts with a database, make sure the connection is working.
- **Check External Services**: If the activity calls external services, make sure they are available.

### Client Errors

- **Check Address**: Make sure the Temporal address is correct.
- **Check Namespace**: Make sure the Temporal namespace is correct.
- **Check Workflow ID**: Ensure the workflow ID is unique.