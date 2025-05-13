/**
 * Supported language interface for transcriptions
 */
export interface TranscriptionLanguage {
  key: string;
  label: string;
}

/**
 * List of supported transcription languages
 */
export const SUPPORTED_TRANSCRIPTION_LANGUAGES: TranscriptionLanguage[] = [
  { key: 'en', label: 'English' },
  { key: 'es', label: 'Español' },
  { key: 'fr', label: 'Français' },
  { key: 'de', label: 'Deutsch' },
  { key: 'it', label: 'Italiano' },
  { key: 'pt', label: 'Português' },
  { key: 'nl', label: 'Nederlands' },
  { key: 'ru', label: 'Русский' },
  { key: 'ja', label: '日本語' },
  { key: 'zh', label: '中文' },
  { key: 'ar', label: 'العربية' },
  { key: 'hi', label: 'हिन्दी' },
  { key: 'ko', label: '한국어' },
];
