import { SupabaseClient } from '@supabase/supabase-js';

import { BaseRepository } from '../base';
import { IEmailActionRepository } from './email-action.repository.interface';
import {
  EmailActionDto,
  EmailActionTableRow,
  EmailAction,
  EmailActionStatus,
} from '../../models/mail';

export class EmailActionRepository
  extends BaseRepository<EmailActionDto, EmailActionTableRow>
  implements IEmailActionRepository
{
  constructor(supabase: SupabaseClient) {
    super(supabase);
  }

  async createMany(
    userId: string,
    emailId: string,
    accountId: string,
    actions: EmailAction[],
  ): Promise<EmailActionDto[]> {
    const actionData = actions.map(action =>
      this.convertToTableRow({
        userId,
        emailId,
        accountId,
        actionType: action.type,
        actionDetails: action.details,
        status: EmailActionStatus.PENDING,
        requiresApproval: false,
      }),
    );

    const { data, error } = await this.supabase.from('email_actions').insert(actionData).select();

    if (error) throw error;
    return data.map(row => this.convertToDto(row));
  }

  async findByEmailId(userId: string, emailId: string): Promise<EmailActionDto[]> {
    const { data, error } = await this.supabase
      .from('email_actions')
      .select()
      .eq('user_id', userId)
      .eq('email_id', emailId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data.map(row => this.convertToDto(row));
  }

  async updateStatus(
    userId: string,
    actionId: string,
    status: string,
    errorMessage?: string,
  ): Promise<EmailActionDto | null> {
    const updateData: any = { status };
    if (status === EmailActionStatus.COMPLETED) {
      updateData.executed_at = new Date().toISOString();
    }
    if (errorMessage) {
      updateData.error_message = errorMessage;
    }

    const { data, error } = await this.supabase
      .from('email_actions')
      .update(updateData)
      .eq('user_id', userId)
      .eq('id', actionId)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return this.convertToDto(data);
  }

  async getPendingActions(
    userId: string,
    accountId: string,
    limit: number = 10,
  ): Promise<EmailActionDto[]> {
    const { data, error } = await this.supabase
      .from('email_actions')
      .select()
      .eq('user_id', userId)
      .eq('account_id', accountId)
      .eq('status', EmailActionStatus.PENDING)
      .order('created_at', { ascending: true })
      .limit(limit);

    if (error) throw error;
    return data.map(row => this.convertToDto(row));
  }
}
