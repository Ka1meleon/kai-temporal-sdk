export interface GmailAuthDto {
  email: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  scopes: string[];
}
