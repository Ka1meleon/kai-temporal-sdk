import { SupabaseClient } from '@supabase/supabase-js';

import { BaseRepository } from '../base';
import { IMeetingAgendaRepository } from './meeting-agenda.repository.interface';
import { SortDirection } from '../../models/common';
import {
  MeetingAgendaDto,
  MeetingAgendaTableRow,
  GetMeetingAgendasQuery,
  GetMeetingAgendasResponseDto,
} from '../../models/meeting-agenda';

export class MeetingAgendaRepository
  extends BaseRepository<MeetingAgendaDto, MeetingAgendaTableRow>
  implements IMeetingAgendaRepository
{
  constructor(supabase: SupabaseClient) {
    super(supabase);
  }

  async createForUser(userId: string, data: Partial<MeetingAgendaDto>): Promise<MeetingAgendaDto> {
    const agendaData = this.convertToTableRow({
      ...data,
      userId,
      categories: data.categories || [],
    });

    const { data: result, error } = await this.supabase
      .from('agendas')
      .insert(agendaData)
      .select()
      .single();

    if (error) throw error;
    return this.convertToDto(result);
  }

  async list(userId: string, query: GetMeetingAgendasQuery): Promise<GetMeetingAgendasResponseDto> {
    const { page = 1, limit = 10, search, sort = 'createdAt', sortDirection = 'DESC' } = query;

    const offset = (page - 1) * limit;

    let supabaseQuery = this.supabase
      .from('agendas')
      .select('*', { count: 'exact' })
      .eq('user_id', userId);

    if (search) {
      supabaseQuery = supabaseQuery.or(`title.ilike.%${search}%`);
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

  async findByUserIdAndId(userId: string, agendaId: string): Promise<MeetingAgendaDto | null> {
    const { data, error } = await this.supabase
      .from('agendas')
      .select()
      .eq('user_id', userId)
      .eq('id', agendaId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return this.convertToDto(data);
  }

  async updateForUser(
    userId: string,
    agendaId: string,
    updates: Partial<MeetingAgendaDto>,
  ): Promise<MeetingAgendaDto | null> {
    const updateData = this.convertToTableRow(updates);

    const { data, error } = await this.supabase
      .from('agendas')
      .update(updateData)
      .eq('user_id', userId)
      .eq('id', agendaId)
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
    agendaId: string,
  ): Promise<{ deleted: boolean; rowCount: number }> {
    const { data, error } = await this.supabase
      .from('agendas')
      .delete()
      .eq('user_id', userId)
      .eq('id', agendaId)
      .select();

    if (error) {
      if (error.code === 'PGRST116') return { deleted: false, rowCount: 0 };
      throw error;
    }

    return { deleted: true, rowCount: data ? 1 : 0 };
  }

  processQueryParams(query: GetMeetingAgendasQuery): GetMeetingAgendasQuery {
    return {
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 10,
      search: query.search,
      sort: query.sort || 'createdAt',
      sortDirection: (query.sortDirection || 'DESC') as SortDirection,
    };
  }
}
