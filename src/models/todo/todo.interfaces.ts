export interface Todo {
  id: string;
  userId: string;
  title: string;
  description?: string;
  status: TodoStatus;
  priority: TodoPriority;
  dueDate?: Date;
  completedAt?: Date;
  orderIndex: number;
  createdAt: Date;
  updatedAt: Date;
}

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

export interface CreateTodoInput {
  userId: string;
  title: string;
  description?: string;
  status?: TodoStatus;
  priority?: TodoPriority;
  dueDate?: Date;
  orderIndex?: number;
}

export interface UpdateTodoInput {
  id: string;
  userId: string;
  title?: string;
  description?: string;
  status?: TodoStatus;
  priority?: TodoPriority;
  dueDate?: Date;
  orderIndex?: number;
}

export interface DeleteTodoInput {
  id: string;
  userId: string;
}

export interface GetTodoByIdInput {
  id: string;
  userId: string;
}

export interface ListTodosInput {
  userId: string;
  status?: TodoStatus;
  priority?: TodoPriority;
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'updatedAt' | 'dueDate' | 'orderIndex';
  sortOrder?: 'asc' | 'desc';
}

export interface ListTodosOutput {
  todos: Todo[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface BulkUpdateTodosInput {
  userId: string;
  updates: Array<{
    id: string;
    status?: TodoStatus;
    orderIndex?: number;
  }>;
}

export interface CreateTodoRequest {
  title: string;
  description?: string;
  status?: TodoStatus;
  priority?: TodoPriority;
  dueDate?: string;
  orderIndex?: number;
}

export interface UpdateTodoRequest {
  title?: string;
  description?: string;
  status?: TodoStatus;
  priority?: TodoPriority;
  dueDate?: string;
  orderIndex?: number;
}

export interface BulkUpdateTodoRequest {
  id: string;
  status?: TodoStatus;
  orderIndex?: number;
}

export interface BulkUpdateTodosRequest {
  updates: BulkUpdateTodoRequest[];
}

export interface ListTodosQuery {
  status?: TodoStatus;
  priority?: TodoPriority;
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'updatedAt' | 'dueDate' | 'orderIndex';
  sortOrder?: 'asc' | 'desc';
}
