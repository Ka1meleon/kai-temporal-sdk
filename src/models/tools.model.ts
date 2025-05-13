/**
 * Tool-related models
 */

import { User } from '@supabase/supabase-js';

import { OpenAIToolCallDto } from './llm';

export interface OpenAIToolCallParams {
  user: User;
  toolCallMessage: OpenAIToolCallDto;
}
