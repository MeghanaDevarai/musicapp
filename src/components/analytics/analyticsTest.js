// Test file to demonstrate dummy analytics usage
import musicAnalytics from "./musicanalytics";

// ==================== DEMO USAGE ====================

// 1. Test Song Play
console.log("\n=== Testing Song Play ===");
musicAnalytics.trackSongPlay({
  id: "song-001",
  title: "Blinding Lights",
  artist: "The Weeknd",
  genre: "pop",
  duration: 200000,
});

// Simulate playing for 30 seconds then skipping
setTimeout(() => {
  musicAnalytics.trackSongSkip(30, 200);
}, 1000);

// 2. Test Another Song (Complete)
setTimeout(() => {
  console.log("\n=== Testing Complete Song ===");
  musicAnalytics.trackSongPlay({
    id: "song-002",
    title: "Shape of You",
    artist: "Ed Sheeran",
    genre: "pop",
    duration: 234000,
  });

  // Complete it at 95%
  setTimeout(() => {
    musicAnalytics.trackSongComplete(95);
  }, 500);
}, 2000);

// 3. Test Like
setTimeout(() => {
  console.log("\n=== Testing Like ===");
  musicAnalytics.trackSongLike({
    id: "song-002",
    title: "Shape of You",
    artist: "Ed Sheeran",
  });
}, 3000);

// 4. Test Playlist Creation
setTimeout(() => {
  console.log("\n=== Testing Playlist Creation ===");
  musicAnalytics.trackPlaylistCreate({
    name: "My Workout Mix",
    songs: ["song-001", "song-002", "song-003"],
  });
}, 4000);

// 5. Test Search
setTimeout(() => {
  console.log("\n=== Testing Search ===");
  musicAnalytics.trackSearch("weekend songs", 15);
}, 5000);

// 6. Test Share
setTimeout(() => {
  console.log("\n=== Testing Share ===");
  musicAnalytics.trackShare(
    {
      id: "song-002",
      title: "Shape of You",
      artist: "Ed Sheeran",
    },
    "whatsapp"
  );
}, 6000);

// 7. Test Download
setTimeout(() => {
  console.log("\n=== Testing Download ===");
  musicAnalytics.trackDownload({
    id: "song-002",
    title: "Shape of You",
    artist: "Ed Sheeran",
  });
}, 7000);

// 8. Test Feature Usage
setTimeout(() => {
  console.log("\n=== Testing Features ===");
  musicAnalytics.trackRepeatMode("all");
  musicAnalytics.trackShuffleToggle(true);
  musicAnalytics.trackQualityChange("high");
}, 8000);

// 9. Get Summary
setTimeout(() => {
  console.log("\n=== ANALYTICS SUMMARY ===");
  musicAnalytics.getAnalyticsSummary();
  musicAnalytics.getTopSongs();
  musicAnalytics.getRecentActivity(5);
}, 9000);

// 10. Export Data
setTimeout(() => {
  console.log("\n=== EXPORT DATA ===");
  const exportedData = musicAnalytics.exportData();
  console.log("You can save this data to a file or send to server");
}, 10000);

// ==================== USAGE IN COMPONENTS ====================

/*
// In your MusicPlayer component:
import musicAnalytics from './services/analytics/musicAnalytics';

function MusicPlayer({ song }) {
  const handlePlay = () => {
    musicAnalytics.trackSongPlay(song);
  };

  const handleComplete = () => {
    musicAnalytics.trackSongComplete(100);
  };

  const handleLike = () => {
    musicAnalytics.trackSongLike(song);
  };

  return (
    <div>
      <button onClick={handlePlay}>Play</button>
      <button onClick={handleLike}>Like</button>
    </div>
  );
}
*/

// ==================== CONSOLE COMMANDS ====================

/*
Open browser console and try these commands:

// Get summary
window.musicAnalytics.getAnalyticsSummary()

// Get top songs
window.musicAnalytics.getTopSongs()

// Get recent activity
window.musicAnalytics.getRecentActivity(10)

// Export all data
window.musicAnalytics.exportData()

// Clear all data
window.musicAnalytics.clearData()

// Track a song manually
window.musicAnalytics.trackSongPlay({
  id: 'test-123',
  title: 'Test Song',
  artist: 'Test Artist',
  genre: 'rock',
  duration: 180000
})
*/
