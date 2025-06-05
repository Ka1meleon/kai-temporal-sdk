import { SupabaseClient } from '@supabase/supabase-js';

import { BaseRepository } from '../base';
import { IUserAccountRepository } from './user-account.repository.interface';
import { UserAccountDto, UserAccountTableRow } from '../../models/user-preferences';

export class UserAccountRepository
  extends BaseRepository<UserAccountDto, UserAccountTableRow>
  implements IUserAccountRepository
{
  constructor(supabase: SupabaseClient) {
    super(supabase);
  }

  async createForUser(userId: string, data: Partial<UserAccountDto>): Promise<UserAccountDto> {
    const accountData = this.convertToTableRow({
      ...data,
      userId,
      totalCredits: data.totalCredits || 0,
      usedCredits: data.usedCredits || 0,
      subscriptionTier: data.subscriptionTier || 'free',
      enabledTools: data.enabledTools || [],
      authProviders: data.authProviders || {},
      preferences: data.preferences || {},
    });

    const { data: result, error } = await this.supabase
      .from('user_accounts')
      .insert(accountData)
      .select()
      .single();

    if (error) throw error;
    return this.convertToDto(result);
  }

  async findByUserId(userId: string): Promise<UserAccountDto | null> {
    const { data, error } = await this.supabase
      .from('user_accounts')
      .select()
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return this.convertToDto(data);
  }

  async updateForUser(
    userId: string,
    updates: Partial<UserAccountDto>,
  ): Promise<UserAccountDto | null> {
    const updateData = this.convertToTableRow(updates);

    const { data, error } = await this.supabase
      .from('user_accounts')
      .update(updateData)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return this.convertToDto(data);
  }

  async deleteForUser(userId: string): Promise<boolean> {
    const { error } = await this.supabase.from('user_accounts').delete().eq('user_id', userId);

    if (error) {
      if (error.code === 'PGRST116') return false;
      throw error;
    }

    return true;
  }

  async updateAuthProvider(
    userId: string,
    provider: string,
    providerData: any,
  ): Promise<UserAccountDto | null> {
    const { data: existing, error: fetchError } = await this.supabase
      .from('user_accounts')
      .select('auth_providers')
      .eq('user_id', userId)
      .single();

    if (fetchError) {
      if (fetchError.code === 'PGRST116') return null;
      throw fetchError;
    }

    const authProviders = existing.auth_providers || {};
    authProviders[provider] = providerData;

    const { data, error } = await this.supabase
      .from('user_accounts')
      .update({ auth_providers: authProviders })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return this.convertToDto(data);
  }

  async removeAuthProvider(userId: string, provider: string): Promise<UserAccountDto | null> {
    const { data: existing, error: fetchError } = await this.supabase
      .from('user_accounts')
      .select('auth_providers')
      .eq('user_id', userId)
      .single();

    if (fetchError) {
      if (fetchError.code === 'PGRST116') return null;
      throw fetchError;
    }

    const authProviders = existing.auth_providers || {};
    delete authProviders[provider];

    const { data, error } = await this.supabase
      .from('user_accounts')
      .update({ auth_providers: authProviders })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return this.convertToDto(data);
  }
}
