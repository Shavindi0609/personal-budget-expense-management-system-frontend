import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice"; // ← add this

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer, // ← add this
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
