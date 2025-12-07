
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/slices/authSlice';
import { logoutUser } from '../store/slices/userSlice';

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector(s => s.auth.accessToken);
  const user = useAppSelector(s => s.user.user);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-semibold">FinWise</Link>

      <div className="space-x-4">

        {/* 🔥 NOT LOGGED IN → Show Login + Register */}
        {!token || !user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          /* 🔥 LOGGED IN → Show dashboard per role */
          <>
            {user.role === "admin" && <Link to="/admin">Admin Dashboard</Link>}
            {user.role === "user" && <Link to="/user">User Dashboard</Link>}


             {/* 🔥 Admin Manage Category(Add,Update,Delete) */}
            {user.role === "admin" && <Link to="/categories">Manage Categories</Link>}

            {/* 🔥 User ට list view witharak */}
            {user.role === "user" && <Link to="/categories-view">Categories</Link>}


            <Link to="/expenses">Expenses</Link>
            <Link to="/incomes">Incomes</Link>

            <button 
              onClick={handleLogout}
              className="ml-4 px-3 py-1 bg-red-500 text-white rounded"
            >
              Logout
            </button>
          </>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
