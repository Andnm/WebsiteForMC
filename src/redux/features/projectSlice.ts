import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../utils/https";
import { ProjectType } from "@/src/types/project.type";
import { ErrorType } from "@/src/types/error.type";
import { getTokenFromSessionStorage } from "../utils/handleToken";

export interface ListProjectState {
  data: ProjectType[];
  loadingData: boolean;
  loadingRow: boolean;
  error: string;
}

const initialState: ListProjectState = {
  data: [],
  loadingData: false,
  loadingRow: false,
  error: "",
};

export const createNewProject = createAsyncThunk(
  "listProject/createNewProject",
  async (formData: ProjectType, thunkAPI) => {
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
        "/projects",
        formData,
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

export const getAllProjectByBusiness = createAsyncThunk(
  "listProject/getAllProjectByBusiness",
  async (formData: ProjectType, thunkAPI) => {
    const token = getTokenFromSessionStorage();
    const configHeader = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await http.get<any>("/projects/business", configHeader);

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

export const confirmProjectByAdmin = createAsyncThunk(
  "listProject/confirmProjectByAdmin",
  async (id: number, thunkAPI) => {
    try {
      const token = getTokenFromSessionStorage();
      console.log("token", token);

      const configHeader = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await http.patch<any>(
        `/projects/confirm-project/${id}`,
        configHeader
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        (error as ErrorType)?.response?.data?.message
      );
    }
  }
);

export const updateProjectByAdmin = createAsyncThunk(
  "listProject/updateProjectByAdmin",
  async (dataResponse: any, thunkAPI) => {
    const { id, data } = dataResponse;
    const token = getTokenFromSessionStorage();
    const configHeader = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await http.patch<any>(
        `/projects/${id}`,
        data,
        configHeader
      );
      console.log('response')
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
      state.loadingData = true;
      state.error = "";
    });
    builder.addCase(createNewProject.fulfilled, (state, action) => {
      state.loadingData = false;
      state.data = [action.payload];
      state.error = "";
    });
    builder.addCase(createNewProject.rejected, (state, action) => {
      state.loadingData = false;
      state.error = action.payload as string;
    });

    //get all project by business
    builder.addCase(getAllProjectByBusiness.pending, (state) => {
      state.loadingData = true;
      state.error = "";
    });
    builder.addCase(getAllProjectByBusiness.fulfilled, (state, action) => {
      state.loadingData = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(getAllProjectByBusiness.rejected, (state, action) => {
      state.loadingData = false;
      state.error = action.payload as string;
    });

    //get All Project By EveryOne
    builder.addCase(getAllProjectByEveryOne.pending, (state) => {
      state.loadingData = true;
      state.error = "";
    });
    builder.addCase(getAllProjectByEveryOne.fulfilled, (state, action) => {
      state.loadingData = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(getAllProjectByEveryOne.rejected, (state, action) => {
      state.loadingData = false;
      state.error = action.payload as string;
    });

    //confirm project by admin
    builder.addCase(confirmProjectByAdmin.pending, (state) => {
      state.loadingRow = true;
      state.error = "";
    });
    builder.addCase(confirmProjectByAdmin.fulfilled, (state, action) => {
      state.loadingRow = false;
      state.error = "";
    });
    builder.addCase(confirmProjectByAdmin.rejected, (state, action) => {
      state.loadingRow = false;
      state.error = action.payload as string;
    });

    //update and confirm project by admin
    builder.addCase(updateProjectByAdmin.pending, (state) => {
      state.loadingRow = true;
      state.error = "";
    });
    builder.addCase(updateProjectByAdmin.fulfilled, (state, action) => {
      state.loadingRow = false;
      // state.data = action.payload;
      state.error = "";
    });
    builder.addCase(updateProjectByAdmin.rejected, (state, action) => {
      state.loadingRow = false;
      state.error = action.payload as string;
    });
  },
});

export default projectSlice.reducer;