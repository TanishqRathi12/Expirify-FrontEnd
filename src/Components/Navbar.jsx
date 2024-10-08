import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 shadow-md transition-all duration-300">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/logo.png" className="h-16 w-16" alt="Expirify Logo" />
          <span className="self-center text-3xl font-bold text-blue-600 shadow-lg dark:text-white transition duration-300">
            Expirify
          </span>
        </Link>

        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div className="hidden w-full md:block md:w-auto" id="navbar">
          <ul className="flex flex-col font-medium md:flex-row md:space-x-8 md:mt-0 rounded-lg bg-gray-50 dark:bg-gray-800 md:dark:bg-transparent">
            {['Home', 'Products', 'About', 'Contact'].map((item, index) => (
              <li key={index}>
                <Link
                  to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "")}`}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-blue-600 hover:text-white transition-colors duration-200 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white"
                  aria-current={item === "Home" ? "page" : undefined}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden transition-transform transform ease-in-out duration-300">
          <ul className="flex flex-col font-medium p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
            {['Home', 'Products', 'About', 'Contact'].map((item, index) => (
              <li key={index}>
                <Link
                  to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "")}`}
                  className="block py-2 text-gray-900 rounded hover:bg-blue-600 hover:text-white transition-colors duration-200 dark:text-white dark:hover:bg-gray-700"
                  onClick={toggleMenu}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
