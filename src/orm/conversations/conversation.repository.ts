import { SupabaseClient } from '@supabase/supabase-js';

import { BaseRepository } from '../base';
import { IConversationRepository } from './conversation.repository.interface';
import {
  ConversationDto,
  ConversationTableRow,
  ConversationMessageDto,
  GetConversationsQuery,
  GetConversationsResponseDto,
} from '../../models/conversations';

export class ConversationRepository
  extends BaseRepository<ConversationDto, ConversationTableRow>
  implements IConversationRepository
{
  constructor(supabase: SupabaseClient) {
    super(supabase);
  }

  async createOrUpdate(
    userId: string,
    contextId: string,
    channel: string,
    title: string,
    message: ConversationMessageDto,
  ): Promise<ConversationDto> {
    const { data: existing, error: fetchError } = await this.supabase
      .from('conversations')
      .select()
      .eq('user_id', userId)
      .eq('context_id', contextId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError;
    }

    if (existing) {
      const messages = [...(existing.messages || []), message];
      const updateData = {
        title: title || existing.title,
        messages,
        updated_at: new Date().toISOString(),
      };

      const { data: updated, error: updateError } = await this.supabase
        .from('conversations')
        .update(updateData)
        .eq('id', existing.id)
        .select()
        .single();

      if (updateError) throw updateError;
      return this.convertToDto(updated);
    } else {
      const conversationData = this.convertToTableRow({
        userId,
        contextId,
        channel,
        title,
        messages: [message],
      });

      const { data: created, error: createError } = await this.supabase
        .from('conversations')
        .insert(conversationData)
        .select()
        .single();

      if (createError) throw createError;
      return this.convertToDto(created);
    }
  }

  async getMessages(
    contextId: string,
    userId: string,
    limit: number = 50,
  ): Promise<ConversationMessageDto[]> {
    const { data, error } = await this.supabase
      .from('conversations')
      .select('messages')
      .eq('user_id', userId)
      .eq('context_id', contextId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return [];
      throw error;
    }

    const messages = data.messages || [];
    return messages.slice(-limit);
  }

  async list(userId: string, query: GetConversationsQuery): Promise<GetConversationsResponseDto> {
    const page = 1;
    const limit = 10;
    const sortBy = 'updatedAt';
    const sortOrder = 'DESC';

    const offset = (page - 1) * limit;

    let supabaseQuery = this.supabase
      .from('conversations')
      .select('*', { count: 'exact' })
      .eq('user_id', userId);

    const sortColumn = this.camelToSnake(sortBy);
    supabaseQuery = supabaseQuery.order(sortColumn, { ascending: false });

    supabaseQuery = supabaseQuery.range(offset, offset + limit - 1);

    const { data, error, count } = await supabaseQuery;

    if (error) throw error;

    const conversations = data.map(row => {
      const dto = this.convertToDto(row);
      const lastMessage = dto.messages[dto.messages.length - 1];
      return {
        id: dto.id,
        contextId: dto.contextId,
        title: dto.title,
        channel: dto.channel,
        lastMessage: lastMessage?.content?.substring(0, 100),
        messageCount: dto.messages.length,
        createdAt: dto.createdAt,
        updatedAt: dto.updatedAt,
      };
    });

    return {
      conversations: conversations,
      total: count || 0,
    };
  }

  async findByUserIdAndId(userId: string, conversationId: string): Promise<ConversationDto | null> {
    const { data, error } = await this.supabase
      .from('conversations')
      .select()
      .eq('user_id', userId)
      .eq('id', conversationId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return this.convertToDto(data);
  }

  async updateTitle(
    userId: string,
    contextId: string,
    title: string,
  ): Promise<ConversationDto | null> {
    const { data, error } = await this.supabase
      .from('conversations')
      .update({ title })
      .eq('user_id', userId)
      .eq('context_id', contextId)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return this.convertToDto(data);
  }

  async deleteForUser(userId: string, conversationId: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('conversations')
      .delete()
      .eq('user_id', userId)
      .eq('id', conversationId);

    if (error) {
      if (error.code === 'PGRST116') return false;
      throw error;
    }

    return true;
  }
}
