import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://ip-b.onrender.com/api/auth/login",
        { email, password }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className=" bg-yellow-500 p-8 rounded-sm shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-merienda font-bold mb-4 text-center  text-gray-800">
          LOGIN
        </h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2  bg-neutral-900 text-white rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2   bg-neutral-900  rounded-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full py-2 border-2 border-black text-black font-bold  hover:bg-neutral-900 hover:scale-95 transition-all duration-150 hover:text-yellow-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
