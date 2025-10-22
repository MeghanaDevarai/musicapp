// // // src/pages/Analytics.js
// // import React, { useEffect, useState } from "react";

// // export default function Analytics({ spotifyTokens }) {
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [topArtists, setTopArtists] = useState([]);
// //   const [topTracks, setTopTracks] = useState([]);

// //   useEffect(() => {
// //     const fetchAnalytics = async () => {
// //       if (!spotifyTokens?.accessToken) {
// //         setError(
// //           "Spotify login required. Please login with Spotify to view analytics."
// //         );
// //         setLoading(false);
// //         return;
// //       }

// //       try {
// //         // Fetch top artists
// //         const artistsRes = await fetch(
// //           "https://api.spotify.com/v1/me/top/artists?limit=5",
// //           {
// //             headers: {
// //               Authorization: `Bearer ${spotifyTokens.accessToken}`,
// //             },
// //           }
// //         );
// //         if (!artistsRes.ok) throw new Error("Failed to fetch top artists");
// //         const artistsData = await artistsRes.json();
// //         setTopArtists(artistsData.items || []);

// //         // Fetch top tracks
// //         const tracksRes = await fetch(
// //           "https://api.spotify.com/v1/me/top/tracks?limit=5",
// //           {
// //             headers: {
// //               Authorization: `Bearer ${spotifyTokens.accessToken}`,
// //             },
// //           }
// //         );
// //         if (!tracksRes.ok) throw new Error("Failed to fetch top tracks");
// //         const tracksData = await tracksRes.json();
// //         setTopTracks(tracksData.items || []);
// //       } catch (err) {
// //         setError(err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchAnalytics();
// //   }, [spotifyTokens]);

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
// //         <p className="text-white text-lg">Loading analytics...</p>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
// //         <p className="text-red-400 text-lg">{error}</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-6">
// //       <h1 className="text-3xl font-bold mb-6">Your Spotify Analytics</h1>

// //       <section className="mb-8">
// //         <h2 className="text-2xl font-semibold mb-4">Top Artists</h2>
// //         {topArtists.length === 0 ? (
// //           <p>No data available</p>
// //         ) : (
// //           <ul className="space-y-3">
// //             {topArtists.map((artist) => (
// //               <li key={artist.id} className="flex items-center space-x-4">
// //                 {artist.images?.[0]?.url ? (
// //                   <img
// //                     src={artist.images[0].url}
// //                     alt={artist.name}
// //                     className="w-12 h-12 rounded-full object-cover"
// //                   />
// //                 ) : (
// //                   <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
// //                     <span className="text-white">{artist.name.charAt(0)}</span>
// //                   </div>
// //                 )}
// //                 <span className="text-lg">{artist.name}</span>
// //               </li>
// //             ))}
// //           </ul>
// //         )}
// //       </section>

// //       <section>
// //         <h2 className="text-2xl font-semibold mb-4">Top Tracks</h2>
// //         {topTracks.length === 0 ? (
// //           <p>No data available</p>
// //         ) : (
// //           <ul className="space-y-3">
// //             {topTracks.map((track) => (
// //               <li key={track.id} className="flex items-center space-x-4">
// //                 {track.album?.images?.[0]?.url ? (
// //                   <img
// //                     src={track.album.images[0].url}
// //                     alt={track.name}
// //                     className="w-12 h-12 rounded object-cover"
// //                   />
// //                 ) : (
// //                   <div className="w-12 h-12 bg-gray-700 rounded flex items-center justify-center">
// //                     <span className="text-white">T</span>
// //                   </div>
// //                 )}
// //                 <div>
// //                   <p className="text-lg">{track.name}</p>
// //                   <p className="text-sm text-gray-300">
// //                     {track.artists.map((a) => a.name).join(", ")}
// //                   </p>
// //                 </div>
// //               </li>
// //             ))}
// //           </ul>
// //         )}
// //       </section>
// //     </div>
// //   );
// // }
// // FILE 2: client/src/pages/AnalyticsPage.jsx
// // client/src/pages/Analytics.js
// import React, { useState, useEffect } from "react";
// import musicAnalytics from "../components/analytics/musicanalytics";

