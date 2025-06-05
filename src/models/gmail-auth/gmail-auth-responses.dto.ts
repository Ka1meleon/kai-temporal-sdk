export interface GetGmailAuthStatusResponseDto {
  authorized: boolean;
  email?: string;
  scopes?: string[];
  error?: string;
}

export interface DeleteGmailAuthResponseDto {
  success: boolean;
  message?: string;
  error?: string;
}

export interface GetGmailAuthRefreshResponseDto {
  success: boolean;
  token?: string;
  error?: string;
}
