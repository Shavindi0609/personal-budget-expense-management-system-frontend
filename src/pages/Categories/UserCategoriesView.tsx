import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { Search, Folder, Layers } from "lucide-react";
import Sidebar from "../../components/Sidebar";

const ITEMS_PER_PAGE = 5;

const UserCategoriesView: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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

  /* 🔍 SEARCH FILTER */
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  /* 📄 PAGINATION LOGIC */
  const totalPages = Math.ceil(
    filteredCategories.length / ITEMS_PER_PAGE
  );

  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  /* 🔄 Reset page when search changes */
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <div className="flex min-h-screen bg-[#f4f7ff]">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">

          {/* HEADER */}
          <div className="bg-purple-700 text-white rounded-xl p-6 shadow-md mb-8">
            <div className="flex items-center gap-3">
              <Layers size={26} />
              <h1 className="text-2xl font-bold">Your Categories</h1>
            </div>
            <p className="text-purple-100 mt-1 text-sm">
              Total Categories: {filteredCategories.length}
            </p>
          </div>

          {/* SEARCH */}
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

          {/* CATEGORY LIST */}
          <div className="grid gap-4">
            {paginatedCategories.length > 0 ? (
              paginatedCategories.map((cat, idx) => (
                <div
                  key={cat._id}
                  className="flex items-center justify-between bg-white p-4 rounded-lg shadow hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-purple-100 text-purple-700">
                      <Folder size={22} />
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">
                        {cat.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        Category #
                        {(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl shadow p-10 text-center">
                <Folder
                  size={42}
                  className="mx-auto text-gray-400 mb-3"
                />
                <p className="text-gray-500">
                  No categories found
                </p>
              </div>
            )}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((p) => p - 1)
                }
                className={`px-4 py-2 rounded-lg border transition ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white hover:bg-purple-100"
                }`}
              >
                Prev
              </button>

              <span className="text-sm text-gray-600">
                Page{" "}
                <strong>{currentPage}</strong> of{" "}
                <strong>{totalPages}</strong>
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((p) => p + 1)
                }
                className={`px-4 py-2 rounded-lg border transition ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white hover:bg-purple-100"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserCategoriesView;
