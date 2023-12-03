import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../utils/https";
import { UserType } from "@/src/types/user.type"; 


export interface UserState {
  token: string | null;
  loading: boolean;
  error: string;
}

const initialState: UserState = {
  token: null,
  loading: false,
  error: "",
};


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
   
  },
});

export default userSlice.reducer;
