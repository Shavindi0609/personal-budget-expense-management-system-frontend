import React, { useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Users, Folder, TrendingDown, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchAdminStats } from "../store/slices/adminSlice";

const DashboardAdmin: React.FC = () => {
  const dispatch = useAppDispatch();
  const { stats, loading } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAdminStats());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">System overview & administration</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-blue-600 text-white p-6 rounded-2xl shadow">
            <div className="flex items-center gap-3">
              <Users size={28} />
              <div>
                <p className="text-sm opacity-80">Total Users</p>
                <p className="text-2xl font-bold">
                  {loading ? "..." : stats?.users ?? 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-purple-600 text-white p-6 rounded-2xl shadow">
            <div className="flex items-center gap-3">
              <Folder size={28} />
              <div>
                <p className="text-sm opacity-80">Categories</p>
                <p className="text-2xl font-bold">
                  {loading ? "..." : stats?.categories ?? 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-red-500 text-white p-6 rounded-2xl shadow">
            <div className="flex items-center gap-3">
              <TrendingDown size={28} />
              <div>
                <p className="text-sm opacity-80">Total Expenses</p>
                <p className="text-2xl font-bold">
                  Rs. {loading ? "..." : stats?.expenses.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-500 text-white p-6 rounded-2xl shadow">
            <div className="flex items-center gap-3">
              <TrendingUp size={28} />
              <div>
                <p className="text-sm opacity-80">Total Incomes</p>
                <p className="text-2xl font-bold">
                  Rs. {loading ? "..." : stats?.incomes.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardAdmin;
