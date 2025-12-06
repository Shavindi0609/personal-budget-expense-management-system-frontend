import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Auth/Login';
import RegisterPage from './pages/Auth/Register';
// import Dashboard from './pages/Dashboard';
// import ExpensesPage from './pages/Expenses/ExpensesPage';
// import IncomesPage from './pages/Incomes/IncomesPage';
// import CategoriesPage from './pages/Categories/CategoriesPage';
// import AIPage from './pages/AI/AIPage';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { useAppSelector } from './store/hooks';

const App: React.FC = () => {
  const token = useAppSelector((s) => s.auth.accessToken);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        {/* Auth pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected pages
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              <ExpensesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/incomes"
          element={
            <ProtectedRoute>
              <IncomesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <CategoriesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai"
          element={
            <ProtectedRoute>
              <AIPage />
            </ProtectedRoute>
          }
        /> */}

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to={token ? '/' : '/login'} />} />
      </Routes>
    </div>
  );
};

export default App;
