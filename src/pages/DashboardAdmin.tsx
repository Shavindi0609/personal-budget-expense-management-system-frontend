import React from "react";
import DashboardLayout from "../components/DashboardLayout";

const DashboardAdmin: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p>Welcome, admin! Here you can manage categories, users, and more.</p>

        {/* Example: Admin-only actions */}
        <div className="mt-6 flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded">
            Add Category
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded">
            View All Users
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardAdmin;
