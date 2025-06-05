export interface ConversationTableRow {
  id: string;
  user_id: string;
  context_id: string;
  channel: string;
  title?: string;
  messages: ConversationMessageDto[];
  created_at: string;
  updated_at: string;
}

export interface ConversationDto {
  id: string;
  userId: string;
  contextId: string;
  channel: string;
  title?: string;
  messages: ConversationMessageDto[];
  createdAt: string;
  updatedAt: string;
}

export interface ConversationMessageDto {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: string;
}

export interface ConversationSummaryDto {
  id: string;
  contextId: string;
  title?: string;
  channel: string;
  lastMessage?: string;
  messageCount: number;
  createdAt: string;
  updatedAt: string;
}
