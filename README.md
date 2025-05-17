# Kai Temporal SDK

Type definitions for interacting with Temporal workflows.

## Installation

```bash
npm install @kaimeleon/temporal-sdk
```

Or with yarn:

```bash
yarn add @kaimeleon/temporal-sdk
```

## Available Types and Models

All types are exported from the root of the SDK package. You can import any type directly:

```typescript
import { 
  MeetingDto, 
  MeetingQueryDto,
  PaginationDto,
  // ... any other type
} from '@kaimeleon/temporal-sdk';
```

### Common Types

#### `PaginationDto`
```typescript
class PaginationDto {
  page?: number = 1;
  limit?: number = 10;
}
```

#### `SearchPaginationDto`
```typescript
class SearchPaginationDto extends PaginationDto {
  search?: string;
  sort?: string = 'createdAt';
  sortDirection?: SortDirection;
}
```

#### `PaginatedResponseDto<T>`
```typescript
class PaginatedResponseDto<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  search?: string;
  sort?: string;
  sortDirection?: SortDirection;
}
```

#### `SortDirection`
```typescript
enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}
```

### LLM Types

- `OpenAIToolCallDto` - Interface for OpenAI tool calls

### Meeting Types

#### `MeetingDto`
```typescript
class MeetingDto {
  id?: string;
  title: string;
  date?: string;
  duration?: number;
  summary?: string;
  keyPoints?: string[];
  actionItems?: string[];
  decisionsMade?: string[];
  agenda?: MeetingMeetingAgenda | null;
  transcription?: string;
  language?: string;
  createdAt?: string;
  updatedAt?: string;
}
```

#### `MeetingQueryDto`
- Query parameters for meeting endpoints

#### `UpdateMeetingDto`
- Update payload for meetings

#### `MeetingMeetingAgendaDto`
- Meeting agenda relation model

#### `MeetingMeetingAgendaCategoryDto`
- Meeting agenda category relation

#### `MeetingMeetingAgendaItemDto`
- Meeting agenda item relation

#### `UpdateMeetingAgendaItemsDto`
- Update payload for agenda items

### Meeting Agenda Types

#### `MeetingAgendaDto`
```typescript
class MeetingAgendaDto {
  id?: string;
  title: string;
  categories: MeetingAgendaCategoryDto[];
  createdAt?: string;
  updatedAt?: string;
}
```

#### `MeetingAgendaCategoryDto`
- Agenda category model

#### `MeetingAgendaCategoryItemDto`
- Agenda category item model

#### `MeetingAgendaQueryDto`
- Query parameters for meeting agendas

#### `UpdateMeetingAgendaDto`
- Update payload for meeting agendas

### Constants

All constants are available as well:
- `AUDIO_CONSTANTS`
- `LANGUAGE_CONSTANTS`
- `LLM_CONSTANTS`
- `MESSAGE_CHANNELS_CONSTANTS`
- `MESSAGE_TYPES_CONSTANTS`
- `SERVER_CONSTANTS`

### Usage Tips

1. **Type Discovery**: All types are available at the root import level. Your IDE's autocomplete will show all available types when you type:
   ```typescript
   import { } from '@kaimeleon/temporal-sdk';
   ```

2. **Go to Definition**: In VSCode and other IDEs, you can Cmd+Click (Mac) or Ctrl+Click (Windows/Linux) on any imported type to see its full definition.

3. **Type Documentation**: Each type includes JSDoc comments (when available) that will appear in your IDE's intellisense.