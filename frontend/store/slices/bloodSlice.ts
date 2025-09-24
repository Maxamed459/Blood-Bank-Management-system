import axios, { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../BaseUrl";
import { BloodState } from "@/types/types";
import { useAppSelector } from "..";

// initial state
const initialState: BloodState = {
  blood: [],
  loading: false,
  error: null,
};

// create functions that calls api's
// add blood record
export const addBloodRecord = createAsyncThunk(
  "blood/addBloodRecord",
  async (
    bloodData: {
      type: string;
      quantity: number;
      donorId: string;
    },
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as { auth: { token: string } };
      const token = state.auth.token;
      const res = await axios.post(`${BASE_URL}/blood`, bloodData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(
        axiosError.response?.data?.message || axiosError.message
      );
    }
  }
);
// get all blood
export const getAllBloodRecord = createAsyncThunk(
  "blood/getAllBloodRecord",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: { token: string } };
      const token = state.auth.token;
      const res = await axios.get(`${BASE_URL}/blood/stream`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return axiosError.response?.data?.message || axiosError.message;
    }
  }
);
// get blood record by id
export const getBloodRecordById = createAsyncThunk(
  "/blood/getBloodRecordById",
  async (id: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: { token: string } };
      const token = state.auth.token;
      const res = await axios.get(`${BASE_URL}/blood/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(
        axiosError.response?.data?.message || axiosError.message
      );
    }
  }
);
// get blood record by type
export const getBloodRecordByType = createAsyncThunk(
  "/blood/getBloodRecordByType",
  async (type: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: { token: string } };
      const token = state.auth.token;
      const res = await axios.get(`${BASE_URL}/blood/type/${type}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(
        axiosError.response?.data?.message || axiosError.message
      );
    }
  }
);
// update blood record by id
export const updateBloodRecord = createAsyncThunk(
  "/blood/updateBloodRecord",
  async (id: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: { token: string } };
      const token = state.auth.token;
      const res = await axios.put(`${BASE_URL}/blood/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(
        axiosError.response?.data?.message || axiosError.message
      );
    }
  }
);
// delete blood record
export const deleteBloodRecord = createAsyncThunk(
  "/blood/deleteBloodRecord",
  async (id: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: { token: string } };
      const token = state.auth.token;
      const res = await axios.delete(`${BASE_URL}/blood/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(
        axiosError.response?.data?.message || axiosError.message
      );
    }
  }
);

const bloodSlice = createSlice({
  name: "blood",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBloodRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBloodRecord.fulfilled, (state, action) => {
        state.blood = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(addBloodRecord.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(getAllBloodRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBloodRecord.fulfilled, (state, action) => {
        state.blood = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(getAllBloodRecord.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(getBloodRecordById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBloodRecordById.fulfilled, (state, action) => {
        state.blood = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(getBloodRecordById.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(getBloodRecordByType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBloodRecordByType.fulfilled, (state, action) => {
        state.blood = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(getBloodRecordByType.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(updateBloodRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBloodRecord.fulfilled, (state, action) => {
        state.blood = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(updateBloodRecord.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(deleteBloodRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBloodRecord.fulfilled, (state, action) => {
        state.blood = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(deleteBloodRecord.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

// export createdSlice function as a reducer
export const bloodReducer = bloodSlice.reducer;
