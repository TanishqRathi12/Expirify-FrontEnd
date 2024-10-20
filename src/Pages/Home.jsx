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
          <ManualAdd />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
