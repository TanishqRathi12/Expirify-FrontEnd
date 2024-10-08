import React from 'react';
import Navbar from '../Components/Navbar';

function About() {
  const teamMembers = [
    { name: "Tanishq Rathi", role: "Full Stack Developer", image: "tanishq.jpg" },
    { name: "Anuj Kaushik", role: "Frontend Developer", image: "Anuj.jpg" },
    { name: "Anas Fareedi", role: "Backend Developer", image: "anas.jpg" },
    { name: "Amrit Arora", role: "UI/UX Designer", image: "amrit.png" },
    { name: "Anshika Chauhan", role: "Quality Assurance", image: "anshika.jpg" },
  ];

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-blue-100 to-blue-300 min-h-screen flex flex-col items-center justify-center p-8">
        <h1 className="text-5xl font-extrabold mb-6 text-center text-gray-800">About Us</h1>
        <p className="text-lg mb-8 text-center text-gray-700 max-w-2xl">
          We are a passionate team dedicated to providing innovative solutions to help you keep track of your product expiry dates.
          Our project aims to simplify your life by automatically reminding you of approaching expiry dates and ensuring you never waste products again.
        </p>
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105">
              <img src={`/${member.image}`} alt={member.name} className="w-32 h-32 rounded-full border-4 border-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default About;
