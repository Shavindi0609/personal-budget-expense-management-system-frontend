import React from "react";
import { Link } from "react-router-dom";

const HomePublic: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to FinWise</h1>

      <p className="text-lg mb-6 text-gray-700">
        Manage your expenses, incomes and categories efficiently.
      </p>

      <div className="space-x-4">
        <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded">
          Login
        </Link>
        <Link to="/register" className="px-4 py-2 bg-green-600 text-white rounded">
          Register
        </Link>
      </div>
    </div>
  );
};

export default HomePublic;
