import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

export const fetchGetCategories = createAsyncThunk(
  "categories/fetchGetCategories",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3042/categories");
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


export const categoriesSlice = createSlice({
  name: "caregories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(fetchGetCategories.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchGetCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default categoriesSlice.reducer;
