import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

/**
 * DTO for OpenAI tool call request
 */
export class OpenAIToolCallDto {
  @ApiProperty({
    description: 'The message to send to the OpenAI service',
    example: 'Generate a summary of the meeting notes',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'Context ID to maintain conversation context',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  contextId: string;
}

/**
 * DTO for OpenAI tool call response
 */
export class OpenAIToolCallResponseDto {
  @ApiProperty({
    description: 'The generated text response from the OpenAI model',
    example: 'Here is a summary of your meeting: The team discussed project progress...',
  })
  text: string;

  @ApiProperty({
    description: 'Context ID used for the conversation',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  contextId: string;
}
