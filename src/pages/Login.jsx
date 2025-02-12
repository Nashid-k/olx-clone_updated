import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/firebase";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {user}=useAuth()

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password, navigate);
  };

  if(user){
    navigate('/home')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 h-screen w-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/OLX_New_Logo.png" alt="OLX Logo" className="w-24 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Login to Your Account</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="w-full">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
          </div>
          <div className="w-full">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-gray-600">
          Don't have an account? 
          <span
            onClick={() => navigate("/register")}
            className="text-blue-500 cursor-pointer hover:underline ml-1"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
