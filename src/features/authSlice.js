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

export const deductFromWallet = createAsyncThunk(
  "auth/deductFromWallet",
  async ({ price }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();

      const res = await fetch(`http://localhost:3042/users/wallet/deduct`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ wallet: price }),
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

export const addWallet = createAsyncThunk(
  "auth/addWallet",
  async ({ price }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();

      const res = await fetch(`http://localhost:3042/users/addWallet`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ wallet: price }),
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

export const confirm = createAsyncThunk(
  "auth/confirm",
  async ({ id, taskId }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();

      const res = await fetch(`http://localhost:3042/users/bag/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bag: taskId }),
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

export const sendConfirmation = createAsyncThunk(
  "auth/sendConfirmation",
  async ({ id, task }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();

      const res = await fetch(
        `http://localhost:3042/users/confirmation/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${state.auth.token}`,
            "Content-type": "application/json",
          },
          body: JSON.stringify({ task }),
        }
      );

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

export const addToFinished = createAsyncThunk(
  "auth/addToFinished",
  async ({ userId, taskId }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();

      const res = await fetch(
        `http://localhost:3042/users/${userId}/finished/${taskId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${state.auth.token}`,
            "Content-type": "application/json",
          },
        }
      );

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

export const addToFailed = createAsyncThunk(
  "auth/addToFailed",
  async ({ userId, taskId }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();

      const res = await fetch(
        `http://localhost:3042/users/${userId}/failed/${taskId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${state.auth.token}`,
            "Content-type": "application/json",
          },
        }
      );

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

export const removeFromConfirmation = createAsyncThunk(
  "auth/removeFromConfirmation",
  async (id, thunkAPI) => {
    try {
      const state = thunkAPI.getState();

      const res = await fetch(
        `http://localhost:3042/users/confirmation/remove/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${state.auth.token}`,
            "Content-type": "application/json",
          },
        }
      );

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

export const removeFromBag = createAsyncThunk(
  "auth/removeFromBag",
  async ({ userId, taskId }, thunkAPI) => {
    try {
      const res = await fetch(
        `http://localhost:3042/users/bag/remove/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ bag: taskId }),
        }
      );

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

export const addToFavourites = createAsyncThunk(
  "auth/addToFavourites",
  async ({ taskId }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();

      const res = await fetch(`http://localhost:3042/users/favourites`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({ favourites: taskId }),
      });

      const data = await res.json();
      console.log(data);

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

export const removeFromFavourites = createAsyncThunk(
  "auth/removeFromFavourites",
  async ({ taskId }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();

      const res = await fetch(`http://localhost:3042/users/favourites/remove`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({ favourites: taskId }),
      });

      const data = await res.json();
      console.log(data);

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

export const addToFriends = createAsyncThunk(
  "auth/addToFriends",
  async ({ userId }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();

      const res = await fetch(`http://localhost:3042/users/friends`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({ friends: userId }),
      });

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

export const removeFromFriends = createAsyncThunk(
  "auth/removeFromFriends",
  async ({ userId }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();

      const res = await fetch(`http://localhost:3042/users/friends/remove`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({ friends: userId }),
      });

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
        state.user = action.payload;
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
        state.user = action.payload;
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
      })
      .addCase(deductFromWallet.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deductFromWallet.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = action.payload;
      })
      .addCase(deductFromWallet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addWallet.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addWallet.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = action.payload;
      })
      .addCase(addWallet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(confirm.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(confirm.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(confirm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendConfirmation.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(sendConfirmation.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(sendConfirmation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToFinished.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addToFinished.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(addToFinished.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeFromConfirmation.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(removeFromConfirmation.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = action.payload;
      })
      .addCase(removeFromConfirmation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeFromBag.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(removeFromBag.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(removeFromBag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToFailed.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addToFailed.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(addToFailed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToFavourites.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addToFavourites.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = action.payload;
      })
      .addCase(addToFavourites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeFromFavourites.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(removeFromFavourites.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = action.payload;
      })
      .addCase(removeFromFavourites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToFriends.pending, (state, action) => {

        state.loading = true;
      })
      .addCase(addToFriends.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = action.payload;
      })
      .addCase(addToFriends.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeFromFriends.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(removeFromFriends.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = action.payload;
      })
      .addCase(removeFromFriends.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { alfMaxSort, alfMinSort, ratingMaxSort, ratingMinSort } =
  authSlice.actions;

export default authSlice.reducer;
