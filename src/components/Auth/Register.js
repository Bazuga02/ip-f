import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!name) {
      toast.error("Username is required! ");
      return false;
    }
    if (name.length < 4) {
      toast.error("Username must be at least 4 characters long");
      return false;
    }
    if (!email) {
      toast.error("Email is required!");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!password) {
      toast.error("Password is required!");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await axios.post(
        "https://ip-b.onrender.com/api/auth/register",
        {
          name,
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "An error occurred during registration"
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Toaster />
      <div className="bg-yellow-200 p-8 rounded-sm shadow-md w-full max-w-sm">
        <div className=" flex justify-center items-center gap-2 mb-2">
          <img
            src="https://img.icons8.com/?size=100&id=42337&format=png&color=FAB005"
            alt="logo"
          />
          <h2 className="text-2xl font-merienda font-bold mb-4 text-center text-gray-800">
            Register
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 bg-neutral-900 text-white rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 bg-neutral-900 text-white rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 bg-neutral-900 text-white rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full py-2 border-2 border-black text-black font-bold hover:bg-neutral-900 hover:scale-95 transition-all duration-150 hover:text-yellow-500"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
