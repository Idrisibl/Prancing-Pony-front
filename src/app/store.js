import { configureStore } from "@reduxjs/toolkit";

import categoriesSlice from "../features/categoriesSlice";
import tasksSlice from "../features/tasksSlice";
import auth from "../features/authSlice";
import communityReducer from "../features/communitySlice";
import newsReducer from "../features/newsSlice";
import reviewsReducer from "../features/reviewsSlice";
import responseReducer from "../features/responseSlice";
import roomSlice from "../features/roomSlice";
import  messageSlice  from "../features/messageSlice";

export const store = configureStore({
  reducer: {
    auth,
    categoriesSlice,
    tasksSlice,
    communityReducer,
    newsReducer,
    reviewsReducer,
    responseReducer,
    room: roomSlice,
    message: messageSlice
  },
});
