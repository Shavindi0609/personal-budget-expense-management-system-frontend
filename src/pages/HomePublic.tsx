import React from "react";
import { Link } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar"; // make sure path is correct

const HomePublic: React.FC = () => {
  return (
    <div className="bg-[#f4f7ff] min-h-screen">
       <PublicNavbar />

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
{/* RIGHT SIDE HERO MOCKUP */}
<div className="relative flex justify-center items-center w-full h-[500px] md:h-[550px]">
  
  {/* Background image - moved slightly to the right */}
  <div className="absolute inset-0 flex justify-center items-center">
    <img
      src="/mnt/data/8b701540-c4c4-4588-b672-701cbe2ec082.png"
      alt="People using app"
      className="rounded-3xl shadow-xl object-cover w-[300px] md:w-[350px] h-[400px] md:h-[450px] z-0 translate-x-10 md:translate-x-16"
    />
  </div>

  {/* Phone mockup - moved slightly to the left */}
  <div className="relative z-10 w-[200px] md:w-[250px] h-[400px] md:h-[500px] bg-white rounded-3xl shadow-2xl overflow-hidden flex justify-center items-center -translate-x-10 md:-translate-x-16">
    <img
      src="https://i.imgur.com/Mx1mM3S.png"
      alt="App Mockup"
      className="w-full h-full object-cover"
    />

    {/* Overlay Goal card */}
    <div className="absolute top-5 right-[-60px] w-36 bg-white shadow-lg rounded-xl p-3">
      <h4 className="text-sm font-semibold text-gray-700">Goals</h4>
      <div className="mt-2 text-xs text-gray-500 space-y-1">
        <p>🏖️ Vacation</p>
        <p>🎓 Masters Degree</p>
        <p>🏠 Rental Property</p>
      </div>
    </div>

    {/* Overlay Budget card */}
    <div className="absolute bottom-5 left-[-60px] w-36 bg-white shadow-lg rounded-xl p-3">
      <h4 className="text-sm font-semibold text-gray-700">Budget</h4>
      <p className="text-xs text-gray-500 mt-1">Planned: $10,548</p>
      <p className="text-xs text-gray-500">Spent: $6,856</p>
      <div className="h-2 bg-purple-200 rounded-full mt-2">
        <div className="h-2 bg-purple-700 rounded-full w-2/3"></div>
      </div>
    </div>
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


{/* ---------------------------------------------------- */}
{/*                    ABOUT US SECTION                  */}
{/* ---------------------------------------------------- */}
<section className="bg-[#f4f7ff] py-28">
  <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

    {/* LEFT SIDE – TEXT */}
    <div>
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
        About <span className="text-purple-700">FinWise</span>
      </h2>

      <p className="text-lg text-gray-600 mt-6">
        FinWise was built with one simple mission — to help people take control
        of their money with clarity and confidence.
      </p>

      <p className="text-gray-600 mt-4">
        We believe budgeting shouldn’t feel complicated or restrictive.
        Instead, it should be simple, visual, and empowering. FinWise combines
        smart automation with human-friendly design so you always know where
        your money is going.
      </p>

      <div className="mt-8 space-y-4">
        <div className="flex items-start gap-3">
          <span className="text-purple-700 text-xl">✔</span>
          <p className="text-gray-700">
            Built for individuals, families, and small businesses
          </p>
        </div>

        <div className="flex items-start gap-3">
          <span className="text-purple-700 text-xl">✔</span>
          <p className="text-gray-700">
            Privacy-first approach with secure data protection
          </p>
        </div>

        <div className="flex items-start gap-3">
          <span className="text-purple-700 text-xl">✔</span>
          <p className="text-gray-700">
            Designed to grow with your financial goals
          </p>
        </div>
      </div>

      <div className="mt-10">
        <Link
          to="/register"
          className="inline-block px-8 py-3 bg-purple-700 hover:bg-purple-800 text-white rounded-full text-lg shadow transition"
        >
          Start your journey
        </Link>
      </div>
    </div>

    {/* RIGHT SIDE – CARD / IMAGE */}
    <div className="relative">
      <div className="bg-white rounded-3xl shadow-2xl p-10">
        <h4 className="text-xl font-bold text-gray-900 mb-6">
          Why people choose FinWise
        </h4>

        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              📈
            </div>
            <p className="text-gray-700">
              Clear insights into spending & saving
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              🔒
            </div>
            <p className="text-gray-700">
              Secure by design, trusted by users
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              ⚡
            </div>
            <p className="text-gray-700">
              Fast setup, easy to use, no learning curve
            </p>
          </div>
        </div>
      </div>

      {/* Decorative accent */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-purple-200 rounded-full blur-2xl opacity-60"></div>
    </div>

  </div>
</section>


      {/* ---------------------------------------------------- */}
{/*          TRUST / SOCIAL PROOF SECTION (QUICKEN STYLE) */}
{/* ---------------------------------------------------- */}
<section className="bg-[#e9edff] py-24">
  <div className="max-w-6xl mx-auto px-6 text-center">

    {/* Heading */}
    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
      Over <span className="text-purple-700">20 million</span> better financial
      <br className="hidden md:block" />
      lives built, and counting
    </h2>

    {/* Cards + Image */}
    <div className="mt-20 grid grid-cols-1 md:grid-cols-5 gap-8 items-center">

      {/* Card 1 */}
      <div className="bg-white rounded-2xl shadow-md p-6 text-left">
        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
          ❤️
        </div>
        <h4 className="font-semibold text-gray-900">
          Trusted for over 40 years
        </h4>
        <p className="text-gray-600 text-sm mt-2">
          #1 best-selling with 20+ million customers over 4 decades.
        </p>
      </div>

      {/* Card 2 */}
      <div className="bg-white rounded-2xl shadow-md p-6 text-left">
        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
          🏦
        </div>
        <h4 className="font-semibold text-gray-900">
          Bank-grade security
        </h4>
        <p className="text-gray-600 text-sm mt-2">
          We protect your data with industry-standard 256-bit encryption.
        </p>
      </div>

      {/* CENTER IMAGE */}
      <div className="md:col-span-1 flex justify-center">
        <div className="relative w-[240px] h-[320px] rounded-3xl overflow-hidden shadow-xl">
          <img
            src="/mnt/data/387fe245-cbed-4b51-b33c-6966d33230c9.png"
            alt="Happy users"
            className="w-full h-full object-cover"
          />
          {/* Decorative rings */}
          <div className="absolute inset-0 border-2 border-white/40 rounded-3xl"></div>
        </div>
      </div>

      {/* Card 3 */}
      <div className="bg-white rounded-2xl shadow-md p-6 text-left">
        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
          📊
        </div>
        <h4 className="font-semibold text-gray-900">
          Your privacy matters
        </h4>
        <p className="text-gray-600 text-sm mt-2">
          Rest assured, we’ll never sell your personal data.
        </p>
      </div>

      {/* Card 4 */}
      <div className="bg-white rounded-2xl shadow-md p-6 text-left">
        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
          💳
        </div>
        <h4 className="font-semibold text-gray-900">
          No surprise charges or ads
        </h4>
        <p className="text-gray-600 text-sm mt-2">
          No hidden fees or annoying ads. What you see is what you get.
        </p>
      </div>

    </div>
  </div>
</section>

{/* ---------------------------------------------------- */}
{/*                       FOOTER                         */}
{/* ---------------------------------------------------- */}
<footer className="bg-[#0f1020] text-gray-300 pt-20 pb-10">
  <div className="max-w-6xl mx-auto px-6">

    {/* TOP GRID */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

      {/* BRAND */}
      <div>
        <h3 className="text-2xl font-extrabold text-white">
          Fin<span className="text-purple-500">Wise</span>
        </h3>
        <p className="mt-4 text-sm text-gray-400 leading-relaxed">
          FinWise helps you manage budgets, track spending, and plan your
          financial future — all in one simple, secure platform.
        </p>
      </div>

      {/* PRODUCT */}
      <div>
        <h4 className="text-white font-semibold mb-4">Product</h4>
        <ul className="space-y-3 text-sm">
          <li>
            <Link to="/features" className="hover:text-purple-400 transition">
              Features
            </Link>
          </li>
          <li>
            <Link to="/pricing" className="hover:text-purple-400 transition">
              Pricing
            </Link>
          </li>
          <li>
            <Link to="/security" className="hover:text-purple-400 transition">
              Security
            </Link>
          </li>
          <li>
            <Link to="/roadmap" className="hover:text-purple-400 transition">
              Roadmap
            </Link>
          </li>
        </ul>
      </div>

      {/* COMPANY */}
      <div>
        <h4 className="text-white font-semibold mb-4">Company</h4>
        <ul className="space-y-3 text-sm">
          <li>
            <Link to="/about" className="hover:text-purple-400 transition">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/careers" className="hover:text-purple-400 transition">
              Careers
            </Link>
          </li>
          <li>
            <Link to="/blog" className="hover:text-purple-400 transition">
              Blog
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-purple-400 transition">
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {/* LEGAL */}
      <div>
        <h4 className="text-white font-semibold mb-4">Legal</h4>
        <ul className="space-y-3 text-sm">
          <li>
            <Link to="/privacy" className="hover:text-purple-400 transition">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="/terms" className="hover:text-purple-400 transition">
              Terms of Service
            </Link>
          </li>
          <li>
            <Link to="/cookies" className="hover:text-purple-400 transition">
              Cookie Policy
            </Link>
          </li>
        </ul>
      </div>

    </div>

    {/* DIVIDER */}
    <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">

      {/* COPYRIGHT */}
      <p className="text-sm text-gray-400">
        © {new Date().getFullYear()} FinWise. All rights reserved.
      </p>

      {/* SOCIAL ICONS */}
      <div className="flex items-center gap-4">
        <a
          href="#"
          className="w-9 h-9 rounded-full bg-white/10 hover:bg-purple-600 flex items-center justify-center transition"
        >
          🌐
        </a>
        <a
          href="#"
          className="w-9 h-9 rounded-full bg-white/10 hover:bg-purple-600 flex items-center justify-center transition"
        >
          🐦
        </a>
        <a
          href="#"
          className="w-9 h-9 rounded-full bg-white/10 hover:bg-purple-600 flex items-center justify-center transition"
        >
          💼
        </a>
      </div>
    </div>

  </div>
</footer>


    </div>
  );
};

export default HomePublic;
