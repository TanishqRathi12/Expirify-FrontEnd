import React from 'react';
import Navbar from '../Components/Navbar';
// import ScanButton from '../Components/ScanButton';
import ManualAdd from '../Components/ManualAdd';
import Footer from '../Components/footer';

function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 p-6">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-10 shadow-md p-4 rounded-lg bg-white">
          Welcome to <span className="text-blue-600">Expirify</span>
        </h1>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl leading-relaxed">
          Keep track of your products' expiry dates effortlessly. Just scan the
          product, and we'll remind you before it expires. Simplifying your life, one notification at a time.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-around w-full max-w-4xl space-y-8 md:space-y-0 md:space-x-10">
          {/* <ScanButton /> */}
          <div className="max-w-md mx-auto mt-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg shadow-md">
  <div className="flex items-center">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M9 3a1 1 0 011 1v6a1 1 0 01-2 0V4a1 1 0 011-1zM9 13a1 1 0 011 1v2a1 1 0 01-2 0v-2a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
    <p className="font-medium">This feature requires payment.</p>
  </div>
  <p className="mt-2 text-sm">To access this service, you must subscribe or pay for it. Unfortunately, it is not available under the free hosting plan. Thank you for your understanding!</p>
</div>
          <ManualAdd />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
