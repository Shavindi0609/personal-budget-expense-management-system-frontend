import React from "react";
import Sidebar from "./Sidebar";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => { //react functional component 
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar left */}
      <Sidebar />

      {/* Main content right */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
