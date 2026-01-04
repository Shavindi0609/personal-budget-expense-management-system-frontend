// pages/AdminUsersPage.tsx
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchUsers,
  deleteUser,
  toggleBlockUser,
  updateUserRole,
} from "../store/slices/adminUserSlice";
import Sidebar from "../components/Sidebar";

const AdminUsersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((s) => s.adminUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleToggleRole = (id: string, role: "user" | "admin") => {
    dispatch(updateUserRole({ id, role: role === "admin" ? "user" : "admin" }));
  };

  const handleToggleBlock = (id: string) => {
    dispatch(toggleBlockUser(id));
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f4f7ff]">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
            User Management
          </h1>

          {/* Loading / Error */}
          {loading && <p className="text-gray-600 mb-4">Loading users...</p>}
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* Users Table */}
          <div className="overflow-x-auto bg-white rounded-xl shadow-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-purple-700 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium">#</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Role</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {items.map((user, idx) => (
                  <tr key={user._id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 text-sm">{idx + 1}</td>
                    <td className="px-6 py-4 text-sm">{user.name}</td>
                    <td className="px-6 py-4 text-sm">{user.email}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {user.isBlocked ? (
                        <span className="text-red-600 font-medium">Blocked</span>
                      ) : (
                        <span className="text-green-600 font-medium">Active</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm flex flex-wrap gap-2">
                      <button
                        onClick={() => handleToggleRole(user._id, user.role)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      >
                        Toggle Role
                      </button>
                      <button
                        onClick={() => handleToggleBlock(user._id)}
                        className={`px-3 py-1 rounded text-white ${
                          user.isBlocked
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-yellow-500 hover:bg-yellow-600"
                        }`}
                      >
                        {user.isBlocked ? "Unblock" : "Block"}
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {items.length === 0 && !loading && (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminUsersPage;