// const Analytics = () => {
//   const [data, setData] = useState(null);
//   const [timeRange, setTimeRange] = useState("week");

//   useEffect(() => {
//     loadData();
//   }, [timeRange]);

//   const loadData = () => {
//     try {
//       const analyticsData = musicAnalytics.getDashboardData();
//       setData(analyticsData);
//     } catch (error) {
//       console.error("Error loading analytics:", error);
//       // Set default empty data
//       setData({
//         summary: {
//           totalSongPlays: 0,
//           totalSongCompletes: 0,
//           totalSkips: 0,
//           totalLikes: 0,
//           totalPlaylists: 0,
//           totalSearches: 0,
//           totalShares: 0,
//           totalDownloads: 2,
//           completionRate: "0%",
//           skipRate: "0%",
//           totalListeningTime: 3,
//         },
//         topSongs: [],
//         topGenres: [],
//         listeningByHour: [],
//         recentActivity: [],
//       });
//     }
//   };

//   if (!data) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading analytics...</p>
//         </div>
//       </div>
//     );
//   }

//   const formatTime = (ms) => {
//     const hours = Math.floor(ms / (1000 * 60 * 60));
//     const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
//     return `${hours}h ${minutes}m`;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       {/* Header */}
//       <div className="mb-8">
//         <div className="flex items-center justify-between flex-wrap gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">
//               🎵 Music Analytics
//             </h1>
//             <p className="text-gray-600 mt-2">
//               Track your listening habits and discover insights
//             </p>
//           </div>
//           <div className="flex gap-2 flex-wrap">
//             {["day", "week", "month", "year"].map((range) => (
//               <button
//                 key={range}
//                 onClick={() => setTimeRange(range)}
//                 className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                   timeRange === range
//                     ? "bg-purple-600 text-white"
//                     : "bg-white text-gray-700 hover:bg-gray-100"
//                 }`}
//               >
//                 {range.charAt(0).toUpperCase() + range.slice(1)}
//               </button>
//             ))}
//             <button
//               onClick={loadData}
//               className="px-4 py-2 rounded-lg font-medium bg-white text-gray-700 hover:bg-gray-100 transition-colors"
//             >
//               🔄 Refresh
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="text-3xl mb-2">🎵</div>
//           <h3 className="text-2xl font-bold text-gray-800">
//             {data.summary.totalSongPlays}
//           </h3>
//           <p className="text-sm text-gray-600 mt-1">Total Songs Played</p>
//           <p className="text-xs text-gray-500 mt-2">
//             {data.summary.totalSongCompletes} completed
//           </p>
//         </div>

//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="text-3xl mb-2">⏰</div>
//           <h3 className="text-2xl font-bold text-gray-800">
//             {formatTime(data.summary.totalListeningTime)}
//           </h3>
//           <p className="text-sm text-gray-600 mt-1">Listening Time</p>
//           <p className="text-xs text-gray-500 mt-2">Total time spent</p>
//         </div>

//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="text-3xl mb-2">❤️</div>
//           <h3 className="text-2xl font-bold text-gray-800">
//             {data.summary.totalLikes}
//           </h3>
//           <p className="text-sm text-gray-600 mt-1">Liked Songs</p>
//           <p className="text-xs text-gray-500 mt-2">
//             {data.summary.totalShares} shared
//           </p>
//         </div>

//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="text-3xl mb-2">⬇️</div>
//           <h3 className="text-2xl font-bold text-gray-800">
//             {data.summary.totalDownloads}
//           </h3>
//           <p className="text-sm text-gray-600 mt-1">Downloads</p>
//           <p className="text-xs text-gray-500 mt-2">
//             {data.summary.totalPlaylists} playlists
//           </p>
//         </div>
//       </div>

