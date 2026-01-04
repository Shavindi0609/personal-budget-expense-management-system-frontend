import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchMonthlySavings } from "../../store/slices/savingsSlice";
import {
  fetchGoals,
  createGoal,
  addSavingsToGoal,
} from "../../store/slices/savingsGoalsSlice";
import Sidebar from "../../components/Sidebar";

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

  // 🔹 UI states
  const [month, setMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const [title, setTitle] = useState("");
  const [targetAmount, setTargetAmount] = useState("");

  // 🔥 MODAL STATES
  const [selectedGoal, setSelectedGoal] = useState<any>(null);
  const [amountToAdd, setAmountToAdd] = useState("");
  const [showModal, setShowModal] = useState(false);

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
    <div className="flex min-h-screen bg-[#f4f7ff]">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto space-y-8">

          {/* <h1 className="text-3xl font-bold">Savings</h1> */}

          {/* ================= MONTH PICKER ================= */}
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border p-2 rounded"
          />

          {/* ================= MONTHLY SAVINGS CARD ================= */}
          <div className="bg-linear-to-r from-green-600 to-emerald-600 text-white rounded-2xl p-6 shadow">
            <p className="text-sm opacity-80">Monthly Savings</p>

            {loading ? (
              <p className="mt-3">Loading...</p>
            ) : (
              <>
                <h2 className="text-3xl font-extrabold mt-1">
                  {monthly?.savings.toLocaleString() || 0} LKR
                </h2>

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

          {error && <p className="text-red-500">{error}</p>}

          {/* ================= SAVINGS GOALS ================= */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold mb-4">
              🎯 Savings Goals
            </h2>

            {/* ADD GOAL */}
            <div className="flex gap-2 mb-6 flex-wrap">
              <input
                placeholder="Goal title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2 rounded flex-1"
              />

              <input
                type="number"
                placeholder="Target Amount"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                className="border p-2 rounded"
              />

              <button
                onClick={handleAddGoal}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 shadow"
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
                      <h3 className="font-semibold">{goal.title}</h3>
                      <span className="text-sm text-gray-500">
                        {goal.currentAmount.toLocaleString()} /{" "}
                        {goal.targetAmount.toLocaleString()} LKR
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedGoal(goal);
                        setShowModal(true);
                      }}
                      className="mb-3 text-sm bg-emerald-600 text-white px-3 py-1 rounded"
                    >
                      ➕ Add Savings
                    </button>

                    {/* Progress */}
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

                    {progress >= 100 && (
                      <p className="mt-1 text-green-600 font-semibold">
                        🎉 Goal Completed!
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </main>

      {/* ================= ADD SAVINGS MODAL ================= */}
      {showModal && selectedGoal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-xl font-bold mb-2">
              Add Savings
            </h3>

            <p className="text-sm text-gray-600 mb-4">
              🎯 {selectedGoal.title}
            </p>

            <input
              type="number"
              placeholder="Amount to add"
              value={amountToAdd}
              onChange={(e) => setAmountToAdd(e.target.value)}
              className="border p-2 rounded w-full mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  if (!amountToAdd || !selectedGoal) return;

                  dispatch(
                    addSavingsToGoal({
                      goalId: selectedGoal._id,
                      amount: Number(amountToAdd),
                    })
                  ).then(() => {
                    dispatch(fetchMonthlySavings(month));
                  });

                  setShowModal(false);
                  setAmountToAdd("");
                  setSelectedGoal(null);
                }}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavingsPage;
