import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {addNewToDo, allToDosUrl, singleToDo} from "../api.js";

const initialState = {
  todos: [],
  status: "idle",
  error: null,
};

export const fetchTodos = createAsyncThunk(
  "todo/fetchTasks",
  async (userid) => {
    const response = await fetch(allToDosUrl(userid));
    return await response.json();
  },
);

export const toggleTodo = createAsyncThunk("todo/toggleTodo", async (todo) => {
  const response = await fetch(singleToDo(todo.id), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      completed: !todo.completed,
    }),
  });
  return await response.json();
});

export const deleteTodo = createAsyncThunk("todo/deleteTodo", async (id) => {
  const response = await fetch(singleToDo(id), {
    method: "DELETE",
  });
  return await response.json();
});

export const addNewTodo = createAsyncThunk("todo/addNewTodo", async (todo) => {
  const response = await fetch(addNewToDo, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  return await response.json();
});

const todosSlice = createSlice({
  name: "todos",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = action.payload.todos;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            todo.completed = action.payload.completed;
          }
        });
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(
          (todo) => todo.id !== action.payload.id,
        );
      });
  },
});

export const currentUserInfo = (state) => state.auth.userinfo;
export const todosStatus = (state) => state.todos.status;
export const todosError = (state) => state.todos.error;
export const selectTodos = (state) => state.todos.todos;
export default todosSlice.reducer;
