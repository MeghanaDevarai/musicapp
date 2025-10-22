// // App.js
// import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import DiscoverPage from "./components/DiscoverPage"; // Adjust path if needed
// import AuthCard from "./components/AuthCard";
// import Dashboard from "./components/Dashboard";
// import WelcomePage from "./components/WelcomePage";
// import Player from "./pages/Player";
// import MoodDetection from "./pages/MoodDetection";
// import Analytics from "./pages/Analytics";
// import SpotifyCallback from "./components/SpotifyCallback";
// import LibraryPage from "./pages/LibraryPage";
// import ProfilePage from "./pages/Profile";
// import { auth } from "./firebaseConfig";
// import { onAuthStateChanged } from "firebase/auth";

// export default function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const [spotifyTokens, setSpotifyTokens] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Firebase auth listener
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser) {
//         setUser({
//           uid: currentUser.uid,
//           email: currentUser.email,
//           username: currentUser.displayName || currentUser.email.split("@")[0],
//         });
//         setIsAuthenticated(true);
//       } else {
//         setUser(null);
//         setIsAuthenticated(false);
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   // Restore Spotify tokens from localStorage on app load
//   useEffect(() => {
//     const accessToken = localStorage.getItem("spotifyAccessToken");
//     const refreshToken = localStorage.getItem("spotifyRefreshToken");
//     const expiresIn = localStorage.getItem("spotifyExpiresIn");

//     if (accessToken) {
//       setSpotifyTokens({ accessToken, refreshToken, expiresIn });
//     }
//   }, []);

//   // Handle login from AuthCard
//   const handleAuth = (userData) => {
//     setUser(userData);
//     setIsAuthenticated(true);
//   };

//   // Handle logout
//   const handleLogout = async () => {
//     try {
//       await auth.signOut();
//       setIsAuthenticated(false);
//       setUser(null);
//       setSpotifyTokens(null);
//       localStorage.removeItem("spotifyAccessToken");
//       localStorage.removeItem("spotifyRefreshToken");
//       localStorage.removeItem("spotifyExpiresIn");
//     } catch (error) {
//       console.error("Error logging out:", error);
//     }
//   };

//   // Handle Spotify login
//   const handleSpotifyLogin = (tokens) => {
//     console.log("Received Spotify tokens:", tokens);
//     setSpotifyTokens(tokens);

//     // Save to localStorage so it persists
//     localStorage.setItem("spotifyAccessToken", tokens.accessToken);
//     localStorage.setItem("spotifyRefreshToken", tokens.refreshToken);
//     localStorage.setItem("spotifyExpiresIn", tokens.expiresIn);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
//         <div className="text-center text-white">
//           <h2 className="text-2xl font-bold mb-2">Loading...</h2>
//           <p className="text-blue-200">Checking authentication status</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <Router>
//       <Routes>
//         {/* Welcome / Landing page */}
//         <Route
//           path="/"
//           element={
//             isAuthenticated || spotifyTokens ? (
//               <Navigate to="/dashboard" />
//             ) : (
//               <WelcomePage />
//             )
//           }
//         />

//         {/* Login page */}
//         <Route
//           path="/login"
//           element={
//             isAuthenticated || spotifyTokens ? (
//               <Navigate to="/dashboard" />
//             ) : (
//               <AuthCard onAuth={handleAuth} />
//             )
//           }
//         />

//         {/* Dashboard */}
//         <Route
//           path="/dashboard"
//           element={
//             isAuthenticated || spotifyTokens ? (
//               <Dashboard
//                 user={user}
//                 onLogout={handleLogout}
//                 spotifyTokens={spotifyTokens}
//               />
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />

//         {/* Spotify callback */}
//         <Route
//           path="/spotify/callback"
//           element={<SpotifyCallback onSpotifyLogin={handleSpotifyLogin} />}
//         />

//         {/* Other pages */}
//         <Route path="/player" element={<Player />} />
//         <Route path="/MoodDetection" element={<MoodDetection />} />
//         {/* <Route path="/Analytics" element={<Analytics />} />
//         <Route path="/discover" element={<DiscoverPage />} /> */}
//         <Route
//           path="/analytics"
//           element={<Analytics spotifyTokens={spotifyTokens} />}
//         />
//         <Route
//           path="/discover"
//           element={<DiscoverPage spotifyTokens={spotifyTokens} />}
//         />
//         <Route
//           path="/library"
//           element={<LibraryPage spotifyTokens={spotifyTokens} />}
//         />
//         <Route
//           path="/profile"

//         />
//         {/* Catch-all */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </Router>
//   );
// }
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import About from "./components/About";
import AuthCard from "./components/AuthCard";
import Dashboard from "./components/Dashboard";
import WelcomePage from "./components/WelcomePage";
import Player from "./pages/Player";
import MoodDetection from "./pages/MoodDetection";
import Analytics from "./pages/Analytics";
import SpotifyCallback from "./components/SpotifyCallback";
import LibraryPage from "./pages/LibraryPage";
import Profile from "./pages/Profile"; // Add this page
import musicAnalytics from "./components/analytics/musicAppAnalytics";
import { sessionTracker } from "./components/analytics/UserSessionTracker";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [spotifyTokens, setSpotifyTokens] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Initialize analytics when user logs in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        musicAnalytics.initializeUserAnalytics(user.uid);
      }
    });

    // Track session end on unmount
    return () => {
      sessionTracker.endSession();
      unsubscribe();
    };
  }, []);
  // Firebase auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          username: currentUser.displayName || currentUser.email.split("@")[0],
        });
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Restore Spotify tokens from localStorage on app load
  useEffect(() => {
    const accessToken = localStorage.getItem("spotifyAccessToken");
    const refreshToken = localStorage.getItem("spotifyRefreshToken");
    const expiresIn = localStorage.getItem("spotifyExpiresIn");

    if (accessToken) {
      setSpotifyTokens({ accessToken, refreshToken, expiresIn });
    }
  }, []);

  const handleAuth = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setIsAuthenticated(false);
      setUser(null);
      setSpotifyTokens(null);
      localStorage.removeItem("spotifyAccessToken");
      localStorage.removeItem("spotifyRefreshToken");
      localStorage.removeItem("spotifyExpiresIn");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleSpotifyLogin = (tokens) => {
    setSpotifyTokens(tokens);
    localStorage.setItem("spotifyAccessToken", tokens.accessToken);
    localStorage.setItem("spotifyRefreshToken", tokens.refreshToken);
    localStorage.setItem("spotifyExpiresIn", tokens.expiresIn);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Loading...</h2>
          <p className="text-blue-200">Checking authentication status</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Welcome / Landing page */}
        <Route
          path="/"
          element={
            isAuthenticated || spotifyTokens ? (
              <Navigate to="/dashboard" />
            ) : (
              <WelcomePage />
            )
          }
        />

        {/* Login page */}
        <Route
          path="/login"
          element={
            isAuthenticated || spotifyTokens ? (
              <Navigate to="/dashboard" />
            ) : (
              <AuthCard onAuth={handleAuth} />
            )
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated || spotifyTokens ? (
              <Dashboard
                user={user}
                onLogout={handleLogout}
                spotifyTokens={spotifyTokens}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Spotify callback */}
        <Route
          path="/spotify/callback"
          element={<SpotifyCallback onSpotifyLogin={handleSpotifyLogin} />}
        />

        {/* Other pages */}
        <Route path="/player" element={<Player />} />
        <Route path="/MoodDetection" element={<MoodDetection />} />
        <Route
          path="/analytics"
          element={
            spotifyTokens ? (
              <Analytics spotifyTokens={spotifyTokens} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route
          path="/about"
          element={
            spotifyTokens ? (
              <About spotifyTokens={spotifyTokens} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route
          path="/library"
          element={
            spotifyTokens ? (
              <LibraryPage spotifyTokens={spotifyTokens} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route
          path="/Profile"
          element={
            isAuthenticated || spotifyTokens ? (
              <Profile spotifyTokens={spotifyTokens} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
