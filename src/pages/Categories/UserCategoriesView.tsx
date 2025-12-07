import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";

const UserCategoriesView: React.FC = () => {
  const [categories, setCategories] = useState([]);
  const token = useAppSelector((s) => s.auth.accessToken);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/v1/categories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        // 🔥 IMPORTANT FIX HERE
        setCategories(data.categories || []);
      } catch {
        console.log("Failed to load categories");
      }
    };

    if (token) fetchCategories();
  }, [token]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Categories</h1>

      <ul className="space-y-2">
        {categories.map((cat: any) => (
          <li key={cat._id} className="p-3 bg-white shadow rounded">
            {cat.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserCategoriesView;
