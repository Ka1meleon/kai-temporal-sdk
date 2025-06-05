export interface GetTelegramConnectionCodeResponseDto {
  connectionCode: string;
}

export interface GetTelegramConnectionStatusResponseDto {
  hasConnectionCode: boolean;
  isConnected: boolean;
  connectionCode: string | null;
}

export interface DeleteTelegramConnectionResponseDto {
  success: boolean;
}
