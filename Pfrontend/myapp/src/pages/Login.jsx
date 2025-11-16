import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api.js";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/login", formData);
      localStorage.setItem("token", response.data.token);
      alert("Login successful!");
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-300 to-blue-400 font-sans">
      <div className="bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md transform transition-transform duration-300 hover:-translate-y-3">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
          Welcome Back
        </h2>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="relative">
            <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-12 p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 transition-shadow duration-300"
            />
          </div>
          <div className="relative">
            <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-12 p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 transition-shadow duration-300"
            />
          </div>
          <button
            type="submit"
            className="p-4 bg-purple-600 text-white font-semibold rounded-2xl hover:bg-purple-500 transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-purple-600 font-bold hover:underline"
          >
            Register
          </a>
        </p>
        <p className="mt-4 text-center text-gray-400 text-sm">
          © 2025 MyApp. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Login;
