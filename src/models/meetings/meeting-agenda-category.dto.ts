import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';

import { MeetingAgendaItem } from './meeting-agenda-item.dto';

export class MeetingAgendaCategory {
  @ApiPropertyOptional({
    description: 'Unique identifier for the category',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty({
    description: 'Name of the category',
    example: 'Project Updates',
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    description: 'List of meeting agenda items in this category',
    type: [MeetingAgendaItem],
    example: [{ title: 'Frontend development progress' }, { title: 'Backend integration issues' }],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => MeetingAgendaItem)
  items: MeetingAgendaItem[];
}
