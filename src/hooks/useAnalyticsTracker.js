// client/src/hooks/useAnalyticsTracker.js
import { useEffect, useRef } from 'react';
import { db, auth } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function useAnalyticsTracker() {
  const sessionStartTime = useRef(null);
  const currentTrack = useRef(null);
  const trackStartTime = useRef(null);

  // Initialize session tracking
  useEffect(() => {
    sessionStartTime.current = new Date();

    // Track session end on page unload
    const handleUnload = () => {
      if (sessionStartTime.current) {
        const sessionDuration = Math.floor((new Date() - sessionStartTime.current) / 1000);
        // Store session duration in localStorage as backup
        localStorage.setItem('lastSessionDuration', sessionDuration);
      }
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, []);

  // Track song play event
  const trackSongPlay = async (songData) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      // Stop previous track if exists
      if (currentTrack.current && trackStartTime.current) {
        await stopTrackingCurrentSong();
      }

      // Start tracking new song
      currentTrack.current = songData;
      trackStartTime.current = new Date();

      console.log('Started tracking:', songData.title);
    } catch (error) {
      console.error('Error starting track:', error);
    }
  };

  // Stop tracking current song and save to Firestore
  const stopTrackingCurrentSong = async () => {
    try {
      const user = auth.currentUser;
      if (!user || !currentTrack.current || !trackStartTime.current) return;

      const duration = Math.floor((new Date() - trackStartTime.current) / 1000);

      // Only save if listened for at least 5 seconds
      if (duration >= 5) {
        await addDoc(collection(db, 'analytics'), {
          userId: user.uid,
          songTitle: currentTrack.current.title || 'Unknown',
          artist: currentTrack.current.artist || 'Unknown Artist',
          genre: currentTrack.current.genre || 'Unknown',
          album: currentTrack.current.album || 'Unknown Album',
          duration: duration,
          playedAt: serverTimestamp(),
          moodDuringListening: currentTrack.current.mood || 'Neutral',
          sessionId: sessionStartTime.current?.toISOString() || new Date().toISOString(),
        });

        console.log(`Saved analytics: ${currentTrack.current.title} - ${duration}s`);
      }

      currentTrack.current = null;
      trackStartTime.current = null;
    } catch (error) {
      console.error('Error saving analytics:', error);
    }
  };

  // Track mood change
  const trackMoodChange = async (newMood) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      await addDoc(collection(db, 'moodHistory'), {
        userId: user.uid,
        mood: newMood,
        timestamp: serverTimestamp(),
      });

      // Update current track's mood if playing
      if (currentTrack.current) {
        currentTrack.current.mood = newMood;
      }

      console.log('Mood tracked:', newMood);
    } catch (error) {
      console.error('Error tracking mood:', error);
    }
  };

  // Get session duration
  const getSessionDuration = () => {
    if (!sessionStartTime.current) return 0;
    return Math.floor((new Date() - sessionStartTime.current) / 1000);
  };

  return {
    trackSongPlay,
    stopTrackingCurrentSong,
    trackMoodChange,
    getSessionDuration,
  };
}