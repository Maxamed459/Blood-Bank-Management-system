import axios, { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../BaseUrl";
import { Request, RequestState } from "@/types/types";
import { useAppSelector } from "..";

// initial state
const initialState: RequestState = {
  request: [],
  currentRequest: null,
  loading: false,
  error: null,
};

// create functions that calls api's
// add request
export const addRequest = createAsyncThunk(
  "request/addRequest",
  async (
    requestData: {
      blood_type: string;
      quantity_needed: number;
      hospital: string;
    },
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as { auth: { token: string } };
      const token = state.auth.token;
      const res = await axios.post(`${BASE_URL}/request`, requestData, {
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
// get all request
export const getAllRequests = createAsyncThunk(
  "request/getAllRequests",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: { token: string } };
      const token = state.auth.token;
      const res = await axios.get(`${BASE_URL}/request`, {
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
// get request by type
export const getRequestByType = createAsyncThunk(
  "/request/getRequestByType",
  async (type: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: { token: string } };
      const token = state.auth.token;
      const res = await axios.get(`${BASE_URL}/request/type/${type}`, {
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
// update request
export const updateRequest = createAsyncThunk<
  Request, // return type
  {
    id: string;
    requestData: {
      status: string;
    };
  },
  { rejectValue: string }
>(
  "/blood/updateRequest",
  async ({ id, requestData }, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: { token: string } };
      const token = state.auth.token;

      // use PUT or PATCH to update
      const res = await axios.put(`${BASE_URL}/request/${id}`, requestData, {
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

// deleting request by id
export const deleteRequest = createAsyncThunk(
  "/blood/deleteRequest",
  async (id: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: { token: string } };
      const token = state.auth.token;
      const res = await axios.put(`${BASE_URL}/request/${id}`, {
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

const requestSlice = createSlice({
  name: "blood",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRequest.fulfilled, (state, action) => {
        state.request = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(addRequest.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(getAllRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllRequests.fulfilled, (state, action) => {
        state.request = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(getAllRequests.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(getRequestByType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRequestByType.fulfilled, (state, action) => {
        state.request = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(getRequestByType.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(updateRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRequest.fulfilled, (state, action) => {
        state.currentRequest = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(updateRequest.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(deleteRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRequest.fulfilled, (state, action) => {
        state.request = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(deleteRequest.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

// export createdSlice function as a reducer
export const requestReducer = requestSlice.reducer;
