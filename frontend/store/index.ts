import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { bloodReducer } from "./slices/bloodSlice";
import { requestReducer } from "./slices/requestSlice";

// safely read from localStorage (only on client)
const preloadedUser =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user") || "null")
    : null;

const preloadedToken =
  typeof window !== "undefined"
    ? localStorage.getItem("token") || "null"
    : null;

// configuration
const store = configureStore({
  reducer: {
    auth: authReducer,
    blood: bloodReducer,
    request: requestReducer,
  },
  preloadedState: {
    auth: {
      user: preloadedUser,
      staff: preloadedUser?.staff || "",
      token: preloadedToken,
      loading: false,
      error: null,
    },
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ✅ Typed hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
