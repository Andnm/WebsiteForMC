import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../utils/https";
import { ErrorType } from "@/src/types/error.type";

export interface AuthState {
  user: any;
  token: string | null;
  loading: boolean;
  error: string;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: "",
};

interface SignInResponse {
  user: any;
  accessToken: string;
}

export const signIn = createAsyncThunk<
  SignInResponse,
  { email: string; password: string }
>("auth/signIn", async (data, thunkAPI) => {
  try {
    const response = await http.post<SignInResponse>("/auth/signin", {
      email: data.email,
      password: data.password,
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      (error as ErrorType)?.response?.data?.message
    );
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default authSlice.reducer;
