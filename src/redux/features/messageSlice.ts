import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../utils/https";
import { PhaseType } from "@/src/types/phase.type";
import { ErrorType } from "@/src/types/error.type";
import { getTokenFromSessionStorage } from "../utils/handleToken";
import { EvidenceType } from "@/src/types/evidence.type";

export interface UserChatStatus {
  data: any | null;
  loadingUserChat: boolean;
  error: string;
}

const initialState: UserChatStatus = {
  data: null,
  loadingUserChat: false,
  error: "",
};


export const createMessage = createAsyncThunk(
  "message/createMessage",
  async (dataBody: any, thunkAPI) => {
    const token = getTokenFromSessionStorage();
    const configHeader = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await http.post<any>(`/evidences`, dataBody, configHeader);

      console.log("dataBody", dataBody)
      return response.data;
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(
        (error as ErrorType)?.response?.data?.message
      );
    }
  }
);

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //create evidence
    builder.addCase(createMessage.pending, (state) => {
      state.loadingUserChat = true;
      state.error = "";
    });
    builder.addCase(createMessage.fulfilled, (state, action) => {
      state.loadingUserChat = false;
      //   state.data = action.payload;
      state.error = "";
    });
    builder.addCase(createMessage.rejected, (state, action) => {
      state.loadingUserChat = false;
      state.error = action.payload as string;
    });
  },
});

export default messageSlice.reducer;
