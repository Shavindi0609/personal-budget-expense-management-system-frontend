import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchExpenses } from "../../store/slices/expensesSlice";
import { fetchCategories } from "../../store/slices/categoriesSlice";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#7c3aed", "#06b6d4", "#f97316", "#22c55e", "#eab308", "#ef4444"];

const AnalysisPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { expenses } = useAppSelector((state) => state.expenses);
  const { categories } = useAppSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchExpenses());
  }, [dispatch]);

  /* ---------------- Monthly Total ---------------- */
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyExpenses = expenses.filter((e) => {
    const d = new Date(e.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const monthlyTotal = monthlyExpenses.reduce(
    (sum, e) => sum + e.amount,
    0
  );

  /* ---------------- Category Breakdown ---------------- */
  const categoryData = categories.map((cat) => {
    const total = expenses
      .filter((e) => e.category === cat._id)
      .reduce((sum, e) => sum + e.amount, 0);

    return {
      name: cat.name,
      value: total,
    };
  }).filter(c => c.value > 0);

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold">Expense Analysis</h1>

      {/* 📅 Monthly Total Card */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl p-6 shadow">
        <p className="text-sm opacity-80">This Month Spending</p>
        <h2 className="text-4xl font-extrabold mt-2">
          {monthlyTotal.toLocaleString()} LKR
        </h2>
      </div>

      {/* 📊 Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* 📊 Bar Chart */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="font-semibold mb-4">Category Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#7c3aed" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 🥧 Pie Chart */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="font-semibold mb-4">Expense Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={4}
              >
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default AnalysisPage;
