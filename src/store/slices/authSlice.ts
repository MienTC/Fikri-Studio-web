// src/store/slices/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../services/authServices";
import type { LoginDto, LoginData } from "../../types/authTypes";

interface AuthState {
  user: LoginData["user"] | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Async thunk
export const login = createAsyncThunk<LoginData | null, LoginDto>(
  "auth/login",
  async (data, thunkAPI) => {
    const res = await authService.login(data);
    if (!res) return thunkAPI.rejectWithValue("Login failed");
    return res;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.user = action.payload.user;
          state.token = action.payload.access_token;
        } else {
          state.error = "Login failed";
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
