/**
 * Tool-related models
 */

import { User } from '@supabase/supabase-js';

import { OpenAIToolCallDto } from './llm/openai-tool-call.dto';

export interface OpenAIToolCallParams {
  user: User;
  toolCallMessage: OpenAIToolCallDto;
}
