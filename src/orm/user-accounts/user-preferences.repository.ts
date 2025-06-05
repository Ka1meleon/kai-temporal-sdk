import { SupabaseClient } from '@supabase/supabase-js';

import { IUserPreferencesRepository } from './user-preferences.repository.interface';
import { UserPreferencesDto } from '../../models/user-preferences';

export class UserPreferencesRepository implements IUserPreferencesRepository {
  constructor(private supabase: SupabaseClient) {}

  async get(userId: string): Promise<UserPreferencesDto> {
    const { data, error } = await this.supabase
      .from('user_accounts')
      .select('preferences')
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return {
          kaiPersonality: 'professional',
          colorTheme: 'default',
          darkMode: false,
          languageKey: 'en',
        };
      }
      throw error;
    }

    return (
      data.preferences || {
        kaiPersonality: 'professional',
        colorTheme: 'default',
        darkMode: false,
        languageKey: 'en',
      }
    );
  }

  async update(
    userId: string,
    preferences: Partial<UserPreferencesDto>,
  ): Promise<UserPreferencesDto> {
    const { data: existing, error: fetchError } = await this.supabase
      .from('user_accounts')
      .select('preferences')
      .eq('user_id', userId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError;
    }

    const currentPrefs = existing?.preferences || {
      kaiPersonality: 'professional',
      colorTheme: 'default',
      darkMode: false,
      languageKey: 'en',
    };

    const updatedPrefs = { ...currentPrefs, ...preferences };

    if (existing) {
      const { data, error } = await this.supabase
        .from('user_accounts')
        .update({ preferences: updatedPrefs })
        .eq('user_id', userId)
        .select('preferences')
        .single();

      if (error) throw error;
      return data.preferences;
    } else {
      const { data, error } = await this.supabase
        .from('user_accounts')
        .insert({
          user_id: userId,
          preferences: updatedPrefs,
          total_credits: 0,
          used_credits: 0,
          subscription_tier: 'free',
        })
        .select('preferences')
        .single();

      if (error) throw error;
      return data.preferences;
    }
  }
}
