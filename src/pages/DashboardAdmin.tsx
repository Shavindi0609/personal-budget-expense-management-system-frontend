import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Users, Folder, TrendingDown, TrendingUp } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchAdminStats } from "../store/slices/adminSlice";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const DashboardAdmin: React.FC = () => {
  const dispatch = useAppDispatch();
  const { stats, loading } = useAppSelector((state) => state.admin);

  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  useEffect(() => {
    dispatch(fetchAdminStats(year));
  }, [dispatch, year]);

  // Compute net income for the chart
  const monthlyData = stats?.monthly?.map((m) => ({
    ...m,
    net: m.income - m.expense,
  }));

    // Dynamic years list (last 10 years)
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return (
    <DashboardLayout>
      <div className="p-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
      
            <p className="text-gray-600 mt-1">
              System overview & administration
            </p>
          </div>

          {/* Year Selector */}
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="mt-4 md:mt-0 border rounded-lg px-4 py-2"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-blue-600 text-white p-6 rounded-2xl shadow">
            <div className="flex items-center gap-3">
              <Users size={28} />
              <div>
                <p className="text-sm opacity-80">Total Users</p>
                <p className="text-2xl font-bold">
                  {loading ? "..." : stats?.users ?? 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-purple-600 text-white p-6 rounded-2xl shadow">
            <div className="flex items-center gap-3">
              <Folder size={28} />
              <div>
                <p className="text-sm opacity-80">Categories</p>
                <p className="text-2xl font-bold">
                  {loading ? "..." : stats?.categories ?? 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-red-500 text-white p-6 rounded-2xl shadow">
            <div className="flex items-center gap-3">
              <TrendingDown size={28} />
              <div>
                <p className="text-sm opacity-80">Total Expenses</p>
                <p className="text-2xl font-bold">
                  Rs. {loading ? "..." : stats?.expenses.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-500 text-white p-6 rounded-2xl shadow">
            <div className="flex items-center gap-3">
              <TrendingUp size={28} />
              <div>
                <p className="text-sm opacity-80">Total Incomes</p>
                <p className="text-2xl font-bold">
                  Rs. {loading ? "..." : stats?.incomes.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Combined Chart: Income, Expenses, Net */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-4">
            Monthly Income, Expenses & Net ({year})
          </h3>

          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={monthlyData || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />

              {/* Income Line */}
              <Line
                type="monotone"
                dataKey="income"
                stroke="#22c55e"
                strokeWidth={3}
                name="Income"
              />

              {/* Expenses Line */}
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#ef4444"
                strokeWidth={3}
                name="Expenses"
              />

              {/* Net Line */}
              <Line
                type="monotone"
                dataKey="net"
                stroke="#3b82f6"
                strokeWidth={3}
                name="Net"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardAdmin;