//       {/* Engagement Metrics */}
//       {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">
//             ✅ Completion Rate
//           </h3>
//           <div className="text-3xl font-bold text-green-600 mb-2">
//             {data.summary.completionRate}
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2">
//             <div
//               className="bg-green-500 h-2 rounded-full"
//               style={{ width: data.summary.completionRate }}
//             ></div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">
//             ⏭️ Skip Rate
//           </h3>
//           <div className="text-3xl font-bold text-orange-600 mb-2">
//             {data.summary.skipRate}
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2">
//             <div
//               className="bg-orange-500 h-2 rounded-full"
//               style={{ width: data.summary.skipRate }}
//             ></div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">
//             🔍 Total Searches
//           </h3>
//           <div className="text-3xl font-bold text-blue-600">
//             {data.summary.totalSearches}
//           </div>
//           <p className="text-sm text-gray-600 mt-2">Discovery rate</p>
//         </div>
//       </div> */}

//       {/* Top Songs */}
//       <div className="bg-white rounded-lg shadow p-6 mb-8">
//         <h3 className="text-lg font-semibold text-gray-800 mb-4">
//           🏆 Top Songs
//         </h3>
//         {data.topSongs.length > 0 ? (
//           <div className="space-y-4">
//             {data.topSongs.map((song, index) => (
//               <div
//                 key={song.id}
//                 className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
//               >
//                 <div className="text-2xl font-bold text-gray-400 w-8">
//                   {index + 1}
//                 </div>
//                 <div className="flex-1">
//                   <p className="font-medium text-gray-800">{song.title}</p>
//                   <p className="text-sm text-gray-600">{song.artist}</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-semibold text-purple-600">{song.plays}</p>
//                   <p className="text-xs text-gray-500">plays</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500 text-center py-8">
//             No songs played yet. Start listening! 🎧
//           </p>
//         )}
//       </div>

//       {/* Genre Distribution */}
//       <div className="bg-white rounded-lg shadow p-6 mb-8">
//         <h3 className="text-lg font-semibold text-gray-800 mb-4">
//           🎸 Genre Distribution
//         </h3>
//         {data.topGenres.length > 0 ? (
//           <div className="space-y-4">
//             {data.topGenres.map((genre) => {
//               const percentage =
//                 data.summary.totalSongPlays > 0
//                   ? ((genre.count / data.summary.totalSongPlays) * 100).toFixed(
//                       1
//                     )
//                   : 0;
//               return (
//                 <div key={genre.genre}>
//                   <div className="flex justify-between mb-2">
//                     <span className="font-medium text-gray-800">
//                       {genre.genre}
//                     </span>
//                     <span className="text-sm text-gray-600">
//                       {genre.count} plays ({percentage}%)
//                     </span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2">
//                     <div
//                       className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
//                       style={{ width: `${percentage}%` }}
//                     ></div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         ) : (
//           <p className="text-gray-500 text-center py-8">No genre data yet.</p>
//         )}
//       </div>

//       {/* Recent Activity */}
//       <div className="bg-white rounded-lg shadow p-6">
//         <h3 className="text-lg font-semibold text-gray-800 mb-4">
//           📊 Recent Activity
//         </h3>
//         {data.recentActivity.length > 0 ? (
//           <div className="space-y-3">
//             {data.recentActivity.map((activity, index) => (
//               <div
//                 key={index}
//                 className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50"
//               >
//                 <div className="text-xl">
//                   {activity.type === "SONG_PLAY" && "▶️"}
//                   {activity.type === "SONG_LIKE" && "❤️"}
//                   {activity.type === "SHARE" && "📤"}
//                   {activity.type === "DOWNLOAD" && "⬇️"}
//                   {activity.type === "PLAYLIST_CREATE" && "📝"}
//                 </div>
//                 <div className="flex-1">
//                   <p className="font-medium text-gray-800">
//                     {activity.title}
//                     {activity.artist && (
//                       <span className="text-gray-500">
//                         {" "}
//                         by {activity.artist}
//                       </span>
//                     )}
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     {activity.type.replace(/_/g, " ").toLowerCase()}
//                   </p>
//                 </div>
//                 <div className="text-sm text-gray-500">
//                   {activity.timestamp}
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500 text-center py-8">
//             No recent activity. Start using the app! 🎵
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Analytics;
// pages/Analytics.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import musicAnalytics from "../components/analytics/musicanalytics";

