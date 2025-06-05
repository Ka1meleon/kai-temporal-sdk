export interface GetMailProcessBatchQuery {
  batchSize?: number;
  includeLabels?: string;
  excludeLabels?: string;
  onlyUnread?: boolean;
}

export interface GetMailProcessAccountQuery {
  batchSize?: number;
  includeLabels?: string;
  excludeLabels?: string;
  onlyUnread?: boolean;
}
