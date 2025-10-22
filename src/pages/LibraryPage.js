// // LibraryPage.js
// import React, { useEffect, useState } from "react";

// export default function LibraryPage({ spotifyTokens }) {
//   const [playlists, setPlaylists] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPlaylists = async () => {
//       if (!spotifyTokens?.accessToken) {
//         setError("Spotify login required. Please login to view your Library.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await fetch(
//           "https://api.spotify.com/v1/me/playlists?limit=12",
//           {
//             headers: {
//               Authorization: `Bearer ${spotifyTokens.accessToken}`,
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch playlists.");
//         }

//         const data = await response.json();
//         setPlaylists(data.items || []);
//       } catch (err) {
//         console.error(err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPlaylists();
//   }, [spotifyTokens]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
//         <p>Loading your playlists...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
//         <p>{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
//       <h1 className="text-3xl font-bold text-white mb-6">Your Library</h1>
//       {playlists.length === 0 ? (
//         <p className="text-gray-300">No playlists found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {playlists.map((playlist) => (
//             <div
//               key={playlist.id}
//               className="bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
//             >
//               <img
//                 src={
//                   playlist.images?.[0]?.url ||
//                   "https://via.placeholder.com/300x300?text=No+Image"
//                 }
//                 alt={playlist.name || "Playlist"}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h2 className="text-white font-semibold text-lg">
//                   {playlist.name || "Unnamed Playlist"}
//                 </h2>
//                 <p className="text-gray-400 text-sm">
//                   {playlist.tracks?.total ?? 0} tracks
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // src/pages/LibraryPage.js
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function LibraryPage({ spotifyTokens }) {
//   const navigate = useNavigate();

//   // -----------------------
//   // Hooks for Spotify
//   // -----------------------
//   const [spotifyPlaylists, setSpotifyPlaylists] = useState([]);
//   const [loadingSpotify, setLoadingSpotify] = useState(true);
//   const [spotifyError, setSpotifyError] = useState(null);

//   // -----------------------
//   // Hooks for Google/Email
//   // -----------------------
//   const [playlists, setPlaylists] = useState([]);
//   const [tracks, setTracks] = useState([]);
//   const [favourites, setFavourites] = useState([]);
//   const [showFavourites, setShowFavourites] = useState(false);
//   const [showPlaylists, setShowPlaylists] = useState(false);
//   const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
//   const [selectedPlaylistSongs, setSelectedPlaylistSongs] = useState([]);

//   // -----------------------
//   // Fetch Spotify playlists
//   // -----------------------
//   useEffect(() => {
//     const fetchPlaylists = async () => {
//       if (!spotifyTokens?.accessToken) {
//         setSpotifyError(
//           "Spotify login required. Please login to view your Library."
//         );
//         setLoadingSpotify(false);
//         return;
//       }

//       try {
//         const response = await fetch(
//           "https://api.spotify.com/v1/me/playlists?limit=12",
//           {
//             headers: {
//               Authorization: `Bearer ${spotifyTokens.accessToken}`,
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch playlists.");
//         }

//         const data = await response.json();
//         setSpotifyPlaylists(data.items || []);
//       } catch (err) {
//         console.error(err);
//         setSpotifyError(err.message);
//       } finally {
//         setLoadingSpotify(false);
//       }
//     };

//     fetchPlaylists();
//   }, [spotifyTokens]);

//   // -----------------------
//   // Load Google/Email favourites & playlists from localStorage
//   // -----------------------
//   useEffect(() => {
//     if (!spotifyTokens) {
//       const favs = JSON.parse(
//         localStorage.getItem("melodymindFavourites") || "[]"
//       );
//       setFavourites(favs);
//       const pls = JSON.parse(
//         localStorage.getItem("melodymindPlaylists") || "[]"
//       );
//       setPlaylists(pls);
//     }
//   }, [spotifyTokens]);

//   // -----------------------
//   // Player actions
//   // -----------------------
//   const playFavouriteSong = (song) => {
//     navigate("/player", { state: { track: song } });
//   };

//   const playPlaylistSong = (song, playlistId, idx) => {
//     navigate("/player", { state: { track: song, playlistId, songIndex: idx } });
//   };

//   const openPlaylist = (plId) => {
//     setSelectedPlaylistId(plId);
//     const pl = playlists.find((p) => p.id === plId);
//     setSelectedPlaylistSongs(pl ? pl.songs || [] : []);
//   };

//   // -----------------------
//   // Render Spotify UI
//   // -----------------------
//   if (spotifyTokens) {
//     if (loadingSpotify) {
//       return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
//           <p>Loading your playlists...</p>
//         </div>
//       );
//     }

//     if (spotifyError) {
//       return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
//           <p>{spotifyError}</p>
//         </div>
//       );
//     }

//     return (
//       <div className="p-6 min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
//         <h1 className="text-3xl font-bold text-white mb-6">Your Library</h1>
//         {spotifyPlaylists.length === 0 ? (
//           <p className="text-gray-300">No playlists found.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {spotifyPlaylists.map((playlist) => (
//               <div
//                 key={playlist.id}
//                 className="bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
//               >
//                 <img
//                   src={
//                     playlist.images?.[0]?.url ||
//                     "https://via.placeholder.com/300x300?text=No+Image"
//                   }
//                   alt={playlist.name || "Playlist"}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-4">
//                   <h2 className="text-white font-semibold text-lg">
//                     {playlist.name || "Unnamed Playlist"}
//                   </h2>
//                   <p className="text-gray-400 text-sm">
//                     {playlist.tracks?.total ?? 0} tracks
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   }

