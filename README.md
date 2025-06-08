# Kaimeleon Temporal SDK

A type-safe SDK for interacting with Kaimeleon's Temporal workflows. This SDK provides comprehensive DTOs (Data Transfer Objects) and ORM interfaces for managing various domain entities.

## Overview

The SDK is organized into two main directories:
- `src/models/` - Contains all DTOs for data transfer and API communication
- `src/orm/` - Contains repository interfaces and implementations for database operations

## Common DTOs

### Pagination & Search
Located in `src/models/common/common.dto.ts`

- **PaginationDto**: Basic pagination parameters (`page`, `limit`)
- **SearchPaginationDto**: Extended pagination with search and sorting capabilities
- **PaginatedResponseDto**: Standardized paginated response format
- **SortDirection**: Enum for ASC/DESC sorting

## Domain-Specific DTOs

### Todos Module
Located in `src/models/todo/`

**Core DTOs:**
- **TodoDto**: Main todo entity with properties like `title`, `description`, `status`, `priority`, `dueDate`, `tags`
- **TodoTableRow**: Database representation of a todo
- **TodoStatus**: Enum (TODO, IN_PROGRESS, DONE, ARCHIVED)
- **TodoPriority**: Enum (LOW, MEDIUM, HIGH, URGENT)

**Request/Response DTOs:**
- **PostTodoRequestDto**: Create todo request
- **PutTodoRequestDto**: Update todo request
- **GetTodosQuery**: Query parameters for listing todos with filtering
- **GetTodosResponseDto**: Paginated todo list response

### Meetings Module
Located in `src/models/meeting/`

**Core DTOs:**
- **MeetingDto**: Meeting entity with `title`, `date`, `duration`, `summary`, `keyPoints`, `actionItems`, `decisionsMade`
- **MeetingTableRow**: Database representation
- **MeetingAgendaRefDto**: Reference to associated agenda
- **MeetingTranscriptionDto**: Associated transcription data

**Request/Response DTOs:**
- **PostMeetingRequestDto**: Create meeting request
- **PutMeetingRequestDto**: Update meeting request
- **GetMeetingsQuery**: Query parameters with date filtering
- **UpdateMeetingAgendaItemsDto**: Update agenda items discussed status

### Meeting Agendas Module
Located in `src/models/meeting-agenda/`

**Core DTOs:**
- **MeetingAgendaDto**: Agenda with categories and items
- **MeetingAgendaCategoryDto**: Category with ordered items
- **MeetingAgendaItemDto**: Individual agenda item with optional `duration` and `order` fields

**Request/Response DTOs:**
- **PostMeetingAgendaRequestDto**: Create agenda request
- **PutMeetingAgendaRequestDto**: Update agenda request
- **GetMeetingAgendasQuery**: Query parameters for listing

### Conversations Module
Located in `src/models/conversations/`

**Core DTOs:**
- **ConversationDto**: Conversation with messages array
- **ConversationMessageDto**: Individual message with `role` (user/assistant/system)
- **ConversationSummaryDto**: Lightweight conversation summary

**Request/Response DTOs:**
- **PostConversationRequestDto**: Create/append to conversation
- **GetConversationsQuery**: Query with channel filtering
- **GetConversationByIdResponseDto**: Full conversation with messages

### Email Processing Module
Located in `src/models/mail/`

**Core DTOs:**
- **EmailProcessingResultDto**: Email analysis results with classification, priority, sentiment
- **EmailActionDto**: Automated actions (archive, delete, label, forward, reply)
- **EmailExtractedTaskDto**: Tasks extracted from emails
- **EmailResponseDraftDto**: Generated email response drafts

**Enums:**
- **EmailClassification**: IMPORTANT, PERSONAL, WORK, NEWSLETTER, SPAM, OTHER
- **EmailPriority**: HIGH, MEDIUM, LOW
- **EmailSentiment**: POSITIVE, NEUTRAL, NEGATIVE
- **EmailActionType**: ARCHIVE, DELETE, LABEL, FORWARD, REPLY, SNOOZE

### Transcriptions Module
Located in `src/models/transcriptions/`

**Core DTOs:**
- **TranscriptionDto**: Full transcription with paragraphs
- **TranscriptionParagraph**: Speaker-separated paragraph with sentences
- **TranscriptionSentence**: Individual sentence with timestamps

### User Preferences Module
Located in `src/models/user-preferences/`

**Core DTOs:**
- **UserAccountDto**: User account with credits, subscription, preferences
- **UserPreferencesDto**: User settings (personality, theme, language)
- **AuthProvidersDto**: Connected auth providers (Gmail, Telegram)

### Integration Modules

**Telegram** (`src/models/telegram/`):
- **TelegramConnectionDto**: Connection status and details

