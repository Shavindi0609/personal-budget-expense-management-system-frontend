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

  /* ================= STORE ================= */
  const { monthly, loading, error } = useAppSelector(
    (state) => state.savings
  );

  const { goals, loading: goalsLoading } = useAppSelector(
    (state) => state.savingsGoals
  );

  /* ================= UI STATES ================= */
  const [month, setMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const [title, setTitle] = useState("");
  const [targetAmount, setTargetAmount] = useState("");

  // image states
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // modal
  const [selectedGoal, setSelectedGoal] = useState<any>(null);
  const [amountToAdd, setAmountToAdd] = useState("");
  const [showModal, setShowModal] = useState(false);

  /* ================= EFFECT ================= */
  useEffect(() => {
    dispatch(fetchMonthlySavings(month));
    dispatch(fetchGoals());
  }, [dispatch, month]);

  /* ================= IMAGE HANDLER ================= */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  /* ================= ADD GOAL ================= */
  const handleAddGoal = async () => {
    if (!title || !targetAmount) return;

    let imageUrl = "";

    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "finwise_preset");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dm4qd5n2c/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      imageUrl = data.secure_url;
    }

    dispatch(
      createGoal({
        title,
        targetAmount: Number(targetAmount),
        image: imageUrl,
      })
    );

    setTitle("");
    setTargetAmount("");
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <div className="flex min-h-screen bg-[#f4f7ff]">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto space-y-8">

          {/* MONTH PICKER */}
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border p-2 rounded"
          />

          {/* MONTHLY SAVINGS */}
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

          {/* ================= GOALS ================= */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold mb-8">
              🎯 Savings Goals
            </h2>

            {/* ADD GOAL */}
            <div className="flex gap-4 mb-6 flex-wrap items-center">
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

              <label className="cursor-pointer bg-gray-100 px-4 py-2 rounded border">
                📷 Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              <button
                onClick={handleAddGoal}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 shadow"
              >
                Add Goal
              </button>
            </div>

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-40 h-32 object-cover rounded-xl mb-8 shadow"
              />
            )}

            {goalsLoading && <p>Loading goals...</p>}

            {/* GOAL CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {goals.map((goal) => {
                const progress =
                  (goal.currentAmount / goal.targetAmount) * 100;

                return (
                  <div
                    key={goal._id}
                    className="bg-[#f3efe9] rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all"
                  >
                    <div className="h-[220px] overflow-hidden">
                      <img
                        src={
                          goal.image ||
                          "https://images.unsplash.com/photo-1523287562758-66c7fc58967f"
                        }
                        alt={goal.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-6">
                      <h4 className="text-lg font-bold mb-1">
                        {goal.title}
                      </h4>

                      <p className="text-sm text-gray-600 mb-4">
                        {goal.currentAmount.toLocaleString()} /{" "}
                        {goal.targetAmount.toLocaleString()} LKR
                      </p>

                      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                        <div
                          className="bg-green-600 h-3 rounded-full"
                          style={{
                            width: `${Math.min(progress, 100)}%`,
                          }}
                        />
                      </div>

                      <p className="text-xs text-gray-600 mb-4">
                        {progress.toFixed(1)}% completed
                      </p>

                      {progress >= 100 && (
                        <p className="text-green-600 font-semibold mb-3">
                          🎉 Goal Completed!
                        </p>
                      )}

                      <button
                        onClick={() => {
                          setSelectedGoal(goal);
                          setShowModal(true);
                        }}
                        className="w-full bg-emerald-600 text-white py-2 rounded-lg"
                      >
                        ➕ Add Savings
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* ADD SAVINGS MODAL */}
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
                  if (!amountToAdd) return;

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
