import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../utils/https";
import { ErrorType } from "@/src/types/error.type";

import {
  saveTokenToSessionStorage,
  removeTokenFromSessionStorage,
  decodeTokenToUser,
} from "../utils/handleToken";

import {
  saveUserToSessionStorage,
  removeUserFromSessionStorage,
} from "../utils/handleUser";

export interface AuthState {
  isLogin: boolean;
  loading: boolean;
  error: string;
}

const initialState: AuthState = {
  isLogin: false,
  loading: false,
  error: "",
};

interface SignInResponse {
  accessToken: string;
  role_name?: string;
}

export const login = createAsyncThunk<
  SignInResponse,
  { email: string; password: string }
>("auth/signIn", async (data, thunkAPI) => {
  try {
    const response = await http.post<SignInResponse>("/auth/signin", {
      email: data.email,
      password: data.password,
    });

    saveTokenToSessionStorage(response.data.accessToken);

    const user = decodeTokenToUser(response.data.accessToken);
    saveUserToSessionStorage(user);

    return user;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      (error as ErrorType)?.response?.data?.message
    );
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      removeTokenFromSessionStorage();
      removeUserFromSessionStorage();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.isLogin = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
