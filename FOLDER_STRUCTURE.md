# Kai Temporal SDK Folder Structure

This document provides an overview of the SDK's directory structure and file organization.

## Directory Structure

```
kai-temporal-sdk/
├── src/
│   ├── index.ts                    # Main entry point
│   ├── models/                     # Data models and DTOs
│   │   ├── index.ts               # Barrel export for all models
│   │   ├── common/                # Common/shared models
│   │   │   ├── index.ts
│   │   │   └── common.dto.ts
│   │   ├── conversations/         # Conversation models
│   │   │   ├── index.ts
│   │   │   ├── conversations.dto.ts
│   │   │   ├── conversations-query.dto.ts
│   │   │   ├── conversations-requests.dto.ts
│   │   │   └── conversations-responses.dto.ts
│   │   ├── deepgram/             # Deepgram transcription models
│   │   │   ├── index.ts
│   │   │   ├── deepgram.dto.ts
│   │   │   ├── deepgram-query.dto.ts
│   │   │   ├── deepgram-requests.dto.ts
│   │   │   └── deepgram-responses.dto.ts
│   │   ├── gmail-auth/           # Gmail authentication models
│   │   │   ├── index.ts
│   │   │   ├── gmail-auth.dto.ts
│   │   │   ├── gmail-auth-query.dto.ts
│   │   │   ├── gmail-auth-requests.dto.ts
│   │   │   └── gmail-auth-responses.dto.ts
│   │   ├── mail/                 # Email processing models
│   │   │   ├── index.ts
│   │   │   ├── mail.dto.ts
│   │   │   ├── mail-query.dto.ts
│   │   │   ├── mail-requests.dto.ts
│   │   │   └── mail-responses.dto.ts
│   │   ├── meeting/              # Meeting models
│   │   │   ├── index.ts
│   │   │   ├── meeting.dto.ts
│   │   │   ├── meeting-query.dto.ts
│   │   │   ├── meeting-requests.dto.ts
│   │   │   ├── meeting-responses.dto.ts
│   │   │   └── update-meeting-agenda-items.dto.ts
│   │   ├── meeting-agenda/       # Meeting agenda models
│   │   │   ├── index.ts
│   │   │   ├── meeting-agenda.dto.ts
│   │   │   ├── meeting-agenda-query.dto.ts
│   │   │   ├── meeting-agenda-requests.dto.ts
│   │   │   └── meeting-agenda-responses.dto.ts
│   │   ├── telegram/             # Telegram integration models
│   │   │   ├── index.ts
│   │   │   ├── telegram.dto.ts
│   │   │   ├── telegram-query.dto.ts
│   │   │   ├── telegram-requests.dto.ts
│   │   │   └── telegram-responses.dto.ts
│   │   ├── todo/                 # Todo item models
│   │   │   ├── index.ts
│   │   │   ├── todo.dto.ts
│   │   │   ├── todo-query.dto.ts
│   │   │   ├── todo-requests.dto.ts
│   │   │   └── todo-responses.dto.ts
│   │   ├── transcriptions/       # Transcription models
│   │   │   ├── index.ts
│   │   │   └── transcription.dto.ts
│   │   └── user-preferences/     # User preferences models
│   │       ├── index.ts
│   │       ├── user-preferences.dto.ts
│   │       ├── user-preferences-query.dto.ts
│   │       ├── user-preferences-requests.dto.ts
│   │       └── user-preferences-responses.dto.ts
│   └── orm/                      # ORM/Repository implementations
│       ├── index.ts
│       ├── base/                 # Base repository pattern
│       │   ├── index.ts
│       │   ├── base-repository.interface.ts
│       │   └── base-repository.ts
│       ├── conversations/        # Conversation repository
│       │   ├── index.ts
│       │   ├── conversation.dto.ts
│       │   ├── conversation.repository.interface.ts
│       │   ├── conversation.repository.ts
│       │   └── tool-call-message.interface.ts
│       ├── emails/               # Email repositories
│       │   ├── index.ts
│       │   ├── email.models.ts
│       │   ├── email-action.dto.ts
│       │   ├── email-action.repository.interface.ts
│       │   ├── email-action.repository.ts
│       │   ├── email-extracted-task.dto.ts
│       │   ├── email-extracted-task.repository.interface.ts
│       │   ├── email-extracted-task.repository.ts
│       │   ├── email-processing-result.dto.ts
│       │   ├── email-processing-result.repository.interface.ts
│       │   ├── email-processing-result.repository.ts
│       │   ├── email-response-draft.dto.ts
│       │   ├── email-response-draft.repository.interface.ts
│       │   └── email-response-draft.repository.ts
│       ├── meeting-agenda/       # Meeting agenda repository
│       │   ├── index.ts
│       │   ├── meeting-agenda.repository.interface.ts
│       │   └── meeting-agenda.repository.ts
│       ├── meetings/             # Meeting repository
│       │   ├── index.ts
│       │   ├── meeting.repository.interface.ts
│       │   └── meeting.repository.ts
│       ├── todos/                # Todo repository
│       │   ├── index.ts
│       │   ├── todo.repository.interface.ts
│       │   └── todo.repository.ts
│       ├── transcriptions/       # Transcription repository
│       │   ├── index.ts
│       │   ├── transcription.dto.ts
│       │   ├── transcription.repository.interface.ts
│       │   └── transcription.repository.ts
│       ├── user-accounts/        # User account repositories
│       │   ├── index.ts
│       │   ├── auth-providers.interface.ts
│       │   ├── user-account.dto.ts
│       │   ├── user-account.repository.interface.ts
│       │   ├── user-account.repository.ts
│       │   ├── user-preferences.repository.interface.ts
│       │   └── user-preferences.repository.ts
│       └── utils/                # Utility functions
│           ├── index.ts
│           └── naming-conventions.ts
├── package.json
├── tsconfig.json
├── README.md
├── NAMING_CONVENTIONS.md
└── CONTRIBUTING.md
```

