import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {allToDosUrl, singleToDo} from "../api.js";


const initialState = {
  todos: [],
  status: "idle",
  error: null,
};

export const fetchTodos = createAsyncThunk(
  "todo/fetchTasks", async () => {
    const response = await fetch(allToDosUrl);
    return await response.json();
  });

export const toggleTodo = createAsyncThunk(
  "todo/toggleTodo", async (todo) => {
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
  }
)

const todosSlice = createSlice({
  name: "todos",
  initialState,
  extraReducers: builder => {
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
        console.log(state.todos)
        state.todos.map(todo => {
          if (todo.id === action.payload.id) {
            todo.completed = action.payload.completed;
          }
        })
      })
  }
})

export const todosStatus = (state) => state.todos.status;
export const todosError = (state) => state.todos.error;
export const selectTodos = (state) => state.todos.todos;
export default todosSlice.reducer;