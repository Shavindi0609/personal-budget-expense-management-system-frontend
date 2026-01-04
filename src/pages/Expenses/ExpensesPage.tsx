import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
} from "../../store/slices/expensesSlice";
import { fetchCategories } from "../../store/slices/categoriesSlice";
import Sidebar from "../../components/Sidebar";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const COLORS = [
  "#7c3aed","#22c55e","#ef4444","#3b82f6",
  "#f59e0b","#14b8a6","#ec4899","#6366f1"
];

const ExpensesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { expenses, loading, error } = useAppSelector(s => s.expenses);
  const { categories } = useAppSelector(s => s.categories);

  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());

  const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchExpenses());
  }, [dispatch]);

  /* FILTER */
  const filteredExpenses = expenses.filter(exp => {
    const d = new Date(exp.date);
    return d.getMonth() === selectedMonth && d.getFullYear() === selectedYear;
  });

  /* MONTH DATA */
  const getMonthExpenses = (month: number, year: number) =>
    expenses.filter(e => {
      const d = new Date(e.date);
      return d.getMonth() === month && d.getFullYear() === year;
    });

  const thisMonthExpenses = getMonthExpenses(selectedMonth, selectedYear);
  const lastMonth = selectedMonth === 0 ? 11 : selectedMonth - 1;
  const lastMonthYear = selectedMonth === 0 ? selectedYear - 1 : selectedYear;
  const lastMonthExpenses = getMonthExpenses(lastMonth, lastMonthYear);

  /* PIE DATA */
  const buildPieData = (list: any[]) => {
    const map: any = {};
    list.forEach(e => {
      map[e.category] = (map[e.category] || 0) + e.amount;
    });
    return Object.entries(map).map(([catId, total]) => ({
      name: categories.find(c => c._id === catId)?.name || "Unknown",
      value: total as number,
    }));
  };

  const thisMonthPie = buildPieData(thisMonthExpenses);
  const lastMonthPie = buildPieData(lastMonthExpenses);

  /* TOTALS */
  const thisTotal = thisMonthExpenses.reduce((s, e) => s + e.amount, 0);
  const lastTotal = lastMonthExpenses.reduce((s, e) => s + e.amount, 0);
  const diff = thisTotal - lastTotal;
  const diffColor = diff > 0 ? "text-red-600" : "text-green-600";

  /* FORM */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const resetForm = () => {
    setForm({ amount: "", category: "", description: "", date: "" });
    setEditingId(null);
    setShowModal(false);
  };

  const handleAdd = () => {
    if (!form.amount || !form.category) return;
    dispatch(
      addExpense({
        title: form.description || "No title",
        amount: Number(form.amount),
        category: form.category,
        notes: form.description,
        date: form.date || new Date().toISOString(),
      })
    );
    resetForm();
  };

  const handleEdit = (exp: any) => {
    setEditingId(exp._id);
    setForm({
      amount: exp.amount.toString(),
      category: exp.category,
      description: exp.notes || exp.title,
      date: exp.date?.slice(0, 10),
    });
    setShowModal(true);
  };

  const handleUpdate = () => {
    if (!editingId) return;
    dispatch(
      updateExpense({
        id: editingId,
        data: {
          title: form.description || "No title",
          amount: Number(form.amount),
          category: form.category,
          notes: form.description,
          date: form.date || new Date().toISOString(),
        },
      })
    );
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteExpense(id));
    }
  };

  const totalExpenses = filteredExpenses.reduce((s, e) => s + e.amount, 0);

  return (
    <div className="flex min-h-screen bg-[#f4f7ff]">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">

          <h1 className="text-3xl font-bold mb-6">Expenses Dashboard</h1>

          {/* MONTH SELECT */}
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

          {/* TOTAL */}
          <div className="mb-6 bg-purple-700 text-white rounded-xl p-6 shadow">
            <p className="text-sm opacity-80">
              Total Expenses ({months[selectedMonth]} {selectedYear})
            </p>
            <h2 className="text-3xl font-extrabold">
              {totalExpenses.toLocaleString()} LKR
            </h2>
          </div>

          {/* ADD FORM */}
          <div className="mb-6 flex gap-2 flex-wrap">
            <input name="amount" type="number" placeholder="Amount" value={form.amount} onChange={handleChange} className="border p-2 rounded" />
            <select name="category" value={form.category} onChange={handleChange} className="border p-2 rounded">
              <option value="">Select Category</option>
              {categories.map(c => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
            <input name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border p-2 rounded" />
            <input name="date" type="date" value={form.date} onChange={handleChange} className="border p-2 rounded" />
            <button onClick={handleAdd} className="bg-blue-600 text-white px-4 rounded">
              Add
            </button>
          </div>

          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {/* LIST */}
          <ul className="space-y-2 mb-10">
            {filteredExpenses.map(exp => {
              const category = categories.find(c => c._id === exp.category);
              return (
                <li key={exp._id} className="flex justify-between items-center bg-white p-3 rounded-xl shadow">
                  <span>
                    <strong>{category?.name || "Unknown"}</strong> — {exp.amount} LKR — {exp.notes}
                  </span>
                  <div className="flex gap-3">
                    <button onClick={() => handleEdit(exp)} className="text-blue-600">Edit</button>
                    <button onClick={() => handleDelete(exp._id)} className="text-red-500">Delete</button>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* COMPARISON */}
          <div className="mb-8 bg-white rounded-xl p-6 shadow">
            <p className="text-sm text-gray-500">
              {months[selectedMonth]} vs {months[lastMonth]}
            </p>
            <h2 className={`text-2xl font-bold ${diffColor}`}>
              Difference: {diff.toLocaleString()} LKR
            </h2>
          </div>

          {/* PIE CHARTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[thisMonthPie, lastMonthPie].map((data, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow h-[350px]">
                <h3 className="font-semibold mb-4">
                  {idx === 0
                    ? `${months[selectedMonth]} ${selectedYear}`
                    : `${months[lastMonth]} ${lastMonthYear}`}
                </h3>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={data} dataKey="value" nameKey="name" outerRadius={120} label>
                      {data.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ))}
          </div>

        </div>
      </main>

      {/* EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Expense</h2>
            <div className="space-y-3">
              <input name="amount" type="number" value={form.amount} onChange={handleChange} className="border p-2 rounded w-full" />
              <select name="category" value={form.category} onChange={handleChange} className="border p-2 rounded w-full">
                {categories.map(c => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
              <input name="description" value={form.description} onChange={handleChange} className="border p-2 rounded w-full" />
              <input name="date" type="date" value={form.date} onChange={handleChange} className="border p-2 rounded w-full" />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={resetForm} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button onClick={handleUpdate} className="px-4 py-2 bg-green-600 text-white rounded">Update</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ExpensesPage;
