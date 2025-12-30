import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/axiosClient";

interface MonthlySavings {
  income: number;
  expense: number;
  savings: number;
}

interface SavingsState {
  monthly: MonthlySavings | null;
  loading: boolean;
  error: string | null;
}

const initialState: SavingsState = {
  monthly: null,
  loading: false,
  error: null,
};

// ----------------------
// FETCH MONTHLY SAVINGS
// ----------------------
export const fetchMonthlySavings = createAsyncThunk<
  MonthlySavings,
  string,
  { rejectValue: string }
>("savings/fetchMonthly", async (month, { rejectWithValue }) => {
  try {
    const res = await api.get(
      `/savings/monthly?month=${month}`
    );
    return res.data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Fetch failed"
    );
  }
});

const savingsSlice = createSlice({
  name: "savings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMonthlySavings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMonthlySavings.fulfilled,
        (state, action: PayloadAction<MonthlySavings>) => {
          state.loading = false;
          state.monthly = action.payload;
        }
      )
      .addCase(fetchMonthlySavings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default savingsSlice.reducer;
