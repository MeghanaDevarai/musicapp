import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  increment,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";
import { getAnalytics, logEvent } from "firebase/analytics";

class MusicAppAnalytics {
  constructor() {
    this.auth = getAuth();
    this.db = getFirestore();
    this.analytics = getAnalytics();
    this.currentSongStartTime = null;
    this.currentSong = null;
    this.sessionStartTime = Date.now();
  }

  // ==================== LISTENING BEHAVIOR ====================

  async trackSongPlay(songData) {
    const user = this.auth.currentUser;
    if (!user) return;

    this.currentSong = songData;
    this.currentSongStartTime = Date.now();

    // Log to Firebase Analytics
    logEvent(this.analytics, "song_play", {
      song_id: songData.id,
      song_name: songData.title,
      artist: songData.artist,
      genre: songData.genre,
      duration: songData.duration,
    });

    // Update user listening stats
    const userStatsRef = doc(this.db, "userAnalytics", user.uid);
    await updateDoc(userStatsRef, {
      totalSongsPlayed: increment(1),
      lastPlayed: serverTimestamp(),
      [`genreCount.${songData.genre}`]: increment(1),
      recentlyPlayed: arrayUnion({
        songId: songData.id,
        title: songData.title,
        artist: songData.artist,
        playedAt: Date.now(),
      }),
    });

    // Update song stats
    const songStatsRef = doc(this.db, "songAnalytics", songData.id);
    await setDoc(
      songStatsRef,
      {
        songId: songData.id,
        title: songData.title,
        artist: songData.artist,
        genre: songData.genre,
        totalPlays: increment(1),
        uniqueListeners: arrayUnion(user.uid),
        lastPlayed: serverTimestamp(),
      },
      { merge: true }
    );
  }

  async trackSongComplete(completionPercentage) {
    const user = this.auth.currentUser;
    if (!user || !this.currentSong) return;

    const listenDuration = Date.now() - this.currentSongStartTime;

    logEvent(this.analytics, "song_complete", {
      song_id: this.currentSong.id,
      completion_percentage: completionPercentage,
      listen_duration: listenDuration,
    });

    // Track if song was completed (>80% listened)
    if (completionPercentage >= 80) {
      const userStatsRef = doc(this.db, "userAnalytics", user.uid);
      await updateDoc(userStatsRef, {
        songsCompleted: increment(1),
        totalListeningTime: increment(listenDuration),
      });

      const songStatsRef = doc(this.db, "songAnalytics", this.currentSong.id);
      await updateDoc(songStatsRef, {
        completedPlays: increment(1),
        avgCompletionRate: increment(completionPercentage),
      });
    }
  }

  async trackSongSkip(skipTime, totalDuration) {
    const user = this.auth.currentUser;
    if (!user || !this.currentSong) return;

    const skipPercentage = (skipTime / totalDuration) * 100;

    logEvent(this.analytics, "song_skip", {
      song_id: this.currentSong.id,
      skip_at_seconds: skipTime,
      skip_percentage: skipPercentage,
    });

    const userStatsRef = doc(this.db, "userAnalytics", user.uid);
    await updateDoc(userStatsRef, {
      songsSkipped: increment(1),
    });

    const songStatsRef = doc(this.db, "songAnalytics", this.currentSong.id);
    await updateDoc(songStatsRef, {
      skips: increment(1),
      avgSkipTime: increment(skipTime),
    });
  }

  // ==================== USER INTERACTIONS ====================

  async trackSongLike(songData) {
    const user = this.auth.currentUser;
    if (!user) return;

    logEvent(this.analytics, "song_like", {
      song_id: songData.id,
      artist: songData.artist,
    });

    const userStatsRef = doc(this.db, "userAnalytics", user.uid);
    await updateDoc(userStatsRef, {
      totalLikes: increment(1),
      likedSongs: arrayUnion(songData.id),
    });

    const songStatsRef = doc(this.db, "songAnalytics", songData.id);
    await updateDoc(songStatsRef, {
      likes: increment(1),
    });
  }

  async trackPlaylistCreate(playlistData) {
    const user = this.auth.currentUser;
    if (!user) return;

    logEvent(this.analytics, "playlist_create", {
      playlist_name: playlistData.name,
      song_count: playlistData.songs.length,
    });

    const userStatsRef = doc(this.db, "userAnalytics", user.uid);
    await updateDoc(userStatsRef, {
      playlistsCreated: increment(1),
    });
  }

  async trackPlaylistPlay(playlistData) {
    const user = this.auth.currentUser;
    if (!user) return;

    logEvent(this.analytics, "playlist_play", {
      playlist_id: playlistData.id,
      playlist_name: playlistData.name,
      song_count: playlistData.songs.length,
    });

    const playlistStatsRef = doc(this.db, "playlistAnalytics", playlistData.id);
    await setDoc(
      playlistStatsRef,
      {
        playlistId: playlistData.id,
        name: playlistData.name,
        totalPlays: increment(1),
        lastPlayed: serverTimestamp(),
      },
      { merge: true }
    );
  }

