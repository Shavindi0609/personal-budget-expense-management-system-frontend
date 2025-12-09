import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchExpenses, addExpense, deleteExpense } from "../../store/slices/expensesSlice";

const ExpensesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { expenses, loading, error } = useAppSelector(state => state.expenses);
  const { categories } = useAppSelector(state => state.categories);

  const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!form.amount || !form.category) return;
    dispatch(addExpense({
      amount: Number(form.amount),
      category: form.category,
      description: form.description,
      date: new Date().toISOString(),
    }));
    setForm({ amount: "", category: "", description: "" });
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteExpense(id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Expenses</h1>

      <div className="mb-4 flex gap-2">
        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className="border p-2 rounded flex-1"
        />
        <select name="category" value={form.category} onChange={handleChange} className="border p-2 rounded flex-1">
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded flex-1"
        />
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 rounded">Add</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-2">
        {expenses.map(exp => (
          <li key={exp._id} className="flex justify-between items-center bg-white p-2 rounded shadow">
            <span>{exp.category}: {exp.amount} LKR - {exp.description}</span>
            <button onClick={() => handleDelete(exp._id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpensesPage;
