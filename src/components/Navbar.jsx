import { useAuth } from "../context/AuthContext";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaChevronDown, FaPlus, FaBars, FaTimes } from "react-icons/fa";
import { BiCurrentLocation } from "react-icons/bi";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchItem, setSearchItem] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchItem.trim()) {
      navigate(`/home?search=${searchItem}`);
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const goToSell = () => {
    navigate('/sell');
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md py-3 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop View */}
        <div className="hidden md:flex items-center justify-between">
          <Link to="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/42/OLX_New_Logo.png"
              alt="OLX Logo"
              className="w-16 h-auto"
            />
          </Link>

          <div className="flex items-center border border-gray-400 rounded-md px-3 py-2 w-60">
            <BiCurrentLocation className="text-gray-600 mr-2" />
            <input
              type="text"
              placeholder="Enter your location"
              className="outline-none flex-grow text-sm text-gray-700"
            />
            <FaChevronDown className="text-gray-500" />
          </div>

          <form 
            onSubmit={handleSearch}
            className="flex items-center border border-gray-400 rounded-md w-full max-w-lg mx-4 overflow-hidden">
            <input
              type="text"
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
              placeholder="Find Cars, Mobile Phones and more..."
              className="p-2 flex-grow outline-none text-sm text-gray-700"
            />
            <button className="bg-blue-500 px-4 py-2 text-white flex items-center justify-center"
              type="submit">
              <FaSearch />
            </button>
          </form>

          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <span className="text-gray-700 font-semibold">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-full cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="text-gray-700 font-semibold hover:text-blue-600">
                Login
              </Link>
            )}

            <button 
              className="flex items-center bg-yellow-500 text-black px-4 py-2 rounded-full font-semibold border border-black hover:bg-yellow-600 transition cursor-pointer"
              onClick={goToSell}>
              <FaPlus className="mr-2" /> Sell
            </button>
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden">
          <div className="flex items-center justify-between">
            <Link to="/">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/42/OLX_New_Logo.png"
                alt="OLX Logo"
                className="w-12 h-auto"
              />
            </Link>

            <div className="flex items-center space-x-4">
              <button 
                className="flex items-center bg-yellow-500 text-black px-3 py-1 rounded-full font-semibold border border-black text-sm"
                onClick={goToSell}>
                <FaPlus className="mr-1" /> Sell
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 p-2"
              >
                {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} mt-4 space-y-4`}>
            <div className="flex items-center border border-gray-400 rounded-md px-3 py-2">
              <BiCurrentLocation className="text-gray-600 mr-2" />
              <input
                type="text"
                placeholder="Enter your location"
                className="outline-none flex-grow text-sm text-gray-700"
              />
              <FaChevronDown className="text-gray-500" />
            </div>

            <form 
              onSubmit={handleSearch}
              className="flex items-center border border-gray-400 rounded-md overflow-hidden">
              <input
                type="text"
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                placeholder="Find Cars, Mobile Phones and more..."
                className="p-2 flex-grow outline-none text-sm text-gray-700"
              />
              <button className="bg-blue-500 px-4 py-2 text-white flex items-center justify-center"
                type="submit">
                <FaSearch />
              </button>
            </form>

            <div className="flex flex-col space-y-4">
              {user ? (
                <>
                  <span className="text-gray-700 font-semibold">{user.email}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-full cursor-pointer w-full"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="text-gray-700 font-semibold hover:text-blue-600 text-center py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};