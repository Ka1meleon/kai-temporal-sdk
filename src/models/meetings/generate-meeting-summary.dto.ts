export interface GenerateMeetingSummaryDto {
  transcription: string;
  language?: string;
}

export interface MeetingSummaryDto {
  title: string;
  keyPoints: string[];
  actionItems: string[];
  decisionsMade: string[];
  summary: string;
}
