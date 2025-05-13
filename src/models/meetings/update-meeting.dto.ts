import { PartialType } from '@nestjs/swagger';

import { MeetingDto } from './meeting.dto';

export class UpdateMeetingDto extends PartialType(MeetingDto) {}
