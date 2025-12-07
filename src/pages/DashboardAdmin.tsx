import React from "react";

const DashboardAdmin: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome, admin! Here you can manage categories, users, and more.</p>

      {/* Example: Admin-only actions */}
      <div className="mt-6">
        <button className="px-4 py-2 bg-blue-600 text-white rounded mr-2">
          Add Category
        </button>
        <button className="px-4 py-2 bg-green-600 text-white rounded">
          View All Users
        </button>
      </div>
    </div>
  );
};

export default DashboardAdmin;
