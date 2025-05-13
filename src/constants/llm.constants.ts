/**
 * Supported LLM providers
 */
export enum LlmProvider {
  OPENAI = 'openai',
  ANTHROPIC = 'anthropic',
}

/**
 * Supported message roles across providers
 */
export enum LlmMessageRole {
  SYSTEM = 'system',
  USER = 'user',
  ASSISTANT = 'assistant',
  FUNCTION = 'function',
  TOOL = 'tool',
}

/**
 * Supported OpenAI models for API consumption
 */
export enum OpenAIModel {
  GPT_4 = 'gpt-4',
  GPT_4_TURBO = 'gpt-4-turbo',
  GPT_4O = 'gpt-4o',
  GPT_4O_MINI = 'gpt-4o-mini',
  O3_MINI = 'o3-mini',
  O1_MINI = 'o1-mini',
  GPT_3_5_TURBO = 'gpt-3.5-turbo',
  GPT_4_5 = 'gpt-4.5',
  GPT_4_5_TURBO = 'gpt-4.5-turbo',
  GPT_4_1_MINI = 'gpt-4.1-mini',
  GPT_4_1_NANO = 'gpt-4.1-nano',
  GPT_4_1 = 'gpt-4.1',
}

/**
 * Supported Anthropic models for API consumption
 */
export enum AnthropicModel {
  // Claude 3.7 models
  CLAUDE_3_7_SONNET = 'claude-3-7-sonnet-20250219',
  CLAUDE_3_7_SONNET_LATEST = 'claude-3-7-sonnet-latest',

  // Claude 3.5 models
  CLAUDE_3_5_SONNET = 'claude-3-5-sonnet-20241022',
  CLAUDE_3_5_SONNET_LATEST = 'claude-3-5-sonnet-latest',
  CLAUDE_3_5_SONNET_PREVIOUS = 'claude-3-5-sonnet-20240620',
  CLAUDE_3_5_HAIKU = 'claude-3-5-haiku-20241022',
  CLAUDE_3_5_HAIKU_LATEST = 'claude-3-5-haiku-latest',

  // Claude 3 models
  CLAUDE_3_OPUS = 'claude-3-opus-20240229',
  CLAUDE_3_OPUS_LATEST = 'claude-3-opus-latest',
  CLAUDE_3_SONNET = 'claude-3-sonnet-20240229',
  CLAUDE_3_HAIKU = 'claude-3-haiku-20240307',
}

/**
 * Default models to use for each provider
 */
export const DEFAULT_MODELS = {
  [LlmProvider.OPENAI]: OpenAIModel.GPT_4_1,
  [LlmProvider.ANTHROPIC]: AnthropicModel.CLAUDE_3_5_SONNET_LATEST,
};

/**
 * Default temperatures to use for each provider
 */
export const DEFAULT_TEMPERATURES = {
  [LlmProvider.OPENAI]: 0.7,
  [LlmProvider.ANTHROPIC]: 0.7,
};

export const DEFAULT_MAX_STEPS = {
  [LlmProvider.OPENAI]: 1,
  [LlmProvider.ANTHROPIC]: 1,
};

/**
 * Default maximum tokens to generate for each provider
 */
export const DEFAULT_MAX_TOKENS = {
  [LlmProvider.OPENAI]: 2048,
  [LlmProvider.ANTHROPIC]: 1024,
};

/**
 * Environment variable names for API keys
 */
export const API_KEY_ENV_VARS = {
  [LlmProvider.OPENAI]: 'OPENAI_API_KEY',
  [LlmProvider.ANTHROPIC]: 'ANTHROPIC_API_KEY',
};
