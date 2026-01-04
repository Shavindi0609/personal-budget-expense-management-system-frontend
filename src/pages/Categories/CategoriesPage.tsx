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

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const ITEMS_PER_PAGE = 8;

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsAddModalOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

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

  // 🔍 Search filter
  const filteredCategories = Array.isArray(categories)
    ? categories.filter((cat) =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // 📄 Pagination
  const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCategories = filteredCategories.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="flex min-h-screen bg-[#f4f7ff]">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">
        <div className="max-w-5xl mx-auto">


          {/* SEARCH */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // reset page on search
              }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* ADD NEW CATEGORY BUTTON */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 shadow"
            >
              Add New Category
            </button>
          </div>
         {/* ADD CATEGORY MODAL */}
          {isAddModalOpen && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
                <h2 className="text-xl font-bold mb-4">Add New Category</h2>
                <input
                  type="text"
                  placeholder="Category name"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
                />
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      await handleAdd();
                      setIsAddModalOpen(false);
                    }}
                    className="px-4 py-2 rounded-lg bg-purple-700 text-white hover:bg-purple-800"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}


          {/* LOADING / ERROR */}
          {loading && <p className="text-gray-600 mb-4">Loading...</p>}
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* TABLE */}
          <div className="overflow-x-auto bg-white rounded-xl shadow-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-purple-700 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium">#</th>
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
                  paginatedCategories.map((cat: Category, idx) => (
                    <tr key={cat._id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 text-sm">{startIndex + idx + 1}</td>

                      <td className="px-6 py-4 text-sm">
                        {editingId === cat._id ? (
                          <input
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        ) : (
                          cat.name
                        )}
                      </td>

                      <td className="px-6 py-4 text-sm">
                        {cat.createdAt
                          ? new Date(cat.createdAt).toLocaleString()
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
                              onClick={() => setEditingId(null)}
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
                              onClick={() => handleDelete(cat._id)}
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

          {/* PAGINATION */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-purple-700 text-white"
                    : "bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CategoriesPage;
