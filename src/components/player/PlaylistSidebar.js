// "use client";

// import React from "react";

// export default function PlaylistSidebar({
//   songs = [],
//   currentSong,
//   onSongSelect,
//   onRemoveSong,
// }) {
//   return (
//     <aside className="w-72 bg-black/30 backdrop-blur-sm border-r border-white/10 p-4 flex flex-col">
//       <h2 className="text-white text-xl font-semibold mb-4">Playlist</h2>

//       {songs.length === 0 ? (
//         <p className="text-gray-400 text-sm">No songs in the playlist</p>
//       ) : (
//         <ul className="flex-1 overflow-y-auto space-y-2">
//           {songs.map((song) => (
//             <li
//               key={song.id}
//               className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-all ${
//                 currentSong?.id === song.id
//                   ? "bg-purple-700/50 text-white"
//                   : "hover:bg-white/10 text-gray-300"
//               }`}
//             >
//               <div
//                 className="flex-1"
//                 onClick={() => onSongSelect(song)}
//                 title={`${song.title} - ${song.artist}`}
//               >
//                 <p className="truncate font-medium">{song.title}</p>
//                 <p className="truncate text-sm text-gray-400">{song.artist}</p>
//               </div>

//               <button
//                 onClick={() => onRemoveSong(song.id)}
//                 className="ml-2 text-red-400 hover:text-red-600 p-1 rounded-full transition"
//                 title="Remove Song"
//               >
//                 🗑️
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </aside>
//   );
// }
// components/player/PlaylistSidebar.js
import React, { useState } from "react";

export default function PlaylistSidebar({
  songs,
  currentSong,
  onSongSelect,
  onRemoveSong,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default"); // default, title, artist

  // Filter songs based on search
  const filteredSongs = songs.filter((song) => {
    const query = searchQuery.toLowerCase();
    return (
      song.title?.toLowerCase().includes(query) ||
      song.artist?.toLowerCase().includes(query) ||
      song.album?.toLowerCase().includes(query)
    );
  });

  // Sort songs
  const sortedSongs = [...filteredSongs].sort((a, b) => {
    if (sortBy === "title") {
      return (a.title || "").localeCompare(b.title || "");
    }
    if (sortBy === "artist") {
      return (a.artist || "").localeCompare(b.artist || "");
    }
    return 0; // default order
  });

  return (
    <div className="w-80 bg-black/30 backdrop-blur-sm border-r border-white/10 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <h2 className="text-xl font-bold text-white mb-3">
          🎵 Playlist ({songs.length})
        </h2>

        {/* Search */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search songs..."
          className="w-full px-3 py-2 bg-white/10 text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 mb-2"
        />

        {/* Sort Options */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full px-3 py-2 bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          <option value="default">Default Order</option>
          <option value="title">Sort by Title</option>
          <option value="artist">Sort by Artist</option>
        </select>
      </div>

      {/* Song List */}
      <div className="flex-1 overflow-y-auto">
        {sortedSongs.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-400 mb-2">
              {searchQuery ? "No songs found" : "No songs in playlist"}
            </p>
            <p className="text-sm text-gray-500">
              {searchQuery
                ? "Try a different search"
                : "Add songs from the library"}
            </p>
          </div>
        ) : (
          <div className="p-2">
            {sortedSongs.map((song) => (
              <SongItem
                key={song.id}
                song={song}
                isPlaying={currentSong?.id === song.id}
                onSelect={() => onSongSelect(song)}
                onRemove={() => onRemoveSong(song.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer Info */}
      {songs.length > 0 && (
        <div className="p-4 border-t border-white/10">
          <div className="text-xs text-gray-400">
            <div className="flex justify-between mb-1">
              <span>Total Songs:</span>
              <span className="text-white font-semibold">{songs.length}</span>
            </div>
            <div className="flex justify-between">
              <span>YouTube:</span>
              <span className="text-purple-300">
                {songs.filter((s) => s.source === "youtube").length}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Local Files:</span>
              <span className="text-blue-300">
                {songs.filter((s) => s.source === "local").length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Individual Song Item Component
function SongItem({ song, isPlaying, onSelect, onRemove }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      className={`group relative p-3 rounded-lg mb-2 cursor-pointer transition-all ${
        isPlaying
          ? "bg-purple-600/30 border border-purple-500"
          : "bg-white/5 hover:bg-white/10"
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center gap-3">
        {/* Playing Indicator */}
        <div className="w-6 flex-shrink-0">
          {isPlaying ? (
            <div className="flex items-center gap-0.5">
              <span className="w-1 h-3 bg-purple-400 rounded-full animate-pulse"></span>
              <span className="w-1 h-4 bg-purple-400 rounded-full animate-pulse delay-75"></span>
              <span className="w-1 h-2 bg-purple-400 rounded-full animate-pulse delay-150"></span>
            </div>
          ) : (
            <span className="text-gray-500 text-sm">
              {song.source === "local" ? "💾" : "🎵"}
            </span>
          )}
        </div>

        {/* Song Info */}
        <div className="flex-1 min-w-0">
          <div
            className={`text-sm font-semibold truncate ${
              isPlaying ? "text-purple-300" : "text-white"
            }`}
          >
            {song.title || "Unknown Title"}
          </div>
          <div className="text-xs text-gray-400 truncate">
            {song.artist || "Unknown Artist"}
          </div>
        </div>

        {/* Menu Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded transition-all"
        >
          <span className="text-gray-400">⋮</span>
        </button>
      </div>

      {/* Dropdown Menu */}
      {showMenu && (
        <>
          {/* Backdrop to close menu */}
          <div
            className="fixed inset-0 z-10"
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(false);
            }}
          ></div>

          {/* Menu */}
          <div className="absolute right-2 top-12 bg-gray-800 rounded-lg shadow-xl z-20 py-1 min-w-[150px]">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect();
                setShowMenu(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-white hover:bg-purple-600 transition-all"
            >
              ▶️ Play Now
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
                setShowMenu(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-600 hover:text-white transition-all"
            >
              🗑️ Remove
            </button>
          </div>
        </>
      )}
    </div>
  );
}
