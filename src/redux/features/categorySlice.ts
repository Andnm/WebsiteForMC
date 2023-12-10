import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../utils/https";
import { PhaseType } from "@/src/types/phase.type";
import { ErrorType } from "@/src/types/error.type";
import { getTokenFromSessionStorage } from "../utils/handleToken";
import { CategoryType } from "@/src/types/category.type";

export interface CategoryStatus {
  data: CategoryType | null;
  loadingCategory: boolean;
  error: string;
}

const initialState: CategoryStatus = {
  data: null,
  loadingCategory: false,
  error: "",
};

export const getAllCategoryOfPhase = createAsyncThunk(
  "category/getAllCategoryOfPhase",
  async (phaseId: number, thunkAPI) => {
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
        `/categories/all/${phaseId}`,
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
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get phase by project id
    builder.addCase(getAllCategoryOfPhase.pending, (state) => {
      state.loadingCategory = true;
      state.error = "";
    });
    builder.addCase(getAllCategoryOfPhase.fulfilled, (state, action) => {
      state.loadingCategory = false;
      //   state.data = action.payload;
      state.error = "";
    });
    builder.addCase(getAllCategoryOfPhase.rejected, (state, action) => {
      state.loadingCategory = false;
      state.error = action.payload as string;
    });
  },
});

export default phaseSlice.reducer;
