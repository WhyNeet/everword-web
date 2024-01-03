import { Flashcard } from "../types";

export type SetId = string;

export interface Set {
  name: string;
  description: string;
  flashcards: Flashcard[];
}
