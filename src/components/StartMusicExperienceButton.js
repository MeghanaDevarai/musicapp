import React from "react";

export default function StartMusicExperienceButton({ onStart }) {
  return (
    <div className="text-center">
      <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-lg rounded-2xl p-8 border border-white/20 max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="ri-play-circle-line text-white text-3xl"></i>
        </div>

        <h2 className="text-3xl font-bold text-white mb-4">
          Start Your Music Experience
        </h2>

        <p className="text-blue-200 mb-8 max-w-lg mx-auto">
          Let AI analyze your mood and create the perfect soundtrack for your
          day. Enable voice commands and mood detection for a truly personalized
          experience.
        </p>

        <div className="flex items-center justify-center space-x-8 mb-8">
          <div className="flex items-center space-x-3 text-white/80">
            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
              <i className="ri-mic-line text-green-400"></i>
            </div>
            <span className="text-sm">Voice Ready</span>
          </div>

          <div className="flex items-center space-x-3 text-white/80">
            <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
              <i className="ri-emotion-line text-purple-400"></i>
            </div>
            <span className="text-sm">Mood Detection</span>
          </div>

          <div className="flex items-center space-x-3 text-white/80">
            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
              <i className="ri-magic-line text-blue-400"></i>
            </div>
            <span className="text-sm">Smart Playlists</span>
          </div>
        </div>

        <button
          onClick={onStart}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 whitespace-nowrap cursor-pointer"
        >
          Launch Music Player
        </button>

        <p className="text-white/60 text-sm mt-4">
          🎧 Best experienced with headphones
        </p>
      </div>
    </div>
  );
}
