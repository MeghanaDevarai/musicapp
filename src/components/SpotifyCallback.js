// // SpotifyCallback.js
// import React, { useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// export default function SpotifyCallback({ onSpotifyLogin }) {
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const query = new URLSearchParams(location.search);
//     const accessToken = query.get("accessToken");
//     const refreshToken = query.get("refreshToken");
//     const expiresIn = query.get("expiresIn");
//     const error = query.get("error");

//     if (error) {
//       console.error("Spotify login failed:", error);
//       return;
//     }

//     if (accessToken && refreshToken) {
//       const tokens = { accessToken, refreshToken, expiresIn };
//       console.log("Received Spotify tokens:", tokens);
//       if (onSpotifyLogin) onSpotifyLogin(tokens);

//       // Redirect to dashboard
//       navigate("/dashboard");
//     }
//   }, [location, navigate, onSpotifyLogin]);

//   return <div>Logging in with Spotify...</div>;
// }
// src/pages/SpotifyCallback.js
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SpotifyCallback({ onSpotifyLogin }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const accessToken = query.get("accessToken");
    const refreshToken = query.get("refreshToken");
    const expiresIn = query.get("expiresIn");
    const error = query.get("error");

    if (error) {
      console.error("Spotify login failed:", error);
      return;
    }

    if (accessToken && refreshToken) {
      const tokens = { accessToken, refreshToken, expiresIn };
      console.log("✅ Received Spotify tokens:", tokens);

      if (onSpotifyLogin) onSpotifyLogin(tokens);

      // Redirect user to dashboard after login
      navigate("/dashboard");
    }
  }, [location, navigate, onSpotifyLogin]);

  return <div>Logging in with Spotify...</div>;
}
