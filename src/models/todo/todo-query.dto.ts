import { TodoStatus, TodoPriority } from './todo.dto';

export interface GetTodosQuery {
  status?: TodoStatus;
  priority?: TodoPriority;
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'updatedAt' | 'dueDate' | 'orderIndex';
  sortOrder?: 'asc' | 'desc';
  fromDate?: string;
  toDate?: string;
}
