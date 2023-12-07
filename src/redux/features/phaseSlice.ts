import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../utils/https";
import { PhaseType } from "@/src/types/phase.type";
import { ErrorType } from "@/src/types/error.type";
import { getTokenFromSessionStorage } from "../utils/handleToken";

export interface PhaseState {
  data: PhaseType | null;
  loadingPhase: boolean;
  error: string;
}

const initialState: PhaseState = {
  data: null,
  loadingPhase: false,
  error: "",
};

export const getPhaseByProjectId = createAsyncThunk(
  "phase/getProjectById",
  async (projectId: number, thunkAPI) => {
    const token = getTokenFromSessionStorage();
    const configHeader = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await http.get<any>(
        `/phases/${projectId}`,
        configHeader
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        (error as ErrorType)?.response?.data?.message
      );
    }
  }
);

export const phaseSlice = createSlice({
  name: "phase",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get phase by project id
    builder.addCase(getPhaseByProjectId.pending, (state) => {
      state.loadingPhase = true;
      state.error = "";
    });
    builder.addCase(getPhaseByProjectId.fulfilled, (state, action) => {
      state.loadingPhase = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(getPhaseByProjectId.rejected, (state, action) => {
      state.loadingPhase = false;
      state.error = action.payload as string;
    });
  },
});

export default phaseSlice.reducer;
