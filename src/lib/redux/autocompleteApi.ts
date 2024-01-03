import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cambridgeAutocompleteApi = createApi({
  reducerPath: "api/autocomplete/cambridge",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dictionary.cambridge.org/us/autocomplete",
  }),
  endpoints: (build) => ({
    autocomplete: build.query<{ word: string }[], string>({
      query: (word: string) =>
        `amp?dataset=english&q=${word}&__amp_source_origin=https%3A%2F%2Fdictionary.cambridge.org`,
    }),
  }),
});

export const { useLazyAutocompleteQuery } = cambridgeAutocompleteApi;
