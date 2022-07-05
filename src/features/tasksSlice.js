import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  currentTask: {},
  loading: false,
};

export const patchTasks = createAsyncThunk(
  "tasks/patch",
  async ({ formData, id }, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3042/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          title: formData.title,
          text: formData.text,
          price: formData.price,
        }),
      });
      const task = await res.json();
      return task;
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
          categories,
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
      const state = thunkAPI.getState();

      await fetch(`http://localhost:3042/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
      });

      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getTaskById = createAsyncThunk(
  "tasks/getTasks",
  async (id, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3042/tasks/${id}`);
      const task = await res.json();
      return task;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const getTasksForUser = createAsyncThunk(
  "tasks/getTasksForUser",
  async (id, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3042/tasks/user/${id}`);
      const task = await res.json();
      return task;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const changeAviability = createAsyncThunk(
  "tasks/changeAviability",
  async ({ taskId }, thunkAPI) => {
    try {
      const res = await fetch(
        `http://localhost:3042/tasks/${taskId}/availability`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const task = await res.json();
      return task;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    maxSort(state) {
      state.tasks = state.tasks.sort((a, b) => (a.price < b.price ? 1 : -1));
    },
    minSort(state) {
      state.tasks = state.tasks.sort((a, b) => (a.price > b.price ? 1 : -1));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.pending, (state, action) => {
        state.loading = true;
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
        state.currentTask = {};
      })
      .addCase(patchTasks.fulfilled, (state, action) => {
        state.currentTask = action.payload;
      })
      .addCase(getTaskById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTask = action.payload;
      })
      .addCase(getTaskById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(changeAviability.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTask = action.payload;
      })
      .addCase(changeAviability.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getTasksForUser.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(getTasksForUser.pending, (state, action) => {
        state.loading = true;
      });
  },
});

export const { maxSort, minSort } = tasksSlice.actions;

export default tasksSlice.reducer;