//   // -----------------------
//   // Render Google/Email UI
//   // -----------------------
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white px-6 py-10">
//       <div className="max-w-6xl mx-auto">
//         {/* Header with Favourites and Playlists buttons */}
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-4xl font-bold">Your Library</h1>
//             <p className="text-white/70 mt-1">
//               Personal favourites & playlists
//             </p>
//           </div>

//           <div className="flex items-center gap-3">
//             {/* Favourites toggle */}
//             <button
//               onClick={() => {
//                 setShowFavourites(true);
//                 setShowPlaylists(false);
//                 setSelectedPlaylistId(null);
//               }}
//               className={`px-4 py-2 rounded-full ${
//                 showFavourites
//                   ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
//                   : "bg-white/10 text-white"
//               } font-semibold`}
//             >
//               ❤️ Favourites
//             </button>

//             {/* Playlists toggle */}
//             <button
//               onClick={() => {
//                 setShowPlaylists((s) => !s);
//                 setShowFavourites(false);
//                 setSelectedPlaylistId(null);
//               }}
//               className={`px-4 py-2 rounded-full ${
//                 showPlaylists
//                   ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
//                   : "bg-white/10 text-white"
//               } font-semibold`}
//             >
//               🎶 Playlists
//             </button>
//           </div>
//         </div>

//         {/* CONTENT AREA */}
//         <div className="space-y-6">
//           {/* Favourites view */}
//           {showFavourites && (
//             <>
//               {favourites.length === 0 ? (
//                 <div className="bg-black/30 rounded-2xl p-8">
//                   <p className="text-white/70">
//                     You haven't liked any songs yet. Hit the ❤️ on any song to
//                     add it here.
//                   </p>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                   {favourites.map((song) => (
//                     <div
//                       key={song.id}
//                       onClick={() => playFavouriteSong(song)}
//                       className="bg-black/40 hover:bg-black/50 rounded-2xl p-4 cursor-pointer transition-shadow shadow-lg"
//                     >
//                       <div className="w-full h-44 rounded-lg overflow-hidden mb-3 bg-white/5 flex items-center justify-center">
//                         <img
//                           src={
//                             song.coverUrl || song.thumbnail || song.image || ""
//                           }
//                           alt={song.title}
//                           className="w-full h-full object-cover"
//                           onError={(e) => {
//                             e.currentTarget.style.display = "none";
//                           }}
//                         />
//                         {!song.coverUrl && !song.thumbnail && !song.image && (
//                           <div className="text-white/50">🎵</div>
//                         )}
//                       </div>

//                       <h3 className="text-lg font-semibold truncate">
//                         {song.title}
//                       </h3>
//                       <p className="text-sm text-white/70 truncate">
//                         {song.artist || "Unknown Artist"}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </>
//           )}

//           {/* Playlists view */}
//           {showPlaylists && (
//             <>
//               {playlists.length === 0 ? (
//                 <div className="bg-black/30 rounded-2xl p-6">
//                   <p className="text-white/70">
//                     No playlists yet. Use the + button in the sidebar to create
//                     one.
//                   </p>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                   {playlists.map((pl) => (
//                     <div
//                       key={pl.id}
//                       className="bg-black/40 rounded-2xl p-4 cursor-pointer hover:bg-black/50 transition"
//                       onClick={() => openPlaylist(pl.id)}
//                     >
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <h3 className="text-lg font-semibold">{pl.name}</h3>
//                           <p className="text-white/60 text-sm">
//                             {pl.songs?.length || 0} songs
//                           </p>
//                         </div>
//                         <div className="text-white/40">Open</div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </>
//           )}

