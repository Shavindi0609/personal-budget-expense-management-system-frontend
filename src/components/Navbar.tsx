import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { logout } from '../store/slices/authSlice'

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const token = useAppSelector(s => s.auth.accessToken)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <div className="text-xl font-semibold">FinWise</div>
      <div className="space-x-4">
        {token ? (
          <>
            <Link to="/" className="hover:underline">Dashboard</Link>
            <Link to="/expenses" className="hover:underline">Expenses</Link>
            <Link to="/incomes" className="hover:underline">Incomes</Link>
            <Link to="/categories" className="hover:underline">Categories</Link>
            <button onClick={handleLogout} className="ml-4 px-3 py-1 bg-red-500 text-white rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
