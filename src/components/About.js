// 'use client';

// import React from "react";

// export default function About() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white flex flex-col items-center justify-start p-10">
//       {/* Header */}
//       <div className="text-center mb-12">
//         <h1 className="text-5xl font-bold mb-4 tracking-wide text-white drop-shadow-lg">
//           About MoodTune
//         </h1>
//         <p className="text-lg text-white/70 max-w-2xl mx-auto">
//           MoodTune is your personal AI-powered music companion. Discover songs, create playlists, and let your emotions guide your music journey.
//         </p>
//       </div>

//       {/* Feature Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
//         {/* Card 1 */}
//         <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 shadow-lg">
//           <div className="w-16 h-16 flex items-center justify-center mb-4 bg-purple-600 rounded-full text-white text-2xl">
//             🎵
//           </div>
//           <h3 className="text-xl font-semibold mb-2">Personalized Playlists</h3>
//           <p className="text-white/70">
//             Curate your own playlists or explore recommendations based on your mood.
//           </p>
//         </div>

//         {/* Card 2 */}
//         <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 shadow-lg">
//           <div className="w-16 h-16 flex items-center justify-center mb-4 bg-pink-600 rounded-full text-white text-2xl">
//             🎤
//           </div>
//           <h3 className="text-xl font-semibold mb-2">Mood Detection</h3>
//           <p className="text-white/70">
//             Our AI detects your current mood and suggests songs that resonate with how you feel.
//           </p>
//         </div>

//         {/* Card 3 */}
//         <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 shadow-lg">
//           <div className="w-16 h-16 flex items-center justify-center mb-4 bg-green-600 rounded-full text-white text-2xl">
//             ⚡
//           </div>
//           <h3 className="text-xl font-semibold mb-2">Seamless Experience</h3>
//           <p className="text-white/70">
//             Enjoy smooth playback, intuitive controls, and cross-device support for uninterrupted music enjoyment.
//           </p>
//         </div>
//       </div>

//       {/* Mission Section */}
//       <div className="mt-20 max-w-4xl text-center">
//         <h2 className="text-3xl font-bold mb-4 text-white drop-shadow-md">
//           Our Mission
//         </h2>
//         <p className="text-white/70 text-lg leading-relaxed">
//           MoodTune aims to revolutionize the way you experience music. By combining cutting-edge AI with personalized playlists, we make sure every song you listen to resonates with your feelings, whether you're working, relaxing, or celebrating life’s moments.
//         </p>
//       </div>

      

//       {/* Footer Note */}
//       <p className="mt-20 text-white/50 text-sm text-center max-w-xl">
//         © 2025 MoodTune. All rights reserved. Made with ❤️ for music lovers.
//       </p>
//     </div>
//   );
// }





// src/pages/About.js
import React from "react";

export default function About() {
  const features = [
    {
      title: "🎵 Personalized Music Experience",
      description:
        "MoodTune understands your mood and serves the perfect soundtrack — happy, relaxed, energetic, calm, or contemplative.",
    },
    {
      title: "💡 Mood Detection",
      description:
        "Advanced mood analysis to select songs that resonate with your current emotions, making music more than just sound.",
    },
    {
      title: "⭐ Favourites & Playlists",
      description:
        "Save your favourite songs and create custom playlists. Easily manage and play your personal library.",
    },
    {
      title: "🎤 Voice Control",
      description:
        "Hands-free commands to play, pause, skip, or shuffle your music without touching a button.",
    },
    {
      title: "🔊 Seamless Playback",
      description:
        "Supports local files, online tracks, and playlists. Smooth playback with full control over shuffle, repeat, and volume.",
    },
    {
      title: "🌈 Your Music, Your Vibe",
      description:
        "MoodTune turns every moment into a personalized soundtrack — your emotions, your energy, your story.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 text-center">About MoodTune</h1>
        <p className="text-center text-white/70 mb-12 text-lg">
          MoodTune is your smart music companion, turning emotions into sound. Explore the features below!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:scale-105 transition-transform duration-300"
            >
              <h2 className="text-2xl font-semibold mb-3">{feature.title}</h2>
              <p className="text-white/70 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-white/60 text-lg">
            MoodTune is not just an app — it’s your personal DJ, mood tracker, and music library all in one.
          </p>
          <p className="text-white/80 mt-4 font-medium">
            Start your journey. Feel the music, live the vibe.
          </p>
        </div>
      </div>
    </div>
  );
}
