import React, { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchExpenses } from "../store/slices/expensesSlice";
import { fetchIncomes } from "../store/slices/incomes.slice";

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const DashboardUser: React.FC = () => {
  const dispatch = useAppDispatch();

  const { expenses } = useAppSelector((s) => s.expenses);
  const { items: incomes } = useAppSelector((s) => s.incomes);
  const user = useAppSelector((s) => s.user.user);

  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());

  useEffect(() => {
    dispatch(fetchExpenses());
    dispatch(fetchIncomes());
  }, [dispatch]);

  // 🔢 Filtered by selected month/year
  const filteredExpenses = useMemo(
    () => expenses.filter(e => {
      const d = new Date(e.date);
      return d.getMonth() === selectedMonth && d.getFullYear() === selectedYear;
    }),
    [expenses, selectedMonth, selectedYear]
  );

  const filteredIncomes = useMemo(
    () => incomes.filter(i => {
      const d = new Date(i.date);
      return d.getMonth() === selectedMonth && d.getFullYear() === selectedYear;
    }),
    [incomes, selectedMonth, selectedYear]
  );

  // 🔢 Calculations for selected month
  const totalIncome = filteredIncomes.reduce((s, i) => s + i.amount, 0);
  const totalExpense = filteredExpenses.reduce((s, e) => s + e.amount, 0);
  const balance = totalIncome - totalExpense;

  // 🕒 Recent Transactions (last 5 for selected month)
  const recentTransactions = [
    ...filteredExpenses.map((e) => ({
      type: "expense",
      title: e.notes || e.title,
      amount: e.amount,
      date: e.date,
    })),
    ...filteredIncomes.map((i) => ({
      type: "income",
      title: i.source,
      amount: i.amount,
      date: i.date,
    })),
  ]
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 5);

  // ==============================
  // Month-by-month summary
  // ==============================
  const monthSummary = useMemo(() => {
    const summary: { month: string; income: number; expense: number; balance: number }[] = [];
    const allDates = [
      ...expenses.map(e => new Date(e.date)),
      ...incomes.map(i => new Date(i.date)),
    ];
    if (allDates.length === 0) return [];

    const firstDate = new Date(Math.min(...allDates.map(d => d.getTime())));
    const lastDate = new Date(Math.max(...allDates.map(d => d.getTime())));

    let y = firstDate.getFullYear();
    let m = firstDate.getMonth();
    const endYear = lastDate.getFullYear();
    const endMonth = lastDate.getMonth();

    while (y < endYear || (y === endYear && m <= endMonth)) {
      const monthIncome = incomes
        .filter(i => {
          const d = new Date(i.date);
          return d.getFullYear() === y && d.getMonth() === m;
        })
        .reduce((s, i) => s + i.amount, 0);

      const monthExpense = expenses
        .filter(e => {
          const d = new Date(e.date);
          return d.getFullYear() === y && d.getMonth() === m;
        })
        .reduce((s, e) => s + e.amount, 0);

      summary.push({
        month: `${months[m]} ${y}`,
        income: monthIncome,
        expense: monthExpense,
        balance: monthIncome - monthExpense,
      });

      m++;
      if (m > 11) {
        m = 0;
        y++;
      }
    }

    return summary;
  }, [expenses, incomes]);

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Welcome, {user?.name || "User"} 👋
        </h1>
        <img src="https://i.pravatar.cc/40" className="w-10 h-10 rounded-full" />
      </div>

      {/* Month Selector */}
      <div className="flex gap-2 mb-6">
        <select
          value={selectedMonth}
          onChange={e => setSelectedMonth(Number(e.target.value))}
          className="border p-2 rounded"
        >
          {months.map((m, i) => (
            <option key={i} value={i}>{m}</option>
          ))}
        </select>

        <input
          type="number"
          value={selectedYear}
          onChange={e => setSelectedYear(Number(e.target.value))}
          className="border p-2 rounded w-28"
        />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-purple-700 text-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-sm opacity-80">Balance</h2>
          <p className="text-3xl font-bold mt-2">Rs. {balance.toLocaleString()}</p>
          <p className="text-xs mt-1 opacity-80">Income − Expense</p>
        </div>

        <div className="bg-green-100 p-6 rounded-2xl shadow-lg">
          <h2 className="text-sm text-green-700">Total Income</h2>
          <p className="text-2xl font-bold mt-2 text-green-800">
            Rs. {totalIncome.toLocaleString()}
          </p>
        </div>

        <div className="bg-red-100 p-6 rounded-2xl shadow-lg">
          <h2 className="text-sm text-red-700">Total Expenses</h2>
          <p className="text-2xl font-bold mt-2 text-red-800">
            Rs. {totalExpense.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Month-by-month summary */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
        <h2 className="text-lg font-semibold mb-4">Monthly Summary</h2>
        {monthSummary.length === 0 ? (
          <p className="text-gray-500">No data available</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b p-2">Month</th>
                <th className="border-b p-2 text-green-700">Income</th>
                <th className="border-b p-2 text-red-700">Expenses</th>
                <th className="border-b p-2">Balance</th>
              </tr>
            </thead>
            <tbody>
              {monthSummary.map((m, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="p-2">{m.month}</td>
                  <td className="p-2 text-green-600 font-medium">Rs. {m.income.toLocaleString()}</td>
                  <td className="p-2 text-red-600 font-medium">Rs. {m.expense.toLocaleString()}</td>
                  <td className="p-2 font-semibold">Rs. {m.balance.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Recent Transactions */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
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
