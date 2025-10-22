import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  serverTimestamp,
  increment,
} from "firebase/firestore";

class UserSessionTracker {
  constructor() {
    this.auth = getAuth();
    this.db = getFirestore();
    this.sessionStartTime = null;
    this.activeStartTime = null;
    this.totalActiveTime = 0;
    this.isActive = false;
    this.currentSessionId = null;
    this.saveInterval = null;

    this.init();
  }

  init() {
    // Monitor auth state
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.startSession(user.uid);
      } else {
        this.endSession();
      }
    });

    // Monitor page visibility
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.handleInactive();
      } else {
        this.handleActive();
      }
    });

    // Save before page unload
    window.addEventListener("beforeunload", () => {
      this.saveSessionSync();
    });
  }

  async startSession(userId) {
    this.sessionStartTime = Date.now();
    this.activeStartTime = Date.now();
    this.isActive = true;
    this.currentSessionId = `${userId}_${Date.now()}`;

    // Create new session document
    const sessionRef = doc(this.db, "sessions", this.currentSessionId);
    await setDoc(sessionRef, {
      userId: userId,
      sessionStart: serverTimestamp(),
      sessionEnd: null,
      totalDuration: 0,
      activeTime: 0,
      isActive: true,
    });

    // Update user stats
    const userStatsRef = doc(this.db, "userStats", userId);
    const userStats = await getDoc(userStatsRef);

    if (!userStats.exists()) {
      await setDoc(userStatsRef, {
        totalSessions: 1,
        totalTimeSpent: 0,
        totalActiveTime: 0,
        firstLogin: serverTimestamp(),
        lastLogin: serverTimestamp(),
      });
    } else {
      await updateDoc(userStatsRef, {
        totalSessions: increment(1),
        lastLogin: serverTimestamp(),
      });
    }

    // Start periodic saves
    this.saveInterval = setInterval(() => {
      this.saveSession();
    }, 60000); // Save every minute
  }

  async endSession() {
    if (!this.currentSessionId) return;

    clearInterval(this.saveInterval);

    // Calculate final times
    if (this.isActive) {
      this.totalActiveTime += Date.now() - this.activeStartTime;
    }

    const totalDuration = Date.now() - this.sessionStartTime;
    const user = this.auth.currentUser;

    if (user) {
      // Update session document
      const sessionRef = doc(this.db, "sessions", this.currentSessionId);
      await updateDoc(sessionRef, {
        sessionEnd: serverTimestamp(),
        totalDuration: totalDuration,
        activeTime: this.totalActiveTime,
        isActive: false,
      });

      // Update user stats
      const userStatsRef = doc(this.db, "userStats", user.uid);
      await updateDoc(userStatsRef, {
        totalTimeSpent: increment(totalDuration),
        totalActiveTime: increment(this.totalActiveTime),
      });
    }

    // Reset
    this.sessionStartTime = null;
    this.activeStartTime = null;
    this.totalActiveTime = 0;
    this.isActive = false;
    this.currentSessionId = null;
  }

  handleActive() {
    if (!this.isActive && this.sessionStartTime) {
      this.isActive = true;
      this.activeStartTime = Date.now();
    }
  }

  handleInactive() {
    if (this.isActive && this.activeStartTime) {
      this.totalActiveTime += Date.now() - this.activeStartTime;
      this.isActive = false;
    }
  }

  async saveSession() {
    if (!this.currentSessionId || !this.auth.currentUser) return;

    // Calculate current times
    let currentActiveTime = this.totalActiveTime;
    if (this.isActive && this.activeStartTime) {
      currentActiveTime += Date.now() - this.activeStartTime;
    }

    const currentTotalDuration = Date.now() - this.sessionStartTime;

    // Update session
    const sessionRef = doc(this.db, "sessions", this.currentSessionId);
    await updateDoc(sessionRef, {
      totalDuration: currentTotalDuration,
      activeTime: currentActiveTime,
      lastUpdated: serverTimestamp(),
    });
  }

  saveSessionSync() {
    // Synchronous save for beforeunload event
    if (!this.currentSessionId || !this.auth.currentUser) return;

    let currentActiveTime = this.totalActiveTime;
    if (this.isActive && this.activeStartTime) {
      currentActiveTime += Date.now() - this.activeStartTime;
    }

    const currentTotalDuration = Date.now() - this.sessionStartTime;

    // Use sendBeacon for reliable delivery
    const data = JSON.stringify({
      fields: {
        totalDuration: { integerValue: currentTotalDuration.toString() },
        activeTime: { integerValue: currentActiveTime.toString() },
        sessionEnd: { timestampValue: new Date().toISOString() },
      },
    });

    navigator.sendBeacon(
      `https://firestore.googleapis.com/v1/projects/YOUR_PROJECT_ID/databases/(default)/documents/sessions/${this.currentSessionId}?updateMask.fieldPaths=totalDuration&updateMask.fieldPaths=activeTime&updateMask.fieldPaths=sessionEnd`,
      data
    );
  }

  async logout() {
    await this.endSession();
    await signOut(this.auth);
  }

  // Get user statistics
  async getUserStats(userId) {
    const userStatsRef = doc(this.db, "userStats", userId);
    const stats = await getDoc(userStatsRef);
    return stats.exists() ? stats.data() : null;
  }
}

// Initialize tracker
const sessionTracker = new UserSessionTracker();

// Use this for logout
async function handleLogout() {
  await sessionTracker.logout();
}

export { sessionTracker, handleLogout };
