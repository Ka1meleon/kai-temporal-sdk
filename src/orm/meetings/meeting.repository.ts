import { SupabaseClient } from '@supabase/supabase-js';

import { BaseRepository } from '../base';
import { IMeetingRepository } from './meeting.repository.interface';
import { SortDirection } from '../../models/common';
import {
  MeetingDto,
  MeetingTableRow,
  GetMeetingsQuery,
  GetMeetingsResponseDto,
} from '../../models/meeting';

export class MeetingRepository
  extends BaseRepository<MeetingDto, MeetingTableRow>
  implements IMeetingRepository
{
  constructor(supabase: SupabaseClient) {
    super(supabase);
  }

  async createForUser(userId: string, data: Partial<MeetingDto>): Promise<MeetingDto> {
    const meetingData = this.convertToTableRow({
      ...data,
      userId,
      duration: data.duration || 0,
      keyPoints: data.keyPoints || [],
      actionItems: data.actionItems || [],
      decisionsMade: data.decisionsMade || [],
      language: data.language || 'en',
    });

    const { data: result, error } = await this.supabase
      .from('meetings')
      .insert(meetingData)
      .select()
      .single();

    if (error) throw error;
    return this.convertToDto(result);
  }

  async list(userId: string, query: GetMeetingsQuery): Promise<GetMeetingsResponseDto> {
    const {
      page = 1,
      limit = 10,
      search,
      fromDate,
      toDate,
      sort = 'date',
      sortDirection = 'DESC',
    } = query;

    const offset = (page - 1) * limit;

    let supabaseQuery = this.supabase
      .from('meetings')
      .select('*', { count: 'exact' })
      .eq('user_id', userId);

    if (search) {
      supabaseQuery = supabaseQuery.or(`title.ilike.%${search}%,summary.ilike.%${search}%`);
    }

    if (fromDate) {
      supabaseQuery = supabaseQuery.gte('date', fromDate);
    }

    if (toDate) {
      supabaseQuery = supabaseQuery.lte('date', toDate);
    }

    const sortColumn = this.camelToSnake(sort);
    supabaseQuery = supabaseQuery.order(sortColumn, { ascending: sortDirection === 'ASC' });

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
      data: data.map(row => this.convertToDto(row)),
      total: totalCount,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      search,
      sort,
      sortDirection: sortDirection as SortDirection,
    };
  }

  async findByUserIdAndId(userId: string, meetingId: string): Promise<MeetingDto | null> {
    const { data, error } = await this.supabase
      .from('meetings')
      .select()
      .eq('user_id', userId)
      .eq('id', meetingId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return this.convertToDto(data);
  }

  async updateForUser(
    userId: string,
    meetingId: string,
    updates: Partial<MeetingDto>,
  ): Promise<MeetingDto | null> {
    const updateData = this.convertToTableRow(updates);

    const { data, error } = await this.supabase
      .from('meetings')
      .update(updateData)
      .eq('user_id', userId)
      .eq('id', meetingId)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return this.convertToDto(data);
  }

  async deleteForUser(userId: string, meetingId: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('meetings')
      .delete()
      .eq('user_id', userId)
      .eq('id', meetingId);

    if (error) {
      if (error.code === 'PGRST116') return false;
      throw error;
    }

    return true;
  }

  async findByTranscriptionId(userId: string, transcriptionId: string): Promise<MeetingDto | null> {
    const { data, error } = await this.supabase
      .from('meetings')
      .select()
      .eq('user_id', userId)
      .eq('transcription_id', transcriptionId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return this.convertToDto(data);
  }
}
