import { EmailResponseDraftDto } from '../../models/mail';

export interface IEmailResponseDraftRepository {
  create(userId: string, data: Partial<EmailResponseDraftDto>): Promise<EmailResponseDraftDto>;
  findByEmailId(userId: string, emailId: string): Promise<EmailResponseDraftDto | null>;
  updateStatus(
    userId: string,
    draftId: string,
    status: string,
    sentAt?: string,
  ): Promise<EmailResponseDraftDto | null>;
  listPendingReview(userId: string, limit?: number): Promise<EmailResponseDraftDto[]>;
}
