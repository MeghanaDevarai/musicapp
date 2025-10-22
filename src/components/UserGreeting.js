// // import React from "react";

// // export default function UserGreeting({ user }) {
// //   const getTimeOfDay = () => {
// //     const hour = new Date().getHours();
// //     if (hour < 12) return "Good morning";
// //     if (hour < 17) return "Good afternoon";
// //     return "Good evening";
// //   };

// //   return (
// //     <div className="mb-8">
// //       <h1 className="text-4xl font-bold text-white mb-2">
// //         {getTimeOfDay()}, {user ? user.username : "Guest"}! 👋
// //       </h1>
// //       <p className="text-blue-200 text-lg">
// //         Ready to discover music that matches your mood?
// //       </p>

// //       <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
// //         <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
// //           <div className="flex items-center space-x-3">
// //             <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
// //               <i className="ri-headphone-line text-white text-lg"></i>
// //             </div>
// //             <div>
// //               <p className="text-white/60 text-sm">Beats Spent</p>
// //               <p className="text-white text-xl font-bold">2h 34m</p>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
// //           <div className="flex items-center space-x-3">
// //             <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
// //               <i className="ri-emotion-happy-line text-white text-lg"></i>
// //             </div>
// //             <div>
// //               <p className="text-white/60 text-sm">Vibe Check</p>
// //               <p className="text-white text-xl font-bold">Happy</p>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
// //           <div className="flex items-center space-x-3">
// //             <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
// //               <i className="ri-fire-line text-white text-lg"></i>
// //             </div>
// //             <div>
// //               <p className="text-white/60 text-sm">Never Missed a Beat for</p>
// //               <p className="text-white text-xl font-bold">7 days</p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// import React from "react";

// export default function UserGreeting({ user }) {
//   const getTimeOfDay = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return "Good morning";
//     if (hour < 17) return "Good afternoon";
//     return "Good evening";
//   };

//   return (
//     <div className="mb-8">
//       <h1 className="text-4xl font-bold text-white mb-2">
//         {getTimeOfDay()}, {user && user.username ? user.username : "Guest"}! 👋
//       </h1>
//       <p className="text-blue-200 text-lg">
//         {user
//           ? "Ready to discover music that matches your mood?"
//           : "Login or sign up to get a personalized music journey."}
//       </p>

//       {user && (
//         <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
//                 <i className="ri-headphone-line text-white text-lg"></i>
//               </div>
//               <div>
//                 <p className="text-white/60 text-sm">Beats Spent</p>
//                 <p className="text-white text-xl font-bold">2h 34m</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
//                 <i className="ri-emotion-happy-line text-white text-lg"></i>
//               </div>
//               <div>
//                 <p className="text-white/60 text-sm">Vibe Check</p>
//                 <p className="text-white text-xl font-bold">Happy</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
//                 <i className="ri-fire-line text-white text-lg"></i>
//               </div>
//               <div>
//                 <p className="text-white/60 text-sm">Never Missed a Beat for</p>
//                 <p className="text-white text-xl font-bold">7 days</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import React from "react";

export default function UserGreeting({ user, spotifyUser }) {
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  // Decide what name to show
  const displayName =
    spotifyUser?.display_name ||
    user?.username ||
    user?.email?.split("@")[0] ||
    "Guest";

  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-white mb-2">
        {getTimeOfDay()}, {displayName}! 👋
      </h1>
      <p className="text-blue-200 text-lg">
        {user || spotifyUser
          ? "Ready to discover music that matches your mood?"
          : "Login or sign up to get a personalized music journey."}
      </p>

      {(user || spotifyUser) && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <i className="ri-headphone-line text-white text-lg"></i>
              </div>
              <div>
                <p className="text-white/60 text-sm">Beats Spent</p>
                <p className="text-white text-xl font-bold">2h 34m</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                <i className="ri-emotion-happy-line text-white text-lg"></i>
              </div>
              <div>
                <p className="text-white/60 text-sm">Vibe Check</p>
                <p className="text-white text-xl font-bold">Happy</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <i className="ri-fire-line text-white text-lg"></i>
              </div>
              <div>
                <p className="text-white/60 text-sm">Never Missed a Beat for</p>
                <p className="text-white text-xl font-bold">7 days</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
