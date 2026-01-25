export type ColorMark = 'red' | 'yellow' | 'green' | null;

export interface WordPair {
  id: string;
  english: string;
  japanese: string;
  colorMark: ColorMark;
}

export interface Topic {
  id: string;
  name: string;
  words: WordPair[];
  createdAt: number;
}

export type QuizMode = 'japanese-to-english' | 'english-to-japanese';

export type AppMode = 'register' | 'quiz';