//           {/* Selected playlist songs view */}
//           {selectedPlaylistId && (
//             <div>
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-2xl font-semibold">
//                   {
//                     (playlists.find((p) => p.id === selectedPlaylistId) || {})
//                       .name
//                   }
//                 </h2>
//                 <div className="text-white/60">
//                   {selectedPlaylistSongs.length} songs
//                 </div>
//               </div>

//               {selectedPlaylistSongs.length === 0 ? (
//                 <div className="bg-black/30 rounded-2xl p-6">
//                   <p className="text-white/70">This playlist is empty.</p>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                   {selectedPlaylistSongs.map((song, idx) => (
//                     <div
//                       key={song.id ?? idx}
//                       onClick={() =>
//                         playPlaylistSong(song, selectedPlaylistId, idx)
//                       }
//                       className="bg-black/40 hover:bg-black/50 rounded-2xl p-4 cursor-pointer transition-shadow shadow-lg"
//                     >
//                       <div className="w-full h-44 rounded-lg overflow-hidden mb-3 bg-white/5 flex items-center justify-center">
//                         <img
//                           src={
//                             song.coverUrl || song.thumbnail || song.image || ""
//                           }
//                           alt={song.title}
//                           className="w-full h-full object-cover"
//                           onError={(e) => {
//                             e.currentTarget.style.display = "none";
//                           }}
//                         />
//                         {!song.coverUrl && !song.thumbnail && !song.image && (
//                           <div className="text-white/50">🎵</div>
//                         )}
//                       </div>

