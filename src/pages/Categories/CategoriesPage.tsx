// pages/CategoriesPage.tsx
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchCategories, addCategory, deleteCategory, updateCategory } from "../../store/slices/categoriesSlice";
import type { Category } from "../../store/slices/categoriesSlice";

const CategoriesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categories, loading, error } = useAppSelector(state => state.categories);
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Add new category
  const handleAdd = async () => {
    if (newCategory.trim() === "") return;

    const resultAction = await dispatch(addCategory(newCategory));
    if (addCategory.fulfilled.match(resultAction)) {
      setNewCategory(""); // clear input
    } else {
      alert(resultAction.payload || "Failed to add category");
    }
  };

  // Delete category
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteCategory(id));
    }
  };

  // Start editing a category
  const startEdit = (cat: Category) => {
    setEditingId(cat._id);
    setEditingName(cat.name);
  };

  // Save updated category
  const saveEdit = async () => {
    if (!editingName.trim() || !editingId) return;

    const resultAction = await dispatch(updateCategory({ id: editingId, name: editingName }));
    if (updateCategory.fulfilled.match(resultAction)) {
      setEditingId(null);
      setEditingName("");
    } else {
      alert(resultAction.payload || "Failed to update category");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-4">Categories</h1>

      {/* Add new category */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="New category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 rounded">Add</button>
      </div>

      {/* Loading / error */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Categories list */}
      <ul className="space-y-2">
        {Array.isArray(categories) && categories.map((cat: Category) => (
          <li key={cat._id} className="flex justify-between items-center bg-white p-2 rounded shadow">
            {editingId === cat._id ? (
              <div className="flex gap-2 flex-1">
                <input
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="border p-1 rounded flex-1"
                />
                <button onClick={saveEdit} className="bg-green-600 text-white px-2 rounded">Save</button>
                <button onClick={() => setEditingId(null)} className="bg-gray-400 text-white px-2 rounded">Cancel</button>
              </div>
            ) : (
              <>
                <span>{cat.name}</span>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(cat)} className="text-blue-500">Edit</button>
                  <button onClick={() => handleDelete(cat._id)} className="text-red-500">Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesPage;
