import { configureStore } from "@reduxjs/toolkit";

import categoriesSlice from "../features/categoriesSlice";
import tasksSlice from "../features/tasksSlice";
import authReducer from "../features/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categoriesSlice: categoriesSlice,
    tasksSlice: tasksSlice,
  },
});
