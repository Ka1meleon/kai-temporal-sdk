import { EmailProcessingResultDto } from '../../models/mail';

export interface IEmailProcessingResultRepository {
  upsert(
    userId: string,
    emailId: string,
    data: Partial<EmailProcessingResultDto>,
  ): Promise<EmailProcessingResultDto>;
  findByEmailId(userId: string, emailId: string): Promise<EmailProcessingResultDto | null>;
  listByAccountId(
    userId: string,
    accountId: string,
    limit?: number,
  ): Promise<EmailProcessingResultDto[]>;
}
