// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";

// export default function MoodDetection() {
//   const [mode, setMode] = useState("text"); // text or camera
//   const [text, setText] = useState("");
//   const [faces, setFaces] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [cameraActive, setCameraActive] = useState(false);
//   const [detectedMood, setDetectedMood] = useState(null);
//   const [playlists, setPlaylists] = useState([]);

//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   // Start/Stop Camera
//   const startCamera = () => {
//     navigator.mediaDevices
//       .getUserMedia({ video: true })
//       .then((stream) => {
//         if (videoRef.current) videoRef.current.srcObject = stream;
//         setCameraActive(true);
//       })
//       .catch((err) => console.error("Camera error:", err));
//   };

//   const stopCamera = () => {
//     if (videoRef.current?.srcObject) {
//       videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
//       videoRef.current.srcObject = null;
//       setCameraActive(false);
//     }
//   };

//   const toggleCamera = () => (cameraActive ? stopCamera() : startCamera());

//   useEffect(() => {
//     if (mode !== "camera" && cameraActive) stopCamera();
//   }, [mode]);

//   // Dummy NLP text analysis
//   const handleTextSubmit = async () => {
//     setLoading(true);
//     const mood = "happy"; //todo dummy mood, can replace with real NLP
//     setFaces([
//       { emotion: mood, probabilities: { happy: 0.9, neutral: 0.1 }, box: null },
//     ]);
//     setDetectedMood(mood);
//     setLoading(false);
//   };

//   // Camera capture
//   const handleCapture = async () => {
//     if (!videoRef.current || !canvasRef.current) return;
//     const ctx = canvasRef.current.getContext("2d");
//     ctx.drawImage(videoRef.current, 0, 0, 320, 240);

//     canvasRef.current.toBlob(async (blob) => {
//       const formData = new FormData();
//       formData.append("image", blob, "capture.jpg");
//       setLoading(true);

//       try {
//         const res = await axios.post(
//           "http://127.0.0.1:8000/detect-emotion",
//           formData,
//           {
//             headers: { "Content-Type": "multipart/form-data" },
//           }
//         );

//         if (res.data.faces?.length > 0) {
//           setFaces(res.data.faces);
//           setDetectedMood(res.data.faces[0].emotion);
//         } else {
//           setFaces([]);
//           setDetectedMood(null);
//         }
//       } catch (err) {
//         console.error(err);
//       }

//       setLoading(false);
//     }, "image/jpeg");
//   };

//   // Fetch Spotify playlists by mood
//   // const fetchPlaylists = async (mood) => {
//   //   const token = localStorage.getItem("spotifyToken");
//   //   if (!token) return alert("Please login with Spotify first!");

//   //   setLoading(true);
//   //   try {
//   //     // Spotify API: search playlists by mood keyword
//   //     const res = await axios.get(
//   //       `https://api.spotify.com/v1/search?q=${encodeURIComponent(
//   //         mood
//   //       )}&type=playlist&limit=5`,
//   //       {
//   //         headers: { Authorization: `Bearer ${token}` },
//   //       }
//   //     );
//   //     setPlaylists(res.data.playlists.items || []);
//   //   } catch (err) {
//   //     console.error(err);
//   //     alert("Failed to fetch playlists. Check Spotify token.");
//   //   }
//   //   setLoading(false);
//   // };
//   // Fetch Spotify playlists by mood
//   // const fetchPlaylists = async (mood) => {
//   //   const accessToken = localStorage.getItem("spotifyAccessToken");
//   //   if (!accessToken) {
//   //     alert("Connect Spotify first!");
//   //     return;
//   //   }

//   //   try {
//   //     const res = await fetch(
//   //       `http://localhost:5000/spotify/recommend/${mood.toLowerCase()}`,
//   //       {
//   //         headers: { Authorization: `Bearer ${accessToken}` },
//   //       }
//   //     );

//   //     const data = await res.json();
//   //     if (!res.ok) throw new Error(data.error || "Failed to fetch");
//   //     setPlaylists(data.playlists || []);
//   //   } catch (err) {
//   //     console.error(err);
//   //     alert("Failed to fetch playlists");
//   //   }
//   // };
//   const fetchPlaylists = async (mood) => {
//     const accessToken = localStorage.getItem("spotifyAccessToken");
//     if (!accessToken) {
//       alert("Connect Spotify first!");
//       return;
//     }

//     try {
//       const res = await fetch(
//         `http://localhost:5000/spotify/recommend/${mood.toLowerCase()}`,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`, // ✅ must be here
//           },
//         }
//       );

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to fetch");
//       console.log("Playlists:", data.playlists);
//       setPlaylists(data.playlists || []);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to fetch playlists");
//     }
//   };

//   const downloadSong = async (title, artist) => {
//     try {
//       const query = `${title} ${artist}`;
//       const res = await fetch(
//         `http://localhost:5000/download?query=${encodeURIComponent(query)}`
//       );
//       const data = await res.json();

//       if (data.success && data.file) {
//         alert(`Downloaded: ${title}\nSaved to ${data.file}`);
//       } else {
//         alert("Download failed. Try again!");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error while downloading.");
//     }
//   };

//   // Add playlist to Player page
//   const addToPlayer = (playlist) => {
//     if (window.addMoodPlaylist) {
//       window.addMoodPlaylist(playlist);
//       alert(`Playlist "${playlist.name}" added to Player!`);
//     } else {
//       alert("Player not ready.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center py-10 px-4">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">Mood Detection</h1>

//       {/* Mode Toggle */}
//       <div className="flex gap-4 mb-6">
//         <button
//           className={`px-5 py-2 rounded-xl shadow-md transition ${
//             mode === "text"
//               ? "bg-blue-600 text-white"
//               : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
//           }`}
//           onClick={() => setMode("text")}
//         >
//           Text Mode
//         </button>
//         <button
//           className={`px-5 py-2 rounded-xl shadow-md transition ${
//             mode === "camera"
//               ? "bg-blue-600 text-white"
//               : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
//           }`}
//           onClick={() => setMode("camera")}
//         >
//           Camera Mode
//         </button>
//       </div>

//       {/* Text Mode */}
//       {mode === "text" && (
//         <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
//           <textarea
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-400"
//             placeholder="Type how you feel..."
//           />
//           <button
//             onClick={handleTextSubmit}
//             className="w-full px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
//           >
//             Analyze
//           </button>
//         </div>
//       )}

