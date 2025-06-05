import { TranscriptionDto } from '../../models/transcriptions';

export interface ITranscriptionRepository {
  createForUser(userId: string, data: Partial<TranscriptionDto>): Promise<TranscriptionDto>;
  findByUserIdAndId(userId: string, transcriptionId: string): Promise<TranscriptionDto | null>;
  findByContextId(userId: string, contextId: string): Promise<TranscriptionDto | null>;
  findByContextIds(userId: string, contextIds: string[]): Promise<TranscriptionDto[]>;
  list(userId: string, limit?: number): Promise<TranscriptionDto[]>;
  deleteForUser(userId: string, transcriptionId: string): Promise<boolean>;
}
