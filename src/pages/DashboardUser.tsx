import React from "react";
import DashboardLayout from "../components/DashboardLayout";

const DashboardUser: React.FC = () => {
  return (
    <DashboardLayout>
      {/* Top Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <button className="text-2xl">🔔</button>
          <img
            src="https://i.pravatar.cc/40"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-purple-700 text-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-sm">Balance</h2>
          <p className="text-2xl font-bold mt-2">$53,250</p>
          <p className="text-xs mt-1">Card 05 • **** 6252</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-sm text-gray-500">Exchange Rates</h2>
          <p className="text-lg mt-2">USD → IDR</p>
          <div className="h-16 bg-gray-100 rounded mt-2"></div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col justify-between">
          <div>
            <h2 className="text-sm text-gray-500">Efficiency</h2>
            <p className="text-2xl font-bold mt-2">$1,700</p>
            <p className="text-xs mt-1 text-gray-400">Income vs Expense</p>
          </div>
          <div className="mt-6 flex flex-col gap-3">
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Add Income
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Add Expense
            </button>
          </div>
        </div>
      </div>

      {/* History Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
        <h2 className="text-lg font-semibold mb-2">History</h2>
        <div className="h-35 bg-gray-100 rounded"></div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        <ul className="space-y-3">
          <li className="flex justify-between">
            <span>Tom Holland</span>
            <span className="text-green-500">+$250</span>
          </li>
        </ul>
      </div>
    </DashboardLayout>
  );
};

export default DashboardUser;
