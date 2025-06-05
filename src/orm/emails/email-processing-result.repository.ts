import { SupabaseClient } from '@supabase/supabase-js';

import { BaseRepository } from '../base';
import { IEmailProcessingResultRepository } from './email-processing-result.repository.interface';
import { EmailProcessingResultDto, EmailProcessingResultTableRow } from '../../models/mail';

export class EmailProcessingResultRepository
  extends BaseRepository<EmailProcessingResultDto, EmailProcessingResultTableRow>
  implements IEmailProcessingResultRepository
{
  constructor(supabase: SupabaseClient) {
    super(supabase);
  }

  async upsert(
    userId: string,
    emailId: string,
    data: Partial<EmailProcessingResultDto>,
  ): Promise<EmailProcessingResultDto> {
    const resultData = this.convertToTableRow({
      ...data,
      userId,
      emailId,
    });

    const { data: result, error } = await this.supabase
      .from('email_processing_results')
      .upsert(resultData, { onConflict: 'user_id,email_id' })
      .select()
      .single();

    if (error) throw error;
    return this.convertToDto(result);
  }

  async findByEmailId(userId: string, emailId: string): Promise<EmailProcessingResultDto | null> {
    const { data, error } = await this.supabase
      .from('email_processing_results')
      .select()
      .eq('user_id', userId)
      .eq('email_id', emailId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return this.convertToDto(data);
  }

  async listByAccountId(
    userId: string,
    accountId: string,
    limit: number = 50,
  ): Promise<EmailProcessingResultDto[]> {
    const { data, error } = await this.supabase
      .from('email_processing_results')
      .select()
      .eq('user_id', userId)
      .eq('account_id', accountId)
      .order('received_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data.map(row => this.convertToDto(row));
  }
}
