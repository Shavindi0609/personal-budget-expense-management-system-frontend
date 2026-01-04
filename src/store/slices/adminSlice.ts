import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosClient";

/* ---------------- TYPES ---------------- */

export interface MonthlyStat {
  month: string;   // e.g. "Jan"
  income: number;
  expense: number;
}

export interface AdminStats {
  users: number;
  categories: number;
  expenses: number;
  incomes: number;
  monthly: MonthlyStat[];
}

interface AdminState {
  stats: AdminStats | null;
  loading: boolean;
}

/* ---------------- INITIAL STATE ---------------- */

const initialState: AdminState = {
  stats: null,
  loading: false,
};

/* ---------------- ASYNC THUNK ---------------- */

export const fetchAdminStats = createAsyncThunk<
  any,
  number
>(
  "admin/stats",
  async (year) => {
    const res = await api.get(`/admin/stats?year=${year}`);
    return res.data;
  }
);


/* ---------------- SLICE ---------------- */

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
