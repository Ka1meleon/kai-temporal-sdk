import { SupabaseClient } from '@supabase/supabase-js';

import { BaseRepository } from '../base';
import { ITodoRepository } from './todo.repository.interface';
import {
  TodoDto,
  TodoTableRow,
  GetTodosQuery,
  GetTodosResponseDto,
  TodoStatus,
  TodoPriority,
} from '../../models/todo';

export class TodoRepository
  extends BaseRepository<TodoDto, TodoTableRow>
  implements ITodoRepository
{
  constructor(supabase: SupabaseClient) {
    super(supabase);
  }

  async createForUser(userId: string, data: Partial<TodoDto>): Promise<TodoDto> {
    const todoData = this.convertToTableRow({
      ...data,
      userId,
      status: data.status || TodoStatus.TODO,
      priority: data.priority || TodoPriority.MEDIUM,
    });

    const { data: result, error } = await this.supabase
      .from('todos')
      .insert(todoData)
      .select()
      .single();

    if (error) throw error;
    return this.convertToDto(result);
  }

  async list(userId: string, query: GetTodosQuery): Promise<GetTodosResponseDto> {
    const {
      page = 1,
      limit = 10,
      status,
      priority,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      fromDate,
      toDate,
    } = query;

    const offset = (page - 1) * limit;

    let supabaseQuery = this.supabase
      .from('todos')
      .select('*', { count: 'exact' })
      .eq('user_id', userId);

    if (status) {
      supabaseQuery = supabaseQuery.eq('status', status);
    }

    if (priority) {
      supabaseQuery = supabaseQuery.eq('priority', priority);
    }

    if (fromDate) {
      supabaseQuery = supabaseQuery.gte('due_date', fromDate);
    }

    if (toDate) {
      supabaseQuery = supabaseQuery.lte('due_date', toDate);
    }

    const sortColumn = this.camelToSnake(sortBy);
    supabaseQuery = supabaseQuery.order(sortColumn, { ascending: sortOrder === 'asc' });

    // Add secondary sort by ID to ensure consistent pagination
    if (sortColumn !== 'id') {
      supabaseQuery = supabaseQuery.order('id', { ascending: true });
    }

    supabaseQuery = supabaseQuery.range(offset, offset + limit - 1);

    const { data, error, count } = await supabaseQuery;

    if (error) throw error;

    const totalCount = count || 0;
    const totalPages = Math.ceil(totalCount / limit);

    return {
      todos: data.map(row => this.convertToDto(row)),
      total: totalCount,
      page,
      limit,
      totalPages,
    };
  }

  async findByUserIdAndId(userId: string, todoId: string): Promise<TodoDto | null> {
    const { data, error } = await this.supabase
      .from('todos')
      .select()
      .eq('user_id', userId)
      .eq('id', todoId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return this.convertToDto(data);
  }

  async updateForUser(
    userId: string,
    todoId: string,
    updates: Partial<TodoDto>,
  ): Promise<TodoDto | null> {
    const updateData = this.convertToTableRow(updates);

    if (updates.status === TodoStatus.DONE && !updates.completedAt) {
      updateData.completed_at = new Date().toISOString();
    }

    const { data, error } = await this.supabase
      .from('todos')
      .update(updateData)
      .eq('user_id', userId)
      .eq('id', todoId)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return this.convertToDto(data);
  }

  async deleteForUser(userId: string, todoId: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('todos')
      .delete()
      .eq('user_id', userId)
      .eq('id', todoId);

    if (error) {
      if (error.code === 'PGRST116') return false;
      throw error;
    }

    return true;
  }
}
