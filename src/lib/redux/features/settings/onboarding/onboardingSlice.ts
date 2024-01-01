import { RootState } from "@/lib/redux/store";
import { createSlice } from "@reduxjs/toolkit";

export interface OnboardingState {
  isPassed: boolean;
}

const initialState: OnboardingState = {
  isPassed: false,
};

export const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    pass(state) {
      state.isPassed = true;
    },
  },
});

export const { pass } = onboardingSlice.actions;

export const selector = (state: RootState) => state.settings.onboarding;
