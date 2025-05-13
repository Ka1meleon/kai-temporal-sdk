/**
 * DTO for OpenAI tool call request
 */
export class OpenAIToolCallDto {
  message: string;
  contextId: string;
}

/**
 * DTO for OpenAI tool call response
 */
export class OpenAIToolCallResponseDto {
  text: string;
  contextId: string;
}
