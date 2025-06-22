import { SupabaseClient } from '@supabase/supabase-js';

import { ContactDto } from '../../models/contact';
import { BaseRepository } from '../base';
import { ContactTableRow, IContactRepository } from './contact.repository.interface';

export class ContactRepository
  extends BaseRepository<ContactDto, ContactTableRow>
  implements IContactRepository
{
  constructor(supabase: SupabaseClient) {
    super(supabase);
  }

  async create(data: Omit<ContactDto, 'id' | 'created_at'>): Promise<ContactDto> {
    const tableRow = this.convertToTableRow(data);

    const { data: createdRow, error } = await this.supabase
      .from('contacts')
      .insert(tableRow)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create contact: ${error.message}`);
    }

    return this.convertToDto(createdRow);
  }

  async findById(id: string): Promise<ContactDto | null> {
    const { data, error } = await this.supabase.from('contacts').select('*').eq('id', id).single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Failed to find contact: ${error.message}`);
    }

    return this.convertToDto(data);
  }

  async listAll(limit = 50, offset = 0): Promise<{ data: ContactDto[]; total: number }> {
    const countQuery = this.supabase.from('contacts').select('*', { count: 'exact', head: true });

    const dataQuery = this.supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    const [{ count }, { data, error }] = await Promise.all([countQuery, dataQuery]);

    if (error) {
      throw new Error(`Failed to list contacts: ${error.message}`);
    }

    return {
      data: data.map(row => this.convertToDto(row)),
      total: count || 0,
    };
  }
}
