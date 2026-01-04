// pages/CategoriesPage.tsx
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchCategories,
  addCategory,
  deleteCategory,
  updateCategory,
} from "../../store/slices/categoriesSlice";
import type { Category } from "../../store/slices/categoriesSlice";
import Sidebar from "../../components/Sidebar";

const CategoriesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categories, loading, error } = useAppSelector(
    (state) => state.categories
  );

  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAdd = async () => {
    if (newCategory.trim() === "") return;

    const resultAction = await dispatch(addCategory(newCategory));
    if (addCategory.fulfilled.match(resultAction)) {
      setNewCategory("");
    } else {
      alert(resultAction.payload || "Failed to add category");
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteCategory(id));
    }
  };

  const startEdit = (cat: Category) => {
    setEditingId(cat._id);
    setEditingName(cat.name);
  };

  const saveEdit = async () => {
    if (!editingName.trim() || !editingId) return;

    const resultAction = await dispatch(
      updateCategory({ id: editingId, name: editingName })
    );

    if (updateCategory.fulfilled.match(resultAction)) {
      setEditingId(null);
      setEditingName("");
    } else {
      alert(resultAction.payload || "Failed to update category");
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
            Categories
          </h1>

          {/* ADD NEW CATEGORY */}
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              placeholder="New category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleAdd}
              className="bg-purple-700 text-white px-6 py-2 rounded-lg hover:bg-purple-800 shadow"
            >
              Add
            </button>
          </div>

          {/* LOADING / ERROR */}
          {loading && (
            <p className="text-gray-600 mb-4">Loading...</p>
          )}
          {error && (
            <p className="text-red-500 mb-4">{error}</p>
          )}

          {/* TABLE */}
          <div className="overflow-x-auto bg-white rounded-xl shadow-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-purple-700 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Category Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {Array.isArray(categories) &&
                  categories.map((cat: Category, idx) => (
                    <tr
                      key={cat._id}
                      className="hover:bg-gray-100"
                    >
                      <td className="px-6 py-4 text-sm">
                        {idx + 1}
                      </td>

                      <td className="px-6 py-4 text-sm">
                        {editingId === cat._id ? (
                          <input
                            value={editingName}
                            onChange={(e) =>
                              setEditingName(e.target.value)
                            }
                            className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        ) : (
                          cat.name
                        )}
                      </td>

                      <td className="px-6 py-4 text-sm">
                        {cat.createdAt
                          ? new Date(
                              cat.createdAt
                            ).toLocaleString()
                          : "-"}
                      </td>

                      <td className="px-6 py-4 text-sm flex gap-2">
                        {editingId === cat._id ? (
                          <>
                            <button
                              onClick={saveEdit}
                              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                            >
                              Save
                            </button>
                            <button
                              onClick={() =>
                                setEditingId(null)
                              }
                              className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEdit(cat)}
                              className="text-blue-600 hover:underline"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                handleDelete(cat._id)
                              }
                              className="text-red-600 hover:underline"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CategoriesPage;
