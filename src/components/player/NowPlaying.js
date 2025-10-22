// "use client";

// import { useState } from "react";

// // export default function NowPlaying({ currentSong }) {
// //   const [isLiked, setIsLiked] = useState(false);

// //   return (
// //     <div className="max-w-md mx-auto text-center">
// //       {/* Album Art */}
// //       <div className="relative mb-8">
// //         <div className="w-80 h-80 mx-auto rounded-2xl overflow-hidden shadow-2xl">
// //           <img
// //             src={currentSong.coverUrl}
// //             alt={currentSong.title}
// //             className="w-full h-full object-cover"
// //           />
// //         </div>

// //         {/* Animated Rings */}
// //         <div className="absolute inset-0 pointer-events-none">
// //           <div className="absolute inset-4 rounded-2xl border-2 border-purple-500/30 animate-pulse"></div>
// //           <div className="absolute inset-8 rounded-2xl border border-pink-500/20 animate-ping" style={{ animationDuration: '3s' }}></div>
// //         </div>
// //       </div>

// //       {/* Song Info */}
// //       <div className="mb-6">
// //         <h1 className="text-3xl font-bold text-white mb-2">{currentSong.title}</h1>
// //         <p className="text-xl text-purple-300 mb-4">{currentSong.artist}</p>
// //         <p className="text-sm text-white/60 mb-4">{currentSong.album}</p>

// //         {/* Mood and Genre Tags */}
// //         <div className="flex justify-center space-x-3">
// //           <span className={`px-3 py-1 rounded-full text-sm font-medium ${
// //             currentSong.mood === 'happy' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
// //             currentSong.mood === 'relaxed' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
// //             currentSong.mood === 'energetic' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
// //             currentSong.mood === 'calm' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
// //             'bg-purple-500/20 text-purple-300 border border-purple-500/30'
// //           }`}>
// //             <div className="w-4 h-4 inline-block mr-2 flex items-center justify-center">
// //               <i className="ri-emotion-line"></i>
// //             </div>
// //             {currentSong.mood}
// //           </span>

// //           <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-white/80 border border-white/20">
// //             <div className="w-4 h-4 inline-block mr-2 flex items-center justify-center">
// //               <i className="ri-music-line"></i>
// //             </div>
// //             {currentSong.genre}
// //           </span>
// //         </div>
// //       </div>

// //       {/* Action Buttons */}
// //       <div className="flex justify-center space-x-6">
// //         <button
// //           onClick={() => setIsLiked(!isLiked)}
// //           className={`p-3 rounded-full transition-all duration-300 ${
// //             isLiked
// //               ? 'text-red-400 bg-red-400/20 border border-red-400/30'
// //               : 'text-white/60 bg-white/10 border border-white/20 hover:text-red-400 hover:bg-red-400/20 hover:border-red-400/30'
// //           }`}
// //         >
// //           <div className="w-6 h-6 flex items-center justify-center">
// //             <i className={isLiked ? 'ri-heart-fill' : 'ri-heart-line'}></i>
// //           </div>
// //         </button>

// //         <button className="p-3 rounded-full text-white/60 bg-white/10 border border-white/20 hover:text-purple-400 hover:bg-purple-400/20 hover:border-purple-400/30 transition-all duration-300">
// //           <div className="w-6 h-6 flex items-center justify-center">
// //             <i className="ri-add-line"></i>
// //           </div>
// //         </button>

// //         <button className="p-3 rounded-full text-white/60 bg-white/10 border border-white/20 hover:text-blue-400 hover:bg-blue-400/20 hover:border-blue-400/30 transition-all duration-300">
// //           <div className="w-6 h-6 flex items-center justify-center">
// //             <i className="ri-share-line"></i>
// //           </div>
// //         </button>

// //         <button className="p-3 rounded-full text-white/60 bg-white/10 border border-white/20 hover:text-green-400 hover:bg-green-400/20 hover:border-green-400/30 transition-all duration-300">
// //           <div className="w-6 h-6 flex items-center justify-center">
// //             <i className="ri-download-line"></i>
// //           </div>
// //         </button>
// //       </div>

