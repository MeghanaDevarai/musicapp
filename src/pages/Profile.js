// // src/pages/ProfileSettings.js
// import React, { useState } from "react";
// import { auth } from "../firebaseConfig";
// import { updateProfile, updatePassword } from "firebase/auth";
// import { useNavigate } from "react-router-dom";

// export default function ProfileSettings() {
//   const user = auth.currentUser;
//   const navigate = useNavigate();

//   const [username, setUsername] = useState(user?.displayName || "");
//   const [newPassword, setNewPassword] = useState("");
//   const [message, setMessage] = useState("");

//   if (!user) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
//         <p>No user logged in.</p>
//       </div>
//     );
//   }

//   const handleSaveUsername = async () => {
//     try {
//       await updateProfile(user, { displayName: username });
//       setMessage("Username updated successfully ✅");
//     } catch (error) {
//       setMessage("Error updating username: " + error.message);
//     }
//   };

//   const handleChangePassword = async () => {
//     try {
//       await updatePassword(user, newPassword);
//       setMessage("Password updated successfully ✅");
//       setNewPassword("");
//     } catch (error) {
//       setMessage("Error updating password: " + error.message);
//     }
//   };

//   const handleAddAccount = async () => {
//     try {
//       await auth.signOut();
//       navigate("/login");
//     } catch (error) {
//       setMessage("Error signing out: " + error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
//       <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-8 max-w-md w-full text-white border border-white/20">
//         <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>

//         {/* Profile Picture */}
//         <div className="flex flex-col items-center mb-6">
//           {user.photoURL ? (
//             <img
//               src={user.photoURL}
//               alt="Profile"
//               className="w-20 h-20 rounded-full mb-2"
//             />
//           ) : (
//             <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-xl font-bold">
//               {user.email?.charAt(0).toUpperCase()}
//             </div>
//           )}
//           <p className="text-sm">{user.email}</p>
//         </div>

//         {/* Username */}
//         <label className="block mb-2">Username</label>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="w-full px-3 py-2 mb-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60"
//         />
//         <button
//           onClick={handleSaveUsername}
//           className="w-full mb-4 bg-purple-600 hover:bg-purple-700 py-2 rounded-lg font-medium"
//         >
//           Save Username
//         </button>

//         {/* Change Password - only for email/password accounts */}
//         {user.providerData[0]?.providerId === "password" && (
//           <>
//             <label className="block mb-2">New Password</label>
//             <input
//               type="password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               className="w-full px-3 py-2 mb-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60"
//             />
//             <button
//               onClick={handleChangePassword}
//               className="w-full mb-4 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-medium"
//             >
//               Change Password
//             </button>
//           </>
//         )}

//         {/* Add Account */}
//         <button
//           onClick={handleAddAccount}
//           className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg font-medium"
//         >
//           Add / Switch Account
//         </button>

//         {/* Message */}
//         {message && (
//           <p className="text-center mt-4 text-sm text-green-300">{message}</p>
//         )}
//       </div>
//     </div>
//   );
// }

// src/pages/ProfileSettings.js
import React, { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function Profile({ spotifyTokens }) {
  const user = auth.currentUser;
  const navigate = useNavigate();

  // Firebase state
  const [username, setUsername] = useState(user?.displayName || "");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  // Spotify state
  const [spotifyProfile, setSpotifyProfile] = useState(null);
  const [loadingSpotify, setLoadingSpotify] = useState(false);
  const [spotifyError, setSpotifyError] = useState(null);

  // Fetch Spotify profile if logged in via Spotify
  useEffect(() => {
    const fetchSpotifyProfile = async () => {
      if (!spotifyTokens?.accessToken) return;
      setLoadingSpotify(true);
      setSpotifyError(null);
      try {
        const res = await fetch("http://127.0.0.1:5000/api/spotify/me", {
          headers: { Authorization: `Bearer ${spotifyTokens.accessToken}` },
        });
        if (!res.ok) throw new Error("Failed to fetch Spotify profile.");
        const data = await res.json();
        setSpotifyProfile(data);
      } catch (err) {
        console.error(err);
        setSpotifyError(err.message);
      }
      setLoadingSpotify(false);
    };

    fetchSpotifyProfile();
  }, [spotifyTokens]);

  const handleAddAccount = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      setMessage("Error signing out: " + error.message);
    }
  };

  // Determine which profile info to show
  const displayName =
    spotifyProfile?.display_name || user?.displayName || "Guest";
  const email = spotifyProfile?.email || user?.email || "N/A";
  const profilePic = spotifyProfile?.images?.[0]?.url || user?.photoURL || null;
  const followers = spotifyProfile?.followers?.total ?? null;

  // Show message if neither Firebase nor Spotify user exists
  if (!user && !spotifyTokens) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p>No user logged in.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-8 max-w-md w-full text-white border border-white/20">
        <h2 className="text-2xl font-bold mb-6">Profile</h2>

        {/* Profile Picture & Name */}
        <div className="flex flex-col items-center mb-6">
          {profilePic ? (
            <img
              src={profilePic}
              alt="Profile"
              className="w-20 h-20 rounded-full mb-2 object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-xl font-bold">
              {displayName.charAt(0).toUpperCase()}
            </div>
          )}
          <p className="text-sm">{email}</p>
          {spotifyProfile && (
            <p className="text-sm mb-4">
              Followers: <span className="font-semibold">{followers}</span>
            </p>
          )}
        </div>

        {/* Firebase username/password settings */}
        {user && (
          <>
            <label className="block mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 mb-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60"
            />

            {user.providerData[0]?.providerId === "password" && (
              <>
                <label className="block mb-2">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 mb-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60"
                />
              </>
            )}
          </>
        )}

        {/* Add / Switch Account */}
        <button
          onClick={handleAddAccount}
          className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg font-medium"
        >
          Add / Switch Account
        </button>

        {/* Messages */}
        {message && (
          <p className="text-center mt-4 text-sm text-green-300">{message}</p>
        )}
        {spotifyError && (
          <p className="text-center mt-2 text-sm text-red-400">
            {spotifyError}
          </p>
        )}
        {loadingSpotify && (
          <p className="text-center mt-2 text-sm text-gray-300">
            Loading Spotify info...
          </p>
        )}
      </div>
    </div>
  );
}