//                       <h3 className="text-lg font-semibold truncate">
//                         {song.title}
//                       </h3>
//                       <p className="text-sm text-white/70 truncate">
//                         {song.artist || "Unknown Artist"}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LibraryPage() {
  const navigate = useNavigate();

  const [likedSongs, setLikedSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [showLiked, setShowLiked] = useState(true);
  const [showPlaylists, setShowPlaylists] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  // Load data from localStorage
  useEffect(() => {
    try {
      const liked = JSON.parse(
        localStorage.getItem("melodymindLikedSongs") || "[]"
      );
      setLikedSongs(liked);

      const pls = JSON.parse(
        localStorage.getItem("melodymindPlaylists") || "[]"
      );
      setPlaylists(pls);
    } catch (e) {
      console.error("Failed to load library:", e);
    }
  }, []);

  const playSong = (song) => {
    navigate("/player", { state: { track: song } });
  };

  const playPlaylist = (playlist, songIndex = 0) => {
    if (!playlist.songs || playlist.songs.length === 0) return;
    navigate("/player", {
      state: {
        track: playlist.songs[songIndex],
        playlist: playlist.songs,
      },
    });
  };

  const deletePlaylist = (playlistId) => {
    const updated = playlists.filter((pl) => pl.id !== playlistId);
    setPlaylists(updated);
    localStorage.setItem("melodymindPlaylists", JSON.stringify(updated));
    if (selectedPlaylist?.id === playlistId) {
      setSelectedPlaylist(null);
    }
  };

  const removeSongFromPlaylist = (playlistId, songId) => {
    const updated = playlists.map((pl) => {
      if (pl.id === playlistId) {
        return {
          ...pl,
          songs: pl.songs.filter((s) => s.id !== songId),
        };
      }
      return pl;
    });
    setPlaylists(updated);
    localStorage.setItem("melodymindPlaylists", JSON.stringify(updated));

    // Update selected playlist view
    if (selectedPlaylist?.id === playlistId) {
      const updatedPlaylist = updated.find((pl) => pl.id === playlistId);
      setSelectedPlaylist(updatedPlaylist);
    }
  };

  const unlikeSong = (songId) => {
    const updated = likedSongs.filter((s) => s.id !== songId);
    setLikedSongs(updated);
    localStorage.setItem("melodymindLikedSongs", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-white/10 px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-['Pacifico'] text-2xl text-white">
            MelodyMind
          </Link>
          <div className="flex gap-4">
            <Link
              to="/player"
              className="bg-white/10 text-purple-300 hover:bg-purple-600 hover:text-white px-4 py-2 rounded-full transition-all"
            >
              🎵 Player
            </Link>
            <Link
              to="/MoodDetection"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-full font-semibold transition-all"
            >
              Mood Detection
            </Link>
          </div>
        </div>
      </header>

      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Title & Tabs */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white">Your Library</h1>
              <p className="text-purple-300 mt-2">
                {likedSongs.length} liked songs • {playlists.length} playlists
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowLiked(true);
                  setShowPlaylists(false);
                  setSelectedPlaylist(null);
                }}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  showLiked
                    ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg"
                    : "bg-white/10 text-purple-300 hover:bg-white/20"
                }`}
              >
                ❤️ Liked Songs ({likedSongs.length})
              </button>

              <button
                onClick={() => {
                  setShowLiked(false);
                  setShowPlaylists(true);
                  setSelectedPlaylist(null);
                }}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  showPlaylists
                    ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg"
                    : "bg-white/10 text-purple-300 hover:bg-white/20"
                }`}
              >
                📁 Playlists ({playlists.length})
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div>
            {/* Liked Songs View */}
            {showLiked && (
              <div>
                {likedSongs.length === 0 ? (
                  <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-12 text-center">
                    <div className="text-6xl mb-4">💔</div>
                    <h2 className="text-2xl text-white mb-2">
                      No liked songs yet
                    </h2>
                    <p className="text-purple-300">
                      Click the heart icon on any song to add it here
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {likedSongs.map((song) => (
                      <div
                        key={song.id}
                        className="bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-black/50 transition-all group"
                      >
                        <div
                          onClick={() => playSong(song)}
                          className="cursor-pointer"
                        >
                          <div className="aspect-square bg-gradient-to-br from-purple-900/50 to-pink-900/50 flex items-center justify-center relative">
                            {song.coverUrl || song.thumbnail ? (
                              <img
                                src={song.coverUrl || song.thumbnail}
                                alt={song.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="text-6xl">🎵</div>
                            )}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-sm rounded-full p-4">
                                ▶️
                              </div>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="text-white font-semibold truncate">
                              {song.title}
                            </h3>
                            <p className="text-purple-300 text-sm truncate">
                              {song.artist}
                            </p>
                          </div>
                        </div>
                        <div className="px-4 pb-4">
                          <button
                            onClick={() => unlikeSong(song.id)}
                            className="w-full bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white px-4 py-2 rounded-lg transition-all text-sm"
                          >
                            💔 Unlike
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Playlists List View */}
            {showPlaylists && !selectedPlaylist && (
              <div>
                {playlists.length === 0 ? (
                  <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-12 text-center">
                    <div className="text-6xl mb-4">📁</div>
                    <h2 className="text-2xl text-white mb-2">
                      No playlists yet
                    </h2>
                    <p className="text-purple-300">
                      Create playlists from the player to organize your music
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {playlists.map((playlist) => (
                      <div
                        key={playlist.id}
                        className="bg-black/40 backdrop-blur-sm rounded-xl p-6 hover:bg-black/50 transition-all cursor-pointer group"
                        onClick={() => setSelectedPlaylist(playlist)}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="text-5xl">📁</div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deletePlaylist(playlist.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white p-2 rounded-lg"
                          >
                            🗑️
                          </button>
                        </div>
                        <h3 className="text-white font-bold text-xl mb-2">
                          {playlist.name}
                        </h3>
                        <p className="text-purple-300 text-sm">
                          {playlist.songs?.length || 0} songs
                        </p>
                        {playlist.createdAt && (
                          <p className="text-purple-400/50 text-xs mt-2">
                            Created{" "}
                            {new Date(playlist.createdAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Single Playlist View */}
            {selectedPlaylist && (
              <div>
                <button
                  onClick={() => setSelectedPlaylist(null)}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full mb-6 transition-all"
                >
                  ← Back to Playlists
                </button>

                <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 mb-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-4xl font-bold text-white mb-2">
                        {selectedPlaylist.name}
                      </h2>
                      <p className="text-purple-300">
                        {selectedPlaylist.songs?.length || 0} songs
                      </p>
                    </div>
                    <button
                      onClick={() => playPlaylist(selectedPlaylist, 0)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-semibold transition-all"
                    >
                      ▶️ Play All
                    </button>
                  </div>
                </div>

                {selectedPlaylist.songs?.length === 0 ? (
                  <div className="bg-black/20 rounded-xl p-8 text-center">
                    <p className="text-purple-300">This playlist is empty</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedPlaylist.songs?.map((song, index) => (
                      <div
                        key={song.id || index}
                        className="bg-black/40 backdrop-blur-sm rounded-xl p-4 hover:bg-black/50 transition-all group flex items-center gap-4"
                      >
                        <div className="text-purple-400 font-semibold w-8">
                          {index + 1}
                        </div>

                        <div
                          onClick={() => playPlaylist(selectedPlaylist, index)}
                          className="flex-1 flex items-center gap-4 cursor-pointer"
                        >
                          <div className="w-16 h-16 bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
                            {song.coverUrl || song.thumbnail ? (
                              <img
                                src={song.coverUrl || song.thumbnail}
                                alt={song.title}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <div className="text-2xl">🎵</div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-semibold truncate">
                              {song.title}
                            </h3>
                            <p className="text-purple-300 text-sm truncate">
                              {song.artist}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() =>
                            removeSongFromPlaylist(selectedPlaylist.id, song.id)
                          }
                          className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white px-4 py-2 rounded-lg"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
