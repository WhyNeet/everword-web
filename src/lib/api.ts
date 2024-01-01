import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Provider } from "./redux/features/settings/provider/types";

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
  }),
});

export const { useDiscoverQuery } = backendApi;