## File Naming Conventions

### Models Directory (`/src/models/`)

Each domain module follows a consistent structure:

1. **Main DTO file**: `{domain}.dto.ts`
   - Contains the primary data transfer objects and interfaces
   - Example: `todo.dto.ts`, `meeting.dto.ts`

2. **Query DTOs**: `{domain}-query.dto.ts`
   - Contains query parameters for list/search operations
   - Example: `todo-query.dto.ts`, `meeting-query.dto.ts`

3. **Request DTOs**: `{domain}-requests.dto.ts`
   - Contains request body DTOs for API operations
   - Example: `todo-requests.dto.ts`, `meeting-requests.dto.ts`

4. **Response DTOs**: `{domain}-responses.dto.ts`
   - Contains response DTOs for API operations
   - Example: `todo-responses.dto.ts`, `meeting-responses.dto.ts`

5. **Index file**: `index.ts`
   - Barrel export for all DTOs in the module
   - Example: `export * from './todo.dto';`

### ORM Directory (`/src/orm/`)

Repository implementations follow these patterns:

1. **Repository Interface**: `{entity}.repository.interface.ts`
2. **Repository Implementation**: `{entity}.repository.ts`
3. **DTOs**: `{entity}.dto.ts` (for database-specific models)
4. **Index file**: `index.ts` (barrel exports)

## Key Concepts

### DTO Naming Patterns

- **TableRow**: Represents database schema (e.g., `TodoTableRow`)
- **Dto**: Represents API data transfer objects (e.g., `TodoDto`)
- **Request DTOs**: Prefixed with operation (e.g., `PostTodoRequestDto`)
- **Response DTOs**: Suffixed with Result (e.g., `ListTodosResultDto`)

### Export Strategy

All modules use barrel exports through `index.ts` files for clean imports:

```typescript
// Instead of:
import { TodoDto } from '@kai-temporal/sdk/dist/models/todo/todo.dto';

// You can use:
import { TodoDto } from '@kai-temporal/sdk';
```

## Notes

- All files use the `.dto.ts` suffix for consistency
- The transcriptions module has been consolidated into a single file
- ORM implementations may be moved to the main application in future versions