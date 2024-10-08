import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="border-b border-gray-200 bg-gray-50 dark:bg-gray-800 shadow-md transition-all duration-300">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/logo.png"  className="h-16 w-16 transition-transform duration-300 hover:scale-110" alt="Expirify Logo" />
          <span className="self-center text-4xl font-extrabold text-blue-600 dark:text-white transition-all duration-300 transform hover:-translate-y-1 hover:scale-110 shadow-lg">
            Expirify
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="text-gray-900 dark:text-white font-medium hover:bg-blue-600 hover:text-white transition duration-300 rounded px-4 py-2"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-gray-900 dark:text-white font-medium hover:bg-blue-600 hover:text-white transition duration-300 rounded px-4 py-2"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
