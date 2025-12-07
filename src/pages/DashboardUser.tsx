import React from "react";

const DashboardUser: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
      <p>Welcome, user! Track your expenses, incomes, and categories here.</p>

      {/* Example: User actions */}
      <div className="mt-6">
        <button className="px-4 py-2 bg-blue-600 text-white rounded mr-2">
          Add Expense
        </button>
        <button className="px-4 py-2 bg-green-600 text-white rounded">
          Add Income
        </button>
      </div>
    </div>
  );
};

export default DashboardUser;
