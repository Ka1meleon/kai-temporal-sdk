import { TodoDto, GetTodosQuery, GetTodosResponseDto } from '../../models/todo';

export interface ITodoRepository {
  createForUser(userId: string, data: Partial<TodoDto>): Promise<TodoDto>;
  list(userId: string, query: GetTodosQuery): Promise<GetTodosResponseDto>;
  findByUserIdAndId(userId: string, todoId: string): Promise<TodoDto | null>;
  updateForUser(userId: string, todoId: string, updates: Partial<TodoDto>): Promise<TodoDto | null>;
  deleteForUser(userId: string, todoId: string): Promise<boolean>;
}
