import { PartialType } from '@nestjs/swagger';

import { MeetingAgendaDto } from './meeting-agenda.dto';

export class UpdateMeetingAgendaDto extends PartialType(MeetingAgendaDto) {}
