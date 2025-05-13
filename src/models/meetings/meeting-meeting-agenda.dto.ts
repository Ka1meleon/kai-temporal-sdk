import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';

import { MeetingMeetingAgendaCategory } from './meeting-meeting-agenda-category.dto';

export class MeetingMeetingAgenda {
  @ApiPropertyOptional({
    description: 'Unique identifier for the meeting agenda',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty({
    description: 'Title of the meeting agenda',
    example: 'Weekly Team Meeting Agenda',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Categories of meeting agenda items',
    type: [MeetingMeetingAgendaCategory],
    example: [
      {
        category: 'Project Updates',
        items: [
          { title: 'Frontend development progress' },
          { title: 'Backend integration issues' },
        ],
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => MeetingMeetingAgendaCategory)
  categories: MeetingMeetingAgendaCategory[];

  @ApiProperty({
    description: 'Created at',
    example: '2023-04-15T14:30:45.123Z',
  })
  @IsString()
  @IsOptional()
  createdAt?: string;

  @ApiProperty({
    description: 'Updated at',
    example: '2023-04-15T15:45:12.987Z',
  })
  @IsString()
  @IsOptional()
  updatedAt?: string;
}
