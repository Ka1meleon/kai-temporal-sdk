import { SupabaseClient } from '@supabase/supabase-js';

import { BaseRepository } from '../base';
import { IEmailExtractedTaskRepository } from './email-extracted-task.repository.interface';
import { EmailExtractedTaskDto, EmailExtractedTaskTableRow, TaskStatus } from '../../models/mail';

export class EmailExtractedTaskRepository
  extends BaseRepository<EmailExtractedTaskDto, EmailExtractedTaskTableRow>
  implements IEmailExtractedTaskRepository
{
  constructor(supabase: SupabaseClient) {
    super(supabase);
  }

  async createMany(
    userId: string,
    tasks: Partial<EmailExtractedTaskDto>[],
  ): Promise<EmailExtractedTaskDto[]> {
    const taskData = tasks.map(task =>
      this.convertToTableRow({
        ...task,
        userId,
        status: task.status || TaskStatus.PENDING,
      }),
    );

    const { data, error } = await this.supabase
      .from('email_extracted_tasks')
      .insert(taskData)
      .select();

    if (error) throw error;
    return data.map(row => this.convertToDto(row));
  }

  async findByEmailId(userId: string, emailId: string): Promise<EmailExtractedTaskDto[]> {
    const { data, error } = await this.supabase
      .from('email_extracted_tasks')
      .select()
      .eq('user_id', userId)
      .eq('email_id', emailId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data.map(row => this.convertToDto(row));
  }

  async updateStatus(
    userId: string,
    taskId: string,
    status: string,
    completedAt?: string,
  ): Promise<EmailExtractedTaskDto | null> {
    const updateData: any = { status };
    if (completedAt) {
      updateData.completed_at = completedAt;
    } else if (status === TaskStatus.COMPLETED) {
      updateData.completed_at = new Date().toISOString();
    }

    const { data, error } = await this.supabase
      .from('email_extracted_tasks')
      .update(updateData)
      .eq('user_id', userId)
      .eq('id', taskId)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return this.convertToDto(data);
  }

  async listPending(userId: string, limit: number = 50): Promise<EmailExtractedTaskDto[]> {
    const { data, error } = await this.supabase
      .from('email_extracted_tasks')
      .select()
      .eq('user_id', userId)
      .eq('status', TaskStatus.PENDING)
      .order('deadline', { ascending: true, nullsFirst: false })
      .limit(limit);

    if (error) throw error;
    return data.map(row => this.convertToDto(row));
  }
}
