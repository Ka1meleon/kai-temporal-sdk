import {
  ConversationDto,
  ConversationMessageDto,
  GetConversationsQuery,
  GetConversationsResponseDto,
} from '../../models/conversations';

export interface IConversationRepository {
  createOrUpdate(
    userId: string,
    contextId: string,
    channel: string,
    title: string,
    message: ConversationMessageDto,
  ): Promise<ConversationDto>;
  getMessages(contextId: string, userId: string, limit?: number): Promise<ConversationMessageDto[]>;
  list(userId: string, query: GetConversationsQuery): Promise<GetConversationsResponseDto>;
  findByUserIdAndId(userId: string, conversationId: string): Promise<ConversationDto | null>;
  updateTitle(userId: string, contextId: string, title: string): Promise<ConversationDto | null>;
  deleteForUser(userId: string, conversationId: string): Promise<boolean>;
}
