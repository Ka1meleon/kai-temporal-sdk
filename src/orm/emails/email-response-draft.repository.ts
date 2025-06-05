import { SupabaseClient } from '@supabase/supabase-js';

import { BaseRepository } from '../base';
import { IEmailResponseDraftRepository } from './email-response-draft.repository.interface';
import { EmailResponseDraftDto, EmailResponseDraftTableRow, DraftStatus } from '../../models/mail';

export class EmailResponseDraftRepository
  extends BaseRepository<EmailResponseDraftDto, EmailResponseDraftTableRow>
  implements IEmailResponseDraftRepository
{
  constructor(supabase: SupabaseClient) {
    super(supabase);
  }

  async create(
    userId: string,
    data: Partial<EmailResponseDraftDto>,
  ): Promise<EmailResponseDraftDto> {
    const draftData = this.convertToTableRow({
      ...data,
      userId,
      replyToAll: data.replyToAll || false,
      requiresReview: data.requiresReview !== false,
      status: data.status || DraftStatus.PENDING_REVIEW,
    });

    const { data: result, error } = await this.supabase
      .from('email_response_drafts')
      .insert(draftData)
      .select()
      .single();

    if (error) throw error;
    return this.convertToDto(result);
  }

  async findByEmailId(userId: string, emailId: string): Promise<EmailResponseDraftDto | null> {
    const { data, error } = await this.supabase
      .from('email_response_drafts')
      .select()
      .eq('user_id', userId)
      .eq('email_id', emailId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return this.convertToDto(data);
  }

  async updateStatus(
    userId: string,
    draftId: string,
    status: string,
    sentAt?: string,
  ): Promise<EmailResponseDraftDto | null> {
    const updateData: any = { status };
    if (sentAt) {
      updateData.sent_at = sentAt;
    } else if (status === DraftStatus.SENT) {
      updateData.sent_at = new Date().toISOString();
    }

    const { data, error } = await this.supabase
      .from('email_response_drafts')
      .update(updateData)
      .eq('user_id', userId)
      .eq('id', draftId)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return this.convertToDto(data);
  }

  async listPendingReview(userId: string, limit: number = 20): Promise<EmailResponseDraftDto[]> {
    const { data, error } = await this.supabase
      .from('email_response_drafts')
      .select()
      .eq('user_id', userId)
      .eq('status', DraftStatus.PENDING_REVIEW)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data.map(row => this.convertToDto(row));
  }
}
