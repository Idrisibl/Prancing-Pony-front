import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviews: [],
  loading: false,
  error: null,
};

export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async ({ userId }, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3042/reviews/users/${userId}`);
      const data = await res.json();
      if (data.error) {
        return thunkAPI.rejectWithValue(data.error);
      } else {
        return thunkAPI.fulfillWithValue(data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.loading = false;
      })
      .addCase(fetchReviews.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reviewsSlice.reducer;