// //       {/* AI Mood Analysis */}
// //       <div className="mt-8 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
// //         <h3 className="text-sm font-semibold text-white mb-3 flex items-center justify-center">
// //           <div className="w-4 h-4 mr-2 flex items-center justify-center">
// //             <i className="ri-brain-line"></i>
// //           </div>
// //           AI Mood Analysis
// //         </h3>
// //         <div className="text-xs text-purple-200 space-y-1">
// //           <p>• Energy Level: {currentSong.mood === 'energetic' ? 'High' : currentSong.mood === 'calm' ? 'Low' : 'Medium'}</p>
// //           <p>• Emotional Tone: {currentSong.mood.charAt(0).toUpperCase() + currentSong.mood.slice(1)}</p>
// //           <p>• Recommended Time: {currentSong.mood === 'energetic' ? 'Morning/Workout' : currentSong.mood === 'calm' ? 'Evening/Sleep' : 'Anytime'}</p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// export default function NowPlaying({ currentSong }) {
//   if (!currentSong) {
//     return <div className="text-white text-center">No song selected 🎵</div>;
//   }

//   return (
//     <div className="text-center">
//       <img
//         src={currentSong.coverUrl}
//         alt={currentSong.title}
//         className="w-64 h-64 rounded-2xl shadow-lg mx-auto mb-6"
//       />
//       <h2 className="text-2xl font-bold text-white">{currentSong.title}</h2>
//       <p className="text-purple-300">{currentSong.artist}</p>
//     </div>
//   );
// }
// components/player/NowPlaying.js
import React from "react";

export default function NowPlaying({
  song,
  isPlaying,
  isLiked,
  onToggleLike,
  onAddToPlaylist,
}) {
  // Default album art
  const defaultAlbumArt =
    "https://via.placeholder.com/300x300/6b21a8/ffffff?text=No+Song";

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      {/* Album Art */}
      <div className="relative mb-6">
        <div
          className={`w-64 h-64 rounded-lg shadow-2xl overflow-hidden transform transition-all duration-300 ${
            isPlaying ? "scale-105" : "scale-100"
          }`}
        >
          <img
            src={song?.albumArt || song?.thumbnail || defaultAlbumArt}
            alt={song?.title || "No song playing"}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = defaultAlbumArt;
            }}
          />
        </div>

        {/* Animated Playing Indicator */}
        {isPlaying && (
          <div className="absolute -bottom-2 -right-2 bg-purple-600 rounded-full p-3 shadow-lg">
            <div className="flex items-center gap-1">
              <span className="w-1 h-4 bg-white rounded-full animate-pulse"></span>
              <span className="w-1 h-6 bg-white rounded-full animate-pulse delay-75"></span>
              <span className="w-1 h-3 bg-white rounded-full animate-pulse delay-150"></span>
            </div>
          </div>
        )}
      </div>

      {/* Song Info */}
      <div className="text-center mb-6 max-w-md">
        <h2 className="text-3xl font-bold text-white mb-2">
          {song?.title || "No Song Playing"}
        </h2>
        <p className="text-lg text-purple-300">
          {song?.artist || "Select a song to start"}
        </p>
        {song?.album && (
          <p className="text-sm text-gray-400 mt-1">{song.album}</p>
        )}
      </div>

      {/* Action Buttons */}
      {song && (
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleLike}
            className={`p-3 rounded-full transition-all transform hover:scale-110 ${
              isLiked
                ? "bg-red-500 text-white"
                : "bg-white/10 text-gray-300 hover:bg-red-500 hover:text-white"
            }`}
            title={isLiked ? "Unlike" : "Like"}
          >
            {isLiked ? "❤️" : "🤍"}
          </button>

          {onAddToPlaylist && (
            <button
              onClick={onAddToPlaylist}
              className="p-3 rounded-full bg-white/10 text-gray-300 hover:bg-purple-600 hover:text-white transition-all transform hover:scale-110"
              title="Add to playlist"
            >
              ➕
            </button>
          )}

          <button
            className="p-3 rounded-full bg-white/10 text-gray-300 hover:bg-purple-600 hover:text-white transition-all transform hover:scale-110"
            title="Share"
            onClick={() => {
              if (navigator.share && song) {
                navigator.share({
                  title: song.title,
                  text: `Check out ${song.title} by ${song.artist}`,
                });
              } else {
                alert("Sharing not supported on this browser");
              }
            }}
          >
            🔗
          </button>
        </div>
      )}

      {/* No Song State */}
      {!song && (
        <div className="mt-8 text-center">
          <p className="text-gray-400 mb-4">
            🎵 Your music journey starts here
          </p>
          <div className="flex gap-2 justify-center">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            height: 1rem;
          }
          50% {
            height: 1.5rem;
          }
        }

        .animate-pulse {
          animation: pulse 0.8s ease-in-out infinite;
        }

        .delay-75 {
          animation-delay: 0.075s;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-150 {
          animation-delay: 0.15s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
}
