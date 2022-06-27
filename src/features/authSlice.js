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

const initialState = {
  signupIn: false,
  signinUp: false,
  loading: false,
  error: null,
  user: {},
  id: localStorage.getItem("id"),
  token: localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
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
      .addCase(editAvatar.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(editAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(editAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
