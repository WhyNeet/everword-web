export interface Flashcard {
  word: string;
  defenitions: Record<string, Defenition[]> | null;
}

export interface Defenition {
  text: string;
  examples: string[];
}
