import { TodoDto } from './todo.dto';

export type PostTodoResponseDto = TodoDto;

export type PutTodoResponseDto = TodoDto;

export type GetTodoResponseDto = TodoDto;

export interface GetTodosResponseDto {
  todos: TodoDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface DeleteTodoResponseDto {
  id: string;
  success: boolean;
}
