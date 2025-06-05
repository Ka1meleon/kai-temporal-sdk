export interface UserAccountTableRow {
  id: string;
  user_id: string;
  auth_providers?: AuthProvidersDto;
  enabled_tools?: string[];
  total_credits: number;
  used_credits: number;
  subscription_tier: string;
  subscription_expires_at?: string;
  preferences?: UserPreferencesDto;
  created_at: string;
  updated_at: string;
}

export interface UserAccountDto {
  id: string;
  userId: string;
  authProviders?: AuthProvidersDto;
  enabledTools?: string[];
  totalCredits: number;
  usedCredits: number;
  subscriptionTier: string;
  subscriptionExpiresAt?: string;
  preferences?: UserPreferencesDto;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferencesDto {
  kaiPersonality?: string;
  colorTheme?: string;
  darkMode?: boolean;
  languageKey?: string;
}

export interface AuthProvidersDto {
  gmail?: UserGmailAuthDto;
  telegram?: TelegramAuthDto;
}

export interface UserGmailAuthDto {
  email: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  scopes: string[];
}

export interface TelegramAuthDto {
  chatId: string;
  username?: string;
  firstName?: string;
  lastName?: string;
}
