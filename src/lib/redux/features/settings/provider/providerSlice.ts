import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchProvidersThunk } from "./fetchProvidersThunk";
import { Provider } from "./types";

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
    builder
      .addCase(fetchProvidersThunk.fulfilled, (state, action) => {
        state.availableProviders = action.payload;

        !state.currentProvider
          ? (state.currentProvider = action.payload[0])
          : null;
      })
      .addCase(fetchProvidersThunk.rejected, (state) => {
        state.isError = true;
      });
  },
});

export const { setProvider, setProviderByName } = providerSlice.actions;

export default providerSlice.reducer;
