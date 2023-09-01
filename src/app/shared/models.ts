export interface WordModel {
  originalValue: string;
  translation: string;
  wordId?: number | string;
  successCount?: number;
}

export interface CacheModel {
  name: string;
  value: string;
  date: number;
}
