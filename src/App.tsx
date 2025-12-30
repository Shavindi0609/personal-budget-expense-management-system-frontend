import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/Register";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardUser from "./pages/DashboardUser";
import CategoriesPage from "./pages/Categories/CategoriesPage";
import ExpensesPage from "./pages/Expenses/ExpensesPage";
import IncomesPage from "./pages/Incomes/IncomesPage";
import HomePublic from "./pages/HomePublic";
import UserCategoriesView from "./pages/Categories/UserCategoriesView";
import AnalysisPage from "./pages/Analysis/AnalysisPage"
import SavingsPage from "./pages/Savings/SavingsPage"

import ProtectedRoute from "./components/ProtectedRoute";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePublic />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />

        {/* User Dashboard */}
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <DashboardUser />
            </ProtectedRoute>
          }
        />

        {/* Admin-only Categories */}
        <Route
          path="/categories"
          element={
            <ProtectedRoute adminOnly={true}>
              <CategoriesPage />
            </ProtectedRoute>
          }
        />

        {/* User Categories */}
        <Route
          path="/categories-view"
          element={
            <ProtectedRoute>
              <UserCategoriesView />
            </ProtectedRoute>
          }
        />

        {/* Expenses */}
        <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              <ExpensesPage />
            </ProtectedRoute>
          }
        />

                {/* Incomes */}
        <Route
          path="/incomes"
          element={
            <ProtectedRoute>
              <IncomesPage />
            </ProtectedRoute>
          }
        />

        <Route 
          path="/savings"
           element={
             <ProtectedRoute>
                 <SavingsPage />
             </ProtectedRoute>
           }
           />


        <Route 
          path="/analysis"
           element={
             <ProtectedRoute>
                 <AnalysisPage />
             </ProtectedRoute>
           }
           />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
