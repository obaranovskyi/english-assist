export interface TestResult {
  originalValue: string;
  translation: string;
  mistakes?: number;
  answered?: number;
}
