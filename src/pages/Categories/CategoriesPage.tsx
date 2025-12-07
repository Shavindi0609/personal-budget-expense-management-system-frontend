import React, { useState, useEffect } from "react";
import api from "../../api/axiosClient";

const CategoriesPage: React.FC = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState<{ name: string }[]>([]);

  const fetchCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data);
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleAdd = async () => {
    try {
      const res = await api.post("/categories", { name });
      setCategories([...categories, res.data]);
      setName("");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to add");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Categories (Admin)</h2>

      <div className="flex gap-2 mb-4">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Category Name" className="border p-2 rounded" />
        <button onClick={handleAdd} className="bg-blue-600 text-white p-2 rounded">Add</button>
      </div>

      <ul>
        {categories.map((c, idx) => <li key={idx}>{c.name}</li>)}
      </ul>
    </div>
  )
};

export default CategoriesPage;
