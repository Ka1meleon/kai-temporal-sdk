import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsArray, ValidateIf } from 'class-validator';

import { MeetingAgenda } from './meeting-agenda.dto';

export class MeetingDto {
  @ApiPropertyOptional({ description: 'Unique identifier for the meeting' })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty({ description: 'Meeting title', example: 'Product Team Standup' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    description: 'Meeting date and time',
    example: '2023-04-15T14:30:00.000Z',
  })
  @IsOptional()
  @IsString()
  date?: string;

  @ApiPropertyOptional({ description: 'Meeting duration in minutes', example: 15 })
  @IsOptional()
  duration?: number;

  @ApiPropertyOptional({ description: 'Meeting summary' })
  @IsOptional()
  @IsString()
  summary?: string;

  @ApiPropertyOptional({ description: 'Key points from the meeting', type: [String] })
  @IsOptional()
  @IsArray()
  keyPoints?: string[];

  @ApiPropertyOptional({ description: 'Action items from the meeting', type: [String] })
  @IsOptional()
  @IsArray()
  actionItems?: string[];

  @ApiPropertyOptional({ description: 'Decisions made during the meeting', type: [String] })
  @IsOptional()
  @IsArray()
  decisionsMade?: string[];

  @ApiPropertyOptional({
    description: 'Meeting agenda',
    type: Object,
    nullable: true,
    example: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      title: 'Weekly Team Meeting Agenda',
      categories: [
        {
          id: '650e8400-e29b-41d4-a716-446655440001',
          category: 'Project Updates',
          items: [
            {
              id: '750e8400-e29b-41d4-a716-446655440002',
              title: 'Frontend development progress',
              discussed: false,
            },
            {
              id: '750e8400-e29b-41d4-a716-446655440003',
              title: 'Backend integration issues',
              discussed: false,
            },
          ],
        },
        {
          id: '650e8400-e29b-41d4-a716-446655440004',
          category: 'Action Items',
          items: [
            {
              id: '750e8400-e29b-41d4-a716-446655440005',
              title: 'Update documentation',
              discussed: false,
            },
            {
              id: '750e8400-e29b-41d4-a716-446655440006',
              title: 'Schedule follow-up meeting',
              discussed: false,
            },
          ],
        },
      ],
      createdAt: '2023-04-15T14:30:45.123Z',
      updatedAt: '2023-04-15T15:45:12.987Z',
    },
  })
  @IsOptional()
  @ValidateIf(o => o.agenda !== null)
  agenda?: MeetingAgenda | null;

  @ApiPropertyOptional({ description: 'Meeting transcription' })
  @IsOptional()
  @IsString()
  transcription?: string;

  @ApiPropertyOptional({ description: 'Language of the meeting', example: 'en' })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiProperty({ description: 'Created at' })
  @IsString()
  @IsOptional()
  createdAt?: string;

  @ApiProperty({ description: 'Updated at' })
  @IsString()
  @IsOptional()
  updatedAt?: string;
}
