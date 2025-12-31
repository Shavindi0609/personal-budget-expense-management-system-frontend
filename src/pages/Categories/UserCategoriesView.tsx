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
    <div className="bg-[#f4f7ff] min-h-screen p-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="bg-purple-700 text-white rounded-xl p-6 shadow-md mb-8">
          <div className="flex items-center gap-3">
            <Layers size={26} />
            <h1 className="text-2xl font-bold">Your Categories</h1>
          </div>
          <p className="text-purple-100 mt-1 text-sm">
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
            className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Category List */}
        <div className="grid gap-4">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((cat, idx) => (
              <div
                key={cat._id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow hover:shadow-md transition"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-purple-100 text-purple-700">
                    <Folder size={22} />
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium">{cat.name}</p>
                    <p className="text-xs text-gray-400">
                      Category #{idx + 1}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl shadow p-10 text-center">
              <Folder size={42} className="mx-auto text-gray-400 mb-3" />
              <p className="text-gray-500">No categories found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCategoriesView;
