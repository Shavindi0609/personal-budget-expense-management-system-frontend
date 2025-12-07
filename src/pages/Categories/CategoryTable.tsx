import React, { useState } from "react";
import api from "../../api/axiosClient";

interface Category {
  _id: string;
  name: string;
}

const CategoryTable: React.FC<{
  categories: Category[];
  refresh: () => void;
}> = ({ categories, refresh }) => {
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const startEdit = (id: string, name: string) => {
    setEditId(id);
    setEditName(name);
  };

  const saveEdit = async () => {
    await api.put(`/categories/${editId}`, { name: editName });
    setEditId(null);
    refresh();
  };

  const deleteCategory = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    await api.delete(`/categories/${id}`);
    refresh();
  };

  return (
    <table className="w-full bg-white shadow rounded overflow-hidden">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-3 text-left">Name</th>
          <th className="p-3 text-center">Actions</th>
        </tr>
      </thead>

      <tbody>
        {categories.map((c) => (
          <tr key={c._id} className="border-b">
            <td className="p-3">
              {editId === c._id ? (
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="p-2 border rounded"
                />
              ) : (
                c.name
              )}
            </td>

            <td className="p-3 flex justify-center gap-3">
              {editId === c._id ? (
                <>
                  <button
                    onClick={saveEdit}
                    className="px-3 py-1 bg-green-600 text-white rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="px-3 py-1 bg-gray-500 text-white rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEdit(c._id, c.name)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCategory(c._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
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
  );
};

export default CategoryTable;
