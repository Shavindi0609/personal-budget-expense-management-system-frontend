import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchIncomes,
  addIncome,
  deleteIncome,
  updateIncome,
} from "../../store/slices/incomes.slice";
import { Modal } from "../../components/Model";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const IncomesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((s) => s.incomes);

  /* ======================
     DATE FILTER STATE
  ====================== */
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth()); // 0-11
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());

  /* ======================
     ADD INCOME STATE
  ====================== */
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState<number | "">("");

  /* ======================
     EDIT MODAL STATE
  ====================== */
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editSource, setEditSource] = useState("");
  const [editAmount, setEditAmount] = useState<number | "">("");

  /* ======================
     FETCH DATA
  ====================== */
  useEffect(() => {
    dispatch(fetchIncomes());
  }, [dispatch]);

  /* ======================
     MONTH FILTER
  ====================== */
  const monthlyItems = items.filter((i) => {
    const d = new Date(i.date);
    return (
      d.getMonth() === selectedMonth &&
      d.getFullYear() === selectedYear
    );
  });

  /* ======================
     TOTAL
  ====================== */
  const total = monthlyItems.reduce((sum, i) => sum + i.amount, 0);

  /* ======================
     CHART DATA
  ====================== */
  const chartData = monthlyItems.map((i, index) => ({
    index,
    date: new Date(i.date).toLocaleDateString(),
    amount: i.amount,
  }));

  /* ======================
     ADD INCOME
  ====================== */
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!source || !amount) return;

    await dispatch(
      addIncome({
        source,
        amount: Number(amount),
      })
    );

    setSource("");
    setAmount("");
  };

  /* ======================
     EDIT INCOME
  ====================== */
  const openEdit = (it: any) => {
    setEditId(it._id);
    setEditSource(it.source);
    setEditAmount(it.amount);
    setEditOpen(true);
  };

  const submitEdit = async () => {
    if (!editId) return;

    await dispatch(
      updateIncome({
        id: editId,
        data: {
          source: editSource,
          amount: Number(editAmount),
        },
      })
    );

    setEditOpen(false);
  };

  return (
    <div className="container mx-auto p-6">

      {/* HEADER */}
      <h2 className="text-2xl font-semibold mb-4">Incomes</h2>

      {/* MONTH SELECTOR */}
      <div className="flex gap-3 mb-4">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="border p-2 rounded"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <option key={i} value={i}>
              {new Date(0, i).toLocaleString("en", { month: "long" })}
            </option>
          ))}
        </select>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="border p-2 rounded"
        >
          {[2023, 2024, 2025, 2026].map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* TOTAL */}
      <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg font-semibold">
        Total Income ({new Date(0, selectedMonth).toLocaleString("en", { month: "long" })} {selectedYear}):{" "}
        Rs. {total.toLocaleString()}
      </div>

      {/* TWO COLUMN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* CHART */}
        <div className="lg:col-span-2 bg-white p-4 rounded shadow h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="index"
                tickFormatter={(i) => chartData[i]?.date}
              />
              <YAxis />
              <Tooltip labelFormatter={(i) => chartData[i]?.date} />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* RIGHT PANEL */}
        <div className="space-y-6">

          {/* ADD FORM */}
          <form
            onSubmit={submit}
            className="grid grid-cols-1 gap-3 bg-white p-4 rounded shadow"
          >
            <input
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="Source"
              className="p-2 border rounded"
            />

            <input
              value={amount}
              type="number"
              onChange={(e) =>
                setAmount(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              placeholder="Amount"
              className="p-2 border rounded"
            />

            <button className="py-2 px-4 bg-green-600 text-white rounded">
              Add Income
            </button>
          </form>

          {/* LIST */}
          <section className="bg-white p-4 rounded shadow max-h-[400px] overflow-y-auto">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <ul className="space-y-2">
                {monthlyItems.map((it) => (
                  <li
                    key={it._id}
                    className="p-3 border rounded flex justify-between items-center"
                  >
                    <div>
                      <div className="font-semibold">{it.source}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(it.date).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="font-medium text-green-700">
                        Rs. {it.amount}
                      </div>

                      <button
                        onClick={() => openEdit(it)}
                        className="px-3 py-1 bg-blue-500 text-white rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => dispatch(deleteIncome(it._id))}
                        className="px-3 py-1 bg-red-600 text-white rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>

      {/* EDIT MODAL */}
      {editOpen && (
        <Modal onClose={() => setEditOpen(false)} title="Edit Income">
          <div className="flex flex-col gap-3 p-2">
            <input
              value={editSource}
              onChange={(e) => setEditSource(e.target.value)}
              className="p-2 border rounded"
            />

            <input
              value={editAmount}
              type="number"
              onChange={(e) =>
                setEditAmount(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              className="p-2 border rounded"
            />

            <button
              onClick={submitEdit}
              className="py-2 px-4 bg-blue-600 text-white rounded"
            >
              Save Changes
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default IncomesPage;
