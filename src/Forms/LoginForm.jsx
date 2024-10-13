import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../Components/Axios";
import { useAuth } from "../Context/Authcontext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // State for loading
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setLoading(true); // Set loading to true
      setErrors({}); // Clear previous errors
      try {
        const response = await axios.post("/login", formData);
        localStorage.setItem("token", response.data.token);
        console.log("Login successful");
        login();
        navigate("/");
        setFormData({ email: "", password: "" });
      } catch (error) {
        setLoading(false); // Reset loading state
        if (error.response && error.response.data) {
          setErrors({ apiError: error.response.data.message }); // Display API error message
        } else {
          setErrors({ apiError: "An error occurred. Please try again." });
        }
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-800">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md dark:bg-gray-900">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-900 dark:text-white">Log In</h2>

        {/* Warning Message */}
        <p className="mb-4 text-red-500 text-sm text-center">
          ⚠️ You must log in or sign up to use our services!
        </p>

        {/* Display API error message if present */}
        {errors.apiError && <p className="text-red-500 text-xs italic mb-2">{errors.apiError}</p>}

        <form onSubmit={handleSubmit}>
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
            className={`w-full p-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading} // Disable button when loading
          >
            {loading ? 'Logging In...' : 'Log In'}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
