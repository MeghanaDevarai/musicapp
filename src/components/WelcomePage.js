import React from "react";
import { Link } from "react-router-dom";

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="text-center text-white p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
        <h1 className="text-5xl font-['Pacifico'] text-white mb-4">
          Welcome to MoodTune!
        </h1>
        <p className="text-blue-200 text-xl mb-8">
          Your AI-powered music streaming experience.
        </p>
        <Link
          to="/login"
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all transform hover:scale-105 whitespace-nowrap cursor-pointer"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