//       {/* Camera Mode */}
//       {mode === "camera" && (
//         <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-lg">
//           <video
//             ref={videoRef}
//             autoPlay
//             playsInline
//             width="320"
//             height="240"
//             className="border rounded-lg shadow mb-4"
//           />
//           <canvas
//             ref={canvasRef}
//             width="320"
//             height="240"
//             className="border mb-4"
//           />
//           <div className="flex gap-4 mt-2">
//             <button
//               onClick={handleCapture}
//               className="px-5 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
//             >
//               Capture & Analyze
//             </button>
//             <button
//               onClick={toggleCamera}
//               className={`px-5 py-2 rounded-lg shadow-md transition ${
//                 cameraActive
//                   ? "bg-red-500 text-white hover:bg-red-600"
//                   : "bg-blue-500 text-white hover:bg-blue-600"
//               }`}
//             >
//               {cameraActive ? "Stop Camera" : "Start Camera"}
//             </button>
//           </div>
//         </div>
//       )}

//       {playlists.length > 0 && (
//         <div className="mt-6 w-full max-w-lg bg-gray-50 p-6 rounded-xl shadow-lg border">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">
//             Playlists for mood: {detectedMood}
//           </h2>
//           <ul className="space-y-3">
//             {playlists.map((pl) => (
//               <li
//                 key={pl.id}
//                 className="flex justify-between items-center border-b pb-2"
//               >
//                 <a
//                   href={pl.external_urls.spotify}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 hover:underline"
//                 >
//                   {pl.name}
//                 </a>
//                 <button
//                   onClick={() => addToPlayer(pl)}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
//                 >
//                   Add to Player
//                 </button>
//                 // Inside playlist rendering
//                 <li key={pl.id} className="flex flex-col gap-2 border-b pb-2">
//                   <div className="flex justify-between items-center">
//                     <a
//                       href={pl.external_urls.spotify}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-600 hover:underline"
//                     >
//                       {pl.name}
//                     </a>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => addToPlayer(pl)}
//                         className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
//                       >
//                         Add
//                       </button>
//                       <button
//                         onClick={() =>
//                           downloadSong(pl.name, pl.artists?.[0]?.name)
//                         }
//                         className="px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700"
//                       >
//                         Download
//                       </button>
//                     </div>
//                   </div>
//                 </li>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//       {detectedMood && (
//         <button
//           onClick={() => fetchPlaylists(detectedMood)}
//           className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition"
//         >
//           Generate Playlist for "{detectedMood}"
//         </button>
//       )}

//       {loading && (
//         <p className="mt-6 text-gray-600 animate-pulse">Loading...</p>
//       )}

