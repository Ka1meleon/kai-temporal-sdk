export interface TranscriptionSentence {
  text: string;
  start: number;
  end: number;
}

export interface TranscriptionParagraph {
  sentences: TranscriptionSentence[];
  speaker: number;
  num_words: number;
  start: number;
  end: number;
}

export interface TranscriptionTableRow {
  id: string;
  user_id: string;
  context_id: string;
  language: string;
  transcript: string;
  paragraphs: TranscriptionParagraph[];
  created_at: string;
  updated_at: string;
}

export interface TranscriptionDto {
  id: string;
  userId: string;
  contextId: string;
  language: string;
  transcript: string;
  paragraphs: TranscriptionParagraph[];
  createdAt: string;
  updatedAt: string;
}

export interface TranscriptionInterface {
  contextId: string;
  paragraphs: TranscriptionParagraph[];
  language: string;
  transcript: string;
  createdAt: string;
  updatedAt: string;
}
