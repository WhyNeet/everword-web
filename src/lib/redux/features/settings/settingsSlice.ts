import { providerSlice } from "./provider/providerSlice";
import { combineSlices } from "@reduxjs/toolkit";

export const settingsSlice = combineSlices(providerSlice);