  async trackSearch(searchQuery, resultsCount) {
    const user = this.auth.currentUser;
    if (!user) return;

    logEvent(this.analytics, "search", {
      search_term: searchQuery,
      results_count: resultsCount,
    });

    const searchStatsRef = doc(
      this.db,
      "searchAnalytics",
      `${Date.now()}_${user.uid}`
    );
    await setDoc(searchStatsRef, {
      userId: user.uid,
      query: searchQuery,
      resultsCount: resultsCount,
      timestamp: serverTimestamp(),
    });
  }

  async trackShare(songData, platform) {
    const user = this.auth.currentUser;
    if (!user) return;

    logEvent(this.analytics, "share", {
      content_type: "song",
      song_id: songData.id,
      platform: platform,
    });

    const userStatsRef = doc(this.db, "userAnalytics", user.uid);
    await updateDoc(userStatsRef, {
      totalShares: increment(1),
    });

    const songStatsRef = doc(this.db, "songAnalytics", songData.id);
    await updateDoc(songStatsRef, {
      shares: increment(1),
    });
  }

  // ==================== FEATURE USAGE ====================

  async trackRepeatMode(mode) {
    const user = this.auth.currentUser;
    if (!user) return;

    logEvent(this.analytics, "repeat_mode", {
      mode: mode, // 'off', 'one', 'all'
    });

    const userStatsRef = doc(this.db, "userAnalytics", user.uid);
    await updateDoc(userStatsRef, {
      [`repeatModeUsage.${mode}`]: increment(1),
    });
  }

  async trackShuffleToggle(enabled) {
    const user = this.auth.currentUser;
    if (!user) return;

    logEvent(this.analytics, "shuffle_toggle", {
      enabled: enabled,
    });

    const userStatsRef = doc(this.db, "userAnalytics", user.uid);
    await updateDoc(userStatsRef, {
      shuffleToggles: increment(1),
    });
  }

  async trackQualityChange(quality) {
    const user = this.auth.currentUser;
    if (!user) return;

    logEvent(this.analytics, "quality_change", {
      quality: quality, // 'low', 'medium', 'high'
    });

    const userStatsRef = doc(this.db, "userAnalytics", user.uid);
    await updateDoc(userStatsRef, {
      preferredQuality: quality,
    });
  }

  async trackDownload(songData) {
    const user = this.auth.currentUser;
    if (!user) return;

    logEvent(this.analytics, "song_download", {
      song_id: songData.id,
      song_name: songData.title,
    });

    const userStatsRef = doc(this.db, "userAnalytics", user.uid);
    await updateDoc(userStatsRef, {
      totalDownloads: increment(1),
      downloadedSongs: arrayUnion(songData.id),
    });

    const songStatsRef = doc(this.db, "songAnalytics", songData.id);
    await updateDoc(songStatsRef, {
      downloads: increment(1),
    });
  }

  // ==================== SESSION & TIME ====================

  async trackSessionEnd() {
    const user = this.auth.currentUser;
    if (!user) return;

    const sessionDuration = Date.now() - this.sessionStartTime;

    logEvent(this.analytics, "session_end", {
      duration: sessionDuration,
    });

    const userStatsRef = doc(this.db, "userAnalytics", user.uid);
    await updateDoc(userStatsRef, {
      totalSessions: increment(1),
      totalSessionTime: increment(sessionDuration),
      lastActive: serverTimestamp(),
    });
  }

  async trackPeakListeningTime() {
    const user = this.auth.currentUser;
    if (!user) return;

    const currentHour = new Date().getHours();

    const userStatsRef = doc(this.db, "userAnalytics", user.uid);
    await updateDoc(userStatsRef, {
      [`listeningByHour.hour${currentHour}`]: increment(1),
    });
  }

  // ==================== ERRORS & PERFORMANCE ====================

  async trackError(errorType, errorMessage) {
    const user = this.auth.currentUser;

    logEvent(this.analytics, "app_error", {
      error_type: errorType,
      error_message: errorMessage,
      user_id: user?.uid || "anonymous",
    });

    const errorRef = doc(
      this.db,
      "errors",
      `${Date.now()}_${user?.uid || "anon"}`
    );
    await setDoc(errorRef, {
      userId: user?.uid || null,
      errorType: errorType,
      errorMessage: errorMessage,
      timestamp: serverTimestamp(),
    });
  }

  async trackBuffering(bufferingTime) {
    logEvent(this.analytics, "buffering", {
      duration: bufferingTime,
      song_id: this.currentSong?.id,
    });
  }

  // ==================== INITIALIZE USER ====================

  async initializeUserAnalytics(userId) {
    const userStatsRef = doc(this.db, "userAnalytics", userId);
    await setDoc(
      userStatsRef,
      {
        userId: userId,
        createdAt: serverTimestamp(),
        totalSongsPlayed: 0,
        songsCompleted: 0,
        songsSkipped: 0,
        totalListeningTime: 0,
        totalLikes: 0,
        totalShares: 0,
        totalDownloads: 0,
        playlistsCreated: 0,
        totalSessions: 0,
        totalSessionTime: 0,
        genreCount: {},
        listeningByHour: {},
        repeatModeUsage: {},
        likedSongs: [],
        downloadedSongs: [],
        recentlyPlayed: [],
      },
      { merge: true }
    );
  }
}

// Initialize and export
const musicAnalytics = new MusicAppAnalytics();

export default musicAnalytics;
