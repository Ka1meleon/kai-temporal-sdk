# ORM Migration Guide

## Overview

The ORM layer has been migrated from the temporal backend to the SDK, providing a type-safe, reusable data access layer that uses the new model structure.

## Architecture

### 1. Base Repository Pattern
- `BaseRepository<TDto, TTableRow>` - Generic base class for all repositories
- Automatic camelCase ↔ snake_case conversion
- Standard CRUD operations
- Supabase client injection via constructor

### 2. Repository Interfaces
Each domain has:
- Interface definition (`I<Domain>Repository`)
- Implementation class (`<Domain>Repository`)
- User-scoped operations

### 3. Model Integration
Repositories use the SDK models:
- `<Domain>TableRow` - Database table structure (snake_case)
- `<Domain>Dto` - Application model (camelCase)
- Query models for list operations
- Response DTOs for API returns

## Usage in Temporal Backend

### 1. Create Repository Instance
```typescript
import { TodoRepository } from '@kaimeleon/temporal-sdk';
import { supabaseClient } from '@libs/supabase';

@Injectable()
export class TodoService {
  private todoRepository: TodoRepository;
  
  constructor() {
    this.todoRepository = new TodoRepository(supabaseClient);
  }
}
```

### 2. Use Repository Methods
```typescript
// List with pagination and filters
const result = await this.todoRepository.list(userId, {
  page: 1,
  limit: 10,
  status: TodoStatus.TODO,
  sortBy: 'createdAt',
  sortOrder: 'desc'
});

// Create for user
const newTodo = await this.todoRepository.createForUser(userId, {
  title: 'New Task',
  status: TodoStatus.TODO,
  priority: TodoPriority.MEDIUM
});

// Update for user
const updated = await this.todoRepository.updateForUser(
  userId, 
  todoId, 
  { status: TodoStatus.DONE }
);
```

### 3. Example: Using Meeting Agenda Repository
```typescript
import { MeetingAgendaRepository } from '@kaimeleon/temporal-sdk';

const agendaRepo = new MeetingAgendaRepository(supabaseClient);

// List agendas with search
const agendas = await agendaRepo.list(userId, {
  page: 1,
  limit: 10,
  search: 'quarterly review',
  sort: 'createdAt',
  sortDirection: SortDirection.DESC
});

// Create agenda
const newAgenda = await agendaRepo.createForUser(userId, {
  title: 'Q4 Planning Meeting',
  categories: [
    {
      name: 'Goals',
      items: [{ content: 'Define Q4 objectives', isCompleted: false }]
    }
  ]
});
```

### 4. Example: Using Conversations Repository
```typescript
import { ConversationRepository } from '@kaimeleon/temporal-sdk';

const convRepo = new ConversationRepository(supabaseClient);

// Create or update conversation
const conversation = await convRepo.createOrUpdate(
  userId,
  contextId,
  'kai',
  'Product Discussion',
  {
    role: 'user',
    content: 'What are the key features?',
    timestamp: new Date()
  }
);

// Get recent messages
const messages = await convRepo.getMessages(contextId, userId, 10);
```

### 5. Example: Using Email Repositories
```typescript
import { 
  EmailActionRepository,
  EmailProcessingResultRepository 
} from '@kaimeleon/temporal-sdk';

const actionRepo = new EmailActionRepository(supabaseClient);
const processingRepo = new EmailProcessingResultRepository(supabaseClient);

// Store email processing results
const result = await processingRepo.upsert(userId, emailId, {
  threadId: 'thread123',
  accountId: 'account456',
  fromAddress: 'sender@example.com',
  subject: 'Project Update',
  receivedAt: new Date().toISOString(),
  classification: EmailClassification.INFORMATION,
  priority: EmailPriority.MEDIUM,
  requiresResponse: false,
  sentiment: EmailSentiment.NEUTRAL,
  summary: 'Project status update with timeline',
  confidenceScore: 0.95
});

// Create email actions
const actions = await actionRepo.createMany(
  userId,
  emailId,
  accountId,
  [
    { type: EmailActionType.MARK_READ, details: {} },
    { type: EmailActionType.LABEL, details: { label: 'Important' } }
  ]
);
```

## Migration Status

### Completed
- ✅ Base repository and utilities
- ✅ Todo repository with full functionality
- ✅ Meeting repository with date filtering
- ✅ Meeting-agenda repository with search and pagination
- ✅ Conversations repository with message history
- ✅ User-accounts repositories (UserAccount & UserPreferences)
- ✅ Email repositories (4 sub-repositories):
  - EmailAction repository
  - EmailExtractedTask repository
  - EmailProcessingResult repository
  - EmailResponseDraft repository
- ✅ Transcriptions repository with context lookup

### Migration Complete ✅
All ORM repositories have been successfully migrated to the SDK!

## Key Benefits

1. **Type Safety**: Full TypeScript support with proper model types
2. **Consistency**: Same patterns across all domains
3. **Reusability**: ORM can be used in multiple projects
4. **Maintainability**: Centralized data access logic
5. **Testing**: Repositories can be easily mocked for testing

## Notes

- Repositories require Supabase client injection
- All operations are user-scoped for security
- JSONB fields are excluded from automatic naming conversion
- Error handling follows Supabase patterns (PGRST116 for not found)

## Migration Checklist for Existing Code

When migrating from the old NestJS-based repositories to the SDK repositories:

1. **Remove NestJS Dependencies**:
   - Remove `@Injectable()` decorators
   - Remove constructor injection of Supabase
   - Create repository instances manually with `new Repository(supabaseClient)`

2. **Update Imports**:
   ```typescript
   // Old
   import { TodoRepository } from '@orm/todos';
   
   // New
   import { TodoRepository } from '@kaimeleon/temporal-sdk';
   ```

3. **Update Repository Instantiation**:
   ```typescript
   // Old (NestJS injection)
   constructor(private todoRepository: TodoRepository) {}
   
   // New (Manual instantiation)
   constructor() {
     this.todoRepository = new TodoRepository(supabaseClient);
   }
   ```

4. **Verify Model Types**:
   - Ensure you're using the SDK model types
   - Update any custom interfaces to match SDK models
   - Check that query parameters match the new interfaces

5. **Test Your Migration**:
   - Run existing tests with new repositories
   - Verify all CRUD operations work correctly
   - Check that filtering and pagination still function