// TODO:1 Import necessary modules
import axios, { AxiosError } from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL } from "../BaseUrl";
import { AuthState, RegisterAuthResponse } from "@/types/types";
import { redirect } from "next/navigation";

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  staff: [],
  loading: false,
  error: null,
};
// TODO:2 create functions to call apis

// register user
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    userData: {
      fullname: string;
      email: string;
      username: string;
      password: string;
      blood_type: string;
      gender: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/register`, userData);
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(
        axiosError.response?.data?.message || axiosError.message
      );
    }
  }
);
// register admin
export const registerAdmin = createAsyncThunk(
  "auth/registerAdmin",
  async (
    userData: {
      fullname: string;
      email: string;
      username: string;
      password: string;
      blood_type: string;
      gender: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${BASE_URL}/auth/register-admin`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(
        axiosError.response?.data?.message || axiosError.message
      );
    }
  }
);

// register staff
export const registerStaff = createAsyncThunk(
  "auth/registerStaff",
  async (
    userData: {
      fullname: string;
      email: string;
      username: string;
      password: string;
      blood_type: string;
      gender: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${BASE_URL}/auth/register-staff`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(
        axiosError.response?.data?.message || axiosError.message
      );
    }
  }
);

// login
export const login = createAsyncThunk(
  "auth/login",
  async (
    userData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, userData);
      return res.data; // { user, token }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(
        axiosError.response?.data?.message || axiosError.message
      );
    }
  }
);

// get all users
export const getAllUsers = createAsyncThunk("auth/getAllUsers", async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${BASE_URL}/auth/users/stream`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    return axiosError.response?.data?.message || axiosError.message;
  }
});

// profile
export const profile = createAsyncThunk("auth/profile", async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${BASE_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    return axiosError.response?.data?.message || axiosError.message;
  }
});

// get all staff
export const getStaff = createAsyncThunk("auth/getStaff", async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${BASE_URL}/auth/staff`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    return axiosError.response?.data?.message || axiosError.message;
  }
});

// TODO:3 setup "createSlice" function
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      // Optional: clear token from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      redirect("/auth/login");
    },
    loadUserFromStorage: (state) => {
      const saved = localStorage.getItem("user");
      if (saved) {
        state.user = JSON.parse(saved);
      }
    },
    loadTokenFromStorage: (state) => {
      const saved = localStorage.getItem("token");
      if (saved) {
        state.token = JSON.parse(saved);
      }
    },
  },
  extraReducers: (builder) => {
    // registerUser
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<RegisterAuthResponse>) => {
          state.loading = false;
          state.user = action.payload.newUser;
          localStorage.setItem("user", JSON.stringify(action.payload.newUser));
          localStorage.setItem("token", action.payload.token);
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // registerAdmin
      .addCase(registerAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAdmin.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // registerStaff
      .addCase(registerStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerStaff.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(profile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(profile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.staff = action.payload.staff;
      })
      .addCase(getStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// TODO:4 Export createSlice function as a reducer
export const { logout, loadUserFromStorage, loadTokenFromStorage } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
