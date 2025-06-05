import { EmailActionDto, EmailAction } from '../../models/mail';

export interface IEmailActionRepository {
  createMany(
    userId: string,
    emailId: string,
    accountId: string,
    actions: EmailAction[],
  ): Promise<EmailActionDto[]>;
  findByEmailId(userId: string, emailId: string): Promise<EmailActionDto[]>;
  updateStatus(
    userId: string,
    actionId: string,
    status: string,
    errorMessage?: string,
  ): Promise<EmailActionDto | null>;
  getPendingActions(userId: string, accountId: string, limit?: number): Promise<EmailActionDto[]>;
}
