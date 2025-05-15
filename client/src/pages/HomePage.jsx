import React from "react";
import { Link } from "react-router-dom";
import { ClockIcon, ChartBarIcon, LightBulbIcon } from '@heroicons/react/24/outline';


const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-black text-gray-200 m-auto ">
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto flex justify-between items-center py-6 px-6 md:px-12">
        {/* <div className="text-2xl font-extrabold tracking-wide text-indigo-400 cursor-pointer select-none">
          FinanceTracker
        </div> */}
        <ul className="hidden md:flex space-x-8 text-gray-300 font-medium">
          <li>
            <Link to="/" className="hover:text-indigo-400 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="hover:text-indigo-400 transition">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-indigo-400 transition">
              About Us
            </Link>
          </li>
        </ul>
        {/* <div className="space-x-4">
          <Link
            to="/login"
            className="inline-block px-5 py-2 rounded-full border border-indigo-500 text-indigo-400 hover:bg-indigo-600 hover:text-white transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="inline-block px-5 py-2 rounded-full bg-indigo-500 text-white hover:bg-indigo-700 transition"
          >
            Register
          </Link>
        </div> */}
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-6 md:px-12 py-16 md:py-24 gap-12">
        {/* Left Text */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-5xl font-extrabold leading-tight">
            Track Your Expenses Easily with{" "}
            <span className="text-indigo-400">FinScope</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-lg">
            Easily log your expenses, visualize spending patterns with
            interactive graphs, and get smart budget suggestions. Take control
            of your money and achieve your financial goals effortlessly.
          </p>
          <div className="space-x-4">
            <Link
              to="/register"
              className="inline-block px-8 py-3 bg-indigo-500 rounded-full font-semibold text-white hover:bg-indigo-700 transition"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="inline-block px-8 py-3 border border-indigo-500 rounded-full font-semibold text-indigo-400 hover:bg-indigo-600 hover:text-white transition"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Right Dashboard Image Area */}
        <div className="md:w-1/2 bg-gradient-to-tr from-indigo-800 to-purple-800 rounded-3xl p-8 shadow-2xl text-white">
          {/* Simulated Dashboard Cards */}
          <div className="mb-8 bg-indigo-900 rounded-lg p-6">
            <h3 className="text-sm uppercase font-semibold tracking-widest text-indigo-400 mb-2">
              Total Expenses
            </h3>
            <p className="text-3xl font-bold">$1,280.00</p>
            <p className="text-indigo-300 text-sm mt-1">This month</p>
          </div>

          <div className="mb-6 bg-indigo-700 rounded-lg p-6">
            <h4 className="font-semibold mb-3">Analytics</h4>
            <div className="flex justify-between space-x-4 text-indigo-300 text-sm">
              <div className="w-1/4 h-24 bg-indigo-500 rounded-lg flex items-end justify-center">
                <div className="w-6 h-16 bg-indigo-400 rounded-t"></div>
              </div>
              <div className="w-1/4 h-24 bg-indigo-500 rounded-lg flex items-end justify-center">
                <div className="w-6 h-24 bg-indigo-300 rounded-t"></div>
              </div>
              <div className="w-1/4 h-24 bg-indigo-500 rounded-lg flex items-end justify-center">
                <div className="w-6 h-20 bg-indigo-400 rounded-t"></div>
              </div>
              <div className="w-1/4 h-24 bg-indigo-500 rounded-lg flex items-end justify-center">
                <div className="w-6 h-12 bg-indigo-300 rounded-t"></div>
              </div>
            </div>
          </div>

          <table className="w-full text-sm text-indigo-300 border border-indigo-600 rounded-lg">
            <thead>
              <tr className="border-b border-indigo-600">
                <th className="py-2 px-3 text-left">Expense</th>
                <th className="py-2 px-3 text-left">Date</th>
                <th className="py-2 px-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-indigo-700 hover:bg-indigo-800 transition">
                <td className="py-2 px-3">Entertainment</td>
                <td className="py-2 px-3">12-04-2023</td>
                <td className="py-2 px-3 text-right">$497</td>
              </tr>
              <tr className="border-b border-indigo-700 hover:bg-indigo-800 transition">
                <td className="py-2 px-3">Travel</td>
                <td className="py-2 px-3">10-04-2023</td>
                <td className="py-2 px-3 text-right">$999</td>
              </tr>
              <tr className="hover:bg-indigo-800 transition">
                <td className="py-2 px-3">EMI</td>
                <td className="py-2 px-3">2-4-2023</td>
                <td className="py-2 px-3 text-right">$1200</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {/* Reminder */}
        <div className="space-y-4">
          <ClockIcon className="mx-auto w-14 h-14 text-indigo-400" />
          <h3 className="text-xl font-semibold">Smart Reminders</h3>
          <p className="text-gray-400 max-w-sm mx-auto">
            Never miss an EMI payment or important financial deadline. Our
            reminders help you stay on top of your payments and commitments.
          </p>
        </div>

        {/* Analytics */}
        <div className="space-y-4">
          <ChartBarIcon className="mx-auto w-14 h-14 text-indigo-400" />
          <h3 className="text-xl font-semibold">Spending Analytics</h3>
          <p className="text-gray-400 max-w-sm mx-auto">
            Visualize your spending patterns with interactive charts and clear
            insights to better manage your finances.
          </p>
        </div>

        {/* Suggestions */}
        <div className="space-y-4">
          <LightBulbIcon className="mx-auto w-14 h-14 text-indigo-400" />
          <h3 className="text-xl font-semibold">Budget Suggestions</h3>
          <p className="text-gray-400 max-w-sm mx-auto">
            Get personalized tips and recommendations to optimize your budget
            and save more money.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
