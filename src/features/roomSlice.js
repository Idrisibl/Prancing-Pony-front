import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  rooms: [],
};

export const addRoom = createAsyncThunk(
  "room/addRoom",
  async ({ addressee, author }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3042/rooms", {
        method: "POST",
        headers: {
          "Content-type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
          addressee,
          author,
        }),
      });
      const data = await res.json();
      //console.log(data);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const fetchRoom = createAsyncThunk(
  "room/fetchRoom",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3042/rooms");
      const data = await res.json();
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoom.fulfilled, (state, action) => {
        state.rooms = action.payload;
      })
      .addCase(addRoom.fulfilled, (state, action) => {
        state.rooms.push(action.payload);
      });
  },
});

export default roomSlice.reducer;
