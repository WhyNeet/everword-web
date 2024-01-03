import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Provider } from "./features/settings/provider/types";
import { Defenition } from "./features/flashcards/types";

export const backendApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URI}/api`,
  }),
  endpoints: (builder) => ({
    discover: builder.query<Provider[], void>({
      query: () => "providers/discover",
      transformResponse: (response: { providers: Provider[] }) =>
        response.providers,
    }),
    define: builder.query<Record<string, Defenition[]>, string>({
      query: (word) => `providers/cambridge/${word}`,
      transformResponse: (response: {
        defenitions: Record<string, Defenition[]>;
      }) => response.defenitions,
    }),
  }),
});

export const { useDiscoverQuery, useLazyDefineQuery } = backendApi;
