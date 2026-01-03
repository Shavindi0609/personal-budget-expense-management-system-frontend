import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axiosClient";

interface ProfileState {
  user: any | null;
  loading: boolean;
}

const initialState: ProfileState = {
  user: null,
  loading: false,
};

export const fetchMyProfile = createAsyncThunk(
  "profile/fetch",
  async () => {
    const res = await api.get("/profile/me");
    return res.data.user;
  }
);

export const updateMyProfile = createAsyncThunk(
  "profile/update",
  async (data: { name: string; email: string; password?: string }) => {
    const res = await api.put("/profile/me", data);
    return res.data.user;
  }
);

const slice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchMyProfile.pending, (s) => {
      s.loading = true;
    });
    b.addCase(fetchMyProfile.fulfilled, (s, a) => {
      s.loading = false;
      s.user = a.payload;
    });
    b.addCase(updateMyProfile.fulfilled, (s, a) => {
      s.user = a.payload;
    });
  },
});

export default slice.reducer;
