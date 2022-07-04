import { configureStore } from "@reduxjs/toolkit";

import categoriesSlice from "../features/categoriesSlice";
import tasksSlice from "../features/tasksSlice";
import authReducer from "../features/authSlice";
import roomSlice from "../features/roomSlice";
import  messageSlice  from "../features/messageSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categoriesSlice: categoriesSlice,
    tasksSlice: tasksSlice,
    room: roomSlice,
    message: messageSlice
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});
