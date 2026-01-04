import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchExpenses } from "../../store/slices/expensesSlice";
import { fetchIncomes } from "../../store/slices/incomes.slice";
import { fetchCategories } from "../../store/slices/categoriesSlice";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Sidebar from "../../components/Sidebar";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

/* ---------- COLORS ---------- */
const COLORS = [
  "#6366f1",
  "#22c55e",
  "#f97316",
  "#ef4444",
  "#14b8a6",
  "#eab308",
  "#8b5cf6",
];

const AnalysisPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { expenses } = useAppSelector((s) => s.expenses);
  const { categories } = useAppSelector((s) => s.categories);
  const { items: incomes } = useAppSelector((s) => s.incomes);

  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  /* ---------- FETCH DATA ---------- */
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchExpenses());
    dispatch(fetchIncomes());
  }, [dispatch]);

  /* ---------- MONTHLY INCOME ---------- */
  const monthlyIncome = useMemo(
    () =>
      incomes.filter(
        (i) => i.date.slice(0, 7) === selectedMonth
      ),
    [incomes, selectedMonth]
  );

  const totalIncome = useMemo(
    () => monthlyIncome.reduce((sum, i) => sum + i.amount, 0),
    [monthlyIncome]
  );

  /* ---------- MONTHLY EXPENSE ---------- */
  const monthlyExpenses = useMemo(
    () =>
      expenses.filter(
        (e) => e.date.slice(0, 7) === selectedMonth
      ),
    [expenses, selectedMonth]
  );

  const totalSpent = useMemo(
    () => monthlyExpenses.reduce((sum, e) => sum + e.amount, 0),
    [monthlyExpenses]
  );

  /* ---------- CATEGORY DATA ---------- */
  const categoryData = useMemo(() => {
    const map: Record<string, number> = {};
    monthlyExpenses.forEach((e) => {
      const name =
        categories.find((c) => c._id === e.category)?.name ||
        "Other";
      map[name] = (map[name] || 0) + e.amount;
    });
    return Object.keys(map).map((k) => ({
      name: k,
      value: map[k],
    }));
  }, [monthlyExpenses, categories]);

  const distributionData = useMemo(
    () =>
      categoryData.map((c) => ({
        ...c,
        percent:
          totalSpent > 0
            ? ((c.value / totalSpent) * 100).toFixed(1)
            : "0",
      })),
    [categoryData, totalSpent]
  );

  /* ---------- TREND DATA ---------- */
  const trendData = useMemo(() => {
    const map: Record<string, number> = {};
    expenses.forEach((e) => {
      const m = e.date.slice(0, 7);
      map[m] = (map[m] || 0) + e.amount;
    });
    return Object.keys(map)
      .sort()
      .slice(-6)
      .map((m) => ({ month: m, amount: map[m] }));
  }, [expenses]);

  /* ---------- EXPORT PDF ---------- */
  const exportPDF = async () => {
    const element = document.getElementById("analysis-report");
    if (!element) return;

    await new Promise((r) => setTimeout(r, 300));
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= 297;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= 297;
    }

    pdf.save(`FinWise-Analysis-${selectedMonth}.pdf`);
  };

  return (
    <div className="flex min-h-screen bg-[#f4f7ff]">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* <h1 className="text-3xl font-bold text-purple-700">
            Analysis
          </h1> */}

          {/* ---------- CONTROLS ---------- */}
          <div className="flex flex-wrap gap-4">
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) =>
                setSelectedMonth(e.target.value)
              }
              className="border p-2 rounded"
            />

            <button
              onClick={exportPDF}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Export PDF
            </button>
          </div>

          <div id="analysis-report">
            {/* ---------- SUMMARY CARDS ---------- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-6 rounded-xl shadow">
                <p className="text-gray-500">Total Spent</p>
                <h2 className="text-2xl font-bold">
                  {totalSpent} LKR
                </h2>
              </div>

              <div className="bg-white p-6 rounded-xl shadow">
                <p className="text-gray-500">Monthly Income</p>
                <h2 className="text-2xl font-bold">
                  {totalIncome.toLocaleString()} LKR
                </h2>
              </div>

              <div
                className={`p-6 rounded-xl shadow text-white ${
                  totalSpent > totalIncome
                    ? "bg-red-500"
                    : "bg-green-500"
                }`}
              >
                <p>Status</p>
                <h2 className="text-xl font-bold">
                  {totalIncome === 0
                    ? "No Income"
                    : totalSpent > totalIncome
                    ? "Over Budget"
                    : "Within Budget"}
                </h2>
              </div>
            </div>

            {/* ---------- ALERT ---------- */}
            {totalSpent > totalIncome && totalIncome > 0 && (
              <div className="mb-6 p-4 rounded bg-red-100 text-red-700 border border-red-400">
                🚨 You have spent more than your income this
                month!
              </div>
            )}

            {/* ---------- CHARTS ---------- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="font-semibold mb-4">
                  Category Breakdown
                </h3>

                <ResponsiveContainer
                  width="100%"
                  height={280}
                >
                  <PieChart>
                    <Pie data={categoryData} dataKey="value" label>
                      {categoryData.map((_, i) => (
                        <Cell
                          key={i}
                          fill={
                            COLORS[i % COLORS.length]
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="font-semibold mb-4">
                  Spending Trend
                </h3>

                <ResponsiveContainer
                  width="100%"
                  height={280}
                >
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      stroke="#6366f1"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* ---------- DISTRIBUTION ---------- */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold mb-4">
                Expense Distribution
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResponsiveContainer
                  width="100%"
                  height={260}
                >
                  <PieChart>
                    <Pie
                      data={distributionData}
                      dataKey="value"
                      innerRadius={60}
                      outerRadius={100}
                    >
                      {distributionData.map((_, i) => (
                        <Cell
                          key={i}
                          fill={
                            COLORS[i % COLORS.length]
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>

                <div>
                  {distributionData.map((c, i) => (
                    <div
                      key={i}
                      className="flex justify-between mb-2"
                    >
                      <span className="font-medium">
                        {c.name}
                      </span>
                      <span>
                        {c.value} LKR ({c.percent}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnalysisPage;
