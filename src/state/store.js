import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todosSlice.js";
import authReducer from "./authSlice.js";

const store = configureStore({
  reducer: {
    todos: todosReducer,
    auth: authReducer,
  },
});

export default store;
