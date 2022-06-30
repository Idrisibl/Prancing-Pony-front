import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  news: [],
  newsByCommunity: [],
  adding: false,
};

export const getAllNews = createAsyncThunk(
  "news/getAllNews",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3042/news`);
      const data = await res.json();

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const getNewsByCommunity = createAsyncThunk(
  "news/getAllNews",
  async (id, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3042/news/community/${id}`);
      const data = await res.json();

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const addNews = createAsyncThunk(
  "news/addNews",
  async (data, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const res = await fetch("http://localhost:3042/community", {
        method: "POST",
        body: JSON.stringify({
          community: data.text,
          title: data.optionsValue,
          text: data.bookId,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.auth.token}`,
        },
      });
      data.callback();
      return await res.json();
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const addLikes = createAsyncThunk(
  "news/addLikes",
  async ({ userId, news, callback }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const res = await fetch(`http://localhost:3042/news/likes/${news._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.auth.token}`,
        },
        body: JSON.stringify({ likes: userId }),
      });
      callback();
      return await res.json();
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const deleteLikes = createAsyncThunk(
  "news/deleteLikes",
  async ({ userId, news, callback }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const res = await fetch(
        `http://localhost:3042/news/likes/remove/${news._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.auth.token}`,
          },
          body: JSON.stringify({ likes: userId._id }),
        }
      );
      callback();

      const allNews = await res.json();

      if (allNews.error) {
        return thunkAPI.rejectWithValue(news.error);
      }
      return allNews;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNews.fulfilled, (state, action) => {
        state.news.push(action.payload);
        state.adding = false;
      })
      .addCase(addNews.pending, (state, action) => {
        state.adding = true;
      })
      .addCase(getAllNews.fulfilled, (state, action) => {
        state.news = action.payload;
        state.adding = false;
      })
      .addCase(getAllNews.pending, (state, action) => {
        state.adding = true;
      })
      .addCase(addLikes.fulfilled, (state, action) => {
        state.adding = true;
        state.news.push(action.payload);
      })
      .addCase(addLikes.pending, (state, action) => {
        state.adding = false;
      });
  },
});

export default newsSlice.reducer;
