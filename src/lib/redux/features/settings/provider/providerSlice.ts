import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Provider } from "./types";
import { backendApi } from "@/lib/redux/backendApi";
import type { RootState } from "@/lib/redux/store";

export interface ProviderState {
  currentProvider: Provider | null;
  availableProviders: Provider[] | null;
  isError: boolean;
}

const initialState: ProviderState = {
  availableProviders: null,
  currentProvider: null,
  isError: false,
};

export const providerSlice = createSlice({
  name: "provider",
  initialState,
  reducers: {
    setProvider: (state, action: PayloadAction<string>) => {
      if (state.currentProvider?.id === action.payload) return;

      state.currentProvider =
        state.availableProviders?.find((p) => p.id === action.payload) ?? null;
    },
    setProviderByName: (state, action: PayloadAction<string>) => {
      if (state.currentProvider?.name === action.payload) return;

      state.currentProvider =
        state.availableProviders?.find((p) => p.name === action.payload) ??
        null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      backendApi.endpoints.discover.matchFulfilled,
      (state, action) => {
        state.availableProviders = action.payload;

        !state.currentProvider
          ? (state.currentProvider = action.payload[0])
          : null;
      }
    );
  },
});

export const select = (state: RootState) => state.settings.provider;

export const { setProvider, setProviderByName } = providerSlice.actions;

export default providerSlice.reducer;
