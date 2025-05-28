export interface TodoDto {
  id: string;
  userId: string;
  title: string;
  description?: string;
  status: TodoStatus;
  priority: TodoPriority;
  dueDate?: string;
  completedAt?: string;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
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

export interface CreateTodoDto {
  userId: string;
  title: string;
  description?: string;
  status?: TodoStatus;
  priority?: TodoPriority;
  dueDate?: string;
  orderIndex?: number;
}

export interface UpdateTodoDto {
  id: string;
  userId: string;
  title?: string;
  description?: string;
  status?: TodoStatus;
  priority?: TodoPriority;
  dueDate?: string;
  orderIndex?: number;
}

export interface DeleteTodoDto {
  id: string;
  userId: string;
}

export interface GetTodoByIdDto {
  id: string;
  userId: string;
}

export interface ListTodosDto {
  userId: string;
  status?: TodoStatus;
  priority?: TodoPriority;
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'updatedAt' | 'dueDate' | 'orderIndex';
  sortOrder?: 'asc' | 'desc';
}

export interface ListTodosResultDto {
  todos: TodoDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface BulkUpdateTodosDto {
  userId: string;
  updates: Array<{
    id: string;
    status?: TodoStatus;
    orderIndex?: number;
  }>;
}

export interface CreateTodoRequestDto {
  title: string;
  description?: string;
  status?: TodoStatus;
  priority?: TodoPriority;
  dueDate?: string;
  orderIndex?: number;
}

export interface UpdateTodoRequestDto {
  title?: string;
  description?: string;
  status?: TodoStatus;
  priority?: TodoPriority;
  dueDate?: string;
  orderIndex?: number;
}

export interface BulkUpdateTodoRequestDto {
  id: string;
  status?: TodoStatus;
  orderIndex?: number;
}

export interface BulkUpdateTodosRequestDto {
  updates: BulkUpdateTodoRequestDto[];
}

export interface ListTodosQueryDto {
  status?: TodoStatus;
  priority?: TodoPriority;
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'updatedAt' | 'dueDate' | 'orderIndex';
  sortOrder?: 'asc' | 'desc';
}
