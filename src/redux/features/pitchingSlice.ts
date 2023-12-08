import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../utils/https";
import { RegisterPitchingType } from "@/src/types/register-pitching.type";
import { ErrorType } from "@/src/types/error.type";
import { getTokenFromSessionStorage } from "../utils/handleToken";

export interface PitchingState {
  data: any;
  loadingPitching: boolean;
  error: string;
}

const initialState: PitchingState = {
  data: null,
  loadingPitching: false,
  error: "",
};

//get all register pitching
export const getAllRegisterPitching = createAsyncThunk(
  "pitching/getAllGroupAreMembers",
  async (_, thunkAPI) => {
    const token = getTokenFromSessionStorage();
    const configHeader = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await http.get<any>(`/register-pitching`, configHeader);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        (error as ErrorType)?.response?.data?.message
      );
    }
  }
);

//register pitching
interface RegisterPitchingBody {
  groupId: number;
  projectId: number;
}

export const registerPitching = createAsyncThunk(
  "pitching/registerPitching",
  async ({ groupId, projectId }: RegisterPitchingBody, thunkAPI) => {
    const token = getTokenFromSessionStorage();
    const configHeader = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await http.post<any>(
        `/register-pitching`,
        { groupId, projectId },
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

export const pitchingSlice = createSlice({
  name: "pitching",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get all register pitching
    builder.addCase(getAllRegisterPitching.pending, (state) => {
      state.loadingPitching = true;
      state.error = "";
    });
    builder.addCase(getAllRegisterPitching.fulfilled, (state, action) => {
      state.loadingPitching = false;
      state.error = "";
    });
    builder.addCase(getAllRegisterPitching.rejected, (state, action) => {
      state.loadingPitching = false;
      state.error = action.payload as string;
    });

    //create register pitching
    builder.addCase(registerPitching.pending, (state) => {
      state.loadingPitching = true;
      state.error = "";
    });
    builder.addCase(registerPitching.fulfilled, (state, action) => {
      state.loadingPitching = false;
      state.error = "";
    });
    builder.addCase(registerPitching.rejected, (state, action) => {
      state.loadingPitching = false;
      state.error = action.payload as string;
    });
  },
});

export default pitchingSlice.reducer;
