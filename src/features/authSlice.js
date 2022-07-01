import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, lastname, tel, email, password }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3042/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, lastname, tel, email, password }),
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

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3042/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.error) {
        return thunkAPI.rejectWithValue(data.error);
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("id", data.id);
        return thunkAPI.fulfillWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchOneUser = createAsyncThunk(
  "auth/fetchOneUser",
  async (id, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3042/users/${id}`);

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

export const fetchAuthUser = createAsyncThunk(
  "auth/fetchAuthUser",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();

      const res = await fetch(`http://localhost:3042/users/authUser/id`, {
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

export const fetchAllUsers = createAsyncThunk(
  "auth/fetchAllUsers",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3042/users`);

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

export const editAvatar = createAsyncThunk(
  "auth/editAvatar",
  async ({ file }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const state = thunkAPI.getState();

      const res = await fetch(`http://localhost:3042/users/avatar`, {
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

export const editInfo = createAsyncThunk(
  "auth/editInfo",
  async (info, thunkAPI) => {
    try {
      const state = thunkAPI.getState();

      const res = await fetch(`http://localhost:3042/users/editInfo`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ info }),
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

export const editUser = createAsyncThunk(
  "auth/editUser",
  async ({ formData }, thunkAPI) => {
    try {
      console.log(formData.email);
      const state = thunkAPI.getState();

      const res = await fetch(`http://localhost:3042/users/editUser`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          lastname: formData.lastname,
          tel: formData.tel,
          email: formData.email,
        }),
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

const initialState = {
  signupIn: false,
  signinUp: false,
  loading: false,
  error: null,
  user: {},
  users: [],
  authUser: {},
  id: localStorage.getItem("id"),
  token: localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    alfMaxSort(state) {
      state.users = state.users.sort((a, b) => (a.name > b.name ? 1 : -1));
    },
    alfMinSort(state) {
      state.users = state.users.sort((a, b) => (a.name < b.name ? 1 : -1));
    },
    ratingMaxSort(state) {
      state.users = state.users.sort((a, b) => (a.rating < b.rating ? 1 : -1));
    },
    ratingMinSort(state) {
      state.users = state.users.sort((a, b) => (a.rating > b.rating ? 1 : -1));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.signupIn = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.signupIn = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.signupIn = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state, action) => {
        state.signinUp = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.signinUp = false;
        state.token = action.payload.token;
        state.id = action.payload.id;
      })
      .addCase(login.rejected, (state, action) => {
        state.signinUp = false;
        state.error = action.payload;
      })
      .addCase(fetchAuthUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAuthUser.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = action.payload;
      })
      .addCase(fetchAuthUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOneUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchOneUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchOneUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editAvatar.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(editAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = action.payload;
      })
      .addCase(editAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editInfo.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(editInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = action.payload;
      })
      .addCase(editInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { alfMaxSort, alfMinSort, ratingMaxSort, ratingMinSort } = authSlice.actions;

export default authSlice.reducer;
