export interface TelegramConnectionDto {
  connectionCode: string;
  chatId?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  isConnected: boolean;
  createdAt: string;
  expiresAt: string;
}
