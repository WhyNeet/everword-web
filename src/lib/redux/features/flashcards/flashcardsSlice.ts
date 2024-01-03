import { combineSlices } from "@reduxjs/toolkit";
import { setsSlice } from "./sets/setsSlice";
import { RootState } from "@/lib/redux/store";

export const flashcardsSlice = combineSlices(setsSlice);

export const select = (state: RootState) => state.flashcards;
