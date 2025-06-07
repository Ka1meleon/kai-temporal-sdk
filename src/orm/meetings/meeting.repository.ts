import { SupabaseClient } from '@supabase/supabase-js';

import { BaseRepository } from '../base';
import { IMeetingRepository } from './meeting.repository.interface';
import { SortDirection } from '../../models/common';
import {
  MeetingDto,
  MeetingTableRow,
  GetMeetingsQuery,
  GetMeetingsResponseDto,
  MeetingTranscriptionDto,
} from '../../models/meeting';
import { TranscriptionTableRow } from '../../models/transcriptions';

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

  async deleteForUser(
    userId: string,
    meetingId: string,
  ): Promise<{ deleted: boolean; rowCount: number }> {
    const { data, error } = await this.supabase
      .from('meetings')
      .delete()
      .eq('user_id', userId)
      .eq('id', meetingId)
      .select();

    if (error) {
      if (error.code === 'PGRST116') return { deleted: false, rowCount: 0 };
      throw error;
    }

    return { deleted: true, rowCount: data ? 1 : 0 };
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

  async listWithTranscriptions(
    userId: string,
    query: GetMeetingsQuery,
  ): Promise<GetMeetingsResponseDto> {
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

    if (sortColumn !== 'id') {
      supabaseQuery = supabaseQuery.order('id', { ascending: true });
    }

    supabaseQuery = supabaseQuery.range(offset, offset + limit - 1);

    const { data, error, count } = await supabaseQuery;

    if (error) throw error;

    const totalCount = count || 0;
    const totalPages = Math.ceil(totalCount / limit);

    // Fetch transcriptions by context_id for all meetings
    const meetingIds = data.map(meeting => meeting.id);
    const transcriptions = await this.fetchTranscriptionsByContextIds(userId, meetingIds);
    const transcriptionMap = new Map(transcriptions.map(t => [t.context_id, t]));

    return {
      data: data.map(row => {
        const meeting = this.convertToDto(row);
        const transcription = transcriptionMap.get(meeting.id);
        if (transcription) {
          meeting.transcription = this.convertTranscriptionToDto(transcription);
        }
        return meeting;
      }),
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

  async findByUserIdAndIdWithTranscription(
    userId: string,
    meetingId: string,
  ): Promise<MeetingDto | null> {
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

    const meeting = this.convertToDto(data);

    // Fetch transcription by context_id (meeting id)
    const transcription = await this.fetchTranscriptionByContextId(userId, meetingId);
    if (transcription) {
      meeting.transcription = this.convertTranscriptionToDto(transcription);
    }

    return meeting;
  }

  validateDateRange(fromDate?: string, toDate?: string): { fromDate?: Date; toDate?: Date } {
    const result: { fromDate?: Date; toDate?: Date } = {};

    if (fromDate) {
      const from = new Date(fromDate);
      if (isNaN(from.getTime())) {
        throw new Error(`Invalid fromDate format: ${fromDate}`);
      }
      result.fromDate = from;
    }

    if (toDate) {
      const to = new Date(toDate);
      if (isNaN(to.getTime())) {
        throw new Error(`Invalid toDate format: ${toDate}`);
      }
      result.toDate = to;
    }

    if (result.fromDate && result.toDate && result.fromDate > result.toDate) {
      throw new Error('fromDate cannot be after toDate');
    }

    return result;
  }

  private convertTranscriptionToDto(transcription: TranscriptionTableRow): MeetingTranscriptionDto {
    return {
      id: transcription.id,
      contextId: transcription.context_id,
      language: transcription.language,
      transcript: transcription.transcript,
      paragraphs: transcription.paragraphs,
      createdAt: transcription.created_at,
      updatedAt: transcription.updated_at,
    };
  }

  private async fetchTranscriptionsByContextIds(
    userId: string,
    contextIds: string[],
  ): Promise<TranscriptionTableRow[]> {
    if (contextIds.length === 0) return [];

    const { data, error } = await this.supabase
      .from('transcriptions')
      .select()
      .eq('user_id', userId)
      .in('context_id', contextIds);

    if (error) throw error;
    return data || [];
  }

  private async fetchTranscriptionByContextId(
    userId: string,
    contextId: string,
  ): Promise<TranscriptionTableRow | null> {
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

    return data;
  }
}
