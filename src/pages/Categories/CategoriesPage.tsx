import React, { useEffect, useState } from "react";
import api from "../../api/axiosClient";
import { useAppSelector } from "../../store/hooks";
import CategoryForm from "./CategoryForm";
import CategoryTable from "./CategoryTable";

interface Category {
  _id: string;
  name: string;
}

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useAppSelector((s) => s.user.user);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data.categories);
    } catch (err) {
      console.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (user?.role !== "admin") {
    return <p className="text-center mt-10 text-red-500">Admin Only</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Categories</h2>

      <CategoryForm refresh={fetchCategories} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <CategoryTable categories={categories} refresh={fetchCategories} />
      )}
    </div>
  );
};

export default CategoriesPage;
