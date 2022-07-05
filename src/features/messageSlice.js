import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  message:[],
};

export const addMessage = createAsyncThunk(
  "message/addMessage",
  async ({ rooms, author, text, time }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3042/messages", {
        method: "POST",
        headers: {
          "Content-type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
          author,
          text
        }),
      });
      const data = await res.json();
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const fetchMessage = createAsyncThunk(
  "message/fetchMessage",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3042/messages");
      const data = await res.json();
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessage.fulfilled, (state, action) => {
        state.message = action.payload;
      })
      .addCase(addMessage.fulfilled, (state, action) => {
        state.message.push(action.payload);
      });
  },
});

export default messageSlice.reducer;
