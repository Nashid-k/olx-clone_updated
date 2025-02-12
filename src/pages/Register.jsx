import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/firebase";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    await signup(name, email, password, navigate);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 h-screen w-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/OLX_New_Logo.png" alt="OLX Logo" className="w-24 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Create an Account</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="w-full">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
          </div>
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
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-gray-600">
          Already have an account? 
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 cursor-pointer hover:underline ml-1"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
