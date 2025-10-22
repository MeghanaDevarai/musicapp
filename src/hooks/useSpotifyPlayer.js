import { useEffect, useState } from "react";

export default function useSpotifyPlayer(accessToken) {
  const [player, setPlayer] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!accessToken) return;

    // Inject Spotify SDK script if not loaded
    const existingScript = document.getElementById("spotify-player");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "spotify-player";
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      document.body.appendChild(script);
    }

    window.onSpotifyWebPlaybackSDKReady = () => {
      const playerInstance = new window.Spotify.Player({
        name: "MelodyMind Player",
        getOAuthToken: (cb) => cb(accessToken),
        volume: 0.5,
      });

      // Error listeners
      playerInstance.addListener("initialization_error", ({ message }) =>
        console.error("Init error:", message)
      );
      playerInstance.addListener("authentication_error", ({ message }) =>
        console.error("Auth error:", message)
      );
      playerInstance.addListener("account_error", ({ message }) =>
        console.error("Account error:", message)
      );
      playerInstance.addListener("playback_error", ({ message }) =>
        console.error("Playback error:", message)
      );

      // Player state
      playerInstance.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        setDeviceId(device_id);
        setIsReady(true);
      });

      playerInstance.addListener("not_ready", ({ device_id }) => {
        console.warn("Device ID has gone offline", device_id);
        setIsReady(false);
      });

      playerInstance.connect();
      setPlayer(playerInstance);
    };
  }, [accessToken]);

  return { player, deviceId, isReady };
}
