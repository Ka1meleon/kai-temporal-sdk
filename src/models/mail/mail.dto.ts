export interface EmailProcessingResultTableRow {
  id: string;
  user_id: string;
  email_id: string;
  thread_id: string;
  account_id: string;
  from_address: string;
  subject: string;
  received_at: string;
  classification: string;
  priority: string;
  requires_response: boolean;
  sentiment: string;
  summary: string;
  confidence_score: number;
  created_at: string;
  updated_at: string;
}

export interface EmailActionTableRow {
  id: string;
  user_id: string;
  email_id: string;
  account_id: string;
  action_type: string;
  action_details: EmailActionDetails;
  status: string;
  requires_approval: boolean;
  executed_at?: string;
  error_message?: string;
  created_at: string;
  updated_at: string;
}

export interface EmailExtractedTaskTableRow {
  id: string;
  user_id: string;
  email_id: string;
  email_subject: string;
  description: string;
  deadline?: string;
  assignee?: string;
  priority: string;
  status: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface EmailResponseDraftTableRow {
  id: string;
  user_id: string;
  email_id: string;
  thread_id: string;
  original_subject: string;
  draft_text: string;
  suggested_subject?: string;
  reply_to_all: boolean;
  requires_review: boolean;
  status: string;
  sent_at?: string;
  created_at: string;
  updated_at: string;
}

export interface EmailProcessingResultDto {
  id: string;
  userId: string;
  emailId: string;
  threadId: string;
  accountId: string;
  fromAddress: string;
  subject: string;
  receivedAt: string;
  classification: EmailClassification;
  priority: EmailPriority;
  requiresResponse: boolean;
  sentiment: EmailSentiment;
  summary: string;
  confidenceScore: number;
  createdAt: string;
  updatedAt: string;
}

export interface EmailActionDto {
  id: string;
  userId: string;
  emailId: string;
  accountId: string;
  actionType: EmailActionType;
  actionDetails: EmailActionDetails;
  status: EmailActionStatus;
  requiresApproval: boolean;
  executedAt?: string;
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmailExtractedTaskDto {
  id: string;
  userId: string;
  emailId: string;
  emailSubject: string;
  description: string;
  deadline?: string;
  assignee?: string;
  priority: TaskPriority;
  status: TaskStatus;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmailResponseDraftDto {
  id: string;
  userId: string;
  emailId: string;
  threadId: string;
  originalSubject: string;
  draftText: string;
  suggestedSubject?: string;
  replyToAll: boolean;
  requiresReview: boolean;
  status: DraftStatus;
  sentAt?: string;
  createdAt: string;
  updatedAt: string;
}

export enum EmailClassification {
  IMPORTANT = 'important',
  PERSONAL = 'personal',
  WORK = 'work',
  NEWSLETTER = 'newsletter',
  SPAM = 'spam',
  OTHER = 'other',
}

export enum EmailPriority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export enum EmailSentiment {
  POSITIVE = 'positive',
  NEUTRAL = 'neutral',
  NEGATIVE = 'negative',
}

export enum EmailActionType {
  ARCHIVE = 'archive',
  DELETE = 'delete',
  LABEL = 'label',
  FORWARD = 'forward',
  REPLY = 'reply',
  SNOOZE = 'snooze',
}

export enum EmailActionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export enum TaskPriority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum DraftStatus {
  PENDING_REVIEW = 'pending_review',
  APPROVED = 'approved',
  SENT = 'sent',
  REJECTED = 'rejected',
}

export interface EmailActionDetails {
  [key: string]: string | number | boolean | string[] | undefined;
}

export interface EmailAction {
  type: EmailActionType;
  details: EmailActionDetails;
}
