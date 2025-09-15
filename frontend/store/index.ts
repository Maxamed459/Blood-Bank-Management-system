import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// configuration

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ✅ Typed hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
