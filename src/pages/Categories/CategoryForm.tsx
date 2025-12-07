import React, { useState } from "react";
import api from "../../api/axiosClient";

const CategoryForm: React.FC<{ refresh: () => void }> = ({ refresh }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    try {
      await api.post("/categories", { name });
      setName("");
      refresh();
    } catch (err: any) {
      setError(err.response?.data?.message || "Error adding category");
    }
  };

  return (
    <form onSubmit={handleAdd} className="mb-6 flex gap-3">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Category Name"
        className="p-2 border rounded w-64"
      />
      <button className="px-4 py-2 bg-blue-600 text-white rounded">
        Add
      </button>
      {error && <p className="text-red-500 ml-3">{error}</p>}
    </form>
  );
};

export default CategoryForm;
