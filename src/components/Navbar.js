import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ user, onLogout, spotifyUser }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navigate = useNavigate();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("light-mode");
    } else {
      document.documentElement.classList.remove("light-mode");
    }
  };

  const displayName = spotifyUser?.display_name || user?.username || "Guest";

  const profilePic =
    spotifyUser?.images?.length > 0 ? spotifyUser.images[0].url : null;

  return (
    <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <h1
            className="text-2xl font-['Pacifico'] text-white cursor-pointer"
            onClick={() => navigate("/")}
          >
            MoodTune
          </h1>

          <div className="hidden md:flex items-center space-x-6">
            <button
              className="text-white/80 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
              onClick={() => navigate("/about")}
            >
              About
            </button>
            <button
              className="text-white/80 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
              onClick={() => navigate("/library")}
            >
              Library
            </button>
            <button
              className="text-white/80 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
              onClick={() => navigate("/analytics")}
            >
              Analytics
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="text-white/80 hover:text-white transition-all hover:bg-white/10 p-2 rounded-lg whitespace-nowrap cursor-pointer"
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <i
                className={`text-xl transition-transform duration-300 ${
                  isDarkMode ? "ri-moon-line" : "ri-sun-line rotate-180"
                }`}
              ></i>
            </div>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition-all whitespace-nowrap cursor-pointer"
            >
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <span className="text-white text-sm">{displayName}</span>
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-arrow-down-s-line text-white/60"></i>
              </div>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 top-12 w-48 bg-gray-900 border border-white/10 rounded-lg shadow-xl py-2 z-50">
                <button
                  onClick={() => {
                    navigate("/profile");
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-white/80 hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Profile
                </button>

                <hr className="border-white/10 my-2" />
                <button
                  onClick={onLogout}
                  className="w-full text-left px-4 py-2 text-red-400 hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
