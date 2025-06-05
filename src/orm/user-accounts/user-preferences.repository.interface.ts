import { UserPreferencesDto } from '../../models/user-preferences';

export interface IUserPreferencesRepository {
  get(userId: string): Promise<UserPreferencesDto>;
  update(userId: string, preferences: Partial<UserPreferencesDto>): Promise<UserPreferencesDto>;
}
