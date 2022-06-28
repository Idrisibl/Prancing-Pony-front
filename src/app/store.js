import { configureStore } from "@reduxjs/toolkit";

import categoriesSlice from "../features/categoriesSlice";
import tasksSlice from "../features/tasksSlice";
import auth from "../features/authSlice";
import communityReducer from "../features/communitySlice";
import newsReducer from "../features/newsSlice";

export const store = configureStore({
  reducer: {
    auth,
    categoriesSlice,
    tasksSlice,
    communityReducer,
    newsReducer,
  },
});
