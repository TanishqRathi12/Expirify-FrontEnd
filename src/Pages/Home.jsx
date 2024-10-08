import React from 'react';
import Navbar from '../Components/Navbar';
import ScanButton from '../Components/ScanButton';

function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 p-4">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 shadow-md p-4 rounded-lg bg-white">
          Welcome to <span className="text-blue-600">Expirify</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-xl">
          Keep track of your products' expiry dates effortlessly. Just scan the
          product, and we'll remind you before it expires. 
        </p>
        <ScanButton />
      </div>
    </>
  );
}

export default Home;
