import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "../features/categoriesSlice";
import tasksSlice from "../features/tasksSlice";

export const store = configureStore({
  reducer: {
    categoriesSlice: categoriesSlice,
    tasksSlice: tasksSlice
  },
});
