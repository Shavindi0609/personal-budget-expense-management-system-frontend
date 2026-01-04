// pages/AnalysisPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchExpenses } from "../../store/slices/expensesSlice";
import { fetchIncomes } from "../../store/slices/incomes.slice";
import { fetchCategories } from "../../store/slices/categoriesSlice";
import Sidebar from "../../components/Sidebar";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
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
const COLORS = ["#6366f1", "#22c55e", "#f97316", "#ef4444", "#14b8a6", "#eab308", "#8b5cf6"];

const AnalysisPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { expenses } = useAppSelector((s) => s.expenses);
  const { categories } = useAppSelector((s) => s.categories);
  const { items: incomes } = useAppSelector((s) => s.incomes);

  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchExpenses());
    dispatch(fetchIncomes());
  }, [dispatch]);

  const monthlyIncome = useMemo(
    () => incomes.filter((i) => i.date.slice(0, 7) === selectedMonth),
    [incomes, selectedMonth]
  );
  const totalIncome = useMemo(() => monthlyIncome.reduce((sum, i) => sum + i.amount, 0), [monthlyIncome]);

  const monthlyExpenses = useMemo(
    () => expenses.filter((e) => e.date.slice(0, 7) === selectedMonth),
    [expenses, selectedMonth]
  );
  const totalSpent = useMemo(() => monthlyExpenses.reduce((sum, e) => sum + e.amount, 0), [monthlyExpenses]);

  const categoryData = useMemo(() => {
    const map: Record<string, number> = {};
    monthlyExpenses.forEach((e) => {
      const name = categories.find((c) => c._id === e.category)?.name || "Other";
      map[name] = (map[name] || 0) + e.amount;
    });
    return Object.keys(map).map((k) => ({ name: k, value: map[k] }));
  }, [monthlyExpenses, categories]);

  const distributionData = useMemo(
    () =>
      categoryData.map((c) => ({
        ...c,
        percent: totalSpent > 0 ? ((c.value / totalSpent) * 100).toFixed(1) : "0",
      })),
    [categoryData, totalSpent]
  );

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

    try {
      await new Promise((r) => setTimeout(r, 300));
      const canvas = await html2canvas(element, { scale: 2, backgroundColor: "#ffffff", useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = pdfHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= 297;

      while (heightLeft > 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= 297;
      }

      pdf.save(`FinWise-Analysis-${selectedMonth}.pdf`);
    } catch (err) {
      console.error("PDF export failed:", err);
    }
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#f4f7ff" }}>
            {/* SIDEBAR */}
            <Sidebar />
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Controls */}
          <div className="flex flex-wrap gap-4">
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              style={{ padding: "0.5rem", borderRadius: "0.375rem", border: "1px solid #ccc" }}
            />
            <button
              onClick={exportPDF}
              style={{ padding: "0.5rem 1rem", backgroundColor: "#ef4444", color: "#ffffff", borderRadius: "0.375rem" }}
            >
              Export PDF
            </button>
          </div>

          <div id="analysis-report">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div style={{ backgroundColor: "#ffffff", padding: "1.5rem", borderRadius: "1rem", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
                <p style={{ color: "#6b7280" }}>Total Spent</p>
                <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{totalSpent} LKR</h2>
              </div>
              <div style={{ backgroundColor: "#ffffff", padding: "1.5rem", borderRadius: "1rem", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
                <p style={{ color: "#6b7280" }}>Monthly Income</p>
                <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{totalIncome.toLocaleString()} LKR</h2>
              </div>
              <div
                style={{
                  backgroundColor: totalSpent > totalIncome ? "#ef4444" : "#22c55e",
                  color: "#ffffff",
                  padding: "1.5rem",
                  borderRadius: "1rem",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
              >
                <p>Status</p>
                <h2 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                  {totalIncome === 0 ? "No Income" : totalSpent > totalIncome ? "Over Budget" : "Within Budget"}
                </h2>
              </div>
            </div>

            {/* Alert */}
            {totalSpent > totalIncome && totalIncome > 0 && (
              <div
                style={{
                  backgroundColor: "#fee2e2",
                  color: "#b91c1c",
                  border: "1px solid #fca5a5",
                  padding: "1rem",
                  borderRadius: "0.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                🚨 You have spent more than your income this month!
              </div>
            )}

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              <div style={{ backgroundColor: "#ffffff", padding: "1.5rem", borderRadius: "1rem", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
                <h3 style={{ fontWeight: "600", marginBottom: "1rem" }}>Category Breakdown</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie data={categoryData} dataKey="value" label>
                      {categoryData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div style={{ backgroundColor: "#ffffff", padding: "1.5rem", borderRadius: "1rem", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
                <h3 style={{ fontWeight: "600", marginBottom: "1rem" }}>Spending Trend</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Distribution */}
            <div style={{ backgroundColor: "#ffffff", padding: "1.5rem", borderRadius: "1rem", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
              <h3 style={{ fontWeight: "600", marginBottom: "1rem" }}>Expense Distribution</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie data={distributionData} dataKey="value" innerRadius={60} outerRadius={100}>
                      {distributionData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div>
                  {distributionData.map((c, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                      <span style={{ fontWeight: "500" }}>{c.name}</span>
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
