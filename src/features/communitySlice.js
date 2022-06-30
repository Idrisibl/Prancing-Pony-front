import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getNewsByCommunity } from "./newsSlice";

const initialState = {
  communities: [],
  comunnityById: null,
  loading: false,
};

export const getCommunityById = createAsyncThunk(
  "communities/getCommunityById",
  async (id, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3042/communities/${id}`);
      return await res.json();
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const addCommunity = createAsyncThunk(
  "communities/addCommunity",
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("emblem", data.emblem);

      const state = thunkAPI.getState();
      const res = await fetch("http://localhost:3042/communities", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
      });
      console.log(res);
      data.callback();
      return await res.json();
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const getAllCommunities = createAsyncThunk(
  "communities/getAllCommunities",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3042/communities`);
      const data = await res.json();

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const addMember = createAsyncThunk(
  "communities/addMember",
  async ({ member, id }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();

      const res = await fetch(
        `http://localhost:3001/communities/members/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.auth.token}`,
          },
          body: JSON.stringify({ members: member }),
        }
      );

      return await res.json();
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
export const editEmblem = createAsyncThunk(
  "auth/editEmblem",
  async ({ file }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      formData.append("name");

      const state = thunkAPI.getState();

      const res = await fetch(`http://localhost:3042/communities/avatar`, {
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
      });

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

export const addRating = createAsyncThunk(
  "communities/addRating",
  async ({ member, id }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();

      const res = await fetch(
        `http://localhost:3001/books/communities/rating/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.auth.token}`,
          },
          body: JSON.stringify({ rating: member }),
        }
      );

      return await res.json();
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
export const deleteCommunity = createAsyncThunk(
  "community/deleteCommunity",
  async (id, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3042/communities/${id}`, {
        method: "DELETE",
      });
      return id;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const communitySlice = createSlice({
  name: "communities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCommunityById.fulfilled, (state, action) => {
        state.comunnityById = action.payload;
        state.loading = false;
      })
      .addCase(getCommunityById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addCommunity.fulfilled, (state, action) => {
        state.communities.push(action.payload);
        state.loading = false;
      })
      .addCase(addCommunity.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllCommunities.fulfilled, (state, action) => {
        state.communities = action.payload;
        state.loading = false;
      })
      .addCase(getAllCommunities.pending, (state, action) => {
        state.loading = true;
      });
  },
});

export default communitySlice.reducer;
