import React from "react";
import { Link } from "react-router-dom";

const HomePublic: React.FC = () => {
  return (
    <div className="bg-[#f4f7ff] min-h-screen">

      {/* ---------------------------------------------------- */}
      {/*                     HERO SECTION                    */}
      {/* ---------------------------------------------------- */}
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* LEFT SIDE */}
          <div>
            <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
              Say hi to your new favorite{" "}
              <span className="text-purple-700">budget app</span>
            </h1>

            <p className="text-lg text-gray-600 mt-6">
              Meet FinWise, your fully customizable budgeting tool with built-in
              spending plans, category tracking, and smart money forecasting.
            </p>

            <div className="flex items-center gap-4 mt-8">
              <Link
                to="/login"
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

          {/* RIGHT SIDE MOCKUP */}
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


      {/* ---------------------------------------------------- */}
      {/*                SECOND SECTION (FEATURES)             */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-6xl mx-auto mt-28 grid grid-cols-1 md:grid-cols-2 gap-16 px-6 pb-24">

        {/* LEFT SIDE CONTENT */}
        <div className="space-y-10">

          {/* Feature 1 */}
          <div>
            <h3 className="text-2xl font-bold text-purple-700 border-l-4 border-purple-700 pl-4">
              Automated spending by category
            </h3>
            <p className="text-gray-600 mt-3">
              See your transactions in real time, categorized automatically —
              FinWise learns and remembers your behavior.
            </p>
          </div>

          {/* Feature 2 */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 border-l-4 border-gray-300 pl-4">
              Customized alerts for anything
            </h3>
            <p className="text-gray-600 mt-3">
              Get notified about budgets, bills, unusual activity, and more.
            </p>
          </div>

          {/* Feature 3 */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 border-l-4 border-gray-300 pl-4">
              Projected cashflow to predict the future
            </h3>
            <p className="text-gray-600 mt-3">
              Understand how your money changes over time with smart forecasting.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE BUBBLE CHART */}
        <div className="bg-white shadow-xl rounded-3xl p-8">
          <h3 className="text-xl font-bold mb-4">July Spending Overview</h3>

          <div className="flex flex-wrap justify-center gap-4 mt-6">

            <div className="w-24 h-24 rounded-full bg-purple-700 flex flex-col items-center justify-center text-white">
              <span className="text-sm">Shopping</span>
              <span className="font-bold text-lg">$264</span>
            </div>

            <div className="w-20 h-20 rounded-full bg-teal-400 flex flex-col items-center justify-center text-white">
              <span className="text-sm">Groceries</span>
              <span className="font-bold">$220</span>
            </div>

            <div className="w-20 h-20 rounded-full bg-orange-400 flex flex-col items-center justify-center text-white">
              <span className="text-sm">Restaurants</span>
              <span className="font-bold">$190</span>
            </div>

            <div className="w-16 h-16 rounded-full bg-blue-400 flex flex-col items-center justify-center text-white">
              <span className="text-sm">Gas</span>
              <span className="font-bold">$82</span>
            </div>

            <div className="w-16 h-16 rounded-full bg-yellow-400 flex flex-col items-center justify-center text-white">
              <span className="text-sm">Home</span>
              <span className="font-bold">$110</span>
            </div>

            <div className="w-14 h-14 rounded-full bg-pink-400 flex flex-col items-center justify-center text-white">
              <span className="text-xs">Utility</span>
              <span className="font-bold">$49</span>
            </div>

            <div className="w-14 h-14 rounded-full bg-red-400 flex flex-col items-center justify-center text-white">
              <span className="text-xs">Other</span>
              <span className="font-bold">$54</span>
            </div>

            <div className="w-12 h-12 rounded-full bg-green-500 flex flex-col items-center justify-center text-white">
              <span className="text-xs">Kids</span>
              <span className="font-bold">$33</span>
            </div>

          </div>
        </div>

      </section>
    </div>
  );
};

export default HomePublic;
