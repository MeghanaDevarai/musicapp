// 'use client';

// import { useState, useEffect } from 'react';

// export default function PlayerControls({
//   currentSong,
//   isPlaying,
//   setIsPlaying,
//   currentTime,
//   setCurrentTime,
//   volume,
//   setVolume,
//   isShuffled,
//   setIsShuffled,
//   repeatMode,
//   setRepeatMode,
//   onNext,
//   onPrevious
// }) {
//   const [duration] = useState(242); // Mock duration in seconds (4:02)

//   useEffect(() => {
//     if (isPlaying) {
//       const timer = setInterval(() => {
//         setCurrentTime(prev => {
//           if (prev >= duration) {
//             if (repeatMode === 'one') {
//               return 0;
//             } else if (repeatMode === 'all') {
//               onNext();
//               return 0;
//             } else {
//               setIsPlaying(false);
//               return duration;
//             }
//           }
//           return prev + 1;
//         });
//       }, 1000);
//       return () => clearInterval(timer);
//     }
//   }, [isPlaying, duration, repeatMode, onNext, setCurrentTime, setIsPlaying]);

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   const handleSeek = (e) => {
//     const newTime = parseInt(e.target.value);
//     setCurrentTime(newTime);
//   };

//   const toggleRepeat = () => {
//     const modes = ['none', 'all', 'one'];
//     const currentIndex = modes.indexOf(repeatMode);
//     const nextIndex = (currentIndex + 1) % modes.length;
//     setRepeatMode(modes[nextIndex]);
//   };

//   const getRepeatIcon = () => {
//     switch (repeatMode) {
//       case 'one': return 'ri-repeat-one-line';
//       case 'all': return 'ri-repeat-line';
//       default: return 'ri-repeat-line';
//     }
//   };

//   return (
//     <div className="bg-black/40 backdrop-blur-sm border-t border-white/10 p-6">
//       {/* Progress Bar */}
//       <div className="mb-6">
//         <div className="flex items-center space-x-4">
//           <span className="text-sm text-purple-300 font-mono w-12">{formatTime(currentTime)}</span>
//           <div className="flex-1 relative">
//             <input
//               type="range"
//               min="0"
//               max={duration}
//               value={currentTime}
//               onChange={handleSeek}
//               className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
//             />
//             <div
//               className="absolute top-0 left-0 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg pointer-events-none"
//               style={{ width: `${(currentTime / duration) * 100}%` }}
//             />
//           </div>
//           <span className="text-sm text-purple-300 font-mono w-12">{formatTime(duration)}</span>
//         </div>
//       </div>

//       <div className="flex items-center justify-between">
//         {/* Left Controls */}
//         <div className="flex items-center space-x-4">
//           <button
//             onClick={() => setIsShuffled(!isShuffled)}
//             className={`p-2 rounded-full transition-all duration-300 ${isShuffled ? 'text-purple-400 bg-purple-400/20' : 'text-white/60 hover:text-white'}`}
//           >
//             <div className="w-5 h-5 flex items-center justify-center">
//               <i className="ri-shuffle-line"></i>
//             </div>
//           </button>

//           <button
//             onClick={toggleRepeat}
//             className={`p-2 rounded-full transition-all duration-300 ${repeatMode !== 'none' ? 'text-purple-400 bg-purple-400/20' : 'text-white/60 hover:text-white'}`}
//           >
//             <div className="w-5 h-5 flex items-center justify-center">
//               <i className={getRepeatIcon()}></i>
//             </div>
//           </button>
//         </div>

//         {/* Center Controls */}
//         <div className="flex items-center space-x-6">
//           <button
//             onClick={onPrevious}
//             className="text-white/80 hover:text-white transition-colors p-2"
//           >
//             <div className="w-6 h-6 flex items-center justify-center">
//               <i className="ri-skip-back-line text-xl"></i>
//             </div>
//           </button>

//           <button
//             onClick={() => setIsPlaying(!isPlaying)}
//             className="bg-white text-black hover:bg-white/90 rounded-full p-4 transition-all duration-300 transform hover:scale-105"
//           >
//             <div className="w-8 h-8 flex items-center justify-center">
//               {isPlaying ? (
//                 <i className="ri-pause-line text-2xl"></i>
//               ) : (
//                 <i className="ri-play-line text-2xl ml-1"></i>
//               )}
//             </div>
//           </button>

//           <button
//             onClick={onNext}
//             className="text-white/80 hover:text-white transition-colors p-2"
//           >
//             <div className="w-6 h-6 flex items-center justify-center">
//               <i className="ri-skip-forward-line text-xl"></i>
//             </div>
//           </button>
//         </div>

//         {/* Right Controls */}
//         <div className="flex items-center space-x-4">
//           <div className="flex items-center space-x-2">
//             <div className="w-5 h-5 flex items-center justify-center">
//               <i className="ri-volume-up-line text-white/60"></i>
//             </div>
//             <div className="w-20 relative">
//               <input
//                 type="range"
//                 min="0"
//                 max="1"
//                 step="0.01"
//                 value={volume}
//                 onChange={(e) => setVolume(parseFloat(e.target.value))}
//                 className="w-full h-1 bg-white/20 rounded appearance-none cursor-pointer slider"
//               />
//               <div
//                 className="absolute top-0 left-0 h-1 bg-white rounded pointer-events-none"
//                 style={{ width: `${volume * 100}%` }}
//               />
//             </div>
//           </div>

//           <button className="text-white/60 hover:text-white transition-colors p-2">
//             <div className="w-5 h-5 flex items-center justify-center">
//               <i className="ri-equalizer-line"></i>
//             </div>
//           </button>
//         </div>
//       </div>

//       <style jsx>{`
//         .slider::-webkit-slider-thumb {
//           appearance: none;
//           width: 16px;
//           height: 16px;
//           background: white;
//           border-radius: 50%;
//           cursor: pointer;
//           box-shadow: 0 2px 4px rgba(0,0,0,0.3);
//         }
//         .slider::-moz-range-thumb {
//           width: 16px;
//           height: 16px;
//           background: white;
//           border-radius: 50%;
//           cursor: pointer;
//           border: none;
//           box-shadow: 0 2px 4px rgba(0,0,0,0.3);
//         }
//       `}</style>
//     </div>
//   );
// // }
// "use client";

// import { useState, useEffect } from "react";

// export default function PlayerControls({
//   currentSong,
//   isPlaying,
//   setIsPlaying,
//   currentTime,
//   setCurrentTime,
//   volume,
//   setVolume,
//   isShuffled,
//   setIsShuffled,
//   repeatMode,
//   setRepeatMode,
//   onNext,
//   onPrevious,
// }) {
//   const [duration] = useState(242); // Mock duration in seconds (4:02)

//   useEffect(() => {
//     if (isPlaying) {
//       const timer = setInterval(() => {
//         setCurrentTime((prev) => {
//           if (prev >= duration) {
//             if (repeatMode === "one") {
//               return 0;
//             } else if (repeatMode === "all") {
//               onNext();
//               return 0;
//             } else {
//               setIsPlaying(false);
//               return duration;
//             }
//           }
//           return prev + 1;
//         });
//       }, 1000);
//       return () => clearInterval(timer);
//     }
//   }, [isPlaying, duration, repeatMode, onNext, setCurrentTime, setIsPlaying]);

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, "0")}`;
//   };

//   const handleSeek = (e) => {
//     const newTime = parseInt(e.target.value);
//     setCurrentTime(newTime);
//   };

//   const toggleRepeat = () => {
//     const modes = ["none", "all", "one"];
//     const currentIndex = modes.indexOf(repeatMode);
//     const nextIndex = (currentIndex + 1) % modes.length;
//     setRepeatMode(modes[nextIndex]);
//   };

//   const getRepeatIcon = () => {
//     switch (repeatMode) {
//       case "one":
//         return "ri-repeat-one-line";
//       case "all":
//         return "ri-repeat-line";
//       default:
//         return "ri-repeat-line";
//     }
//   };

//   return (
//     <div className="bg-black/40 backdrop-blur-sm border-t border-white/10 p-6">
//       {/* Progress Bar */}
//       <div className="mb-6">
//         <div className="flex items-center space-x-4">
//           <span className="text-sm text-purple-300 font-mono w-12">
//             {formatTime(currentTime)}
//           </span>
//           <div className="flex-1 relative">
//             <input
//               type="range"
//               min="0"
//               max={duration}
//               value={currentTime}
//               onChange={handleSeek}
//               className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
//             />
//             <div
//               className="absolute top-0 left-0 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg pointer-events-none"
//               style={{ width: `${(currentTime / duration) * 100}%` }}
//             />
//           </div>
//           <span className="text-sm text-purple-300 font-mono w-12">
//             {formatTime(duration)}
//           </span>
//         </div>
//       </div>

//       <div className="flex items-center justify-between">
//         {/* Left Controls */}
//         <div className="flex items-center space-x-4">
//           <button
//             onClick={() => setIsShuffled(!isShuffled)}
//             className={`p-2 rounded-full transition-all duration-300 ${
//               isShuffled
//                 ? "text-purple-400 bg-purple-400/20"
//                 : "text-white/60 hover:text-white"
//             }`}
//           >
//             <div className="w-5 h-5 flex items-center justify-center">
//               <i className="ri-shuffle-line"></i>
//             </div>
//           </button>

//           <button
//             onClick={toggleRepeat}
//             className={`p-2 rounded-full transition-all duration-300 ${
//               repeatMode !== "none"
//                 ? "text-purple-400 bg-purple-400/20"
//                 : "text-white/60 hover:text-white"
//             }`}
//           >
//             <div className="w-5 h-5 flex items-center justify-center">
//               <i className={getRepeatIcon()}></i>
//             </div>
//           </button>
//         </div>

//         {/* Center Controls */}
//         <div className="flex items-center space-x-6">
//           <button
//             onClick={onPrevious}
//             className="text-white/80 hover:text-white transition-colors p-2"
//           >
//             <div className="w-6 h-6 flex items-center justify-center">
//               <i className="ri-skip-back-line text-xl"></i>
//             </div>
//           </button>

//           <button
//             onClick={() => setIsPlaying(!isPlaying)}
//             className="bg-white text-black hover:bg-white/90 rounded-full p-4 transition-all duration-300 transform hover:scale-105"
//           >
//             <div className="w-8 h-8 flex items-center justify-center">
//               {isPlaying ? (
//                 <i className="ri-pause-line text-2xl"></i>
//               ) : (
//                 <i className="ri-play-line text-2xl ml-1"></i>
//               )}
//             </div>
//           </button>

//           <button
//             onClick={onNext}
//             className="text-white/80 hover:text-white transition-colors p-2"
//           >
//             <div className="w-6 h-6 flex items-center justify-center">
//               <i className="ri-skip-forward-line text-xl"></i>
//             </div>
//           </button>
//         </div>

//         {/* Right Controls */}
//         <div className="flex items-center space-x-4">
//           <div className="flex items-center space-x-2">
//             <div className="w-5 h-5 flex items-center justify-center">
//               <i className="ri-volume-up-line text-white/60"></i>
//             </div>
//             <div className="w-20 relative">
//               <input
//                 type="range"
//                 min="0"
//                 max="1"
//                 step="0.01"
//                 value={volume}
//                 onChange={(e) => setVolume(parseFloat(e.target.value))}
//                 className="w-full h-1 bg-white/20 rounded appearance-none cursor-pointer slider"
//               />
//               <div
//                 className="absolute top-0 left-0 h-1 bg-white rounded pointer-events-none"
//                 style={{ width: `${volume * 100}%` }}
//               />
//             </div>
//           </div>

//           <button className="text-white/60 hover:text-white transition-colors p-2">
//             <div className="w-5 h-5 flex items-center justify-center">
//               <i className="ri-equalizer-line"></i>
//             </div>
//           </button>
//         </div>
//       </div>

//       {/* ✅ plain style tag instead of styled-jsx */}
//       <style>{`
//         .slider::-webkit-slider-thumb {
//           appearance: none;
//           width: 16px;
//           height: 16px;
//           background: white;
//           border-radius: 50%;
//           cursor: pointer;
//           box-shadow: 0 2px 4px rgba(0,0,0,0.3);
//         }
//         .slider::-moz-range-thumb {
//           width: 16px;
//           height: 16px;
//           background: white;
//           border-radius: 50%;
//           cursor: pointer;
//           border: none;
//           box-shadow: 0 2px 4px rgba(0,0,0,0.3);
//         }
//       `}</style>
//     </div>
//   );
// }
// components/player/PlayerControls.js
import React from "react";

export default function PlayerControls({
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  currentTime,
  duration,
  onSeek,
  volume,
  onVolumeChange,
  isShuffled,
  onShuffleToggle,
  repeatMode,
  onRepeatToggle,
}) {
  // Format time helper
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle seek slider change
  const handleSeekChange = (e) => {
    const newTime = parseFloat(e.target.value);
    if (onSeek) {
      onSeek(newTime);
    }
  };

  // Handle volume slider change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    if (onVolumeChange) {
      onVolumeChange(newVolume);
    }
  };

  // Get repeat icon
  const getRepeatIcon = () => {
    if (repeatMode === "one") return "🔂";
    if (repeatMode === "all") return "🔁";
    return "🔁";
  };

  // Get repeat button style
  const getRepeatStyle = () => {
    if (repeatMode === "none") {
      return "text-gray-400 hover:text-white";
    }
    return "text-purple-400";
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-4 bg-black/20 backdrop-blur-md rounded-xl">
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400 min-w-[40px]">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime || 0}
            onChange={handleSeekChange}
            className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${
                duration > 0 ? (currentTime / duration) * 100 : 0
              }%, #4b5563 ${
                duration > 0 ? (currentTime / duration) * 100 : 0
              }%, #4b5563 100%)`,
            }}
          />
          <span className="text-xs text-gray-400 min-w-[40px] text-right">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Main Controls */}
      <div className="flex items-center justify-between">
        {/* Left Side - Shuffle */}
        <div className="flex items-center gap-2 w-24">
          <button
            onClick={onShuffleToggle}
            className={`p-2 rounded-full transition-all ${
              isShuffled ? "text-purple-400" : "text-gray-400 hover:text-white"
            }`}
            title="Shuffle"
          >
            🔀
          </button>
        </div>

        {/* Center - Playback Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={onPrevious}
            className="p-2 text-white hover:text-purple-400 transition-all"
            title="Previous"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </button>

          <button
            onClick={onPlayPause}
            className="p-4 bg-purple-600 hover:bg-purple-700 rounded-full transition-all transform hover:scale-105"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <button
            onClick={onNext}
            className="p-2 text-white hover:text-purple-400 transition-all"
            title="Next"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </button>
        </div>

        {/* Right Side - Volume & Repeat */}
        <div className="flex items-center gap-3 w-48 justify-end">
          <button
            onClick={onRepeatToggle}
            className={`p-2 rounded-full transition-all ${getRepeatStyle()}`}
            title={`Repeat: ${repeatMode}`}
          >
            {getRepeatIcon()}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onVolumeChange(volume > 0 ? 0 : 0.7)}
              className="text-gray-400 hover:text-white transition-all"
              title={volume > 0 ? "Mute" : "Unmute"}
            >
              {volume === 0 ? "🔇" : volume < 0.5 ? "🔉" : "🔊"}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${
                  volume * 100
                }%, #4b5563 ${volume * 100}%, #4b5563 100%)`,
              }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #a855f7;
          cursor: pointer;
          transition: all 0.2s;
        }

        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          background: #c084fc;
        }

        input[type="range"]::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #a855f7;
          cursor: pointer;
          border: none;
          transition: all 0.2s;
        }

        input[type="range"]::-moz-range-thumb:hover {
          transform: scale(1.2);
          background: #c084fc;
        }
      `}</style>
    </div>
  );
}
