import { RootState } from "@/lib/redux/store";

export const selectProviders = (state: RootState) => state.settings.provider;