**Deepgram** (`src/models/deepgram/`):
- **DeepgramKeyDto**: API key management
- **DeepgramTranscriptionRequestDto**: Transcription requests

**Gmail Auth** (`src/models/gmail-auth/`):
- **GmailAuthUrlResponseDto**: OAuth URL generation
- **GmailAuthTokenResponseDto**: Token exchange

## ORM Repository Interfaces

### Base Repository
Located in `src/orm/base/`

- **IBaseRepository<TDto, TTableRow>**: Base interface for DTO/TableRow conversion

### Domain Repositories

**Todo Repository** (`src/orm/todos/`):
- `createForUser()`: Create todo for user
- `list()`: List todos with pagination and filtering
- `findByUserIdAndId()`: Get specific todo
- `updateForUser()`: Update todo
- `updateStatus()`: Update todo status with automatic completedAt handling
- `deleteForUser()`: Delete todo (returns `{deleted: boolean, rowCount: number}`)
- `processQueryParams()`: Process and validate query parameters

**Meeting Repository** (`src/orm/meetings/`):
- Standard CRUD operations
- `findByTranscriptionId()`: Find meeting by transcription
- `listWithTranscriptions()`: List meetings with their transcriptions included
- `findByUserIdAndIdWithTranscription()`: Get meeting with full transcription
- `validateDateRange()`: Validate date range parameters
- `deleteForUser()`: Delete meeting (returns `{deleted: boolean, rowCount: number}`)

**Meeting Agenda Repository** (`src/orm/meeting-agendas/`):
- Standard CRUD operations for agendas

**Conversation Repository** (`src/orm/conversations/`):
- `createOrUpdate()`: Upsert conversation with 5 parameters (userId, contextId, channel, title, message)
- `getMessages()`: Get conversation messages
- `findByUserIdAndId()`: Get conversation by ID
- `findByUserIdAndIdWithMessages()`: Get conversation with all messages
- `findByContextId()`: Find conversation by context ID
- `updateTitle()`: Update conversation title
- `deleteForUser()`: Delete conversation (returns `{deleted: boolean, rowCount: number}`)
- `deleteByContextId()`: Delete by context ID (returns `{deleted: boolean, rowCount: number}`)

**Email Repositories** (`src/orm/emails/`):
- **EmailProcessingResultRepository**: Store email analysis
- **EmailActionRepository**: Manage email actions
- **EmailExtractedTaskRepository**: Handle extracted tasks
- **EmailResponseDraftRepository**: Manage draft responses

**Transcription Repository** (`src/orm/transcriptions/`):
- `createForUser()`: Create transcription
- `findByContextId()`: Find by context ID
- `findByUserIdAndId()`: Get specific transcription
- `updateForUser()`: Update transcription
- `deleteForUser()`: Delete transcription (returns `{deleted: boolean, rowCount: number}`)

**User Account Repositories** (`src/orm/user-accounts/`):
- **UserAccountRepository**: Manage user accounts
- **UserPreferencesRepository**: Handle user preferences

## Usage

```typescript
import { TodoDto, ITodoRepository } from '@kaimeleon/temporal-sdk';

// DTOs are used for API communication
const newTodo: TodoDto = {
  id: '123',
  userId: 'user-456',
  title: 'Complete SDK documentation',
  status: TodoStatus.TODO,
  priority: TodoPriority.HIGH,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// Repository interfaces define database operations
const repository: ITodoRepository = getTodoRepository();
const createdTodo = await repository.createForUser('user-456', newTodo);
```

## Architecture Notes

- **DTOs** use camelCase for property names
- **TableRows** use snake_case matching database columns
- All timestamps are ISO 8601 strings
- Repositories handle user-scoped operations for security
- Pagination is standardized across all list operations
- All delete operations return `{deleted: boolean, rowCount: number}` for consistency
- Repository methods handle completedAt timestamps automatically for status changes
- Transcriptions are fetched by context_id (not foreign key) for flexibility

## Version History

### v1.4.1
- Added enhanced ORM methods for better service layer abstraction:
  - `listWithTranscriptions()` and `findByUserIdAndIdWithTranscription()` for Meeting repository
  - `updateStatus()` with automatic completedAt handling for Todo repository
  - `findByContextId()` and `deleteByContextId()` for Conversation repository
  - `validateDateRange()` for Meeting repository
  - `processQueryParams()` for Todo repository
- Standardized all delete operations to return `{deleted: boolean, rowCount: number}`
- Updated `MeetingAgendaItemDto` to remove `discussed` field and add optional `duration`
- Added `updateForUser()` method to Transcription repository
- Fixed transcription fetching to use context_id instead of foreign key references