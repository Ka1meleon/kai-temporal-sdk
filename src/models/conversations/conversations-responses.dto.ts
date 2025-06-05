import { ConversationSummaryDto, ConversationMessageDto } from './conversations.dto';

export interface PostConversationResponseDto {
  text: string;
  contextId: string;
  title?: string;
}

export interface PutConversationResponseDto {
  text: string;
  contextId: string;
  title?: string;
}

export interface GetConversationResponseDto {
  contextId: string;
  messages: ConversationMessageDto[];
}

export interface GetConversationsResponseDto {
  conversations: ConversationSummaryDto[];
  total: number;
}

export interface DeleteConversationResponseDto {
  contextId: string;
  success: boolean;
}
