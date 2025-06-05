import { SupabaseClient } from '@supabase/supabase-js';

import { BaseRepository } from '../base';
import { ITranscriptionRepository } from './transcription.repository.interface';
import { TranscriptionDto, TranscriptionTableRow } from '../../models/transcriptions';

export class TranscriptionRepository
  extends BaseRepository<TranscriptionDto, TranscriptionTableRow>
  implements ITranscriptionRepository
{
  constructor(supabase: SupabaseClient) {
    super(supabase);
  }

  async createForUser(userId: string, data: Partial<TranscriptionDto>): Promise<TranscriptionDto> {
    const transcriptionData = this.convertToTableRow({
      ...data,
      userId,
      language: data.language || 'en',
    });

    const { data: result, error } = await this.supabase
      .from('transcriptions')
      .insert(transcriptionData)
      .select()
      .single();

    if (error) throw error;
    return this.convertToDto(result);
  }

  async findByUserIdAndId(
    userId: string,
    transcriptionId: string,
  ): Promise<TranscriptionDto | null> {
    const { data, error } = await this.supabase
      .from('transcriptions')
      .select()
      .eq('user_id', userId)
      .eq('id', transcriptionId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return this.convertToDto(data);
  }

  async findByContextId(userId: string, contextId: string): Promise<TranscriptionDto | null> {
    const { data, error } = await this.supabase
      .from('transcriptions')
      .select()
      .eq('user_id', userId)
      .eq('context_id', contextId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return this.convertToDto(data);
  }

  async findByContextIds(userId: string, contextIds: string[]): Promise<TranscriptionDto[]> {
    if (contextIds.length === 0) return [];

    const { data, error } = await this.supabase
      .from('transcriptions')
      .select()
      .eq('user_id', userId)
      .in('context_id', contextIds)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data.map(row => this.convertToDto(row));
  }

  async list(userId: string, limit: number = 50): Promise<TranscriptionDto[]> {
    const { data, error } = await this.supabase
      .from('transcriptions')
      .select()
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data.map(row => this.convertToDto(row));
  }

  async deleteForUser(userId: string, transcriptionId: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('transcriptions')
      .delete()
      .eq('user_id', userId)
      .eq('id', transcriptionId);

    if (error) {
      if (error.code === 'PGRST116') return false;
      throw error;
    }

    return true;
  }
}
