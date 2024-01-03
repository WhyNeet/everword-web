import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { flashcardsSlice } from "./features/flashcards/flashcardsSlice";
import { settingsSlice } from "./features/settings/settingsSlice";
import { backendApi } from "./backendApi";
import { cambridgeAutocompleteApi } from "./autocompleteApi";

const rootReducer = combineReducers({
  flashcards: persistReducer({ key: "flashcards", storage }, flashcardsSlice),
  settings: persistReducer({ key: "settings", storage }, settingsSlice),
  [backendApi.reducerPath]: backendApi.reducer,
  [cambridgeAutocompleteApi.reducerPath]: cambridgeAutocompleteApi.reducer,
});

export const persistedReducer = rootReducer;
// persistReducer(
//   { key: "state", storage },
//   rootReducer
// );

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: { ignoredActions: ["persist/PERSIST"] },
    }).concat(backendApi.middleware, cambridgeAutocompleteApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
