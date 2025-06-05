import { TodoStatus, TodoPriority } from './todo.dto';

export interface PostTodoRequestDto {
  title: string;
  description?: string;
  status?: TodoStatus;
  priority?: TodoPriority;
  dueDate?: string;
  orderIndex?: number;
}

export interface PutTodoRequestDto {
  title?: string;
  description?: string;
  status?: TodoStatus;
  priority?: TodoPriority;
  dueDate?: string;
  orderIndex?: number;
}

export interface DeleteTodoDto {
  userId: string;
  id: string;
}

export interface GetTodoByIdDto {
  userId: string;
  id: string;
}

export interface UpdateTodoDto {
  userId: string;
  id: string;
  title?: string;
  description?: string;
  status?: TodoStatus;
  priority?: TodoPriority;
  dueDate?: string;
  orderIndex?: number;
}
