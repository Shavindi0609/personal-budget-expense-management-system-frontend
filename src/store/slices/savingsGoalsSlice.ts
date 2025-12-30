import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosClient";

export interface SavingsGoal {
  _id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
}

interface GoalsState {
  goals: SavingsGoal[];
  loading: boolean;
  error: string | null;
}

const initialState: GoalsState = {
  goals: [],
  loading: false,
  error: null,
};

// 📋 FETCH GOALS
export const fetchGoals = createAsyncThunk<
  SavingsGoal[],
  void,
  { rejectValue: string }
>("goals/fetch", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("/savings/goals");
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Fetch failed");
  }
});

// 🎯 CREATE GOAL
export const createGoal = createAsyncThunk<
  SavingsGoal,
  { title: string; targetAmount: number },
  { rejectValue: string }
>("goals/create", async (data, { rejectWithValue }) => {
  try {
    const res = await api.post("/savings/goals", data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Create failed");
  }
});

const savingsGoalsSlice = createSlice({
  name: "savingsGoals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.loading = false;
        state.goals = action.payload;
      })
      .addCase(fetchGoals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.goals.unshift(action.payload);
      });
  },
});

export default savingsGoalsSlice.reducer;
