/**
 * Tool-related models
 */

import { User } from '@supabase/supabase-js';

/**
 * OpenAI tool call DTO
 */
export interface OpenAIToolCallDto {
  contextId: string;
  message: string;
}

export interface OpenAIToolCallParams {
  user: User;
  toolCallMessage: OpenAIToolCallDto;
}
