// src/components/PlayerContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [library, setLibrary] = useState(() => {
    try {
      const raw = localStorage.getItem("localLibrary");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("localLibrary", JSON.stringify(library));
    } catch (err) {
      console.warn("Failed to persist library:", err);
    }
  }, [library]);

  const addToLibrary = (item) => {
    // item: { id?, title, artist?, url, source, thumbnail? }
    setLibrary((prev) => {
      // avoid duplicates by URL
      if (prev.some((p) => p.url === item.url)) return prev;
      return [...prev, item];
    });
  };

  const removeFromLibrary = (urlOrId) => {
    setLibrary((prev) =>
      prev.filter((p) => p.url !== urlOrId && p.id !== urlOrId)
    );
  };

  return (
    <PlayerContext.Provider
      value={{ library, addToLibrary, removeFromLibrary }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
