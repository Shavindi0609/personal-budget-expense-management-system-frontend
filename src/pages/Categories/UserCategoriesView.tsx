import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { Search, Folder } from "lucide-react";

const UserCategoriesView: React.FC = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  const token = useAppSelector((s) => s.auth.accessToken);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/v1/categories", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setCategories(data.categories || []);
      } catch {
        console.log("Failed to load categories");
      }
    };

    if (token) fetchCategories();
  }, [token]);

  const filteredCategories = categories.filter((cat: any) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">
        Your Categories
      </h1>

      {/* 🔍 Search Bar */}
      <div className="relative mb-5">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search categories..."
          className="w-full pl-10 pr-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Category List */}
      <div className="space-y-3">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((cat: any) => (
            <div
              key={cat._id}
              className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition"
            >
              <Folder className="text-blue-600 mr-3" size={24} />
              <span className="text-gray-700 font-medium">{cat.name}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No categories found.</p>
        )}
      </div>
    </div>
  );
};

export default UserCategoriesView;
