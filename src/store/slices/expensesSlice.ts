import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


import api from "../../api/axiosClient";

interface Expense {
  _id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

interface ExpensesState {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
}

const initialState: ExpensesState = {
  expenses: [],
  loading: false,
  error: null,
};

// Fetch expenses
export const fetchExpenses = createAsyncThunk(
  "expenses/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/expenses");
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Fetch failed");
    }
  }
);

// Add expense
export const addExpense = createAsyncThunk(
  "expenses/add",
  async (data: Omit<Expense, "_id">, { rejectWithValue }) => {
    try {
      const res = await api.post("/expenses", data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Add failed");
    }
  }
);

// Delete expense
export const deleteExpense = createAsyncThunk(
  "expenses/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/expenses/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  }
);

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action: PayloadAction<Expense[]>) => {
        state.loading = false;
        state.expenses = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addExpense.fulfilled, (state, action: PayloadAction<Expense>) => {
        state.expenses.push(action.payload);
      })
      .addCase(deleteExpense.fulfilled, (state, action: PayloadAction<string>) => {
        state.expenses = state.expenses.filter((e) => e._id !== action.payload);
      });
  },
});

export default expensesSlice.reducer;
