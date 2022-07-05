import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getNewsByCommunity } from "./newsSlice";

const initialState = {
  communities: [],
  comunnityById: null,
  requests: [],
  members: [],
  loading: false,
  editLoading: false,
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
  "communitiesAdd/addCommunity",
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
        // с бэка эмблема пустая, по дефолту стоит эмблема
      });
      data.callback();
      return await res.json();
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const getAllCommunities = createAsyncThunk(
  "allCommunities/getAllCommunities",
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

export const leaveRequest = createAsyncThunk(
  "communities/leaveRequest",
  async ({ id, userId, callback }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const res = await fetch(
        `http://localhost:3042/communities/request/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.auth.token}`,
          },
          body: JSON.stringify({ requests: userId }),
        }
      );
      callback();
      return await res.json();
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const addMember = createAsyncThunk(
  "communities/addMember",
  async ({ communityId, requests, getCommunityById }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const res = await fetch(
        `http://localhost:3042/communities/member/${communityId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.auth.token}`,
          },
          body: JSON.stringify({ members: requests }),
        }
      );
      thunkAPI.dispatch(getCommunityById(communityId));
      return await res.json();
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const deleteFromRequest = createAsyncThunk(
  "communities/deleteFromRequest",
  async ({ communityId, requests, getCommunityById }, thunkAPI) => {
    try {
      const res = await fetch(
        `http://localhost:3042/communities/clean/request/${communityId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ requests: requests._id }),
        }
      );
      thunkAPI.dispatch(getCommunityById(communityId));
      return await res.json();
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const editEmblem = createAsyncThunk(
  "auth/editEmblem",
  async ({ file, community, getCommunityById }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("emblem", file);

      const res = await fetch(
        `http://localhost:3042/communities/emblem/${community._id}`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      const data = await res.json();

      thunkAPI.dispatch(getCommunityById(community._id));
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

export const editCommunity = createAsyncThunk(
  "communitiesEdit/editCommunity",
  async ({ formData, community, getCommunityById }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const res = await fetch(
        `http://localhost:3042/communities/edit/community/${community._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: formData.description,
            name: formData.name,
            
          }),
        }
      );
      thunkAPI.dispatch(getCommunityById(community._id));
      return await res.json();
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const addRating = createAsyncThunk(
  "communities/addRating",
  async ({ rating, id }, thunkAPI) => {
    try {
      const res = await fetch(
        `http://localhost:3042/communities/rating/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rating: rating }),
        }
      );

      return await res.json();
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// export const deleteUser = createAsyncThunk(
//   "communities/deleteUser",
//   async ({ members, community }, thunkAPI) => {
//     try {
//       const state = thunkAPI.getState();
//       console.log(members, community);
//       const res = await fetch(
//         `http://localhost:3042/communities/delete/user/${community._id}`,
//         {
//           method: "PATCH",
//           headers: {
            
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${state.auth.token}`,
//           },
//           body: JSON.stringify({
//             members: members,
//           }),
//         }
//       );

//       return await res.json();
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e);
//     }
//   }
// );

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
  reducers: {
    nameMaxSort(state) {
      state.communities = state.communities.sort((a, b) =>
        a.name > b.name ? 1 : -1
      );
    },
    nameMinSort(state) {
      state.communities = state.communities.sort((a, b) =>
        a.name < b.name ? 1 : -1
      );
    },
    membersMaxSort(state) {
      state.communities = state.communities.sort((a, b) =>
        a.members < b.members ? 1 : -1
      );
    },
    membersMinSort(state) {
      state.communities = state.communities.sort((a, b) =>
        a.members > b.members ? 1 : -1
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCommunityById.fulfilled, (state, action) => {
        state.comunnityById = action.payload;
        state.loading = false;
      })
      .addCase(getCommunityById.pending, (state, action) => {
        // state.comunnityById = action.payload;
        state.loading = true;
      })
      .addCase(editCommunity.fulfilled, (state, action) => {
        // state.comunnityById = action.payload
        state.editLoading = false;
      })
      .addCase(editCommunity.pending, (state, action) => {
        state.editLoading = false;
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

export const { nameMaxSort, nameMinSort, membersMaxSort, membersMinSort } =
  communitySlice.actions;
export default communitySlice.reducer;
