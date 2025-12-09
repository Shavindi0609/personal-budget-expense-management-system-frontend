import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/axiosClient";

export interface Expense {
  _id: string;
  title: string;
  amount: number;
  category: string;
  notes?: string;
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

// ----------------------
// FETCH EXPENSES
// ----------------------
export const fetchExpenses = createAsyncThunk<
  Expense[],
  void,
  { rejectValue: string }
>("expenses/fetch", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("/expenses");
    return res.data.expenses;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Fetch failed");
  }
});

// ----------------------
// ADD EXPENSE
// ----------------------
export const addExpense = createAsyncThunk<
  Expense,
  {
    title: string;
    amount: number;
    category: string;
    notes?: string;
    date: string;
  },
  { rejectValue: string }
>("expenses/add", async (data, { rejectWithValue }) => {
  try {
    const res = await api.post("/expenses", data);
    return res.data.expense;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Add failed");
  }
});

// ----------------------
// DELETE EXPENSE
// ----------------------
export const deleteExpense = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("expenses/delete", async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/expenses/${id}`);
    return id;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Delete failed");
  }
});

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchExpenses.fulfilled,
        (state, action: PayloadAction<Expense[]>) => {
          state.loading = false;
          state.expenses = action.payload;
        }
      )
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ADD
      .addCase(addExpense.fulfilled, (state, action: PayloadAction<Expense>) => {
        state.expenses.unshift(action.payload);
      })

      // DELETE
      .addCase(
        deleteExpense.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.expenses = state.expenses.filter(
            (e) => e._id !== action.payload
          );
        }
      );
  },
});

export default expensesSlice.reducer;
