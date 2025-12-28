import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchExpenses } from "../../store/slices/expensesSlice";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { fetchCategories } from "../../store/slices/categoriesSlice";
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

// Hex colors only (oklch-free)
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

  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const BUDGET = 50000;

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchExpenses());
  }, [dispatch]);

  const monthlyExpenses = useMemo(
    () => expenses.filter((e) => e.date.slice(0, 7) === selectedMonth),
    [expenses, selectedMonth]
  );

  const totalSpent = useMemo(
    () => monthlyExpenses.reduce((sum, e) => sum + e.amount, 0),
    [monthlyExpenses]
  );

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

  const exportPDF = async () => {
    const element = document.getElementById("analysis-report");
    if (!element) return;

    await new Promise((res) => setTimeout(res, 300));

    const canvas = await html2canvas(element, { scale: 2, backgroundColor: "#ffffff" });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = 210;
    const pageHeight = 297;
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`FinWise-Analysis-${selectedMonth}.pdf`);
  };

  return (
    <div className="p-6 space-y-10">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={exportPDF}
          className="px-4 py-2"
          style={{ backgroundColor: "#ef4444", color: "#ffffff", borderRadius: "0.5rem" }}
        >
          Export PDF
        </button>
      </div>

      {/* Analysis content */}
      <div id="analysis-report">
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1.5rem" }}>Analysis</h1>

        {/* Summary cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginBottom: "1.5rem" }}>
          <div style={{ backgroundColor: "#ffffff", padding: "1.5rem", borderRadius: "1rem", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            <p style={{ color: "#6b7280" }}>Total Spent</p>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{totalSpent} LKR</h2>
          </div>

          <div style={{ backgroundColor: "#ffffff", padding: "1.5rem", borderRadius: "1rem", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            <p style={{ color: "#6b7280" }}>Monthly Budget</p>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{BUDGET} LKR</h2>
          </div>

          <div
            style={{
              padding: "1.5rem",
              borderRadius: "1rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              backgroundColor: totalSpent > BUDGET ? "#ef4444" : "#22c55e",
              color: "#ffffff",
            }}
          >
            <p>Status</p>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
              {totalSpent > BUDGET ? "Over Budget" : "Within Budget"}
            </h2>
          </div>
        </div>

        {/* Charts */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem", marginBottom: "1.5rem" }}>
          <div style={{ backgroundColor: "#ffffff", padding: "1.5rem", borderRadius: "1rem", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            <h3 style={{ fontWeight: "600", marginBottom: "1rem" }}>Category Breakdown</h3>
            <ResponsiveContainer width="100%" height={260}>
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

          <div style={{ backgroundColor: "#ffffff", padding: "1.5rem", borderRadius: "1rem", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            <h3 style={{ fontWeight: "600", marginBottom: "1rem" }}>Spending Trend</h3>
            <ResponsiveContainer width="100%" height={260}>
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

        {/* Expense distribution */}
        <div style={{ backgroundColor: "#ffffff", padding: "1.5rem", borderRadius: "1rem", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h3 style={{ fontWeight: "600", marginBottom: "1rem" }}>Expense Distribution</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={distributionData} dataKey="value" innerRadius={60} outerRadius={100} paddingAngle={4}>
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
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ width: "0.75rem", height: "0.75rem", borderRadius: "50%", backgroundColor: COLORS[i % COLORS.length] }} />
                    <span style={{ fontWeight: "500" }}>{c.name}</span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontWeight: "600" }}>{c.value} LKR</p>
                    <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>{c.percent}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
