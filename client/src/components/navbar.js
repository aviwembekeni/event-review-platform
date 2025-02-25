import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token"); // Check if user is logged in

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Event Review Platform
        </Link>
        <div className="space-x-4">
          <Link to="/profile" className="hover:text-blue-200">Profile</Link>
          <Link to="/calendar" className="hover:text-blue-200">Calendar</Link>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="hover:text-blue-200">
              Sign Out
            </button>
          ) : (
            <>
              <Link to="/register" className="hover:text-blue-200">Sign Up</Link>
              <Link to="/login" className="hover:text-blue-200">Sign In</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
