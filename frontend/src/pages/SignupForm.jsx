import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {toast} from "react-toastify";
import { signupUser } from "../features/user/userSlice";

export default function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // ✨ ADDED: Initialize dispatch

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    photo: null,
  });

  const [profileImagePreview, setProfileImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo") {
      const file = files[0];
      setFormData({ ...formData, photo: file });
      setProfileImagePreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const form = new FormData();
  // ... (append all your form data as before) ...
  form.append("name", formData.name);
  form.append("email", formData.email);
  form.append("password", formData.password);
  form.append("confirmPassword", formData.confirmPassword);
  if (formData.photo) {
    form.append("photo", formData.photo);
  }

  // 2. Dispatch the thunk and let Redux handle the state
  dispatch(signupUser(form))
    .unwrap() // .unwrap() allows you to use .then() and .catch() here
    .then(() => {
      toast.success("Signup successful! 🎉");
      navigate("/");
    })
    .catch((errorMessage) => {
      toast.error(errorMessage);
    });
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-500 via-indigo-500 to-blue-400">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative bg-white rounded-2xl shadow-2xl px-8 py-8 pt-16 w-full max-w-md flex flex-col items-center"
        autoComplete="off"
        encType="multipart/form-data"
      >
        {/* Profile image upload circle */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <label htmlFor="profile-upload" className="cursor-pointer">
            <div className="w-24 h-24 bg-gradient-to-tr from-purple-500 to-indigo-400 rounded-full shadow-lg border-4 border-white flex items-center justify-center overflow-hidden">
              {profileImagePreview ? (
                <img
                  src={profileImagePreview}
                  alt="Profile"
                  className="object-cover w-full h-full rounded-full"
                />
              ) : (
                <svg
                  className="w-12 h-12 text-white opacity-70"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              )}
            </div>
            <span className="block text-xs text-gray-500 mt-2 text-center">
              Upload Photo
            </span>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              name="photo"
              className="hidden"
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="mb-10"></div>

        {/* Name */}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full py-3 px-4 mb-3 rounded-lg border border-gray-200 bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white hover:border-indigo-400 transition"
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full py-3 px-4 mb-3 rounded-lg border border-gray-200 bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white hover:border-indigo-400 transition"
          required
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full py-3 px-4 mb-3 rounded-lg border border-gray-200 bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white hover:border-indigo-400 transition"
          required
        />

        {/* Confirm Password */}
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          className="w-full py-3 px-4 mb-4 rounded-lg border border-gray-200 bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white hover:border-indigo-400 transition"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-400 text-white font-bold text-base shadow-md hover:scale-105 transition transform duration-150 mb-3"
        >
          Sign Up
        </button>

        {/* Google login (placeholder) */}
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

        {/* Login redirect */}
        <div className="text-center text-sm text-indigo-600 mt-2">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/loginForm")}
            className="text-purple-600 underline cursor-pointer hover:text-indigo-800 transition"
          >
            Sign In
          </span>
        </div>
      </motion.form>
    </div>
  );
}