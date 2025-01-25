import React from 'react';
import useDarkMode from '../../hooks/useDarkMode'; // Make sure the path is correct

const StaffLogin = () => {
  const [darkMode, toggleDarkMode] = useDarkMode();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#0d1b1e]">
      <div className="w-full max-w-md p-8 bg-white dark:bg-[#11252b] rounded-lg shadow-lg">
        {/* Header Section */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Log in as Staff
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Welcome to CRM+. Let’s login to your account.
        </p>

        {/* Login Form */}
        <form>
          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="staff@gmail.com"
              className="w-full border border-[#14758d] dark:border-[#1a9fb3] bg-white dark:bg-[#0d1b1e] text-gray-900 dark:text-gray-100 rounded-md p-2 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14758d] dark:focus:ring-[#1a9fb3]"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                placeholder="*******"
                className="w-full border border-[#14758d] dark:border-[#1a9fb3] bg-white dark:bg-[#0d1b1e] text-gray-900 dark:text-gray-100 rounded-md p-2 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14758d] dark:focus:ring-[#1a9fb3]"
              />
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="flex items-center justify-between mb-6">
            <a
              href="#"
              className="text-sm text-[#14758d] dark:text-[#1a9fb3] hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#14758d] dark:bg-[#1a9fb3] text-white py-2 px-4 rounded-md hover:bg-[#0d5a65] dark:hover:bg-[#14758d] transition duration-200"
          >
            Log in
          </button>
        </form>

        {/* Toggle Dark/Light Mode */}
        <div className="mt-6 text-center">
          <button
            onClick={toggleDarkMode}
            className="text-sm text-gray-600 dark:text-gray-300"
          >
            Toggle {darkMode ? 'Light' : 'Dark'} Mode
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffLogin;