//       {faces.length > 0 && (
//         <div className="mt-6 w-full max-w-md bg-gray-50 p-6 rounded-xl shadow-lg border">
//           <h2 className="text-xl font-semibold text-gray-800">
//             Detected Faces
//           </h2>
//           {faces.map((face, idx) => (
//             <div key={idx} className="mt-4">
//               <p className="text-lg">
//                 Emotion:{" "}
//                 <span className="text-blue-600">{face?.emotion || "N/A"}</span>
//               </p>
//               {face?.probabilities && (
//                 <ul className="mt-2 space-y-1 text-gray-700">
//                   {Object.entries(face.probabilities).map(([emo, prob]) => (
//                     <li key={emo} className="flex justify-between">
//                       <span>{emo}</span>
//                       <span className="font-medium">
//                         {(prob * 100).toFixed(2)}%
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       {!faces.length && !loading && (
//         <p className="mt-6 text-gray-600">No face detected.</p>
//       )}
//     </div>
//   );
// }
// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function MoodDetection() {
//   const [mode, setMode] = useState("text"); // text or camera
//   const [text, setText] = useState("");
//   const [faces, setFaces] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [cameraActive, setCameraActive] = useState(false);
//   const [detectedMood, setDetectedMood] = useState(null);
//   const [songs, setSongs] = useState([]);
//   const [error, setError] = useState(null); // FIX for setError
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const navigate = useNavigate();
//   const accessToken = localStorage.getItem("spotifyAccessToken"); // FIX for accessToken

//   const moodToGenre = {
//     happy: "pop",
//     sad: "acoustic",
//     calm: "ambient",
//     angry: "metal",
//     energetic: "dance",
//     relaxed: "chill",
//   };

//   // Start/Stop Camera
//   const startCamera = () => {
//     navigator.mediaDevices
//       .getUserMedia({ video: true })
//       .then((stream) => {
//         if (videoRef.current) videoRef.current.srcObject = stream;
//         setCameraActive(true);
//       })
//       .catch((err) => console.error("Camera error:", err));
//   };

//   const stopCamera = () => {
//     if (videoRef.current?.srcObject) {
//       videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
//       videoRef.current.srcObject = null;
//       setCameraActive(false);
//     }
//   };

//   const toggleCamera = () => (cameraActive ? stopCamera() : startCamera());

//   useEffect(() => {
//     if (mode !== "camera" && cameraActive) stopCamera();
//   }, [mode, cameraActive]);

//   // Capture tokens from Spotify login redirect
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const token = params.get("access_token");
//     const refreshToken = params.get("refresh_token");
//     const expiresIn = params.get("expires_in");

//     if (token && refreshToken) {
//       localStorage.setItem("spotifyAccessToken", token);
//       localStorage.setItem("spotifyRefreshToken", refreshToken);
//       localStorage.setItem("spotify_token_expires_in", expiresIn);

//       // Clean URL
//       window.history.replaceState({}, document.title, "/dashboard");
//       navigate("/dashboard");
//     }
//   }, []);

//   // Dummy NLP text analysis
//   /*const handleTextSubmit = async () => {
//     setLoading(true);
//     const mood = "happy"; //todo dummy mood, can replace with real NLP
//     setFaces([
//       { emotion: mood, probabilities: { happy: 0.9, neutral: 0.1 }, box: null },
//     ]);
//     setDetectedMood(mood);
//     setLoading(false);
//   };*/
//   // Replace your handleTextSubmit with this:
//   const handleTextSubmit = async () => {
//     if (!text.trim()) {
//       alert("Please enter some text first!");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await axios.post("http://127.0.0.1:8000/analyze-text", {
//         text, // send user input to backend
//       });

//       if (res.data.status === "success" && res.data.faces?.length > 0) {
//         setFaces(res.data.faces);
//         setDetectedMood(res.data.faces[0].emotion);
//       } else {
//         setFaces([]);
//         setDetectedMood(null);
//         alert("No emotion detected from text.");
//       }
//     } catch (err) {
//       console.error("Text analysis failed:", err);
//       alert("Error analyzing text. Check backend logs.");
//     }
//     setLoading(false);
//   };

//   const goToPlayer = (track) => {
//     navigate("/player", { state: { track } });
//   };

//   // Camera capture
//   const handleCapture = async () => {
//     if (!videoRef.current || !canvasRef.current) return;
//     const ctx = canvasRef.current.getContext("2d");
//     ctx.drawImage(videoRef.current, 0, 0, 320, 240);

//     canvasRef.current.toBlob(async (blob) => {
//       const formData = new FormData();
//       formData.append("image", blob, "capture.jpg");
//       setLoading(true);

//       try {
//         const res = await axios.post(
//           "http://127.0.0.1:8000/detect-emotion",
//           formData,
//           {
//             headers: { "Content-Type": "multipart/form-data" },
//           }
//         );

//         if (res.data.faces?.length > 0) {
//           setFaces(res.data.faces);
//           setDetectedMood(res.data.faces[0].emotion);
//         } else {
//           setFaces([]);
//           setDetectedMood(null);
//         }
//       } catch (err) {
//         console.error(err);
//         setError("Failed to detect emotion from camera.");
//       }

//       setLoading(false);
//     }, "image/jpeg");
//   };

//   // Fetch Spotify playlists by mood
//   // --- Fetch Playlists (Dynamic, no Spotify) ---
//   // --- Fetch playlists based on mood ---
//   const fetchPlaylists = async (emotion) => {
//     if (!emotion) return;

//     setLoading(true);
//     setError(null);

//     try {
//       const res = await axios.get(
//         `http://127.0.0.1:5000/api/spotify/recommend/${emotion}`
//       );
//       if (res.data?.songs?.length > 0) {
//         setSongs(res.data.songs);
//       } else {
//         setSongs([]);
//         alert("No songs found for this mood.");
//       }
//     } catch (err) {
//       console.error("Error fetching recommendations:", err);
//       setError("Could not fetch recommendations.");
//     }

//     setLoading(false);
//   };

//   const downloadSong = async (title, artist) => {
//     try {
//       const query = `${title} ${artist}`;
//       const res = await fetch(
//         `http://127.0.0.1:5000/download?query=${encodeURIComponent(query)}`
//       );
//       const data = await res.json();

//       if (data.success && data.file) {
//         alert(`Downloaded: ${title}\nSaved to ${data.file}`);
//       } else {
//         alert("Download failed. Try again!");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error while downloading.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center py-10 px-4">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">Mood Detection</h1>

//       {/* Mode Toggle */}
//       <div className="flex gap-4 mb-6">
//         <button
//           className={`px-5 py-2 rounded-xl shadow-md transition ${
//             mode === "text"
//               ? "bg-blue-600 text-white"
//               : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
//           }`}
//           onClick={() => setMode("text")}
//         >
//           Text Mode
//         </button>
//         <button
//           className={`px-5 py-2 rounded-xl shadow-md transition ${
//             mode === "camera"
//               ? "bg-blue-600 text-white"
//               : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
//           }`}
//           onClick={() => setMode("camera")}
//         >
//           Camera Mode
//         </button>
//       </div>

//       {/* Text Mode */}
//       {mode === "text" && (
//         <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
//           <textarea
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-400"
//             placeholder="Type how you feel..."
//           />
//           <button
//             onClick={handleTextSubmit}
//             className="w-full px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
//           >
//             Analyze
//           </button>
//         </div>
//       )}

//       {/* Camera Mode */}
//       {mode === "camera" && (
//         <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-lg">
//           <video
//             ref={videoRef}
//             autoPlay
//             playsInline
//             width="320"
//             height="240"
//             className="border rounded-lg shadow mb-4"
//           />
//           <canvas
//             ref={canvasRef}
//             width="320"
//             height="240"
//             className="border mb-4"
//           />
//           <div className="flex gap-4 mt-2">
//             <button
//               onClick={handleCapture}
//               className="px-5 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
//             >
//               Capture & Analyze
//             </button>
//             <button
//               onClick={toggleCamera}
//               className={`px-5 py-2 rounded-lg shadow-md transition ${
//                 cameraActive
//                   ? "bg-red-500 text-white hover:bg-red-600"
//                   : "bg-blue-500 text-white hover:bg-blue-600"
//               }`}
//             >
//               {cameraActive ? "Stop Camera" : "Start Camera"}
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Playlists */}
//       {songs.length > 0 && (
//         <div className="mt-6 w-full max-w-lg bg-gray-50 p-6 rounded-xl shadow-lg border">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">
//             Playlists for mood: {detectedMood}
//           </h2>
//           <ul className="space-y-3">
//             {songs.map((track) => (
//               <li key={track.id} className="flex flex-col gap-2 border-b pb-2">
//                 <div className="flex justify-between items-center">
//                   <a
//                     href={track.external_urls.spotify}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 hover:underline"
//                   >
//                     {track.name}
//                   </a>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => goToPlayer(track)}
//                       className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
//                     >
//                       Add
//                     </button>
//                     <button
//                       onClick={() =>
//                         downloadSong(track.name, track.artists?.[0]?.name || "")
//                       }
//                       className="px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700"
//                     >
//                       Download
//                     </button>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {detectedMood && (
//         <button
//           onClick={() => fetchPlaylists(detectedMood)}
//           className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition"
//         >
//           Generate Playlist for "{detectedMood}"
//         </button>
//       )}

//       {error && <p className="mt-4 text-red-600">Error: {error}</p>}

//       {loading && (
//         <p className="mt-6 text-gray-600 animate-pulse">Loading...</p>
//       )}

//       {faces.length > 0 && (
//         <div className="mt-6 w-full max-w-md bg-gray-50 p-6 rounded-xl shadow-lg border">
//           <h2 className="text-xl font-semibold text-gray-800">
//             Detected Faces
//           </h2>
//           {faces.map((face, idx) => (
//             <div key={idx} className="mt-4">
//               <p className="text-lg">
//                 Emotion:{" "}
//                 <span className="text-blue-600">{face?.emotion || "N/A"}</span>
//               </p>
//               {face?.probabilities && (
//                 <ul className="mt-2 space-y-1 text-gray-700">
//                   {Object.entries(face.probabilities).map(([emo, prob]) => (
//                     <li key={emo} className="flex justify-between">
//                       <span>{emo}</span>
//                       <span className="font-medium">
//                         {(prob * 100).toFixed(2)}%
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       {!faces.length && !loading && (
//         <p className="mt-6 text-gray-600">No face detected.</p>
//       )}
//     </div>
//   );
// }
// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

// export default function MoodDetection() {
//   const [mode, setMode] = useState("text"); // text or camera
//   const [text, setText] = useState("");
//   const [faces, setFaces] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [cameraActive, setCameraActive] = useState(false);
//   const [detectedMood, setDetectedMood] = useState(null);
//   const [songs, setSongs] = useState([]);
//   const [error, setError] = useState(null);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const navigate = useNavigate();
//   const accessToken = localStorage.getItem("spotifyAccessToken");

//   const moodToGenre = {
//     happy: "pop",
//     sad: "acoustic",
//     calm: "ambient",
//     angry: "metal",
//     energetic: "dance",
//     relaxed: "chill",
//   };

//   // Start/Stop Camera
//   const startCamera = () => {
//     navigator.mediaDevices
//       .getUserMedia({ video: true })
//       .then((stream) => {
//         if (videoRef.current) videoRef.current.srcObject = stream;
//         setCameraActive(true);
//       })
//       .catch((err) => console.error("Camera error:", err));
//   };

//   const stopCamera = () => {
//     if (videoRef.current?.srcObject) {
//       videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
//       videoRef.current.srcObject = null;
//       setCameraActive(false);
//     }
//   };

//   const toggleCamera = () => (cameraActive ? stopCamera() : startCamera());

//   useEffect(() => {
//     if (mode !== "camera" && cameraActive) stopCamera();
//   }, [mode, cameraActive]);

//   // Capture tokens from Spotify login redirect
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const token = params.get("access_token");
//     const refreshToken = params.get("refresh_token");
//     const expiresIn = params.get("expires_in");

//     if (token && refreshToken) {
//       localStorage.setItem("spotifyAccessToken", token);
//       localStorage.setItem("spotifyRefreshToken", refreshToken);
//       localStorage.setItem("spotify_token_expires_in", expiresIn);

//       // Clean URL
//       window.history.replaceState({}, document.title, "/dashboard");
//       navigate("/dashboard");
//     }
//   }, []);

//   // Text analysis
//   const handleTextSubmit = async () => {
//     if (!text.trim()) {
//       alert("Please enter some text first!");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await axios.post("http://127.0.0.1:8000/analyze-text", {
//         text,
//       });

//       if (res.data.status === "success" && res.data.faces?.length > 0) {
//         setFaces(res.data.faces);
//         setDetectedMood(res.data.faces[0].emotion);
//       } else {
//         setFaces([]);
//         setDetectedMood(null);
//         alert("No emotion detected from text.");
//       }
//     } catch (err) {
//       console.error("Text analysis failed:", err);
//       alert("Error analyzing text. Check backend logs.");
//     }
//     setLoading(false);
//   };

//   // ✅ FIXED: Normalize track for YouTube streaming
//   const goToPlayer = (track) => {
//     const normalizedTrack = {
//       title: track.name || track.title,
//       artist: track.artist || "Unknown Artist",
//       image: track.image,
//       album: track.album,
//       source: "youtube",
//     };

//     navigate("/player", { state: { track: normalizedTrack } });
//   };

//   // Camera capture
//   const handleCapture = async () => {
//     if (!videoRef.current || !canvasRef.current) return;
//     const ctx = canvasRef.current.getContext("2d");
//     ctx.drawImage(videoRef.current, 0, 0, 320, 240);

//     canvasRef.current.toBlob(async (blob) => {
//       const formData = new FormData();
//       formData.append("image", blob, "capture.jpg");
//       setLoading(true);

//       try {
//         const res = await axios.post(
//           "http://127.0.0.1:8000/detect-emotion",
//           formData,
//           {
//             headers: { "Content-Type": "multipart/form-data" },
//           }
//         );

//         if (res.data.faces?.length > 0) {
//           setFaces(res.data.faces);
//           setDetectedMood(res.data.faces[0].emotion);
//         } else {
//           setFaces([]);
//           setDetectedMood(null);
//         }
//       } catch (err) {
//         console.error(err);
//         setError("Failed to detect emotion from camera.");
//       }

//       setLoading(false);
//     }, "image/jpeg");
//   };

//   // Fetch Spotify playlists by mood - FIXED
//   const fetchPlaylists = async (emotion) => {
//     if (!emotion) return;

//     setLoading(true);
//     setError(null);
//     setSongs([]); // Clear previous songs

//     try {
//       console.log("🎵 Fetching recommendations for:", emotion);
//       const res = await axios.get(
//         `http://127.0.0.1:5000/api/spotify/recommend/${emotion}`
//       );

//       console.log("📦 Response data:", res.data);
//       console.log("📦 Tracks:", res.data.tracks);

//       // FIX: Changed from res.data.songs to res.data.tracks
//       if (res.data?.tracks && res.data.tracks.length > 0) {
//         setSongs(res.data.tracks);
//         console.log("✅ Set", res.data.tracks.length, "songs");
//       } else {
//         setSongs([]);
//         setError("No songs found for this mood.");
//       }
//     } catch (err) {
//       console.error("Error fetching recommendations:", err);
//       setError("Could not fetch recommendations. Check if backend is running.");
//     }

//     setLoading(false);
//   };

//   // ✅ FIXED: Download using /api/youtube/download
//   const downloadSong = async (title, artist) => {
//     try {
//       const query = `${title} ${artist}`;
//       const res = await fetch(
//         `http://127.0.0.1:5000/api/youtube/download?query=${encodeURIComponent(
//           query
//         )}`
//       );

//       if (!res.ok) {
//         alert("Download failed. Try again!");
//         return;
//       }

//       // trigger browser download
//       const blob = await res.blob();
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `${title}.mp3`;
//       a.click();
//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       console.error(err);
//       alert("Error while downloading.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex flex-col">
//       {/* Header bar */}
//       <header className="flex justify-between items-center px-8 py-4">
//         {/* Left side - MoodTune */}
//         <Link
//           to="/"
//           className="font-['Pacifico'] text-2xl text-white cursor-pointer"
//         >
//           MoodTune
//         </Link>

//         {/* Right side - Player button */}
//         <Link
//           to="/player"
//           className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer"
//         >
//           Player
//         </Link>
//       </header>
//       <main className="flex-grow flex flex-col items-center justify-center px-6 pb-12 text-white">
//         <h1 className="text-3xl font-bold mb-6 text-white">Mood Detection</h1>

//         {/* Mode Toggle */}
//         <div className="flex gap-4 mb-6">
//           <button
//             className={`px-5 py-2 rounded-xl shadow-md transition ${
//               mode === "text"
//                 ? "bg-blue-600 text-white"
//                 : "bg-white border border-gray-300 text-gray-200 hover:bg-gray-100"
//             }`}
//             onClick={() => setMode("text")}
//           >
//             Text Mode
//           </button>
//           <button
//             className={`px-5 py-2 rounded-xl shadow-md transition ${
//               mode === "camera"
//                 ? "bg-blue-600 text-white"
//                 : "bg-white border border-gray-300 text-gray-800 hover:bg-gray-100"
//             }`}
//             onClick={() => setMode("camera")}
//           >
//             Camera Mode
//           </button>
//         </div>

//         {/* Text Mode */}
//         {mode === "text" && (
//           <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
//             <textarea
//               value={text}
//               onChange={(e) => setText(e.target.value)}
//               className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-400"
//               placeholder="Type how you feel..."
//             />
//             <button
//               onClick={handleTextSubmit}
//               className="w-full px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
//               disabled={loading}
//             >
//               {loading ? "Analyzing..." : "Analyze"}
//             </button>
//           </div>
//         )}

//         {/* Camera Mode */}
//         {mode === "camera" && (
//           <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-lg">
//             <video
//               ref={videoRef}
//               autoPlay
//               playsInline
//               width="320"
//               height="240"
//               className="border rounded-lg shadow mb-4"
//             />
//             <canvas
//               ref={canvasRef}
//               width="320"
//               height="240"
//               className="hidden"
//             />
//             <div className="flex gap-4 mt-2">
//               <button
//                 onClick={handleCapture}
//                 className="px-5 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
//                 disabled={!cameraActive || loading}
//               >
//                 {loading ? "Analyzing..." : "Capture & Analyze"}
//               </button>
//               <button
//                 onClick={toggleCamera}
//                 className={`px-5 py-2 rounded-lg shadow-md transition ${
//                   cameraActive
//                     ? "bg-red-500 text-white hover:bg-red-600"
//                     : "bg-blue-500 text-white hover:bg-blue-600"
//                 }`}
//               >
//                 {cameraActive ? "Stop Camera" : "Start Camera"}
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Generate Playlist Button */}
//         {detectedMood && (
//           <button
//             onClick={() => fetchPlaylists(detectedMood)}
//             className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition"
//             disabled={loading}
//           >
//             {loading ? "Loading..." : `Generate Playlist for "${detectedMood}"`}
//           </button>
//         )}

//         {/* Error Message */}
//         {error && <p className="mt-4 text-red-600">{error}</p>}

//         {/* Playlists */}
//         {songs.length > 0 && (
//           <div className="mt-6 w-full max-w-2xl bg-gray-50 p-6 rounded-xl shadow-lg border">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">
//               🎵 Playlists for mood:{" "}
//               <span className="text-purple-600">{detectedMood}</span>
//             </h2>
//             <ul className="space-y-3">
//               {songs.map((track) => (
//                 <li
//                   key={track.id}
//                   className="flex items-start gap-3 border-b pb-3"
//                 >
//                   {track.image && (
//                     <img
//                       src={track.image}
//                       alt={track.name}
//                       className="w-16 h-16 rounded-md object-cover shadow-sm"
//                     />
//                   )}
//                   <div className="flex-1">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <a
//                           href={track.url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-600 hover:underline font-medium"
//                         >
//                           {track.name}
//                         </a>
//                         <p className="text-sm text-gray-600">{track.artist}</p>
//                         {track.album && (
//                           <p className="text-xs text-gray-500">{track.album}</p>
//                         )}
//                       </div>

//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => goToPlayer(track)}
//                           className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
//                         >
//                           Play
//                         </button>
//                         <button
//                           onClick={() => downloadSong(track.name, track.artist)}
//                           className="px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition"
//                         >
//                           Download
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//             <p className="mt-4 text-sm text-gray-500 text-center">
//               {songs.length} songs found
//             </p>
//           </div>
//         )}

//         {loading && (
//           <div className="mt-6 flex items-center gap-2">
//             <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
//             <p className="text-gray-600">Loading...</p>
//           </div>
//         )}

//         {faces.length > 0 && (
//           <div className="mt-6 w-full max-w-md bg-gray-50 p-6 rounded-xl shadow-lg border">
//             <h2 className="text-xl font-semibold text-gray-800">
//               Detected Emotion
//             </h2>
//             {faces.map((face, idx) => (
//               <div key={idx} className="mt-4">
//                 <p className="text-lg">
//                   Emotion:{" "}
//                   <span className="text-blue-600 font-semibold capitalize">
//                     {face?.emotion || "N/A"}
//                   </span>
//                 </p>
//                 {face?.probabilities && (
//                   <ul className="mt-2 space-y-1 text-gray-700">
//                     {Object.entries(face.probabilities).map(([emo, prob]) => (
//                       <li key={emo} className="flex justify-between">
//                         <span className="capitalize">{emo}</span>
//                         <span className="font-medium">
//                           {(prob * 100).toFixed(2)}%
//                         </span>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}

//         {!faces.length && !loading && !songs.length && (
//           <p className="mt-6 text-gray-600">
//             {mode === "text"
//               ? "Enter text and click Analyze to detect mood"
//               : "Start camera and capture to detect mood"}
//           </p>
//         )}
//       </main>
//     </div>
//   );
// }

// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";

// export default function MoodDetection() {
//   const [mode, setMode] = useState("text"); // text or camera
//   const [text, setText] = useState("");
//   const [faces, setFaces] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [cameraActive, setCameraActive] = useState(false);
//   const [detectedMood, setDetectedMood] = useState(null);
//   const [songs, setSongs] = useState([]);
//   const [error, setError] = useState(null);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const navigate = useNavigate();
//   const accessToken = localStorage.getItem("spotifyAccessToken");

//   // Mood → Genre mapping
//   const moodToGenre = {
//     happy: "pop",
//     sad: "acoustic",
//     calm: "ambient",
//     angry: "metal",
//     energetic: "dance",
//     relaxed: "chill",
//   };

//   // Start/Stop camera
//   const startCamera = () => {
//     navigator.mediaDevices
//       .getUserMedia({ video: true })
//       .then((stream) => {
//         if (videoRef.current) videoRef.current.srcObject = stream;
//         setCameraActive(true);
//       })
//       .catch((err) => console.error("Camera error:", err));
//   };

//   const stopCamera = () => {
//     if (videoRef.current?.srcObject) {
//       videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
//       videoRef.current.srcObject = null;
//       setCameraActive(false);
//     }
//   };

//   const toggleCamera = () => (cameraActive ? stopCamera() : startCamera());

//   useEffect(() => {
//     if (mode !== "camera" && cameraActive) stopCamera();
//   }, [mode, cameraActive]);

//   // Capture tokens from Spotify redirect
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const token = params.get("access_token");
//     const refreshToken = params.get("refresh_token");
//     const expiresIn = params.get("expires_in");

//     if (token && refreshToken) {
//       localStorage.setItem("spotifyAccessToken", token);
//       localStorage.setItem("spotifyRefreshToken", refreshToken);
//       localStorage.setItem("spotify_token_expires_in", expiresIn);

//       window.history.replaceState({}, document.title, "/dashboard");
//       navigate("/dashboard");
//     }
//   }, []);

//   // Text analysis
//   const handleTextSubmit = async () => {
//     if (!text.trim()) return alert("Please enter some text first!");
//     setLoading(true);

//     try {
//       const res = await axios.post("http://127.0.0.1:8000/analyze-text", {
//         text,
//       });

//       if (res.data.status === "success" && res.data.faces?.length > 0) {
//         setFaces(res.data.faces);
//         setDetectedMood(res.data.faces[0].emotion);
//       } else {
//         setFaces([]);
//         setDetectedMood(null);
//         alert("No emotion detected from text.");
//       }
//     } catch (err) {
//       console.error("Text analysis failed:", err);
//       alert("Error analyzing text. Check backend logs.");
//     }
//     setLoading(false);
//   };

//   // Navigate to Player
//   const goToPlayer = (track) => {
//     const normalizedTrack = {
//       title: track.name || track.title,
//       artist: track.artist || "Unknown Artist",
//       image: track.image,
//       album: track.album,
//       source: "youtube",
//     };
//     navigate("/player", { state: { track: normalizedTrack } });
//   };

//   // Camera capture
//   const handleCapture = async () => {
//     if (!videoRef.current || !canvasRef.current) return;
//     const ctx = canvasRef.current.getContext("2d");
//     ctx.drawImage(videoRef.current, 0, 0, 320, 240);

//     canvasRef.current.toBlob(async (blob) => {
//       const formData = new FormData();
//       formData.append("image", blob, "capture.jpg");
//       setLoading(true);

//       try {
//         const res = await axios.post(
//           "http://127.0.0.1:8000/detect-emotion",
//           formData,
//           { headers: { "Content-Type": "multipart/form-data" } }
//         );

//         if (res.data.faces?.length > 0) {
//           setFaces(res.data.faces);
//           setDetectedMood(res.data.faces[0].emotion);
//         } else {
//           setFaces([]);
//           setDetectedMood(null);
//         }
//       } catch (err) {
//         console.error(err);
//         setError("Failed to detect emotion from camera.");
//       }

//       setLoading(false);
//     }, "image/jpeg");
//   };

//   // Fetch Spotify playlists
//   const fetchPlaylists = async (emotion) => {
//     if (!emotion) return;

//     setLoading(true);
//     setError(null);
//     setSongs([]);

//     try {
//       const res = await axios.get(
//         `http://127.0.0.1:5000/api/spotify/recommend/${emotion}`
//       );

//       if (res.data?.tracks?.length > 0) {
//         setSongs(res.data.tracks);
//       } else {
//         setSongs([]);
//         setError("No songs found for this mood.");
//       }
//     } catch (err) {
//       console.error("Error fetching recommendations:", err);
//       setError("Could not fetch recommendations. Check if backend is running.");
//     }

//     setLoading(false);
//   };

//   // Download song
//   const downloadSong = async (title, artist) => {
//     try {
//       const query = `${title} ${artist}`;
//       const res = await fetch(
//         `http://127.0.0.1:5000/api/youtube/download?query=${encodeURIComponent(
//           query
//         )}`
//       );

//       if (!res.ok) return alert("Download failed. Try again!");

//       const blob = await res.blob();
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `${title}.mp3`;
//       a.click();
//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       console.error(err);
//       alert("Error while downloading.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex flex-col">
//       {/* Header */}
//       <header className="flex justify-between items-center px-8 py-4 text-white">
//         <Link
//           to="/"
//           className="font-['Pacifico'] text-2xl text-white drop-shadow-md"
//         >
//           MoodTune
//         </Link>

//         <Link
//           to="/player"
//           className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer"
//         >
//           Player
//         </Link>
//       </header>

//       {/* Main */}
//       <main className="flex-grow flex flex-col items-center justify-center px-6 pb-12">
//         <h1 className="text-3xl font-bold mb-6 text-white drop-shadow-md">
//           Mood Detection
//         </h1>

//         {/* Mode Toggle */}
//         <div className="flex gap-4 mb-6">
//           <button
//             className={`px-5 py-2 rounded-xl shadow-md transition ${
//               mode === "text"
//                 ? "bg-blue-600 text-white"
//                 : "bg-white border border-gray-300 text-gray-900 hover:bg-gray-100"
//             }`}
//             onClick={() => setMode("text")}
//           >
//             Text Mode
//           </button>
//           <button
//             className={`px-5 py-2 rounded-xl shadow-md transition ${
//               mode === "camera"
//                 ? "bg-blue-600 text-white"
//                 : "bg-white border border-gray-300 text-gray-900 hover:bg-gray-100"
//             }`}
//             onClick={() => setMode("camera")}
//           >
//             Camera Mode
//           </button>
//         </div>

//         {/* Text Mode */}
//         {mode === "text" && (
//           <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
//             <textarea
//               value={text}
//               onChange={(e) => setText(e.target.value)}
//               className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-400 text-gray-900"
//               placeholder="Type how you feel..."
//             />
//             <button
//               onClick={handleTextSubmit}
//               className="w-full px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
//               disabled={loading}
//             >
//               {loading ? "Analyzing..." : "Analyze"}
//             </button>
//           </div>
//         )}

//         {/* Camera Mode */}
//         {mode === "camera" && (
//           <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-lg text-gray-900">
//             <video
//               ref={videoRef}
//               autoPlay
//               playsInline
//               width="320"
//               height="240"
//               className="border rounded-lg shadow mb-4"
//             />
//             <canvas
//               ref={canvasRef}
//               width="320"
//               height="240"
//               className="hidden"
//             />
//             <div className="flex gap-4 mt-2">
//               <button
//                 onClick={handleCapture}
//                 className="px-5 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
//                 disabled={!cameraActive || loading}
//               >
//                 {loading ? "Analyzing..." : "Capture & Analyze"}
//               </button>
//               <button
//                 onClick={toggleCamera}
//                 className={`px-5 py-2 rounded-lg shadow-md transition ${
//                   cameraActive
//                     ? "bg-red-500 text-white hover:bg-red-600"
//                     : "bg-blue-500 text-white hover:bg-blue-600"
//                 }`}
//               >
//                 {cameraActive ? "Stop Camera" : "Start Camera"}
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Generate Playlist Button */}
//         {detectedMood && (
//           <button
//             onClick={() => fetchPlaylists(detectedMood)}
//             className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition"
//             disabled={loading}
//           >
//             {loading ? "Loading..." : `Generate Playlist for "${detectedMood}"`}
//           </button>
//         )}

//         {/* Error */}
//         {error && <p className="mt-4 text-red-400 text-shadow">{error}</p>}

//         {/* Playlists */}
//         {songs.length > 0 && (
//           <div className="mt-6 w-full max-w-2xl bg-white p-6 rounded-xl shadow-lg border text-gray-900">
//             <h2 className="text-xl font-semibold mb-4">
//               🎵 Playlists for mood:{" "}
//               <span className="text-purple-600">{detectedMood}</span>
//             </h2>
//             <ul className="space-y-3">
//               {songs.map((track) => (
//                 <li
//                   key={track.id}
//                   className="flex items-start gap-3 border-b pb-3"
//                 >
//                   {track.image && (
//                     <img
//                       src={track.image}
//                       alt={track.name}
//                       className="w-16 h-16 rounded-md object-cover shadow-sm"
//                     />
//                   )}
//                   <div className="flex-1">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <a
//                           href={track.url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-600 hover:underline font-medium"
//                         >
//                           {track.name}
//                         </a>
//                         <p className="text-sm text-gray-700">{track.artist}</p>
//                         {track.album && (
//                           <p className="text-xs text-gray-500">{track.album}</p>
//                         )}
//                       </div>

//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => goToPlayer(track)}
//                           className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
//                         >
//                           Play
//                         </button>
//                         <button
//                           onClick={() => downloadSong(track.name, track.artist)}
//                           className="px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition"
//                         >
//                           Download
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//             <p className="mt-4 text-sm text-gray-700 text-center">
//               {songs.length} songs found
//             </p>
//           </div>
//         )}

//         {/* Loading Spinner */}
//         {loading && (
//           <div className="mt-6 flex items-center gap-2 text-white">
//             <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-400"></div>
//             <p className="text-gray-200">Loading...</p>
//           </div>
//         )}

//         {/* Detected Emotion */}
//         {faces.length > 0 && (
//           <div className="mt-6 w-full max-w-md bg-white p-6 rounded-xl shadow-lg border text-gray-900">
//             <h2 className="text-xl font-semibold">Detected Emotion</h2>
//             {faces.map((face, idx) => (
//               <div key={idx} className="mt-4">
//                 <p className="text-lg">
//                   Emotion:{" "}
//                   <span className="text-blue-600 font-semibold capitalize">
//                     {face?.emotion || "N/A"}
//                   </span>
//                 </p>
//                 {face?.probabilities && (
//                   <ul className="mt-2 space-y-1 text-gray-800">
//                     {Object.entries(face.probabilities).map(([emo, prob]) => (
//                       <li key={emo} className="flex justify-between">
//                         <span className="capitalize">{emo}</span>
//                         <span className="font-medium">
//                           {(prob * 100).toFixed(2)}%
//                         </span>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Placeholder message */}
//         {!faces.length && !loading && !songs.length && (
//           <p className="mt-6 text-gray-200 text-shadow">
//             {mode === "text"
//               ? "Enter text and click Analyze to detect mood"
//               : "Start camera and capture to detect mood"}
//           </p>
//         )}
//       </main>
//     </div>
//   );
// }

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function MoodDetection() {
  const [mode, setMode] = useState("text");
  const [text, setText] = useState("");
  const [faces, setFaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [detectedMood, setDetectedMood] = useState(null);
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const [downloadLinks, setDownloadLinks] = useState({});

  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream;
        setCameraActive(true);
      })
      .catch((err) => console.error("Camera error:", err));
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  const toggleCamera = () => (cameraActive ? stopCamera() : startCamera());

  useEffect(() => {
    if (mode !== "camera" && cameraActive) stopCamera();
  }, [mode, cameraActive]);

  const handleTextSubmit = async () => {
    if (!text.trim()) return alert("Please enter some text first!");
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/analyze-text", {
        text,
      });

      if (res.data.status === "success" && res.data.faces?.length > 0) {
        setFaces(res.data.faces);
        setDetectedMood(res.data.faces[0].emotion);
      } else {
        setFaces([]);
        setDetectedMood(null);
        alert("No emotion detected from text.");
      }
    } catch (err) {
      console.error("Text analysis failed:", err);
      alert("Error analyzing text. Check backend logs.");
    }

    setLoading(false);
  };

  // // FIX: Create unique track IDs using timestamp + index
  // const goToPlayer = async (track, index) => {
  //   const uniqueId = `${track.id || track.name}-${Date.now()}-${index}`;

  //   const normalizedTrack = {
  //     id: uniqueId, // UNIQUE ID
  //     title: track.name || track.title,
  //     artist: track.artist || "Unknown Artist",
  //     album: track.album || "Unknown Album",
  //     source: "youtube",
  //   };

  //   try {
  //     const res = await fetch(
  //       `http://127.0.0.1:5000/api/youtube/play?query=${encodeURIComponent(
  //         normalizedTrack.title + " " + normalizedTrack.artist
  //       )}`
  //     );
  //     const data = await res.json();

  //     if (!data?.streamUrl) throw new Error("Could not fetch stream URL");

  //     const trackWithUrl = { ...normalizedTrack, streamUrl: data.streamUrl };
  //     navigate("/player", { state: { track: trackWithUrl } });
  //   } catch (err) {
  //     console.error("Failed to fetch YouTube stream:", err);
  //     alert("Unable to play track. Please try again.");
  //   }
  // };
  const goToPlayer = (selectedSong, index) => {
    console.log("🎵 Going to player with:", selectedSong);

    // Only send songs that are not the selected song itself to avoid duplication
    const filteredPlaylist = songs.filter(
      (song) => song.id !== selectedSong.id
    );

    navigate("/player", {
      state: {
        track: selectedSong, // The song to start playing
        playlist: filteredPlaylist, // The rest of the playlist
      },
    });
  };

  const handleCapture = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, 320, 240);

    canvasRef.current.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("image", blob, "capture.jpg");
      setLoading(true);

      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/detect-emotion",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (res.data.faces?.length > 0) {
          setFaces(res.data.faces);
          setDetectedMood(res.data.faces[0].emotion);
        } else {
          setFaces([]);
          setDetectedMood(null);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to detect emotion from camera.");
      }

      setLoading(false);
    }, "image/jpeg");
  };
  const handlePlaySong = (index) => {
    if (songs.length === 0) return;

    navigate("/player", {
      state: {
        track: songs[index],
        playlist: songs,
      },
    });
  };

  const handlePlayAll = () => {
    if (songs.length === 0) return;

    navigate("/player", {
      state: {
        track: songs[0],
        playlist: songs,
      },
    });
  };
  const fetchPlaylists = async (emotion) => {
    if (!emotion) return;

    setLoading(true);
    setError(null);
    setSongs([]);

    try {
      const res = await axios.get(
        `http://127.0.0.1:5000/api/spotify/recommend/${emotion}`
      );

      if (res.data?.tracks?.length > 0) {
        setSongs(res.data.tracks);
      } else {
        setSongs([]);
        setError("No songs found for this mood.");
      }
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setError("Could not fetch recommendations. Check if backend is running.");
    }

    setLoading(false);
  };

  const downloadSong = async (title, artist) => {
    try {
      const query = `${title} ${artist}`;
      const res = await fetch(
        `http://127.0.0.1:5000/api/youtube/download?query=${encodeURIComponent(
          query
        )}`
      );

      if (!res.ok) {
        const errText = await res.text();
        console.error("Download failed:", errText);
        return alert("Download failed. Please try again!");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;

      // Use safe filename
      const safeTitle = title.replace(/[^\w\s]/gi, "").replace(/\s+/g, "_");
      a.download = `${safeTitle}.mp3`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error while downloading:", err);
      alert("Error downloading song. Check console for details.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex flex-col">
      <header className="flex justify-between items-center px-8 py-4 text-white">
        <Link
          to="/"
          className="font-['Pacifico'] text-2xl text-white drop-shadow-md"
        >
          MoodTune
        </Link>

        <Link
          to="/player"
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer"
        >
          Player
        </Link>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-6 pb-12">
        <h1 className="text-3xl font-bold mb-6 text-white drop-shadow-md">
          Mood Detection
        </h1>

        <div className="flex gap-4 mb-6">
          <button
            className={`px-5 py-2 rounded-xl shadow-md transition ${
              mode === "text"
                ? "bg-blue-600 text-white"
                : "bg-white border border-gray-300 text-gray-900 hover:bg-gray-100"
            }`}
            onClick={() => setMode("text")}
          >
            Text Mode
          </button>
          <button
            className={`px-5 py-2 rounded-xl shadow-md transition ${
              mode === "camera"
                ? "bg-blue-600 text-white"
                : "bg-white border border-gray-300 text-gray-900 hover:bg-gray-100"
            }`}
            onClick={() => setMode("camera")}
          >
            Camera Mode
          </button>
        </div>

        {mode === "text" && (
          <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-400 text-gray-900"
              placeholder="Type how you feel..."
            />
            <button
              onClick={handleTextSubmit}
              className="w-full px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </div>
        )}

        {mode === "camera" && (
          <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-lg text-gray-900">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              width="320"
              height="240"
              className="border rounded-lg shadow mb-4"
            />
            <canvas
              ref={canvasRef}
              width="320"
              height="240"
              className="hidden"
            />
            <div className="flex gap-4 mt-2">
              <button
                onClick={handleCapture}
                className="px-5 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
                disabled={!cameraActive || loading}
              >
                {loading ? "Analyzing..." : "Capture & Analyze"}
              </button>
              <button
                onClick={toggleCamera}
                className={`px-5 py-2 rounded-lg shadow-md transition ${
                  cameraActive
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {cameraActive ? "Stop Camera" : "Start Camera"}
              </button>
            </div>
          </div>
        )}

        {detectedMood && (
          <button
            onClick={() => fetchPlaylists(detectedMood)}
            className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition"
            disabled={loading}
          >
            {loading ? "Loading..." : `Generate Playlist for "${detectedMood}"`}
          </button>
        )}

        {error && <p className="mt-4 text-red-400 text-shadow">{error}</p>}

        {songs.length > 0 && (
          <div className="mt-6 w-full max-w-2xl bg-white p-6 rounded-xl shadow-lg border text-gray-900">
            <h2 className="text-xl font-semibold mb-4">
              🎵 Playlists for mood:{" "}
              <span className="text-purple-600">{detectedMood}</span>
            </h2>
            <ul className="space-y-3">
              {songs.map((track, index) => (
                <li
                  key={`${track.id}-${index}`}
                  className="flex items-start gap-3 border-b pb-3"
                >
                  {track.image && (
                    <img
                      src={track.image}
                      alt={track.name}
                      className="w-16 h-16 rounded-md object-cover shadow-sm"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <a
                          href={track.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline font-medium"
                        >
                          {track.name}
                        </a>
                        <p className="text-sm text-gray-700">{track.artist}</p>
                        {track.album && (
                          <p className="text-xs text-gray-500">{track.album}</p>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => goToPlayer(songs[index], index)}
                          className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
                        >
                          Play
                        </button>
                        <div className="flex flex-col items-end">
                          <button
                            onClick={() =>
                              downloadSong(track.name, track.artist, index)
                            }
                            className="px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition"
                          >
                            Download
                          </button>
                          {downloadLinks[index] && (
                            <a
                              href={downloadLinks[index]}
                              download={`${track.name}.mp3`}
                              className="text-blue-600 text-xs mt-1 underline hover:text-blue-800"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Click to download manually
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-gray-700 text-center">
              {songs.length} songs found
            </p>
          </div>
        )}

        {loading && (
          <div className="mt-6 flex items-center gap-2 text-white">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-400"></div>
            <p className="text-gray-200">Loading...</p>
          </div>
        )}

        {faces.length > 0 && (
          <div className="mt-6 w-full max-w-md bg-white p-6 rounded-xl shadow-lg border text-gray-900">
            <h2 className="text-xl font-semibold">Detected Emotion</h2>
            {faces.map((face, idx) => (
              <div key={idx} className="mt-4">
                <p className="text-lg">
                  Emotion:{" "}
                  <span className="text-blue-600 font-semibold capitalize">
                    {face?.emotion || "N/A"}
                  </span>
                </p>
                {face?.probabilities && (
                  <ul className="mt-2 space-y-1 text-gray-800">
                    {Object.entries(face.probabilities).map(([emo, prob]) => (
                      <li key={emo} className="flex justify-between">
                        <span className="capitalize">{emo}</span>
                        <span className="font-medium">
                          {(prob * 100).toFixed(2)}%
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {!faces.length && !loading && !songs.length && (
          <p className="mt-6 text-gray-200 text-shadow">
            {mode === "text"
              ? "Enter text and click Analyze to detect mood"
              : "Start camera and capture to detect mood"}
          </p>
        )}
      </main>
    </div>
  );
}
