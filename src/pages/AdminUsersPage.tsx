import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchUsers,
  deleteUser,
  toggleBlockUser,
  updateUserRole,
} from "../store/slices/adminUserSlice";

const AdminUsersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((s) => s.adminUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-right pr-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              items.map((u) => (
                <tr key={u._id} className="border-t">
                  <td className="p-3">{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        u.role === "admin"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td>
                    {u.isBlocked ? (
                      <span className="text-red-600">Blocked</span>
                    ) : (
                      <span className="text-green-600">Active</span>
                    )}
                  </td>
                  <td className="text-right space-x-2 pr-4">
                    <button
                      onClick={() =>
                        dispatch(
                          updateUserRole({
                            id: u._id,
                            role: u.role === "admin" ? "user" : "admin",
                          })
                        )
                      }
                      className="px-3 py-1 bg-blue-600 text-white rounded"
                    >
                      Toggle Role
                    </button>

                    <button
                      onClick={() => dispatch(toggleBlockUser(u._id))}
                      className="px-3 py-1 bg-yellow-500 text-white rounded"
                    >
                      {u.isBlocked ? "Unblock" : "Block"}
                    </button>

                    <button
                      onClick={() => dispatch(deleteUser(u._id))}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsersPage;
