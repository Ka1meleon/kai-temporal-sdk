import { EmailExtractedTaskDto } from '../../models/mail';

export interface IEmailExtractedTaskRepository {
  createMany(
    userId: string,
    tasks: Partial<EmailExtractedTaskDto>[],
  ): Promise<EmailExtractedTaskDto[]>;
  findByEmailId(userId: string, emailId: string): Promise<EmailExtractedTaskDto[]>;
  updateStatus(
    userId: string,
    taskId: string,
    status: string,
    completedAt?: string,
  ): Promise<EmailExtractedTaskDto | null>;
  listPending(userId: string, limit?: number): Promise<EmailExtractedTaskDto[]>;
}
