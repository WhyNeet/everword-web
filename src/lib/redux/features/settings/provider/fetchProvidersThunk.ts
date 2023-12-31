import { apiInstance } from "@/lib/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Provider } from "./types";

export const fetchProvidersThunk = createAsyncThunk<Provider[], void>(
  "fetchProviders",
  async () => {
    const response = await apiInstance.get("/providers/discover");
    const data = response.data;

    return data.providers;
  }
);
