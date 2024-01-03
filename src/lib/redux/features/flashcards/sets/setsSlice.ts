import { v4 } from "uuid";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SetId, Set } from "./types";
import { emptySet } from "./utils";
import { RootState } from "@/lib/redux/store";
import { useSelector } from "react-redux";
import { Flashcard } from "../types";

export interface SetsState {
  sets: Record<SetId, Set>;
}

const initialState: SetsState = {
  sets: {},
};

export const setsSlice = createSlice({
  name: "sets",
  initialState,
  reducers: {
    create(state, action: PayloadAction<string>) {
      state.sets[v4()] = emptySet(action.payload);
    },
    addFlashcard(
      state,
      action: PayloadAction<{ setId: string; flashcard: Flashcard }>
    ) {
      if (
        !!state.sets[action.payload.setId].flashcards.find(
          ({ word }) => word === action.payload.flashcard.word
        )
      )
        return;

      state.sets[action.payload.setId].flashcards.unshift(
        action.payload.flashcard
      );
    },
    removeFlashcard(
      state,
      action: PayloadAction<{ setId: string; idx: number }>
    ) {
      const cards = state.sets[action.payload.setId].flashcards;
      state.sets[action.payload.setId].flashcards = cards
        .slice(0, action.payload.idx)
        .concat(cards.slice(action.payload.idx + 1));
    },
    edit(
      state,
      action: PayloadAction<{
        setId: string;
        name: string;
        description: string;
      }>
    ) {
      state.sets[action.payload.setId].name = action.payload.name;
      state.sets[action.payload.setId].description = action.payload.description;
    },
  },
});

export const select = (state: RootState) => state.flashcards.sets;
export const useSet = (setId: string) => useSelector(select).sets[setId];

export const { create, addFlashcard, removeFlashcard, edit } =
  setsSlice.actions;
