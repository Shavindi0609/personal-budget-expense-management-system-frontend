import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosClient";

interface AdminStats {
  users: number;
  categories: number;
  expenses: number;
  incomes: number;
}

interface AdminState {
  stats: AdminStats | null;
  loading: boolean;
}

const initialState: AdminState = {
  stats: null,
  loading: false,
};

// Async thunk to fetch stats
export const fetchAdminStats = createAsyncThunk(
  "admin/stats",
  async () => {
    const res = await api.get("/admin/stats");
    return res.data;
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchAdminStats.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default adminSlice.reducer;
