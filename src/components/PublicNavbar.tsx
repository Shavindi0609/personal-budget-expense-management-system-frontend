import React from "react";
import { Link } from "react-router-dom";

const PublicNavbar: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-purple-700">
          FinWise
        </Link>

        <nav className="space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 text-purple-700 border border-purple-700 rounded hover:bg-purple-700 hover:text-white transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 transition"
          >
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default PublicNavbar;
