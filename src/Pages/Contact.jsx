import React from 'react';
import Navbar from '../Components/Navbar';

function Contact() {
  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-blue-200 to-blue-400 min-h-screen flex flex-col items-center justify-center p-6">
        <h1 className="text-5xl font-extrabold mb-6 text-center text-gray-800">Contact Us</h1>
        <p className="text-lg mb-8 text-center text-gray-700 max-w-2xl">
          We would love to hear from you! Whether you have questions, feedback, or just want to get in touch, feel free to reach out to us.
        </p>
        <div className="bg-white shadow-2xl rounded-3xl p-8 flex flex-col items-center max-w-lg w-full transition-transform transform hover:scale-105">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">Get in Touch</h2>
          <p className="text-gray-600 mb-2">
            <strong className="text-gray-800">Phone Number:</strong> <span className="text-gray-600">+91 8859211714</span>
          </p>
          <p className="text-gray-600 mb-2">
            <strong className="text-gray-800">Email:</strong> <span className="text-gray-600">rathitanishq2022@gmail.com</span>
          </p>
          <p className="text-gray-600 mb-4">
            <strong className="text-gray-800">Location:</strong> <span className="text-gray-600">Roorkee, India</span>
          </p>
          <div className="flex space-x-6 mt-6">
            <a
              href="https://twitter.com"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter"></i> Twitter
            </a>
            <a
              href="https://facebook.com"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook"></i> Facebook
            </a>
            <a
              href="https://linkedin.com"
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin"></i> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
