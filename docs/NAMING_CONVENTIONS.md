# Naming Conventions for kai-temporal-sdk

This document outlines the naming conventions used throughout the kai-temporal-sdk to ensure consistency and maintainability.

## Directory Structure

The SDK follows a feature-based organization with the following conventions:

```
src/
├── models/
│   ├── common/          # Shared/common DTOs
│   ├── llm/            # LLM-related DTOs  
│   ├── meeting-agendas/ # Meeting agenda DTOs
│   ├── meetings/       # Meeting DTOs
│   └── todo/           # Todo DTOs
└── index.ts            # Main export file
```

### Directory Naming Rules
- Use **kebab-case** for directory names
- Use **plural forms** for collections (e.g., `meetings`, `meeting-agendas`)
- Group related DTOs by feature/domain

## File Naming Conventions

### DTO Files
- Use **kebab-case** with `.dto.ts` suffix
- Exception: `todo.interfaces.ts` uses `.interfaces.ts` suffix

### File Naming Patterns
| Pattern | Example | Usage |
|---------|---------|-------|
| Simple entity | `meeting.dto.ts` | Basic entity DTOs |
| Composite/nested | `meeting-agenda-category-item.dto.ts` | Nested or related DTOs |
| Action-based | `update-meeting-agenda.dto.ts` | Update/mutation DTOs |
| Query | `meeting-agenda-query.dto.ts` | Query parameter DTOs |
| Index | `index.ts` | Re-export files |

## TypeScript Naming Conventions

### DTOs and Interfaces
- Use **PascalCase** with `Dto` suffix
- Examples: `MeetingDto`, `TodoDto`, `UpdateMeetingAgendaDto`

### DTO Type Patterns
| Type | Pattern | Example |
|------|---------|---------|
| Basic entity | `{Entity}Dto` | `MeetingDto` |
| Create | `Create{Entity}Dto` | `CreateTodoDto` |
| Update | `Update{Entity}Dto` | `UpdateTodoDto` |
| Delete | `Delete{Entity}Dto` | `DeleteTodoDto` |
| Query | `{Entity}QueryDto` or `List{Entities}Dto` | `MeetingQueryDto`, `ListTodosDto` |
| Result | `{Operation}ResultDto` | `ListTodosResultDto` |
| Request | `{Operation}RequestDto` | `CreateTodoRequestDto` |
| Nested | `{Parent}{Child}Dto` | `MeetingMeetingAgendaDto` |

### Enums
- Use **PascalCase** for enum names
- Use **SCREAMING_SNAKE_CASE** for enum values

```typescript
export enum TodoStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
  ARCHIVED = 'archived',
}

export enum TodoPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}
```

## Property Naming Conventions

### General Rules
- Use **camelCase** for all properties
- Mark optional properties with `?`
- Use descriptive, self-documenting names

### Common Property Patterns
| Property Type | Example | Notes |
|--------------|---------|-------|
| IDs | `id: string`, `userId: string` | Always string type |
| Timestamps | `createdAt?: string`, `updatedAt?: string` | ISO string format |
| Dates | `dueDate?: string`, `meetingDate: string` | ISO string format |
| Arrays | `categories: CategoryDto[]`, `actionItems: string[]` | Use plural names |
| Enums | `status: TodoStatus`, `priority: TodoPriority` | Reference enum types |
| Pagination | `page: number`, `limit: number` | Standard pagination |

## Export Patterns

### Index Files
Each feature directory contains an `index.ts` that re-exports all DTOs:

```typescript
// models/meetings/index.ts
export * from './meeting.dto';
export * from './meeting-query.dto';
export * from './update-meeting.dto';
```

### Main Export File
The main `src/index.ts` exports all features with descriptive comments:

```typescript
// Common
export * from './models/common';

// LLM
export * from './models/llm';

// Meetings
export * from './models/meetings';
```

## Best Practices

1. **Consistency**: Always follow established patterns
2. **Clarity**: Use descriptive names that clearly indicate purpose
3. **Grouping**: Keep related DTOs in the same directory
4. **Type Safety**: Use enums for predefined values
5. **Documentation**: Add comments for complex DTOs or properties
6. **Avoid Abbreviations**: Use full words (e.g., `description` not `desc`)

## Examples

### Creating a New Feature

When adding a new feature (e.g., "notes"):

1. Create directory: `src/models/notes/`
2. Add DTOs following naming patterns:
   - `note.dto.ts`
   - `create-note.dto.ts`
   - `update-note.dto.ts`
   - `note-query.dto.ts`
3. Create `index.ts` to export all DTOs
4. Update main `src/index.ts` with exports

### Naming Complex DTOs

For DTOs representing relationships or complex structures:
- `MeetingMeetingAgendaDto` - Meeting's agenda reference
- `MeetingAgendaCategoryItemDto` - Agenda category's item
- `EmailExtractedTaskDto` - Task extracted from email

The pattern is: `{Context}{Entity}Dto`