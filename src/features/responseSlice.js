import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const sendResponse = createAsyncThunk(
  "responses/sendResponse",
  async ({ text, task }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();

      const res = await fetch("http://localhost:3042/responses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, task }),
      });

      const data = await res.json().reverse();

      if (data.error) {
        return thunkAPI.rejectWithValue(data.error);
      } else {
        return thunkAPI.fulfillWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchResponses = createAsyncThunk(
  "responses/fetchResponses",
  async ({ id }, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3042/responses/task/${id}`);

      const data = await res.json();

      if (data.error) {
        return thunkAPI.rejectWithValue(data.error);
      } else {
        return thunkAPI.fulfillWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const clearResponses = createAsyncThunk(
  "responses/clearResponses",
  async ({ taskId }, thunkAPI) => {
    try {
      const res = await fetch(
        `http://localhost:3042/responses/task/${taskId}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.error) {
        return thunkAPI.rejectWithValue(data.error);
      } else {
        return thunkAPI.fulfillWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  responses: [],
};

const responseSlice = createSlice({
  name: "responses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendResponse.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(sendResponse.fulfilled, (state, action) => {
        state.loading = false;
        state.responses.unshift(action.payload);
      })
      .addCase(sendResponse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchResponses.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchResponses.fulfilled, (state, action) => {
        state.loading = false;
        state.responses = action.payload;
      })
      .addCase(fetchResponses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(clearResponses.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(clearResponses.fulfilled, (state, action) => {
        state.loading = false;
        state.responses = [];
      })
      .addCase(clearResponses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default responseSlice.reducer;
