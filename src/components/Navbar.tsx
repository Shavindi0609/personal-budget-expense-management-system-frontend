import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/slices/authSlice';
import { logoutUser } from '../store/slices/userSlice';

const Navbar: React.FC = () => {
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

  // 👇 On login/register page → hide navbar completely
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  // 👇 On public home page → only show Login & Register
  const isPublicHome = location.pathname === '/';

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-semibold">FinWise</Link>

      <div className="space-x-4">
        {isPublicHome ? (
          <>
            <Link to="/login" className="text-purple-600 hover:text-purple-800">Login</Link>
            <Link to="/register" className="text-purple-600 hover:text-purple-800">Register</Link>
          </>
        ) : (
          <>
            {!token || !user ? null : (
              <>
                {user.role === "admin" && <Link to="/admin">Admin Dashboard</Link>}
                {user.role === "user" && <Link to="/user">User Dashboard</Link>}

                {user.role === "admin" && <Link to="/categories">Manage Categories</Link>}
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
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
