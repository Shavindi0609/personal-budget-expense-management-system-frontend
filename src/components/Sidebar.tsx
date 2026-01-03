import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../store/slices/authSlice";
import { logoutUser } from "../store/slices/userSlice";
import {
  LayoutDashboard,
  Folder,
  Wallet,
  TrendingUp,
  PiggyBank,
  BarChart3,
  LogOut,
  Shield,
  Bot, 
  Users
} from "lucide-react";

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const token = useAppSelector((s) => s.auth.accessToken);
  const user = useAppSelector((s) => s.user.user);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(logoutUser());
    navigate("/");
  };

  if (
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register"
  ) {
    return null;
  }

  const linkStyle = (path: string) =>
    `flex items-center gap-3 px-4 py-2 rounded-xl transition ${
      location.pathname === path
        ? "bg-purple-600 text-white shadow"
        : "text-gray-700 hover:bg-purple-100"
    }`;

  return (
    <aside className="w-64 min-h-screen bg-white shadow-xl flex flex-col justify-between px-4 py-6">
      <div>
        {/* Logo */}
        {/* <Link to="/" className="block mb-10"> */}
          {/* <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl p-4 text-center shadow-lg">
            <h1 className="text-2xl font-bold">FinWise</h1>
            <p className="text-xs text-purple-100">Smart Finance Manager</p>
          </div> */}
          <Link to="/" className="text-2xl font-bold mb-10 block text-purple-700">FinWise</Link>
        {/* </Link> */}

        <nav className="space-y-2">
          {token && user && (
            <>
              {/* ADMIN */}
              {user.role === "admin" && (
                <>
                  <Link to="/admin" className={linkStyle("/admin")}>
                    <Shield size={18} /> Admin Dashboard
                  </Link>

                  <Link to="/categories" className={linkStyle("/categories")}>
                    <Folder size={18} /> Manage Categories
                  </Link>

                  <Link to="/admin/users" className={linkStyle("/admin/users")}>
                    <Users size={18} /> User Management
                  </Link>

                </>
              )}

              {/* USER */}
              {user.role === "user" && (
                <>
                  <Link to="/user" className={linkStyle("/user")}>
                    <LayoutDashboard size={18} /> Dashboard
                  </Link>

                  <Link
                    to="/categories-view"
                    className={linkStyle("/categories-view")}
                  >
                    <Folder size={18} /> Categories
                  </Link>
                </>
              )}

              {/* COMMON */}

              <Link to="/incomes" className={linkStyle("/incomes")}>
                <TrendingUp size={18} /> Incomes
              </Link>

              <Link to="/expenses" className={linkStyle("/expenses")}>
                <Wallet size={18} /> Expenses
              </Link>

              <Link to="/savings" className={linkStyle("/savings")}>
                <PiggyBank size={18} /> Savings
              </Link>

              <Link to="/analysis" className={linkStyle("/analysis")}>
                <BarChart3 size={18} /> Analysis
              </Link>

              <Link to="/ai" className={linkStyle("/ai")}>
                 <Bot size={18} /> AI Assistant
              </Link>


            </>
          )}
        </nav>
      </div>

      {/* Logout */}
      {token && user && (
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition shadow"
        >
          <LogOut size={18} /> Logout
        </button>
      )}
    </aside>
  );
};

export default Sidebar;
