// services/analytics/musicAnalytics.js
// Music Analytics Service with Safety Checks

class MusicAnalytics {
  constructor() {
    this.sessionId = `session-${Date.now()}`;
    this.events = [];
  }

  // Helper: Safely get analytics data from memory
  getAnalytics() {
    return {
      sessionId: this.sessionId,
      events: [...this.events],
      stats: this.calculateStats(),
    };
  }

  // Helper: Calculate statistics
  calculateStats() {
    const plays = this.events.filter((e) => e.type === "play");
    const likes = this.events.filter((e) => e.type === "like");
    const skips = this.events.filter((e) => e.type === "skip");
    const completes = this.events.filter((e) => e.type === "complete");

    return {
      totalPlays: plays.length,
      totalLikes: likes.length,
      totalSkips: skips.length,
      totalCompletes: completes.length,
      averageCompletion:
        completes.length > 0
          ? completes.reduce((sum, e) => sum + (e.data?.completion || 0), 0) /
            completes.length
          : 0,
    };
  }

  // Helper: Validate song data
  validateSongData(songData, action = "track") {
    if (!songData) {
      console.warn(
        `[Analytics] Cannot ${action} - songData is null or undefined`
      );
      return false;
    }

    if (!songData.id) {
      console.warn(
        `[Analytics] Cannot ${action} - song.id is missing`,
        songData
      );
      return false;
    }

    return true;
  }

  // Track: Song Play
  trackSongPlay(songData) {
    if (!this.validateSongData(songData, "track play")) return;

    const event = {
      type: "play",
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      song: {
        id: songData.id,
        title: songData.title || "Unknown",
        artist: songData.artist || "Unknown Artist",
        genre: songData.genre || "Unknown",
        duration: songData.duration || 0,
      },
    };

    this.events.push(event);
    console.log("🎵 [Analytics] Song play tracked:", event.song.title);
  }

  // Track: Song Like
  trackSongLike(songData) {
    if (!this.validateSongData(songData, "track like")) return;

    const event = {
      type: "like",
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      song: {
        id: songData.id,
        title: songData.title || "Unknown",
        artist: songData.artist || "Unknown Artist",
      },
    };

    this.events.push(event);
    console.log("❤️ [Analytics] Song like tracked:", event.song.title);
  }

  // Track: Song Skip
  trackSongSkip(currentTime, duration) {
    if (typeof currentTime !== "number" || typeof duration !== "number") {
      console.warn("[Analytics] Cannot track skip - invalid time values");
      return;
    }

    const percentPlayed = duration > 0 ? (currentTime / duration) * 100 : 0;

    const event = {
      type: "skip",
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      data: {
        currentTime,
        duration,
        percentPlayed: Math.round(percentPlayed),
      },
    };

    this.events.push(event);
    console.log(
      "⏭️ [Analytics] Song skip tracked:",
      percentPlayed.toFixed(1) + "%"
    );
  }

  // Track: Song Complete
  trackSongComplete(completion) {
    if (typeof completion !== "number") {
      console.warn(
        "[Analytics] Cannot track completion - invalid completion value"
      );
      return;
    }

    const event = {
      type: "complete",
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      data: {
        completion: Math.round(completion),
      },
    };

    this.events.push(event);
    console.log(
      "✅ [Analytics] Song complete tracked:",
      completion.toFixed(1) + "%"
    );
  }

  // Track: Playlist Create
  trackPlaylistCreate(playlistData) {
    if (!playlistData || !playlistData.id) {
      console.warn("[Analytics] Cannot track playlist creation - invalid data");
      return;
    }

    const event = {
      type: "playlist_create",
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      playlist: {
        id: playlistData.id,
        name: playlistData.name || "Untitled",
        songCount: Array.isArray(playlistData.songs)
          ? playlistData.songs.length
          : 0,
      },
    };

    this.events.push(event);
    console.log("📝 [Analytics] Playlist created:", event.playlist.name);
  }

  // Get top played songs
  getTopSongs(limit = 10) {
    const songPlays = {};

    this.events
      .filter((e) => e.type === "play" && e.song?.id)
      .forEach((e) => {
        const id = e.song.id;
        if (!songPlays[id]) {
          songPlays[id] = {
            song: e.song,
            plays: 0,
          };
        }
        songPlays[id].plays++;
      });

    return Object.values(songPlays)
      .sort((a, b) => b.plays - a.plays)
      .slice(0, limit);
  }

  // Get listening by genre
  getGenreStats() {
    const genres = {};

    this.events
      .filter((e) => e.type === "play" && e.song?.genre)
      .forEach((e) => {
        const genre = e.song.genre;
        genres[genre] = (genres[genre] || 0) + 1;
      });

    return Object.entries(genres)
      .map(([genre, count]) => ({ genre, count }))
      .sort((a, b) => b.count - a.count);
  }

  // Get listening by time of day
  getTimeOfDayStats() {
    const hours = Array(24).fill(0);

    this.events
      .filter((e) => e.type === "play")
      .forEach((e) => {
        const hour = new Date(e.timestamp).getHours();
        hours[hour]++;
      });

    return hours.map((count, hour) => ({
      hour: `${hour}:00`,
      plays: count,
    }));
  }

  // Clear all analytics (for testing)
  clearAnalytics() {
    this.events = [];
    console.log("🧹 [Analytics] All analytics cleared");
  }

  // Export analytics data (for download/export feature)
  exportData() {
    const data = {
      sessionId: this.sessionId,
      exportDate: new Date().toISOString(),
      stats: this.calculateStats(),
      topSongs: this.getTopSongs(),
      genreStats: this.getGenreStats(),
      timeOfDayStats: this.getTimeOfDayStats(),
      events: this.events,
    };

    return JSON.stringify(data, null, 2);
  }

  // Get dashboard data (for Analytics page)
  getDashboardData() {
    const stats = this.calculateStats();
    const topSongs = this.getTopSongs(5);
    const genreStats = this.getGenreStats();
    const timeOfDayStats = this.getTimeOfDayStats();

    return {
      overview: {
        totalPlays: stats.totalPlays,
        totalLikes: stats.totalLikes,
        totalSkips: stats.totalSkips,
        averageCompletion: Math.round(stats.averageCompletion),
      },
      topSongs: topSongs.map((item) => ({
        id: item.song.id,
        title: item.song.title,
        artist: item.song.artist,
        plays: item.plays,
      })),
      genreDistribution: genreStats,
      listeningByTime: timeOfDayStats,
      recentActivity: this.events.slice(-20).reverse(),
    };
  }
}

// Create singleton instance (stored in memory only)
const musicAnalytics = new MusicAnalytics();

export default musicAnalytics;
