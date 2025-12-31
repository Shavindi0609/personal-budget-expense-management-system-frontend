import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
} from "../../store/slices/expensesSlice";
import { fetchCategories } from "../../store/slices/categoriesSlice";

const ExpensesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { expenses, loading, error } = useAppSelector((s) => s.expenses);
  const { categories } = useAppSelector((s) => s.categories);

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

  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({ amount: "", category: "", description: "", date: "" });
    setEditingId(null);
    setShowModal(false);
  };

  // ➕ ADD
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

  // ✏️ EDIT (OPEN MODAL)
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

  // 🔥 UPDATE
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

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Expenses</h1>

      {/* Total */}
      <div className="mb-6 bg-purple-700 text-white rounded-xl p-6 shadow">
        <p className="text-sm opacity-80">Total Expenses</p>
        <h2 className="text-3xl font-extrabold">
          {totalExpenses.toLocaleString()} LKR
        </h2>
      </div>

      {/* ADD FORM */}
      <div className="mb-6 flex gap-2 flex-wrap">
        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* LIST */}
      <ul className="space-y-2">
        {expenses.map((exp) => {
          const category = categories.find((c) => c._id === exp.category);
          return (
            <li
              key={exp._id}
              className="flex justify-between items-center bg-white p-3 rounded-xl shadow"
            >
              <span>
                <strong>{category?.name || "Unknown"}</strong> —{" "}
                {exp.amount} LKR — {exp.notes} —{" "}
                {new Date(exp.date).toLocaleDateString()}
              </span>

              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(exp)}
                  className="text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(exp._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {/* 🔥 MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Expense</h2>

            <div className="space-y-3">
              <input
                name="amount"
                type="number"
                value={form.amount}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                placeholder="Amount"
              />

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <input
                name="description"
                value={form.description}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                placeholder="Description"
              />

              <input
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={resetForm}
                className="px-4 py-2 rounded bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 rounded bg-green-600 text-white"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpensesPage;
