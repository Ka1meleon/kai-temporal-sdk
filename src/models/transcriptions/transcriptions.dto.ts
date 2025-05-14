export class SentenceDto {
  text: string;
  start: number;
  end: number;
}

export class ParagraphDto {
  sentences: SentenceDto[];
  speaker: number;
  num_words: number;
  start: number;
  end: number;
}

export class CreateTranscriptionDto {
  paragraphs: ParagraphDto[];
  language: string;
}

export class TranscriptionResponseDto {
  id: string;
  transcript: string;
  paragraphs: ParagraphDto[];
  createdAt: string;
  updatedAt: string;
}