export default function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      setLoading(true);
      setError(null);

      // Get dashboard data from analytics service
      const dashboardData = musicAnalytics.getDashboardData();
      setData(dashboardData);

      console.log("📊 Analytics loaded:", dashboardData);
    } catch (err) {
      console.error("Error loading analytics:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    try {
      const exportData = musicAnalytics.exportData();
      const blob = new Blob([exportData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `melodymind-analytics-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export failed:", err);
      alert("Failed to export analytics data");
    }
  };

  const handleClearData = () => {
    if (window.confirm("Are you sure you want to clear all analytics data?")) {
      musicAnalytics.clearAnalytics();
      loadData();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading analytics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-red-400 text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/player" className="text-purple-300 hover:text-white">
            ← Back
          </Link>
          <h1 className="text-2xl font-bold text-white">📊 Analytics</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all"
          >
            📥 Export Data
          </button>
          <button
            onClick={handleClearData}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all"
          >
            🗑️ Clear Data
          </button>
        </div>
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Total Plays"
            value={data?.overview?.totalPlays || 0}
            icon="▶️"
            color="bg-blue-500"
          />
          <StatCard
            title="Total Likes"
            value={data?.overview?.totalLikes || 0}
            icon="❤️"
            color="bg-red-500"
          />
          <StatCard
            title="Total Skips"
            value={data?.overview?.totalSkips || 0}
            icon="⏭️"
            color="bg-yellow-500"
          />
          <StatCard
            title="Avg Completion"
            value={`${data?.overview?.averageCompletion || 0}%`}
            icon="✅"
            color="bg-green-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Songs */}
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">🎵 Top Songs</h2>
            {data?.topSongs?.length > 0 ? (
              <div className="space-y-3">
                {data.topSongs.map((song, index) => (
                  <div
                    key={song.id}
                    className="flex items-center gap-3 bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all"
                  >
                    <span className="text-2xl font-bold text-purple-400 w-8">
                      {index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-semibold truncate">
                        {song.title}
                      </div>
                      <div className="text-gray-400 text-sm truncate">
                        {song.artist}
                      </div>
                    </div>
                    <div className="text-purple-300 font-bold">
                      {song.plays} plays
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-8">
                No songs played yet
              </p>
            )}
          </div>

          {/* Genre Distribution */}
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">
              🎸 Genre Distribution
            </h2>
            {data?.genreDistribution?.length > 0 ? (
              <div className="space-y-3">
                {data.genreDistribution.slice(0, 5).map((genre, index) => {
                  const total = data.genreDistribution.reduce(
                    (sum, g) => sum + g.count,
                    0
                  );
                  const percentage = ((genre.count / total) * 100).toFixed(1);
                  return (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white">{genre.genre}</span>
                        <span className="text-purple-300">
                          {genre.count} ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-purple-500 h-2 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-8">
                No genre data yet
              </p>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-6 bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">
            📜 Recent Activity
          </h2>
          {data?.recentActivity?.length > 0 ? (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {data.recentActivity.map((event, index) => (
                <ActivityItem key={index} event={event} />
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">
              No activity yet - start playing music!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-1">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
        <div
          className={`${color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

// Activity Item Component
function ActivityItem({ event }) {
  const getIcon = () => {
    switch (event.type) {
      case "play":
        return "▶️";
      case "like":
        return "❤️";
      case "skip":
        return "⏭️";
      case "complete":
        return "✅";
      case "playlist_create":
        return "📝";
      default:
        return "🎵";
    }
  };

  const getDescription = () => {
    switch (event.type) {
      case "play":
        return `Played: ${event.song?.title || "Unknown"}`;
      case "like":
        return `Liked: ${event.song?.title || "Unknown"}`;
      case "skip":
        return `Skipped at ${event.data?.percentPlayed || 0}%`;
      case "complete":
        return `Completed: ${event.data?.completion || 0}%`;
      case "playlist_create":
        return `Created playlist: ${event.playlist?.name || "Unknown"}`;
      default:
        return "Unknown activity";
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="flex items-center gap-3 bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all">
      <span className="text-xl">{getIcon()}</span>
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm truncate">{getDescription()}</p>
      </div>
      <span className="text-gray-400 text-xs">
        {formatTime(event.timestamp)}
      </span>
    </div>
  );
}
