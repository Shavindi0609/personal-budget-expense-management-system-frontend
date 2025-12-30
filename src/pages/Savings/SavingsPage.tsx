import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchMonthlySavings } from "../../store/slices/savingsSlice";
import {
  fetchGoals,
  createGoal,
} from "../../store/slices/savingsGoalsSlice";

const SavingsPage: React.FC = () => {
  const dispatch = useAppDispatch();

  // 🔹 Monthly savings
  const { monthly, loading, error } = useAppSelector(
    (state) => state.savings
  );

  // 🔹 Goals
  const { goals, loading: goalsLoading } = useAppSelector(
    (state) => state.savingsGoals
  );

  const [month, setMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const [title, setTitle] = useState("");
  const [targetAmount, setTargetAmount] = useState("");

  useEffect(() => {
    dispatch(fetchMonthlySavings(month));
    dispatch(fetchGoals());
  }, [dispatch, month]);

  const handleAddGoal = () => {
    if (!title || !targetAmount) return;

    dispatch(
      createGoal({
        title,
        targetAmount: Number(targetAmount),
      })
    );

    setTitle("");
    setTargetAmount("");
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Savings</h1>

      {/* ================= MONTH PICKER ================= */}
      <div>
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {/* ================= MONTHLY SAVINGS CARD ================= */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl p-6 shadow">
        <p className="text-sm opacity-80">Monthly Savings</p>

        {loading ? (
          <p className="mt-3">Loading...</p>
        ) : (
          <>
            <h2 className="text-3xl font-extrabold mt-1">
              {monthly?.savings.toLocaleString() || 0} LKR
            </h2>

            <p className="text-sm opacity-90 mt-1">
              You saved this month 🎉
            </p>

            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
              <div>
                <p className="opacity-80">Income</p>
                <p className="font-semibold">
                  {monthly?.income.toLocaleString()} LKR
                </p>
              </div>

              <div>
                <p className="opacity-80">Expenses</p>
                <p className="font-semibold">
                  {monthly?.expense.toLocaleString()} LKR
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ================= STATUS ================= */}
      {monthly && (
        <div
          className={`p-4 rounded-xl ${
            monthly.savings >= 0
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {monthly.savings >= 0
            ? "✅ You are saving money. Keep it up!"
            : "🚨 Expenses exceeded income this month!"}
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {/* ================= SAVINGS GOALS ================= */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4">
          🎯 Savings Goals
        </h2>

        {/* ADD GOAL */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <input
            placeholder="Goal title (ex: Buy Laptop)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded flex-1 min-w-[200px]"
          />

          <input
            type="number"
            placeholder="Target Amount"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            className="border p-2 rounded min-w-[150px]"
          />

          <button
            onClick={handleAddGoal}
            className="bg-green-600 text-white px-4 rounded"
          >
            Add Goal
          </button>
        </div>

        {/* GOALS LIST */}
        {goalsLoading && <p>Loading goals...</p>}

        <div className="space-y-4">
          {goals.map((goal) => {
            const progress =
              (goal.currentAmount / goal.targetAmount) * 100;

            return (
              <div
                key={goal._id}
                className="border rounded-xl p-4"
              >
                <div className="flex justify-between mb-2">
                  <h3 className="font-semibold">
                    {goal.title}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {goal.currentAmount.toLocaleString()} /{" "}
                    {goal.targetAmount.toLocaleString()} LKR
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-600 h-3 rounded-full"
                    style={{
                      width: `${Math.min(progress, 100)}%`,
                    }}
                  />
                </div>

                <p className="text-xs mt-2 text-gray-600">
                  {progress.toFixed(1)}% completed
                </p>
              </div>
            );
          })}

          {goals.length === 0 && (
            <p className="text-gray-500 text-sm">
              No savings goals yet. Add one 🎯
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavingsPage;
