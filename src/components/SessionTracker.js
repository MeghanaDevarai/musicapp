import { useEffect, useRef } from 'react';
import { db, auth } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function SessionTracker() {
  const sessionStartTime = useRef(null);
  const sessionId = useRef(null);
  const saveIntervalRef = useRef(null);

  useEffect(() => {
    // Initialize session
    const initSession = async () => {
      const user = auth.currentUser;
      if (!user) return;

      sessionStartTime.current = new Date();
      sessionId.current = `${user.uid}_${Date.now()}`;

      console.log('Session started:', sessionId.current);
    };

    initSession();

    // Save session data every 30 seconds
    saveIntervalRef.current = setInterval(async () => {
      await saveSessionData();
    }, 30000);

    // Save on page visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        saveSessionData();
      }
    };

    // Save before page unload
    const handleBeforeUnload = async () => {
      await saveSessionData();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup
    return () => {
      if (saveIntervalRef.current) {
        clearInterval(saveIntervalRef.current);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      saveSessionData();
    };
  }, []);

  const saveSessionData = async () => {
    try {
      const user = auth.currentUser;
      if (!user || !sessionStartTime.current) return;

      const duration = Math.floor((new Date() - sessionStartTime.current) / 1000);

      // Only save if session is at least 10 seconds
      if (duration < 10) return;

      await addDoc(collection(db, 'sessions'), {
        userId: user.uid,
        sessionId: sessionId.current,
        startTime: sessionStartTime.current,
        duration: duration,
        lastUpdated: serverTimestamp(),
        page: window.location.pathname,
      });

      console.log(`Session saved: ${duration}s on ${window.location.pathname}`);
    } catch (error) {
      console.error('Error saving session:', error);
    }
  };

  // This component doesn't render anything
  return null;
}