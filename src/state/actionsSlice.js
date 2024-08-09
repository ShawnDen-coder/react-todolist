import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


const initialState = {
  tasks: [{
    content: "",
    havedone: false,
  }],
  status: "idle",
  error: null,
};

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks", async () => {
    const response = await fetch("/api/tasks");
    const data = await response.json();
    return data;
  });

export const addNewTask = createAsyncThunk(
  "tasks/addNewTasj", async () => {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: "new task",
        havedone: false,
      }),
    });
    const data = await response.json();
    return data;
  }
)


const actionsSlice = createSlice({
  name: "actions",
  initialState,
  extraReducers: builder => {
    builder
      .addCase()
  }
})


export default actionsSlice.reducer;