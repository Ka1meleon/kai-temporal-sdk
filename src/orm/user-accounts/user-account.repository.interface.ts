import { UserAccountDto } from '../../models/user-preferences';

export interface IUserAccountRepository {
  createForUser(userId: string, data: Partial<UserAccountDto>): Promise<UserAccountDto>;
  findByUserId(userId: string): Promise<UserAccountDto | null>;
  updateForUser(userId: string, updates: Partial<UserAccountDto>): Promise<UserAccountDto | null>;
  deleteForUser(userId: string): Promise<boolean>;
  updateAuthProvider(
    userId: string,
    provider: string,
    providerData: any,
  ): Promise<UserAccountDto | null>;
  removeAuthProvider(userId: string, provider: string): Promise<UserAccountDto | null>;
}
