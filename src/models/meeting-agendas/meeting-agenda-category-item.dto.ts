import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class MeetingAgendaCategoryItem {
  @ApiPropertyOptional({
    description: 'Unique identifier for the meeting agenda item',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty({
    description: 'Title of the meeting agenda item',
    example: 'Frontend development progress',
  })
  @IsString()
  @IsNotEmpty()
  title: string;
}
