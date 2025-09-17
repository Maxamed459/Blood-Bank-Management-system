import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// safely read from localStorage (only on client)
const preloadedUser =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user") || "null")
    : null;

// configuration
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: {
    auth: {
      user: preloadedUser,
      token: preloadedUser?.token || "",
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
