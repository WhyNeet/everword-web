import { configureStore } from "@reduxjs/toolkit";
import { settingsSlice } from "./features/settings/settingsSlice";
import { backendApi } from "../api";

export const store = configureStore({
  reducer: {
    settings: settingsSlice,
    [backendApi.reducerPath]: backendApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(backendApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
