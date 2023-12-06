import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../utils/https";
import { ProjectType } from "@/src/types/project.type";
import { ErrorType } from "@/src/types/error.type";

export interface ListProjectState {
  data: ProjectType[];
  loading: boolean;
  error: string;
}

const initialState: ListProjectState = {
  data: [],
  loading: false,
  error: "",
};

export const createNewProject = createAsyncThunk(
  "listProject/createNewProject",
  async (formData: ProjectType, thunkAPI) => {
    try {
      const response = await http.post<any>("/projects", formData);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        (error as ErrorType)?.response?.data?.message
      );
    }
  }
);

export const getAllProjectByBusiness = createAsyncThunk(
  "listProject/getAllProjectByBusiness",
  async (formData: ProjectType, thunkAPI) => {
    try {
      const response = await http.get<any>("/projects/business");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        (error as ErrorType)?.response?.data?.message
      );
    }
  }
);

export const getAllProjectByEveryOne = createAsyncThunk(
  "listProject/getAllProjectByEveryOne",
  async (_, thunkAPI) => {
    try {
      const response = await http.get<any>("/projects");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        (error as ErrorType)?.response?.data?.message
      );
    }
  }
);

export const projectSlice = createSlice({
  name: "listProject",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //create New Project
    builder.addCase(createNewProject.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(createNewProject.fulfilled, (state, action) => {
      state.loading = false;
      state.data = [action.payload];
      state.error = "";
    });
    builder.addCase(createNewProject.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    //get all project by business
    builder.addCase(getAllProjectByBusiness.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getAllProjectByBusiness.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(getAllProjectByBusiness.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    //get All Project By EveryOne
    builder.addCase(getAllProjectByEveryOne.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getAllProjectByEveryOne.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(getAllProjectByEveryOne.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default projectSlice.reducer;
