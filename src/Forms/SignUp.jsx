import axios from "../Components/Axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Authcontext";

const SignApp = () => {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    email: "",
    password: "",
  });
  const { signup } = useAuth();
  
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track submission

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      if (isSubmitting) return; // Throttle: Prevent multiple submissions

      setIsSubmitting(true); // Set submitting state to true

      try {
        const response = await axios.post("/signup", formData);
        localStorage.setItem("token", response.data.token);
        console.log("Signup successful");
        signup();
        navigate("/");
        // Reset form
        setFormData({ phoneNumber: "", email: "", password: "" });
        setErrors({}); // Clear errors on successful signup
      } catch (error) {
        // Handle error response from the server
        if (error.response) {
          // Server responded with a status other than 2xx
          setErrors({ server: error.response.data.msg || "An error occurred during signup." });
        } else {
          // Something else happened (e.g., network error)
          setErrors({ server: "Network error. Please try again later." });
        }
      } finally {
        setIsSubmitting(false); // Reset submitting state
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-800">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md dark:bg-gray-900">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-900 dark:text-white">Sign Up</h2>
        
        {/* Warning message */}
        <div className="mb-4 p-2 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
          <strong>Warning:</strong> You must be logged in or sign up to use our services.
        </div>

        {/* Display error messages */}
        {errors.server && (
          <div className="mb-4 p-2 bg-red-100 border-l-4 border-red-500 text-red-700">
            {errors.server}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Phone Number"
            />
            {errors.phoneNumber && <p className="text-red-500 text-xs italic">{errors.phoneNumber}</p>}
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Password"
            />
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className={`w-full p-2 ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600'} text-white font-semibold rounded-lg hover:bg-blue-500 transition duration-200`}
            disabled={isSubmitting} // Disable button while submitting
          >
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignApp;
