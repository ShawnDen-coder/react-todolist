import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authApi} from "src/utils/index.js";

const initialState = {
  userinfo: {
    token: localStorage.getItem('token'),
  },
  isLoggedIn: false,
  status: "idle",
  error: null,
};


export const checkTokenAndLogin = createAsyncThunk(
  "auth/checkTokenAndLogin",
  async (_, {rejectWithValue}) => {
    const token = localStorage.getItem('token');
    if (!token) return rejectWithValue("No token found");
    try {
      return await authApi.loginWithToken(token);

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginWithCredentials = createAsyncThunk(
  "auth/loginWithCredentials",
  async ({username, password}, {rejectWithValue}) => {
    try {
      const data = await authApi.loginWithCredentials(username, password);
      localStorage.setItem('token', data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.userinfo = {};
      state.isLoggedIn = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkTokenAndLogin.fulfilled, (state, action) => {
        state.userinfo = action.payload;
        state.isLoggedIn = true;
        state.status = "succeeded";
      })
      .addCase(checkTokenAndLogin.rejected, (state) => {
        state.status = "failed";
        state.login = false;
        localStorage.removeItem('token');
      })
      .addCase(loginWithCredentials.fulfilled, (state, action) => {
        state.userinfo = action.payload;
        state.isLoggedIn = true;
        state.status = "succeeded";
      })
      .addCase(loginWithCredentials.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addMatcher(
        action => action.type.endsWith('/pending'),
        state => {
          state.status = "loading";
        }
      );
  },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;