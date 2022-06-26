import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

export const patchTask = createAsyncThunk(
  "tasks/patch",
  async (task, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3042/tasks/${task._id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          title: task.title,
          text: task.text,
          price: task.price,
        }),
      });
      return res.json();
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const addTasks = createAsyncThunk(
  "tasks/post",
  async ({ title, text, price, categories }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();

      const res = await fetch("http://localhost:3042/tasks", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
          "Content-type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
          title,
          text,
          price,
          categories
        }),
      });
      return res.json();
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3042/tasks");
      const data = await res.json();
      return data.reverse();
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const fetchCategoriesTasks = createAsyncThunk(
  "categogories/fetchCatTaskss",
  async (id, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3042/tasks/categories/${id}`);

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

export const removeTask = createAsyncThunk(
  "task/remove",
  async (id, thunkAPI) => {
    try {
      await fetch(`http://localhost:3042/tasks/${id}`, {
        method: "DELETE",
      });

      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(fetchCategoriesTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategoriesTasks.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCategoriesTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addTasks.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload);
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(patchTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((task) => {
          if (task._id === action.payload._id) {
            return action.payload;
          }
          return task;
        });
      });
  },
});

export default tasksSlice.reducer;
