import React from "react";
import { Link } from "react-router-dom";

const HomePublic: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f4f7ff] flex items-center justify-center px-6">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* ------------ LEFT SIDE CONTENT ------------ */}
        <div>
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
            Say hi to your new favorite <span className="text-purple-700">budget app</span>
          </h1>

          <p className="text-lg text-gray-600 mt-6">
            Meet FinWise, your fully customizable budgeting tool with built-in
            spending plans, category tracking, and smart money forecasting.
          </p>

          <div className="flex items-center gap-4 mt-8">
            <Link
              to="/get-started"
              className="px-6 py-3 bg-purple-700 hover:bg-purple-800 text-white rounded-full text-lg shadow"
            >
              Get started
            </Link>

            <Link
              to="/learn"
              className="px-6 py-3 border border-gray-300 rounded-full text-lg hover:bg-gray-200"
            >
              Learn more
            </Link>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            <span className="font-semibold">$0.00</span> / free – no credit card required.
          </p>
        </div>

        {/* ------------ RIGHT SIDE IMAGE MOCKUP ------------ */}
        <div className="flex justify-center">
          <div className="relative w-[300px] h-[600px] bg-white rounded-3xl shadow-2xl p-4">
            <img
              src="https://i.imgur.com/Mx1mM3S.png"
              alt="App Mockup"
              className="rounded-xl w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomePublic;
