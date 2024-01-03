import { Set } from "./types";

export const emptySet = (name: string): Set => ({
  name,
  description: "",
  flashcards: [],
});
