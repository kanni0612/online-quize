export enum TestStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}

export interface Question {
  id: string;
  questionText: string;
  options: string[];
  correctIndex: number; // 0-based index
  topic: string;
}

export interface TestResult {
  totalQuestions: number;
  correctAnswers: number;
  scorePercentage: number;
  questions: Question[];
  userAnswers: Record<string, number>; // questionId -> selectedOptionIndex
}

export enum Difficulty {
  JUNIOR = 'Junior',
  MID = 'Mid-Level',
  SENIOR = 'Senior'
}