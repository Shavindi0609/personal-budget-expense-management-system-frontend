import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice"; // ← add this
import categoriesReducer from "./slices/categoriesSlice";
import expensesReducer from "./slices/expensesSlice";
import incomesReducer from './slices/incomes.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer, // ← add this
    categories: categoriesReducer,
    expenses: expensesReducer,
      incomes: incomesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
