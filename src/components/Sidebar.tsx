import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../store/slices/authSlice";
import { logoutUser } from "../store/slices/userSlice";

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = useAppSelector(s => s.auth.accessToken);
  const user = useAppSelector(s => s.user.user);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(logoutUser());
    navigate('/');
  };

  // Hide sidebar on public pages
  if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <aside className="w-64 bg-white min-h-screen p-6 flex flex-col justify-between shadow-lg">
      <div>
        <Link to="/" className="text-2xl font-bold mb-10 block text-purple-700">FinWise</Link>

        <nav className="space-y-4 text-gray-700">
          {token && user && (
            <>
              {user.role === "admin" && (
                <>
                  <Link to="/admin" className="block px-3 py-2 rounded hover:bg-purple-100">Admin Dashboard</Link>
                  <Link to="/categories" className="block px-3 py-2 rounded hover:bg-purple-100">Manage Categories</Link>
                </>
              )}
              {user.role === "user" && (
                <>
                  <Link to="/user" className="block px-3 py-2 rounded hover:bg-purple-100">User Dashboard</Link>
                  <Link to="/categories-view" className="block px-3 py-2 rounded hover:bg-purple-100">Categories</Link>
                </>
              )}
              <Link to="/expenses" className="block px-3 py-2 rounded hover:bg-purple-100">Expenses</Link>
              <Link to="/incomes" className="block px-3 py-2 rounded hover:bg-purple-100">Incomes</Link>
               {/* 🔥 NEW ANALYSIS LINK */}
                  <Link
                    to="/analysis"
                    className="block px-3 py-2 rounded hover:bg-purple-100 font-medium text-purple-700"
                  >
                    Analysis
                  </Link>
            </>
          )}
        </nav>
      </div>

      {token && user && (
        <button
          onClick={handleLogout}
          className="w-full py-2 mt-6 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      )}
    </aside>
  );
};

export default Sidebar;
