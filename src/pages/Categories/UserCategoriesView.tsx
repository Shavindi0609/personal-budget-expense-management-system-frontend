import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { Search, Folder, Layers } from "lucide-react";

const UserCategoriesView: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
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

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        
        {/* Header Card */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex items-center gap-3">
            <Layers size={28} />
            <h1 className="text-2xl font-semibold">Your Categories</h1>
          </div>
          <p className="text-sm text-blue-100 mt-2">
            Total Categories: {categories.length}
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search
            className="absolute left-4 top-3 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search categories..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Category List */}
        <div className="grid gap-4">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((cat) => (
              <div
                key={cat._id}
                className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
                    <Folder size={22} />
                  </div>
                  <span className="text-gray-800 font-medium text-lg">
                    {cat.name}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow">
              <Folder size={40} className="mx-auto text-gray-400 mb-3" />
              <p className="text-gray-500">No categories found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCategoriesView;
