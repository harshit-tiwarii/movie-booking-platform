import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
// ✨ ADDED: Imports for API calls and state management
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";

export default function LoginForm() {
  const navigate = useNavigate();
  // ✨ ADDED: Initialize dispatch to send actions to Redux
  const dispatch = useDispatch();

  // ✅ CORRECTED: Using a single state object for the form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // ✅ CORRECTED: Handles changes for any input field based on its 'name'
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // ✅ IMPLEMENTED: Full logic for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/userAuth/signinForm`, // Your backend login route
        formData, // Sending email and password
        {
          withCredentials: true, 
        }
      );

      console.log("Login Success ✅", response.data);
      alert("Login successful!");

      // ✨ CRITICAL: Dispatch the user data to the Redux store
      // This will update the Navbar and the rest of the app.
      const userPayload = {
        ...response.data.user,
        photo: response.data.user.photo.secure_url,
      };
      dispatch(setUser(userPayload));

      // Navigate to the homepage after successful login
      navigate("/");

    } catch (err) {
      console.error("Login Failed ❌", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-500 via-indigo-500 to-blue-400">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative bg-white rounded-2xl shadow-2xl px-8 py-8 w-full max-w-md flex flex-col items-center"
        autoComplete="off"
      >
        <h2 className="text-2xl font-bold mb-6 text-indigo-600 tracking-tight">Sign In</h2>
        {/* Email */}
        <input
          className="w-full py-3 px-4 mb-3 rounded-lg border border-gray-200 bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white hover:border-indigo-400 transition"
          placeholder="Email"
          name="email" // 'name' attribute is crucial
          type="email"
          value={formData.email} // Bind value to state
          onChange={handleChange}
          required
        />
        {/* Password */}
        <input
          className="w-full py-3 px-4 mb-4 rounded-lg border border-gray-200 bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white hover:border-indigo-400 transition"
          placeholder="Password"
          name="password" // 'name' attribute is crucial
          type="password"
          value={formData.password} // Bind value to state
          onChange={handleChange}
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-400 text-white font-bold text-base shadow-md hover:scale-105 transition transform duration-150 mb-3"
        >
          Login
        </button>

        {/* Google login */}
        <button
          type="button"
          className="w-full py-3 flex items-center justify-center gap-2 border-2 border-gray-200 rounded-lg mb-3 bg-white shadow-sm hover:border-indigo-300 hover:bg-indigo-50 transition font-semibold"
        >
          <img
            alt="Google"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
            className="w-5 h-5"
          />
          Login with Google
        </button>

        {/* Sign up link */}
        <div className="text-center text-sm text-indigo-600 mt-2">
          Don&apos;t have an account?{" "}
          <span onClick={()=>{navigate('/signupForm')}} className="text-purple-600 underline cursor-pointer hover:text-indigo-800 transition">
            Sign Up
          </span>
        </div>
      </motion.form>
    </div>
  );
}