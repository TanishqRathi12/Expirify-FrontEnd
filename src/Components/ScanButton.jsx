import React from 'react';
import { Link } from 'react-router-dom';

function ScanButton() {
  return (
    <div className="flex justify-center items-center h-96 bg-gradient-to-r from-gray-100 to-gray-300 rounded-lg shadow-lg p-8">
      <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-4 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 mx-2">
        Scan to Save the Product
      </button>
      <Link to="/products">
      <button className="bg-green-500 text-white font-bold py-4 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 mx-2">
        Watch your Products
      </button>
      </Link>
    </div>
  );
}

export default ScanButton;
