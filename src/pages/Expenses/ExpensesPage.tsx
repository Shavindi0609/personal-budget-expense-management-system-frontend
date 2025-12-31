import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchExpenses,
  addExpense,
  deleteExpense,
} from "../../store/slices/expensesSlice";
import { fetchCategories } from "../../store/slices/categoriesSlice";

const ExpensesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { expenses, loading, error } = useAppSelector((state) => state.expenses);
  const { categories } = useAppSelector((state) => state.categories);

  const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  // Fetch expenses & categories
  useEffect(() => {
    const loadData = async () => {
      await dispatch(fetchCategories());
      await dispatch(fetchExpenses());
    };

    loadData();
  }, [dispatch]);

  // 🔥 TOTAL EXPENSES
  const totalExpenses = expenses.reduce(
    (sum, exp) => sum + exp.amount,
    0
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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

    setForm({ amount: "", category: "", description: "", date: "" });
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteExpense(id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Expenses</h1>

      {/* 🔥 TOTAL EXPENSES CARD */}
      <div className="mb-6 bg-linear-to-r from-purple-600 to-indigo-600 text-white rounded-2xl p-6 shadow">
        <p className="text-sm opacity-80">Total Expenses</p>
        <h2 className="text-3xl font-extrabold mt-1">
          {totalExpenses.toLocaleString()} LKR
        </h2>
      </div>

      {/* Add Form */}
      <div className="mb-4 flex gap-2 flex-wrap">
        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className="border p-2 rounded flex-1 min-w-[120px]"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 rounded flex-1 min-w-[150px]"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded flex-1 min-w-[150px]"
        />

        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="border p-2 rounded min-w-[150px]"
        />

        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      {/* Loading / Error */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Expenses List */}
      <ul className="space-y-2">
        {expenses.map((exp) => {
          const category = categories.find((c) => c._id === exp.category);

          return (
            <li
              key={exp._id}
              className="flex justify-between items-center bg-white p-3 rounded-xl shadow flex-wrap"
            >
              <span>
                <strong>{category?.name || "Unknown"}</strong>:{" "}
                {exp.amount} LKR — {exp.notes || exp.title} —{" "}
                <em>{new Date(exp.date).toLocaleDateString()}</em>
              </span>

              <button
                onClick={() => handleDelete(exp._id)}
                className="text-red-500 font-medium"
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ExpensesPage;
