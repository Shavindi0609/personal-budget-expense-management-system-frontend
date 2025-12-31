import React, { useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchExpenses } from "../store/slices/expensesSlice";
import { fetchIncomes } from "../store/slices/incomes.slice";

const DashboardUser: React.FC = () => {
  const dispatch = useAppDispatch();

  const { expenses } = useAppSelector((s) => s.expenses);
  const { items: incomes } = useAppSelector((s) => s.incomes);
  const user = useAppSelector((s) => s.user.user);

  useEffect(() => {
    dispatch(fetchExpenses());
    dispatch(fetchIncomes());
  }, [dispatch]);

  // 🔢 Calculations
  const totalIncome = incomes.reduce((s, i) => s + i.amount, 0);
  const totalExpense = expenses.reduce((s, e) => s + e.amount, 0);
  const balance = totalIncome - totalExpense;

  // 🕒 Recent Transactions (last 5)
  const recentTransactions = [
    ...expenses.map((e) => ({
      type: "expense",
      title: e.notes || e.title,
      amount: e.amount,
      date: e.date,
    })),
    ...incomes.map((i) => ({
      type: "income",
      title: i.source,
      amount: i.amount,
      date: i.date,
    })),
  ]
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 5);

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Welcome, {user?.name || "User"} 👋
        </h1>

        <img
          src="https://i.pravatar.cc/40"
          className="w-10 h-10 rounded-full"
        />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

        {/* Balance */}
        <div className="bg-purple-700 text-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-sm opacity-80">Balance</h2>
          <p className="text-3xl font-bold mt-2">
            Rs. {balance.toLocaleString()}
          </p>
          <p className="text-xs mt-1 opacity-80">Income − Expense</p>
        </div>

        {/* Income */}
        <div className="bg-green-100 p-6 rounded-2xl shadow-lg">
          <h2 className="text-sm text-green-700">Total Income</h2>
          <p className="text-2xl font-bold mt-2 text-green-800">
            Rs. {totalIncome.toLocaleString()}
          </p>
        </div>

        {/* Expense */}
        <div className="bg-red-100 p-6 rounded-2xl shadow-lg">
          <h2 className="text-sm text-red-700">Total Expenses</h2>
          <p className="text-2xl font-bold mt-2 text-red-800">
            Rs. {totalExpense.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
          Recent Transactions
        </h2>

        {recentTransactions.length === 0 ? (
          <p className="text-gray-500">No transactions yet</p>
        ) : (
          <ul className="space-y-3">
            {recentTransactions.map((t, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center border-b pb-2"
              >
                <span>{t.title}</span>
                <span
                  className={
                    t.type === "income"
                      ? "text-green-600 font-medium"
                      : "text-red-600 font-medium"
                  }
                >
                  {t.type === "income" ? "+" : "-"} Rs. {t.amount}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardUser;
