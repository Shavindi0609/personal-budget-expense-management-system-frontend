import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


interface AuthState {
  accessToken: string | null;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem("accessToken") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      localStorage.setItem("accessToken", action.payload);
    },
    logout: (state) => {
      state.accessToken = null;
      localStorage.removeItem("accessToken");
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
