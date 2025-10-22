// src/hooks/useSpotifyApi.js
import { useEffect, useState } from "react";

export default function useSpotifyApi(accessToken, endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!accessToken) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (!res.ok) throw new Error("Spotify API error");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [accessToken, endpoint]);

  return { data, loading, error };
}
