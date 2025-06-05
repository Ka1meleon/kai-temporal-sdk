import { MeetingDto, GetMeetingsQuery, GetMeetingsResponseDto } from '../../models/meeting';

export interface IMeetingRepository {
  createForUser(userId: string, data: Partial<MeetingDto>): Promise<MeetingDto>;
  list(userId: string, query: GetMeetingsQuery): Promise<GetMeetingsResponseDto>;
  findByUserIdAndId(userId: string, meetingId: string): Promise<MeetingDto | null>;
  updateForUser(
    userId: string,
    meetingId: string,
    updates: Partial<MeetingDto>,
  ): Promise<MeetingDto | null>;
  deleteForUser(userId: string, meetingId: string): Promise<boolean>;
  findByTranscriptionId(userId: string, transcriptionId: string): Promise<MeetingDto | null>;
}
