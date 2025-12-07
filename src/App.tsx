// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import LoginPage from './pages/Auth/Login';
// import RegisterPage from './pages/Auth/Register';
// import DashboardAdmin from './pages/DashboardAdmin';
// import DashboardUser from './pages/DashboardUser';
// import CategoriesPage from './pages/Categories/CategoriesPage';
// import Navbar from './components/Navbar';
// import ProtectedRoute from './components/ProtectedRoute';
// import { useAppSelector } from './store/hooks';

// const App: React.FC = () => {
//   const token = useAppSelector((s) => s.auth.accessToken);
//   const user = useAppSelector((s) => s.user.user);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <Routes>
//   <Route path="/login" element={<LoginPage />} />
//   <Route path="/register" element={<RegisterPage />} />

//   {/* Admin dashboard */}
//   <Route
//     path="/admin"
//     element={
//       <ProtectedRoute adminOnly={true}>
//         <DashboardAdmin />
//       </ProtectedRoute>
//     }
//   />

//   {/* User dashboard */}
//   <Route
//     path="/user"
//     element={
//       <ProtectedRoute>
//         <DashboardUser />
//       </ProtectedRoute>
//     }
//   />

//   {/* Admin-only Categories */}
//   <Route
//     path="/categories"
//     element={
//       <ProtectedRoute adminOnly={true}>
//         <CategoriesPage />
//       </ProtectedRoute>
//     }
//   />

//   {/* Catch-all */}
//   <Route path="*" element={<Navigate to={token ? (user?.role === "admin" ? "/admin" : "/user") : "/login"} />} />
// </Routes>

//     </div>
//   );
// };

// export default App;


import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/Register";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardUser from "./pages/DashboardUser";
import CategoriesPage from "./pages/Categories/CategoriesPage";
import HomePublic from "./pages/HomePublic";
import UserCategoriesView from "./pages/Categories/UserCategoriesView";


import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAppSelector } from "./store/hooks";

const App: React.FC = () => {
  const token = useAppSelector(s => s.auth.accessToken);
  const user = useAppSelector(s => s.user.user);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <Routes>
        {/* Public Route */}
        <Route path="/" element={<HomePublic />} />

        {/* Auth */}
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

        <Route
  path="/categories-view"
  element={
    <ProtectedRoute>
      <UserCategoriesView />
    </ProtectedRoute>
  }
/>


        {/* All other paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
