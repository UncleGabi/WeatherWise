import { configureStore } from "@reduxjs/toolkit";
import citiesSlice from "../features/citiesSlice";

export const store = configureStore({
  reducer: {
    citiesData: citiesSlice,
  },
});
