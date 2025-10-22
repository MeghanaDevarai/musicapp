// // // // "use client";

// // // // import { useState, useRef, useEffect, useCallback } from "react";
// // // // import { Link, useLocation } from "react-router-dom";
// // // // import PlayerControls from "../components/player/PlayerControls";
// // // // import PlaylistSidebar from "../components/player/PlaylistSidebar";
// // // // import NowPlaying from "../components/player/NowPlaying";
// // // // import VoiceControl from "../components/player/VoiceControl";

// // // // export default function Player() {
// // // //   const location = useLocation();
// // // //   const incomingTrack = location.state?.track || null;
// // // //   const incomingPlaylist = location.state?.playlist || null;
// // // //   const removedSongsRef = useRef(new Set());
// // // //   // Get YouTube API key from environment variable
// // // //   const YT_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY || "";

// // // //   // const [songs, setSongs] = useState(() => {
// // // //   //   const saved = localStorage.getItem("melodymindSongs");
// // // //   //   if (!saved) return [];
// // // //   //   return JSON.parse(saved).map((song) => ({
// // // //   //     ...song,
// // // //   //     streamUrl: undefined,
// // // //   //   }));
// // // //   // });
// // // //   const [songs, setSongs] = useState(() => {
// // // //     const saved = localStorage.getItem("melodymindSongs");
// // // //     if (!saved) return [];
// // // //     const parsed = JSON.parse(saved);

// // // //     // Remove any songs that were previously deleted
// // // //     return parsed
// // // //       .filter((song) => !removedSongsRef.current.has(song.id))
// // // //       .map((song) => ({
// // // //         ...song,
// // // //         streamUrl: undefined,
// // // //       }));
// // // //   });
// // // //   const [playlist, setPlaylist] = useState([]);

// // // //   const [currentSong, setCurrentSong] = useState(null);
// // // //   const [isPlaying, setIsPlaying] = useState(false);
// // // //   const [currentTime, setCurrentTime] = useState(0);
// // // //   const [duration, setDuration] = useState(0);
// // // //   const [volume, setVolume] = useState(0.7);
// // // //   const [isShuffled, setIsShuffled] = useState(false);
// // // //   const [repeatMode, setRepeatMode] = useState("none");
// // // //   const [showVoiceControl, setShowVoiceControl] = useState(false);
// // // //   const [isLoadingYoutube, setIsLoadingYoutube] = useState(false);
// // // //   const [loadingError, setLoadingError] = useState(null);
// // // //   const [userInteracted, setUserInteracted] = useState(false);

// // // //   // Refs for both audio types
// // // //   const audioRef = useRef(null); // For local files
// // // //   const youtubePlayerRef = useRef(null); // For YouTube
// // // //   const ytIntervalRef = useRef(null); // For YouTube time tracking

// // // //   const currentIndex = songs.findIndex((s) => s.id === currentSong?.id);
// // // //   const isFetchingRef = useRef(false);
// // // //   const processedTracksRef = useRef(new Set());
// // // //   useEffect(() => {
// // // //     if (!incomingTrack?.id) return;

// // // //     if (processedTracksRef.current.has(incomingTrack.id)) return;

// // // //     processedTracksRef.current.add(incomingTrack.id);

// // // //     const normalized = {
// // // //       id: incomingTrack.id,
// // // //       title: incomingTrack.name || incomingTrack.title,
// // // //       artist:
// // // //         incomingTrack.artists?.map((a) => a.name).join(", ") ||
// // // //         incomingTrack.artist ||
// // // //         "Unknown Artist",
// // // //       album: incomingTrack.album?.name || "Unknown Album",
// // // //       source: "youtube",
// // // //     };

// // // //     // Ignore if song was removed
// // // //     if (removedSongsRef.current.has(normalized.id)) return;

// // // //     if (incomingPlaylist && Array.isArray(incomingPlaylist)) {
// // // //       const normalizedPlaylist = incomingPlaylist
// // // //         .map((track) => ({
// // // //           id: track.id,
// // // //           title: track.name || track.title,
// // // //           artist:
// // // //             track.artists?.map((a) => a.name).join(", ") ||
// // // //             track.artist ||
// // // //             "Unknown Artist",
// // // //           album: track.album?.name || "Unknown Album",
// // // //           source: "youtube",
// // // //         }))
// // // //         .filter((track) => !removedSongsRef.current.has(track.id)); // filter removed songs

// // // //       setSongs((prev) => {
// // // //         const existingIds = new Set(prev.map((s) => s.id));
// // // //         const newSongs = normalizedPlaylist.filter(
// // // //           (s) => !existingIds.has(s.id)
// // // //         );
// // // //         console.log("✅ Added", newSongs.length, "new songs to playlist");
// // // //         return [...prev, ...newSongs];
// // // //       });
// // // //     } else {
// // // //       setSongs((prev) => {
// // // //         const exists = prev.find((s) => s.id === normalized.id);
// // // //         if (exists) return prev;
// // // //         return [...prev, normalized];
// // // //       });
// // // //     }

// // // //     selectSong(normalized);
// // // //   }, [incomingTrack?.id, incomingPlaylist]);

// // // //   // Check if API key is configured
// // // //   useEffect(() => {
// // // //     if (!YT_API_KEY) {
// // // //       console.warn(
// // // //         "⚠️ YouTube API key not configured. Please add REACT_APP_YOUTUBE_API_KEY to your .env file"
// // // //       );
// // // //     } else {
// // // //       console.log("✅ YouTube API key configured");
// // // //     }
// // // //   }, [YT_API_KEY]);
// // // //   const removeSong = (id) => {
// // // //     removedSongsRef.current.add(id); // track removed songs

// // // //     setSongs((prev) => {
// // // //       const updated = prev.filter((song) => song.id !== id);

// // // //       // update localStorage
// // // //       localStorage.setItem(
// // // //         "melodymindSongs",
// // // //         JSON.stringify(
// // // //           updated.map((s) => ({
// // // //             id: s.id,
// // // //             title: s.title,
// // // //             artist: s.artist,
// // // //             album: s.album,
// // // //             source: s.source,
// // // //           }))
// // // //         )
// // // //       );

// // // //       return updated;
// // // //     });
// // // //     localStorage.removeItem("removedSongIds");

// // // //     // stop playback if removed song was current
// // // //     if (currentSong?.id === id) {
// // // //       setCurrentSong(null);
// // // //       setIsPlaying(false);

// // // //       if (audioRef.current) {
// // // //         audioRef.current.pause();
// // // //         audioRef.current.src = "";
// // // //       }

// // // //       if (youtubePlayerRef.current?.stopVideo) {
// // // //         youtubePlayerRef.current.stopVideo();
// // // //       }

// // // //       setCurrentTime(0);
// // // //       setDuration(0);
// // // //     }

// // // //     console.log(`🗑️ Removed song: ${id}`);
// // // //   };

// // // //   // Save songs to localStorage
// // // //   useEffect(() => {
// // // //     const songsToSave = songs.map((song) => ({
// // // //       id: song.id,
// // // //       title: song.title,
// // // //       artist: song.artist,
// // // //       album: song.album,
// // // //       source: song.source,
// // // //     }));
// // // //     localStorage.setItem("melodymindSongs", JSON.stringify(songsToSave));
// // // //   }, [songs]);
// // // //   const [playerReady, setPlayerReady] = useState(false);

// // // //   // Initialize YouTube IFrame API
// // // //   // useEffect(() => {
// // // //   //   if (window.YT) return; // Already loaded

// // // //   //   const tag = document.createElement("script");
// // // //   //   tag.src = "https://www.youtube.com/iframe_api";
// // // //   //   const firstScriptTag = document.getElementsByTagName("script")[0];
// // // //   //   firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// // // //   //   window.onYouTubeIframeAPIReady = () => {
// // // //   //     console.log("✅ YouTube IFrame API loaded");
// // // //   //     const player = new window.YT.Player("youtube-player", {
// // // //   //       height: "0",
// // // //   //       width: "0",
// // // //   //       playerVars: {
// // // //   //         autoplay: 0,
// // // //   //         controls: 0,
// // // //   //       },
// // // //   //       events: {
// // // //   //         // onReady: (event) => {
// // // //   //         //   console.log("✅ YouTube player ready");
// // // //   //         //   youtubePlayerRef.current = event.target;
// // // //   //         // },
// // // //   //         onReady: (event) => {
// // // //   //           console.log("✅ YouTube player ready");
// // // //   //           youtubePlayerRef.current = event.target;
// // // //   //           setPlayerReady(true);
// // // //   //         },

// // // //   //         onStateChange: (event) => {
// // // //   //           if (event.data === window.YT.PlayerState.PLAYING) {
// // // //   //             setIsPlaying(true);
// // // //   //             startYouTubeTimeTracking();
// // // //   //           } else if (event.data === window.YT.PlayerState.PAUSED) {
// // // //   //             setIsPlaying(false);
// // // //   //             stopYouTubeTimeTracking();
// // // //   //           } else if (event.data === window.YT.PlayerState.ENDED) {
// // // //   //             console.log("🎵 YouTube song ended");
// // // //   //             setIsPlaying(false);
// // // //   //             stopYouTubeTimeTracking();
// // // //   //             handleSongEnd();
// // // //   //           }
// // // //   //         },
// // // //   //         onError: (event) => {
// // // //   //           console.error("❌ YouTube player error:", event.data);
// // // //   //           let errorMsg = "YouTube playback error";
// // // //   //           switch (event.data) {
// // // //   //             case 2:
// // // //   //               errorMsg = "Invalid video ID";
// // // //   //               break;
// // // //   //             case 5:
// // // //   //               errorMsg = "HTML5 player error";
// // // //   //               break;
// // // //   //             case 100:
// // // //   //               errorMsg = "Video not found";
// // // //   //               break;
// // // //   //             case 101:
// // // //   //             case 150:
// // // //   //               errorMsg = "Video not available or restricted";
// // // //   //               break;
// // // //   //           }
// // // //   //           setLoadingError(errorMsg);
// // // //   //           setIsPlaying(false);
// // // //   //         },
// // // //   //       },
// // // //   //     });
// // // //   //   };
// // // //   // }, []);
// // // //   // Initialize YouTube IFrame API safely
// // // //   useEffect(() => {
// // // //     const createPlayer = () => {
// // // //       console.log("🎬 Creating YouTube player...");
// // // //       const player = new window.YT.Player("youtube-player", {
// // // //         height: "0",
// // // //         width: "0",
// // // //         playerVars: { autoplay: 0, controls: 0 },
// // // //         events: {
// // // //           onReady: (event) => {
// // // //             youtubePlayerRef.current = event.target;
// // // //             console.log("✅ YouTube player ready");
// // // //             setPlayerReady(true);
// // // //           },
// // // //           onStateChange: (event) => {
// // // //             if (event.data === window.YT.PlayerState.PLAYING) {
// // // //               setIsPlaying(true);
// // // //               startYouTubeTimeTracking();
// // // //             } else if (event.data === window.YT.PlayerState.PAUSED) {
// // // //               setIsPlaying(false);
// // // //               stopYouTubeTimeTracking();
// // // //             } else if (event.data === window.YT.PlayerState.ENDED) {
// // // //               console.log("🎵 YouTube song ended");
// // // //               setIsPlaying(false);
// // // //               stopYouTubeTimeTracking();
// // // //               handleSongEnd();
// // // //             }
// // // //           },
// // // //           onError: (event) => {
// // // //             console.error("❌ YouTube player error:", event.data);
// // // //             setLoadingError("YouTube playback error");
// // // //             setIsPlaying(false);
// // // //           },
// // // //         },
// // // //       });
// // // //     };

// // // //     // Check if YT API is already loaded
// // // //     if (window.YT && window.YT.Player) {
// // // //       createPlayer();
// // // //     } else {
// // // //       // Load script if not present
// // // //       const tag = document.createElement("script");
// // // //       tag.src = "https://www.youtube.com/iframe_api";
// // // //       document.body.appendChild(tag);

// // // //       window.onYouTubeIframeAPIReady = () => {
// // // //         console.log("✅ YouTube IFrame API loaded");
// // // //         createPlayer();
// // // //       };
// // // //     }
// // // //   }, []);

// // // //   // YouTube time tracking
// // // //   const startYouTubeTimeTracking = () => {
// // // //     stopYouTubeTimeTracking();
// // // //     ytIntervalRef.current = setInterval(() => {
// // // //       if (youtubePlayerRef.current?.getCurrentTime) {
// // // //         const current = youtubePlayerRef.current.getCurrentTime();
// // // //         const dur = youtubePlayerRef.current.getDuration();
// // // //         setCurrentTime(current);
// // // //         if (duration !== dur) setDuration(dur);
// // // //       }
// // // //     }, 100);
// // // //   };

// // // //   const stopYouTubeTimeTracking = () => {
// // // //     if (ytIntervalRef.current) {
// // // //       clearInterval(ytIntervalRef.current);
// // // //       ytIntervalRef.current = null;
// // // //     }
// // // //   };

// // // //   // Search YouTube for a song
// // // //   const searchYoutube = async (query) => {
// // // //     try {
// // // //       if (!YT_API_KEY) {
// // // //         throw new Error(
// // // //           "YouTube API key not configured. Add REACT_APP_YOUTUBE_API_KEY to .env file"
// // // //         );
// // // //       }

// // // //       console.log("🔍 Searching YouTube for:", query);

// // // //       const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(
// // // //         query
// // // //       )}&key=${YT_API_KEY}`;

// // // //       const response = await fetch(url);
// // // //       const data = await response.json();

// // // //       if (data.error) {
// // // //         console.error("❌ YouTube API error:", data.error);
// // // //         throw new Error(data.error.message || "YouTube API error");
// // // //       }

// // // //       if (data.items && data.items.length > 0) {
// // // //         const video = data.items[0];
// // // //         console.log("✅ Found:", video.snippet.title);
// // // //         return {
// // // //           videoId: video.id.videoId,
// // // //           title: video.snippet.title,
// // // //           thumbnail: video.snippet.thumbnails.default.url,
// // // //         };
// // // //       }

// // // //       console.warn("⚠️ No results found for:", query);
// // // //       return null;
// // // //     } catch (error) {
// // // //       console.error("❌ YouTube search error:", error);
// // // //       throw error;
// // // //     }
// // // //   };

// // // //   // Play a specific song
// // // //   const selectSong = async (song) => {
// // // //     try {
// // // //       setUserInteracted(true);
// // // //       setLoadingError(null);
// // // //       setIsPlaying(false);
// // // //       setCurrentTime(0);
// // // //       setDuration(0);

// // // //       console.log("🎵 Selecting song:", song.title, "Source:", song.source);

// // // //       // CASE 1: Local file
// // // //       if (song.source === "local" && song.streamUrl) {
// // // //         console.log("📁 Playing local file");
// // // //         stopYouTubeTimeTracking();
// // // //         if (youtubePlayerRef.current?.stopVideo) {
// // // //           youtubePlayerRef.current.stopVideo();
// // // //         }
// // // //         setCurrentSong(song);
// // // //         setTimeout(() => setIsPlaying(true), 100);
// // // //         return;
// // // //       }

// // // //       // CASE 2: YouTube song
// // // //       setIsLoadingYoutube(true);
// // // //       const query = `${song.title} ${song.artist}`;

// // // //       const result = await searchYoutube(query);

// // // //       if (!result) {
// // // //         throw new Error("No YouTube video found");
// // // //       }

// // // //       // Stop audio element if playing
// // // //       if (audioRef.current) {
// // // //         audioRef.current.pause();
// // // //         audioRef.current.src = "";
// // // //       }

// // // //       const updatedSong = {
// // // //         ...song,
// // // //         youtubeId: result.videoId,
// // // //         youtubeThumbnail: result.thumbnail,
// // // //         source: "youtube",
// // // //       };

// // // //       setCurrentSong(updatedSong);

// // // //       // Load and play YouTube video
// // // //       // if (youtubePlayerRef.current?.loadVideoById) {
// // // //       //   youtubePlayerRef.current.loadVideoById(result.videoId);
// // // //       //   setTimeout(() => {
// // // //       //     if (youtubePlayerRef.current?.playVideo) {
// // // //       //       youtubePlayerRef.current.playVideo();
// // // //       //     }
// // // //       //   }, 500);
// // // //       // } else {
// // // //       //   console.warn("⚠️ YouTube player not ready yet");
// // // //       //   setLoadingError("YouTube player not ready. Please wait and try again.");
// // // //       // }
// // // //       const tryPlayVideo = (retries = 5) => {
// // // //         if (youtubePlayerRef.current && playerReady) {
// // // //           youtubePlayerRef.current.loadVideoById(result.videoId);
// // // //           youtubePlayerRef.current.playVideo();
// // // //         } else if (retries > 0) {
// // // //           console.warn(
// // // //             `⚠️ YouTube player not ready yet — retrying (${retries})`
// // // //           );
// // // //           setTimeout(() => tryPlayVideo(retries - 1), 500);
// // // //         } else {
// // // //           setLoadingError("YouTube player failed to initialize. Please retry.");
// // // //         }
// // // //       };

// // // //       tryPlayVideo();

// // // //       setIsLoadingYoutube(false);
// // // //     } catch (err) {
// // // //       console.error("❌ Select song error:", err);
// // // //       setLoadingError(err.message);
// // // //       setIsPlaying(false);
// // // //       setIsLoadingYoutube(false);
// // // //     }
// // // //   };

// // // //   // Handle song end (for repeat/next)
// // // //   const handleSongEnd = () => {
// // // //     if (repeatMode === "one") {
// // // //       if (currentSong?.source === "youtube" && youtubePlayerRef.current) {
// // // //         youtubePlayerRef.current.seekTo(0);
// // // //         youtubePlayerRef.current.playVideo();
// // // //       } else if (audioRef.current) {
// // // //         audioRef.current.currentTime = 0;
// // // //         audioRef.current.play();
// // // //       }
// // // //     } else if (repeatMode === "all") {
// // // //       playNext();
// // // //     }
// // // //   };

// // // //   // Navigation
// // // //   const playNext = useCallback(() => {
// // // //     if (!songs.length) return;
// // // //     const nextIndex = isShuffled
// // // //       ? Math.floor(Math.random() * songs.length)
// // // //       : (currentIndex + 1) % songs.length;
// // // //     selectSong(songs[nextIndex]);
// // // //   }, [songs, currentIndex, isShuffled]);

// // // //   const playPrevious = useCallback(() => {
// // // //     if (!songs.length) return;
// // // //     const prevIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
// // // //     selectSong(songs[prevIndex]);
// // // //   }, [songs, currentIndex]);

// // // //   // Handle incoming tracks
// // // //   useEffect(() => {
// // // //     if (!incomingTrack || !incomingTrack.id) return;

// // // //     if (processedTracksRef.current.has(incomingTrack.id)) {
// // // //       console.log("⏭️ Track already processed");
// // // //       return;
// // // //     }

// // // //     processedTracksRef.current.add(incomingTrack.id);

// // // //     const normalized = {
// // // //       id: incomingTrack.id,
// // // //       title: incomingTrack.name || incomingTrack.title,
// // // //       artist:
// // // //         incomingTrack.artists?.map?.((a) => a.name).join(", ") ||
// // // //         incomingTrack.artist ||
// // // //         "Unknown Artist",
// // // //       album: incomingTrack.album?.name || "Unknown Album",
// // // //       source: "youtube",
// // // //     };

// // // //     console.log("📥 Incoming track:", normalized);

// // // //     if (incomingPlaylist && Array.isArray(incomingPlaylist)) {
// // // //       const normalizedPlaylist = incomingPlaylist.map((track) => ({
// // // //         id: track.id,
// // // //         title: track.name || track.title,
// // // //         artist:
// // // //           track.artists?.map?.((a) => a.name).join(", ") ||
// // // //           track.artist ||
// // // //           "Unknown Artist",
// // // //         album: track.album?.name || "Unknown Album",
// // // //         source: "youtube",
// // // //       }));

// // // //       setSongs((prev) => {
// // // //         const existingIds = new Set(prev.map((s) => s.id));
// // // //         const newSongs = normalizedPlaylist.filter(
// // // //           (s) => !existingIds.has(s.id)
// // // //         );
// // // //         console.log("✅ Added", newSongs.length, "new songs to playlist");
// // // //         return [...prev, ...newSongs];
// // // //       });
// // // //     } else {
// // // //       setSongs((prev) => {
// // // //         const exists = prev.find((s) => s.id === normalized.id);
// // // //         if (exists) return prev;
// // // //         return [...prev, normalized];
// // // //       });
// // // //     }

// // // //     selectSong(normalized);
// // // //   }, [incomingTrack?.id, incomingPlaylist]);

// // // //   // Audio element handlers (for local files)
// // // //   useEffect(() => {
// // // //     const audio = audioRef.current;
// // // //     if (!audio) return;

// // // //     const onTime = () => setCurrentTime(audio.currentTime);
// // // //     const onLoaded = () => setDuration(audio.duration || 0);
// // // //     const onEnded = () => handleSongEnd();
// // // //     const onError = () => {
// // // //       setLoadingError("Audio playback error");
// // // //       setIsPlaying(false);
// // // //     };

// // // //     audio.addEventListener("timeupdate", onTime);
// // // //     audio.addEventListener("loadedmetadata", onLoaded);
// // // //     audio.addEventListener("ended", onEnded);
// // // //     audio.addEventListener("error", onError);

// // // //     return () => {
// // // //       audio.removeEventListener("timeupdate", onTime);
// // // //       audio.removeEventListener("loadedmetadata", onLoaded);
// // // //       audio.removeEventListener("ended", onEnded);
// // // //       audio.removeEventListener("error", onError);
// // // //     };
// // // //   }, [repeatMode]);

// // // //   // Play/Pause control
// // // //   useEffect(() => {
// // // //     if (!currentSong || !userInteracted) return;

// // // //     if (currentSong.source === "local") {
// // // //       const audio = audioRef.current;
// // // //       if (!audio || !audio.src) return;

// // // //       if (isPlaying) {
// // // //         audio.play().catch((err) => {
// // // //           console.error("❌ Playback failed:", err);
// // // //           setLoadingError("Playback failed");
// // // //           setIsPlaying(false);
// // // //         });
// // // //       } else {
// // // //         audio.pause();
// // // //       }
// // // //     } else if (currentSong.source === "youtube") {
// // // //       if (!youtubePlayerRef.current) return;

// // // //       if (isPlaying) {
// // // //         youtubePlayerRef.current.playVideo();
// // // //       } else {
// // // //         youtubePlayerRef.current.pauseVideo();
// // // //       }
// // // //     }
// // // //   }, [isPlaying, currentSong, userInteracted]);

// // // //   // Volume control
// // // //   useEffect(() => {
// // // //     if (audioRef.current) {
// // // //       audioRef.current.volume = volume;
// // // //     }
// // // //     if (youtubePlayerRef.current?.setVolume) {
// // // //       youtubePlayerRef.current.setVolume(volume * 100);
// // // //     }
// // // //   }, [volume]);

// // // //   // Seek control
// // // //   const handleSeek = (newTime) => {
// // // //     setCurrentTime(newTime);
// // // //     if (currentSong?.source === "local" && audioRef.current) {
// // // //       audioRef.current.currentTime = newTime;
// // // //     } else if (currentSong?.source === "youtube" && youtubePlayerRef.current) {
// // // //       youtubePlayerRef.current.seekTo(newTime);
// // // //     }
// // // //   };

// // // //   // File upload
// // // //   const handleFileUpload = (e) => {
// // // //     const files = Array.from(e.target.files);
// // // //     const newSongs = files.map((file, idx) => ({
// // // //       id: `local-${Date.now()}-${idx}`,
// // // //       title: file.name.replace(/\.[^/.]+$/, ""),
// // // //       artist: "Local File",
// // // //       album: "Device",
// // // //       streamUrl: URL.createObjectURL(file),
// // // //       source: "local",
// // // //     }));
// // // //     setSongs((prev) => [...prev, ...newSongs]);
// // // //     console.log("📁 Added", newSongs.length, "local files");
// // // //   };

// // // //   const retryLoad = () => {
// // // //     if (currentSong) {
// // // //       processedTracksRef.current.delete(currentSong.id);
// // // //       selectSong({ ...currentSong });
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
// // // //       <header className="bg-black/30 backdrop-blur-sm border-b border-white/10 px-6 py-4 flex justify-between items-center">
// // // //         <Link to="/" className="font-['Pacifico'] text-2xl text-white">
// // // //           MelodyMind
// // // //         </Link>
// // // //         <div className="flex gap-4 items-center">
// // // //           <button
// // // //             onClick={() => setShowVoiceControl(!showVoiceControl)}
// // // //             className={`p-3 rounded-full transition-all ${
// // // //               showVoiceControl
// // // //                 ? "bg-purple-600 text-white"
// // // //                 : "bg-white/10 text-purple-300 hover:bg-purple-600 hover:text-white"
// // // //             }`}
// // // //           >
// // // //             🎤
// // // //           </button>

// // // //           <label
// // // //             htmlFor="audio-upload"
// // // //             className="cursor-pointer bg-white/10 text-purple-300 hover:bg-purple-600 hover:text-white px-4 py-2 rounded-full"
// // // //           >
// // // //             ⬆ Upload
// // // //           </label>

// // // //           <Link
// // // //             to="/MoodDetection"
// // // //             className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-full font-semibold transition-all"
// // // //           >
// // // //             Mood Detection
// // // //           </Link>
// // // //         </div>
// // // //       </header>

// // // //       <div className="flex flex-1">
// // // //         <PlaylistSidebar
// // // //           songs={songs}
// // // //           currentSong={currentSong}
// // // //           onSongSelect={selectSong}
// // // //           onRemoveSong={removeSong}
// // // //         />

// // // //         <div className="flex-1 flex flex-col">
// // // //           {showVoiceControl && (
// // // //             <VoiceControl
// // // //               playMusic={() => {
// // // //                 setUserInteracted(true);
// // // //                 setIsPlaying(true);
// // // //               }}
// // // //               pauseMusic={() => setIsPlaying(false)}
// // // //               nextSong={playNext}
// // // //               prevSong={playPrevious}
// // // //               increaseVolume={() =>
// // // //                 setVolume((v) => Math.min(1, +(v + 0.1).toFixed(1)))
// // // //               }
// // // //               decreaseVolume={() =>
// // // //                 setVolume((v) => Math.max(0, +(v - 0.1).toFixed(1)))
// // // //               }
// // // //               toggleShuffle={(val) => setIsShuffled(val)}
// // // //             />
// // // //           )}

// // // //           <div className="flex-1 flex items-center justify-center p-8">
// // // //             {!YT_API_KEY ? (
// // // //               <div className="text-center text-yellow-400 max-w-md">
// // // //                 <div className="text-4xl mb-4">⚠️</div>
// // // //                 <p className="text-lg mb-2">YouTube API Key Required</p>
// // // //                 <p className="text-sm mb-4">
// // // //                   Please add REACT_APP_YOUTUBE_API_KEY to your .env file
// // // //                 </p>
// // // //                 <div className="bg-black/30 p-4 rounded-lg text-left text-xs">
// // // //                   <p className="mb-2">
// // // //                     1. Get API key from Google Cloud Console
// // // //                   </p>
// // // //                   <p className="mb-2">2. Create .env file in project root</p>
// // // //                   <p>3. Add: REACT_APP_YOUTUBE_API_KEY=your_key_here</p>
// // // //                 </div>
// // // //               </div>
// // // //             ) : isLoadingYoutube ? (
// // // //               <div className="text-center text-white">
// // // //                 <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
// // // //                 <p className="text-lg">Finding on YouTube...</p>
// // // //                 <p className="text-sm text-gray-400 mt-2">
// // // //                   {currentSong?.title || "Loading"}
// // // //                 </p>
// // // //               </div>
// // // //             ) : loadingError ? (
// // // //               <div className="text-center text-red-400 max-w-md">
// // // //                 <div className="text-4xl mb-4">⚠️</div>
// // // //                 <p className="text-lg mb-2">Playback Error</p>
// // // //                 <p className="text-sm mb-4">{loadingError}</p>
// // // //                 <button
// // // //                   onClick={retryLoad}
// // // //                   className="bg-purple-600 px-6 py-2 rounded-full text-white hover:bg-purple-700 transition"
// // // //                 >
// // // //                   🔄 Retry
// // // //                 </button>
// // // //               </div>
// // // //             ) : currentSong ? (
// // // //               <NowPlaying currentSong={currentSong} />
// // // //             ) : (
// // // //               <div className="text-center text-gray-400">
// // // //                 <div className="text-6xl mb-4">🎵</div>
// // // //                 <p className="text-lg">No song selected</p>
// // // //                 <p className="text-sm mt-2">
// // // //                   Upload local files or detect your mood
// // // //                 </p>
// // // //               </div>
// // // //             )}
// // // //           </div>

// // // //           <PlayerControls
// // // //             currentSong={currentSong}
// // // //             isPlaying={isPlaying}
// // // //             setIsPlaying={(playing) => {
// // // //               setUserInteracted(true);
// // // //               setIsPlaying(playing);
// // // //             }}
// // // //             currentTime={currentTime}
// // // //             setCurrentTime={handleSeek}
// // // //             duration={duration}
// // // //             volume={volume}
// // // //             setVolume={setVolume}
// // // //             isShuffled={isShuffled}
// // // //             setIsShuffled={setIsShuffled}
// // // //             repeatMode={repeatMode}
// // // //             setRepeatMode={setRepeatMode}
// // // //             onNext={playNext}
// // // //             onPrevious={playPrevious}
// // // //           />
// // // //         </div>
// // // //       </div>

// // // //       {/* Hidden YouTube Player */}
// // // //       <div id="youtube-player" style={{ display: "none" }}></div>

// // // //       {/* Audio Element for Local Files */}
// // // //       {currentSong?.source === "local" && currentSong?.streamUrl && (
// // // //         <audio ref={audioRef} src={currentSong.streamUrl} preload="auto" />
// // // //       )}

// // // //       {/* File Upload Input */}
// // // //       <input
// // // //         type="file"
// // // //         id="audio-upload"
// // // //         multiple
// // // //         accept="audio/*"
// // // //         onChange={handleFileUpload}
// // // //         className="hidden"
// // // //       />
// // // //     </div>
// // // //   );
// // // // }
// // // // // "use client";

// // // // // import { useState, useRef, useEffect, useCallback } from "react";
// // // // // import { Link, useLocation } from "react-router-dom";
// // // // // import PlayerControls from "../components/player/PlayerControls";
// // // // // import PlaylistSidebar from "../components/player/PlaylistSidebar";
// // // // // import NowPlaying from "../components/player/NowPlaying";
// // // // // import VoiceControl from "../components/player/VoiceControl";

// // // // // export default function Player() {
// // // // //   const location = useLocation();
// // // // //   const incomingTrack = location.state?.track || null;
// // // // //   const incomingPlaylist = location.state?.playlist || null;

// // // // //   // Get YouTube API key from environment variable
// // // // //   const YT_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY || "";

// // // // //   const [songs, setSongs] = useState(() => {
// // // // //     const saved = localStorage.getItem("melodymindSongs");
// // // // //     if (!saved) return [];
// // // // //     return JSON.parse(saved).map((song) => ({
// // // // //       ...song,
// // // // //       streamUrl: undefined,
// // // // //     }));
// // // // //   });

// // // // //   const [currentSong, setCurrentSong] = useState(null);
// // // // //   const [isPlaying, setIsPlaying] = useState(false);
// // // // //   const [currentTime, setCurrentTime] = useState(0);
// // // // //   const [duration, setDuration] = useState(0);
// // // // //   const [volume, setVolume] = useState(0.7);
// // // // //   const [isShuffled, setIsShuffled] = useState(false);
// // // // //   const [repeatMode, setRepeatMode] = useState("none");
// // // // //   const [showVoiceControl, setShowVoiceControl] = useState(false);
// // // // //   const [isLoadingYoutube, setIsLoadingYoutube] = useState(false);
// // // // //   const [loadingError, setLoadingError] = useState(null);
// // // // //   const [userInteracted, setUserInteracted] = useState(false);

// // // // //   // Refs for both audio types
// // // // //   const audioRef = useRef(null); // For local files
// // // // //   const youtubePlayerRef = useRef(null); // For YouTube
// // // // //   const ytIntervalRef = useRef(null); // For YouTube time tracking

// // // // //   const currentIndex = songs.findIndex((s) => s.id === currentSong?.id);
// // // // //   const isFetchingRef = useRef(false);
// // // // //   const processedTracksRef = useRef(new Set());

// // // // //   // Check if API key is configured
// // // // //   useEffect(() => {
// // // // //     if (!YT_API_KEY) {
// // // // //       console.warn(
// // // // //         "⚠️ YouTube API key not configured. Please add REACT_APP_YOUTUBE_API_KEY to your .env file"
// // // // //       );
// // // // //     } else {
// // // // //       console.log("✅ YouTube API key configured");
// // // // //     }
// // // // //   }, [YT_API_KEY]);

// // // // //   // Save songs to localStorage
// // // // //   useEffect(() => {
// // // // //     const songsToSave = songs.map((song) => ({
// // // // //       id: song.id,
// // // // //       title: song.title,
// // // // //       artist: song.artist,
// // // // //       album: song.album,
// // // // //       source: song.source,
// // // // //     }));
// // // // //     localStorage.setItem("melodymindSongs", JSON.stringify(songsToSave));
// // // // //   }, [songs]);

// // // // //   // Initialize YouTube IFrame API
// // // // //   useEffect(() => {
// // // // //     if (window.YT) return; // Already loaded

// // // // //     const tag = document.createElement("script");
// // // // //     tag.src = "https://www.youtube.com/iframe_api";
// // // // //     const firstScriptTag = document.getElementsByTagName("script")[0];
// // // // //     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// // // // //     window.onYouTubeIframeAPIReady = () => {
// // // // //       console.log("✅ YouTube IFrame API loaded");
// // // // //       const player = new window.YT.Player("youtube-player", {
// // // // //         height: "0",
// // // // //         width: "0",
// // // // //         playerVars: {
// // // // //           autoplay: 0,
// // // // //           controls: 0,
// // // // //         },
// // // // //         events: {
// // // // //           onReady: (event) => {
// // // // //             console.log("✅ YouTube player ready");
// // // // //             youtubePlayerRef.current = event.target;
// // // // //           },
// // // // //           onStateChange: (event) => {
// // // // //             if (event.data === window.YT.PlayerState.PLAYING) {
// // // // //               setIsPlaying(true);
// // // // //               startYouTubeTimeTracking();
// // // // //             } else if (event.data === window.YT.PlayerState.PAUSED) {
// // // // //               setIsPlaying(false);
// // // // //               stopYouTubeTimeTracking();
// // // // //             } else if (event.data === window.YT.PlayerState.ENDED) {
// // // // //               console.log("🎵 YouTube song ended");
// // // // //               setIsPlaying(false);
// // // // //               stopYouTubeTimeTracking();
// // // // //               handleSongEnd();
// // // // //             }
// // // // //           },
// // // // //           onError: (event) => {
// // // // //             console.error("❌ YouTube player error:", event.data);
// // // // //             let errorMsg = "YouTube playback error";
// // // // //             switch (event.data) {
// // // // //               case 2:
// // // // //                 errorMsg = "Invalid video ID";
// // // // //                 break;
// // // // //               case 5:
// // // // //                 errorMsg = "HTML5 player error";
// // // // //                 break;
// // // // //               case 100:
// // // // //                 errorMsg = "Video not found";
// // // // //                 break;
// // // // //               case 101:
// // // // //               case 150:
// // // // //                 errorMsg = "Video not available or restricted";
// // // // //                 break;
// // // // //             }
// // // // //             setLoadingError(errorMsg);
// // // // //             setIsPlaying(false);
// // // // //           },
// // // // //         },
// // // // //       });
// // // // //     };
// // // // //   }, []);

// // // // //   // YouTube time tracking
// // // // //   const startYouTubeTimeTracking = () => {
// // // // //     stopYouTubeTimeTracking();
// // // // //     ytIntervalRef.current = setInterval(() => {
// // // // //       if (youtubePlayerRef.current?.getCurrentTime) {
// // // // //         const current = youtubePlayerRef.current.getCurrentTime();
// // // // //         const dur = youtubePlayerRef.current.getDuration();
// // // // //         setCurrentTime(current);
// // // // //         if (duration !== dur) setDuration(dur);
// // // // //       }
// // // // //     }, 100);
// // // // //   };

// // // // //   const stopYouTubeTimeTracking = () => {
// // // // //     if (ytIntervalRef.current) {
// // // // //       clearInterval(ytIntervalRef.current);
// // // // //       ytIntervalRef.current = null;
// // // // //     }
// // // // //   };

// // // // //   // Search YouTube for a song
// // // // //   const searchYoutube = async (query) => {
// // // // //     try {
// // // // //       if (!YT_API_KEY) {
// // // // //         throw new Error(
// // // // //           "YouTube API key not configured. Add REACT_APP_YOUTUBE_API_KEY to .env file"
// // // // //         );
// // // // //       }

// // // // //       console.log("🔍 Searching YouTube for:", query);

// // // // //       const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(
// // // // //         query
// // // // //       )}&key=${YT_API_KEY}`;

// // // // //       const response = await fetch(url);
// // // // //       const data = await response.json();

// // // // //       if (data.error) {
// // // // //         console.error("❌ YouTube API error:", data.error);
// // // // //         throw new Error(data.error.message || "YouTube API error");
// // // // //       }

// // // // //       if (data.items && data.items.length > 0) {
// // // // //         const video = data.items[0];
// // // // //         console.log("✅ Found:", video.snippet.title);
// // // // //         return {
// // // // //           videoId: video.id.videoId,
// // // // //           title: video.snippet.title,
// // // // //           thumbnail: video.snippet.thumbnails.default.url,
// // // // //         };
// // // // //       }

// // // // //       console.warn("⚠️ No results found for:", query);
// // // // //       return null;
// // // // //     } catch (error) {
// // // // //       console.error("❌ YouTube search error:", error);
// // // // //       throw error;
// // // // //     }
// // // // //   };

// // // // //   // Play a specific song
// // // // //   const selectSong = async (song) => {
// // // // //     try {
// // // // //       setUserInteracted(true);
// // // // //       setLoadingError(null);
// // // // //       setIsPlaying(false);
// // // // //       setCurrentTime(0);
// // // // //       setDuration(0);

// // // // //       console.log("🎵 Selecting song:", song.title, "Source:", song.source);

// // // // //       // CASE 1: Local file
// // // // //       if (song.source === "local" && song.streamUrl) {
// // // // //         console.log("📁 Playing local file");
// // // // //         stopYouTubeTimeTracking();
// // // // //         if (youtubePlayerRef.current?.stopVideo) {
// // // // //           youtubePlayerRef.current.stopVideo();
// // // // //         }
// // // // //         setCurrentSong(song);
// // // // //         setTimeout(() => setIsPlaying(true), 100);
// // // // //         return;
// // // // //       }

// // // // //       // CASE 2: YouTube song
// // // // //       setIsLoadingYoutube(true);
// // // // //       const query = `${song.title} ${song.artist}`;

// // // // //       const result = await searchYoutube(query);

// // // // //       if (!result) {
// // // // //         throw new Error("No YouTube video found");
// // // // //       }

// // // // //       // Stop audio element if playing
// // // // //       if (audioRef.current) {
// // // // //         audioRef.current.pause();
// // // // //         audioRef.current.src = "";
// // // // //       }

// // // // //       const updatedSong = {
// // // // //         ...song,
// // // // //         youtubeId: result.videoId,
// // // // //         youtubeThumbnail: result.thumbnail,
// // // // //         source: "youtube",
// // // // //       };

// // // // //       setCurrentSong(updatedSong);

// // // // //       // Load and play YouTube video
// // // // //       if (youtubePlayerRef.current?.loadVideoById) {
// // // // //         youtubePlayerRef.current.loadVideoById(result.videoId);
// // // // //         setTimeout(() => {
// // // // //           if (youtubePlayerRef.current?.playVideo) {
// // // // //             youtubePlayerRef.current.playVideo();
// // // // //           }
// // // // //         }, 500);
// // // // //       } else {
// // // // //         console.warn("⚠️ YouTube player not ready yet");
// // // // //         setLoadingError("YouTube player not ready. Please wait and try again.");
// // // // //       }

// // // // //       setIsLoadingYoutube(false);
// // // // //     } catch (err) {
// // // // //       console.error("❌ Select song error:", err);
// // // // //       setLoadingError(err.message);
// // // // //       setIsPlaying(false);
// // // // //       setIsLoadingYoutube(false);
// // // // //     }
// // // // //   };

// // // // //   // Handle song end (for repeat/next)
// // // // //   const handleSongEnd = () => {
// // // // //     if (repeatMode === "one") {
// // // // //       if (currentSong?.source === "youtube" && youtubePlayerRef.current) {
// // // // //         youtubePlayerRef.current.seekTo(0);
// // // // //         youtubePlayerRef.current.playVideo();
// // // // //       } else if (audioRef.current) {
// // // // //         audioRef.current.currentTime = 0;
// // // // //         audioRef.current.play();
// // // // //       }
// // // // //     } else if (repeatMode === "all") {
// // // // //       playNext();
// // // // //     }
// // // // //   };

// // // // //   // Navigation
// // // // //   const playNext = useCallback(() => {
// // // // //     if (!songs.length) return;
// // // // //     const nextIndex = isShuffled
// // // // //       ? Math.floor(Math.random() * songs.length)
// // // // //       : (currentIndex + 1) % songs.length;
// // // // //     selectSong(songs[nextIndex]);
// // // // //   }, [songs, currentIndex, isShuffled]);

// // // // //   const playPrevious = useCallback(() => {
// // // // //     if (!songs.length) return;
// // // // //     const prevIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
// // // // //     selectSong(songs[prevIndex]);
// // // // //   }, [songs, currentIndex]);

// // // // //   // Handle incoming tracks
// // // // //   useEffect(() => {
// // // // //     if (!incomingTrack || !incomingTrack.id) return;

// // // // //     if (processedTracksRef.current.has(incomingTrack.id)) {
// // // // //       console.log("⏭️ Track already processed");
// // // // //       return;
// // // // //     }

// // // // //     processedTracksRef.current.add(incomingTrack.id);

// // // // //     const normalized = {
// // // // //       id: incomingTrack.id,
// // // // //       title: incomingTrack.name || incomingTrack.title,
// // // // //       artist:
// // // // //         incomingTrack.artists?.map?.((a) => a.name).join(", ") ||
// // // // //         incomingTrack.artist ||
// // // // //         "Unknown Artist",
// // // // //       album: incomingTrack.album?.name || "Unknown Album",
// // // // //       source: "youtube",
// // // // //     };

// // // // //     console.log("📥 Incoming track:", normalized);

// // // // //     if (incomingPlaylist && Array.isArray(incomingPlaylist)) {
// // // // //       const normalizedPlaylist = incomingPlaylist.map((track) => ({
// // // // //         id: track.id,
// // // // //         title: track.name || track.title,
// // // // //         artist:
// // // // //           track.artists?.map?.((a) => a.name).join(", ") ||
// // // // //           track.artist ||
// // // // //           "Unknown Artist",
// // // // //         album: track.album?.name || "Unknown Album",
// // // // //         source: "youtube",
// // // // //       }));

// // // // //       setSongs((prev) => {
// // // // //         const existingIds = new Set(prev.map((s) => s.id));
// // // // //         const newSongs = normalizedPlaylist.filter(
// // // // //           (s) => !existingIds.has(s.id)
// // // // //         );
// // // // //         console.log("✅ Added", newSongs.length, "new songs to playlist");
// // // // //         return [...prev, ...newSongs];
// // // // //       });
// // // // //     } else {
// // // // //       setSongs((prev) => {
// // // // //         const exists = prev.find((s) => s.id === normalized.id);
// // // // //         if (exists) return prev;
// // // // //         return [...prev, normalized];
// // // // //       });
// // // // //     }

// // // // //     selectSong(normalized);
// // // // //   }, [incomingTrack?.id, incomingPlaylist]);

// // // // //   // Audio element handlers (for local files)
// // // // //   useEffect(() => {
// // // // //     const audio = audioRef.current;
// // // // //     if (!audio) return;

// // // // //     const onTime = () => setCurrentTime(audio.currentTime);
// // // // //     const onLoaded = () => setDuration(audio.duration || 0);
// // // // //     const onEnded = () => handleSongEnd();
// // // // //     const onError = () => {
// // // // //       setLoadingError("Audio playback error");
// // // // //       setIsPlaying(false);
// // // // //     };

// // // // //     audio.addEventListener("timeupdate", onTime);
// // // // //     audio.addEventListener("loadedmetadata", onLoaded);
// // // // //     audio.addEventListener("ended", onEnded);
// // // // //     audio.addEventListener("error", onError);

// // // // //     return () => {
// // // // //       audio.removeEventListener("timeupdate", onTime);
// // // // //       audio.removeEventListener("loadedmetadata", onLoaded);
// // // // //       audio.removeEventListener("ended", onEnded);
// // // // //       audio.removeEventListener("error", onError);
// // // // //     };
// // // // //   }, [repeatMode]);

// // // // //   // Play/Pause control
// // // // //   useEffect(() => {
// // // // //     if (!currentSong || !userInteracted) return;

// // // // //     if (currentSong.source === "local") {
// // // // //       const audio = audioRef.current;
// // // // //       if (!audio || !audio.src) return;

// // // // //       if (isPlaying) {
// // // // //         audio.play().catch((err) => {
// // // // //           console.error("❌ Playback failed:", err);
// // // // //           setLoadingError("Playback failed");
// // // // //           setIsPlaying(false);
// // // // //         });
// // // // //       } else {
// // // // //         audio.pause();
// // // // //       }
// // // // //     } else if (currentSong.source === "youtube") {
// // // // //       if (!youtubePlayerRef.current) return;

// // // // //       if (isPlaying) {
// // // // //         youtubePlayerRef.current.playVideo();
// // // // //       } else {
// // // // //         youtubePlayerRef.current.pauseVideo();
// // // // //       }
// // // // //     }
// // // // //   }, [isPlaying, currentSong, userInteracted]);

// // // // //   // Volume control
// // // // //   useEffect(() => {
// // // // //     if (audioRef.current) {
// // // // //       audioRef.current.volume = volume;
// // // // //     }
// // // // //     if (youtubePlayerRef.current?.setVolume) {
// // // // //       youtubePlayerRef.current.setVolume(volume * 100);
// // // // //     }
// // // // //   }, [volume]);

// // // // //   // Seek control
// // // // //   const handleSeek = (newTime) => {
// // // // //     setCurrentTime(newTime);
// // // // //     if (currentSong?.source === "local" && audioRef.current) {
// // // // //       audioRef.current.currentTime = newTime;
// // // // //     } else if (currentSong?.source === "youtube" && youtubePlayerRef.current) {
// // // // //       youtubePlayerRef.current.seekTo(newTime);
// // // // //     }
// // // // //   };

// // // // //   // File upload
// // // // //   const handleFileUpload = (e) => {
// // // // //     const files = Array.from(e.target.files);
// // // // //     const newSongs = files.map((file, idx) => ({
// // // // //       id: `local-${Date.now()}-${idx}`,
// // // // //       title: file.name.replace(/\.[^/.]+$/, ""),
// // // // //       artist: "Local File",
// // // // //       album: "Device",
// // // // //       streamUrl: URL.createObjectURL(file),
// // // // //       source: "local",
// // // // //     }));
// // // // //     setSongs((prev) => [...prev, ...newSongs]);
// // // // //     console.log("📁 Added", newSongs.length, "local files");
// // // // //   };

// // // // //   const retryLoad = () => {
// // // // //     if (currentSong) {
// // // // //       processedTracksRef.current.delete(currentSong.id);
// // // // //       selectSong({ ...currentSong });
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
// // // // //       <header className="bg-black/30 backdrop-blur-sm border-b border-white/10 px-6 py-4 flex justify-between items-center">
// // // // //         <Link to="/" className="font-['Pacifico'] text-2xl text-white">
// // // // //           MelodyMind
// // // // //         </Link>
// // // // //         <div className="flex gap-4 items-center">
// // // // //           <button
// // // // //             onClick={() => setShowVoiceControl(!showVoiceControl)}
// // // // //             className={`p-3 rounded-full transition-all ${
// // // // //               showVoiceControl
// // // // //                 ? "bg-purple-600 text-white"
// // // // //                 : "bg-white/10 text-purple-300 hover:bg-purple-600 hover:text-white"
// // // // //             }`}
// // // // //           >
// // // // //             🎤
// // // // //           </button>

// // // // //           <label
// // // // //             htmlFor="audio-upload"
// // // // //             className="cursor-pointer bg-white/10 text-purple-300 hover:bg-purple-600 hover:text-white px-4 py-2 rounded-full"
// // // // //           >
// // // // //             ⬆ Upload
// // // // //           </label>

// // // // //           <Link
// // // // //             to="/MoodDetection"
// // // // //             className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-full font-semibold transition-all"
// // // // //           >
// // // // //             Mood Detection
// // // // //           </Link>
// // // // //         </div>
// // // // //       </header>

// // // // //       <div className="flex flex-1">
// // // // //         <PlaylistSidebar
// // // // //           songs={songs}
// // // // //           currentSong={currentSong}
// // // // //           onSongSelect={selectSong}
// // // // //         />

// // // // //         <div className="flex-1 flex flex-col">
// // // // //           {showVoiceControl && (
// // // // //             <VoiceControl
// // // // //               playMusic={() => {
// // // // //                 setUserInteracted(true);
// // // // //                 setIsPlaying(true);
// // // // //               }}
// // // // //               pauseMusic={() => setIsPlaying(false)}
// // // // //               nextSong={playNext}
// // // // //               prevSong={playPrevious}
// // // // //               increaseVolume={() =>
// // // // //                 setVolume((v) => Math.min(1, +(v + 0.1).toFixed(1)))
// // // // //               }
// // // // //               decreaseVolume={() =>
// // // // //                 setVolume((v) => Math.max(0, +(v - 0.1).toFixed(1)))
// // // // //               }
// // // // //               toggleShuffle={(val) => setIsShuffled(val)}
// // // // //             />
// // // // //           )}

// // // // //           <div className="flex-1 flex items-center justify-center p-8">
// // // // //             {!YT_API_KEY ? (
// // // // //               <div className="text-center text-yellow-400 max-w-md">
// // // // //                 <div className="text-4xl mb-4">⚠️</div>
// // // // //                 <p className="text-lg mb-2">YouTube API Key Required</p>
// // // // //                 <p className="text-sm mb-4">
// // // // //                   Please add REACT_APP_YOUTUBE_API_KEY to your .env file
// // // // //                 </p>
// // // // //                 <div className="bg-black/30 p-4 rounded-lg text-left text-xs">
// // // // //                   <p className="mb-2">
// // // // //                     1. Get API key from Google Cloud Console
// // // // //                   </p>
// // // // //                   <p className="mb-2">2. Create .env file in project root</p>
// // // // //                   <p>3. Add: REACT_APP_YOUTUBE_API_KEY=your_key_here</p>
// // // // //                 </div>
// // // // //               </div>
// // // // //             ) : isLoadingYoutube ? (
// // // // //               <div className="text-center text-white">
// // // // //                 <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
// // // // //                 <p className="text-lg">Finding on YouTube...</p>
// // // // //                 <p className="text-sm text-gray-400 mt-2">
// // // // //                   {currentSong?.title || "Loading"}
// // // // //                 </p>
// // // // //               </div>
// // // // //             ) : loadingError ? (
// // // // //               <div className="text-center text-red-400 max-w-md">
// // // // //                 <div className="text-4xl mb-4">⚠️</div>
// // // // //                 <p className="text-lg mb-2">Playback Error</p>
// // // // //                 <p className="text-sm mb-4">{loadingError}</p>
// // // // //                 <button
// // // // //                   onClick={retryLoad}
// // // // //                   className="bg-purple-600 px-6 py-2 rounded-full text-white hover:bg-purple-700 transition"
// // // // //                 >
// // // // //                   🔄 Retry
// // // // //                 </button>
// // // // //               </div>
// // // // //             ) : currentSong ? (
// // // // //               <NowPlaying currentSong={currentSong} />
// // // // //             ) : (
// // // // //               <div className="text-center text-gray-400">
// // // // //                 <div className="text-6xl mb-4">🎵</div>
// // // // //                 <p className="text-lg">No song selected</p>
// // // // //                 <p className="text-sm mt-2">
// // // // //                   Upload local files or detect your mood
// // // // //                 </p>
// // // // //               </div>
// // // // //             )}
// // // // //           </div>

// // // // //           <PlayerControls
// // // // //             currentSong={currentSong}
// // // // //             isPlaying={isPlaying}
// // // // //             setIsPlaying={(playing) => {
// // // // //               setUserInteracted(true);
// // // // //               setIsPlaying(playing);
// // // // //             }}
// // // // //             currentTime={currentTime}
// // // // //             setCurrentTime={handleSeek}
// // // // //             duration={duration}
// // // // //             volume={volume}
// // // // //             setVolume={setVolume}
// // // // //             isShuffled={isShuffled}
// // // // //             setIsShuffled={setIsShuffled}
// // // // //             repeatMode={repeatMode}
// // // // //             setRepeatMode={setRepeatMode}
// // // // //             onNext={playNext}
// // // // //             onPrevious={playPrevious}
// // // // //           />
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Hidden YouTube Player */}
// // // // //       <div id="youtube-player" style={{ display: "none" }}></div>

// // // // //       {/* Audio Element for Local Files */}
// // // // //       {currentSong?.source === "local" && currentSong?.streamUrl && (
// // // // //         <audio ref={audioRef} src={currentSong.streamUrl} preload="auto" />
// // // // //       )}

// // // // //       {/* File Upload Input */}
// // // // //       <input
// // // // //         type="file"
// // // // //         id="audio-upload"
// // // // //         multiple
// // // // //         accept="audio/*"
// // // // //         onChange={handleFileUpload}
// // // // //         className="hidden"
// // // // //       />
// // // // //     </div>
// // // // //   );
// // // // // }
// // // "use client";

// // // import { useState, useRef, useEffect, useCallback } from "react";
// // // import { Link, useLocation } from "react-router-dom";
// // // import PlayerControls from "../components/player/PlayerControls";
// // // import PlaylistSidebar from "../components/player/PlaylistSidebar";
// // // import NowPlaying from "../components/player/NowPlaying";
// // // import VoiceControl from "../components/player/VoiceControl";

// // // // ====== MelodyMind Player (patched) ======
// // // // - Local files are saved as base64 and persist in localStorage
// // // // - Only mood-detection / recommendation tracks use YouTube
// // // // - YouTube player initialization is robust (no "not ready" spam)
// // // // - Restores last song + position on load (paused)

// // // export default function Player() {
// // //   const location = useLocation();
// // //   const incomingTrack = location.state?.track || null;
// // //   const incomingPlaylist = location.state?.playlist || null;
// // //   const removedSongsRef = useRef(new Set());

// // //   const YT_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY || "";

// // //   // Load songs from localStorage. Saved songs include streamUrl for local files.
// // //   const [songs, setSongs] = useState(() => {
// // //     try {
// // //       const saved = localStorage.getItem("melodymindSongs");
// // //       if (!saved) return [];
// // //       const parsed = JSON.parse(saved);
// // //       return Array.isArray(parsed) ? parsed : [];
// // //     } catch (e) {
// // //       console.warn("Failed to read saved songs:", e);
// // //       return [];
// // //     }
// // //   });

// // //   const [playlist, setPlaylist] = useState([]);
// // //   const [currentSong, setCurrentSong] = useState(null);
// // //   const [isPlaying, setIsPlaying] = useState(false);
// // //   const [currentTime, setCurrentTime] = useState(0);
// // //   const [duration, setDuration] = useState(0);
// // //   const [volume, setVolume] = useState(0.7);
// // //   const [isShuffled, setIsShuffled] = useState(false);
// // //   const [repeatMode, setRepeatMode] = useState("none");
// // //   const [showVoiceControl, setShowVoiceControl] = useState(false);
// // //   const [isLoadingYoutube, setIsLoadingYoutube] = useState(false);
// // //   const [loadingError, setLoadingError] = useState(null);
// // //   const [userInteracted, setUserInteracted] = useState(false);

// // //   const audioRef = useRef(null);
// // //   const youtubePlayerRef = useRef(null);
// // //   const ytIntervalRef = useRef(null);
// // //   const playerReadyRef = useRef(false);

// // //   const processedTracksRef = useRef(new Set());

// // //   // Persist songs list (including local streamUrl) to localStorage whenever songs change
// // //   useEffect(() => {
// // //     try {
// // //       localStorage.setItem("melodymindSongs", JSON.stringify(songs));
// // //     } catch (e) {
// // //       console.warn("Failed to save songs to localStorage:", e);
// // //     }
// // //   }, [songs]);

// // //   // Persist last played state (song id + time) so we can restore on reload (paused)
// // //   useEffect(() => {
// // //     const state = {
// // //       lastSongId: currentSong?.id || null,
// // //       lastSongSource: currentSong?.source || null,
// // //       lastTime: currentTime || 0,
// // //     };
// // //     try {
// // //       localStorage.setItem("melodymindLastState", JSON.stringify(state));
// // //     } catch (e) {
// // //       console.warn("Failed to save last state:", e);
// // //     }
// // //   }, [currentSong?.id, currentSong?.source, currentTime]);

// // //   // On mount: restore last state (but keep paused)
// // //   useEffect(() => {
// // //     try {
// // //       const raw = localStorage.getItem("melodymindLastState");
// // //       if (!raw) return;
// // //       const parsed = JSON.parse(raw);
// // //       if (!parsed || !parsed.lastSongId) return;

// // //       const found = songs.find((s) => s.id === parsed.lastSongId);
// // //       if (found) {
// // //         setCurrentSong(found);
// // //         setCurrentTime(parsed.lastTime || 0);
// // //         setIsPlaying(false); // keep paused as requested
// // //       }
// // //     } catch (e) {
// // //       console.warn("Failed to restore last state:", e);
// // //     }
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, []); // run once on mount

// // //   // Handle incoming track/playlist (assumed to be YouTube recommendations)
// // //   useEffect(() => {
// // //     if (!incomingTrack?.id) return;
// // //     if (processedTracksRef.current.has(incomingTrack.id)) return;
// // //     processedTracksRef.current.add(incomingTrack.id);

// // //     const normalized = {
// // //       id: incomingTrack.id,
// // //       title: incomingTrack.name || incomingTrack.title,
// // //       artist:
// // //         incomingTrack.artists?.map((a) => a.name).join(", ") ||
// // //         incomingTrack.artist ||
// // //         "Unknown Artist",
// // //       album: incomingTrack.album?.name || "Unknown Album",
// // //       source: "youtube",
// // //     };

// // //     if (incomingPlaylist && Array.isArray(incomingPlaylist)) {
// // //       const normalizedPlaylist = incomingPlaylist.map((track) => ({
// // //         id: track.id,
// // //         title: track.name || track.title,
// // //         artist:
// // //           track.artists?.map((a) => a.name).join(", ") ||
// // //           track.artist ||
// // //           "Unknown Artist",
// // //         album: track.album?.name || "Unknown Album",
// // //         source: "youtube",
// // //       }));

// // //       setSongs((prev) => {
// // //         const ids = new Set(prev.map((p) => p.id));
// // //         const newTracks = normalizedPlaylist.filter((t) => !ids.has(t.id));
// // //         const updated = [...prev, ...newTracks];
// // //         return updated;
// // //       });
// // //     } else {
// // //       setSongs((prev) => {
// // //         const exists = prev.some((s) => s.id === normalized.id);
// // //         if (exists) return prev;
// // //         return [...prev, normalized];
// // //       });
// // //     }

// // //     // auto-select incoming recommendation
// // //     selectSong(normalized);
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [incomingTrack?.id, incomingPlaylist]);

// // //   // ================= YouTube IFrame API (robust init) =================
// // //   useEffect(() => {
// // //     const createPlayer = () => {
// // //       if (!window?.YT?.Player) return;
// // //       if (youtubePlayerRef.current && playerReadyRef.current) return;

// // //       youtubePlayerRef.current = new window.YT.Player("youtube-player", {
// // //         height: "0",
// // //         width: "0",
// // //         playerVars: { autoplay: 0, controls: 0, modestbranding: 1 },
// // //         events: {
// // //           onReady: () => {
// // //             playerReadyRef.current = true;
// // //             console.log("YouTube player ready");
// // //           },
// // //           onStateChange: (e) => {
// // //             const YT = window.YT;
// // //             if (e.data === YT.PlayerState.PLAYING) {
// // //               setIsPlaying(true);
// // //               startYouTubeTimeTracking();
// // //             } else if (e.data === YT.PlayerState.PAUSED) {
// // //               setIsPlaying(false);
// // //               stopYouTubeTimeTracking();
// // //             } else if (e.data === YT.PlayerState.ENDED) {
// // //               setIsPlaying(false);
// // //               stopYouTubeTimeTracking();
// // //               handleSongEnd();
// // //             }
// // //           },
// // //           onError: (err) => {
// // //             console.error("YouTube player error:", err);
// // //             setLoadingError("YouTube playback error");
// // //             setIsPlaying(false);
// // //           },
// // //         },
// // //       });
// // //     };

// // //     const loadAPI = () => {
// // //       if (window.YT && window.YT.Player) {
// // //         createPlayer();
// // //         return;
// // //       }
// // //       // Insert script only once
// // //       if (!document.getElementById("youtube-iframe-api")) {
// // //         const tag = document.createElement("script");
// // //         tag.id = "youtube-iframe-api";
// // //         tag.src = "https://www.youtube.com/iframe_api";
// // //         document.body.appendChild(tag);
// // //       }
// // //       // Attach global ready handler
// // //       window.onYouTubeIframeAPIReady = () => {
// // //         createPlayer();
// // //       };
// // //     };

// // //     loadAPI();

// // //     return () => {
// // //       // cleanup
// // //       stopYouTubeTimeTracking();
// // //     };
// // //   }, []);

// // //   const startYouTubeTimeTracking = () => {
// // //     stopYouTubeTimeTracking();
// // //     ytIntervalRef.current = setInterval(() => {
// // //       if (youtubePlayerRef.current?.getCurrentTime) {
// // //         const cur = youtubePlayerRef.current.getCurrentTime();
// // //         const d = youtubePlayerRef.current.getDuration?.() || 0;
// // //         setCurrentTime(cur);
// // //         if (duration !== d) setDuration(d);
// // //       }
// // //     }, 250);
// // //   };
// // //   const stopYouTubeTimeTracking = () => {
// // //     if (ytIntervalRef.current) {
// // //       clearInterval(ytIntervalRef.current);
// // //       ytIntervalRef.current = null;
// // //     }
// // //   };

// // //   // ================= YouTube Search helper =================
// // //   const searchYoutube = async (query) => {
// // //     if (!YT_API_KEY) throw new Error("YouTube API key not configured");
// // //     const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(
// // //       query
// // //     )}&key=${YT_API_KEY}`;
// // //     const res = await fetch(url);
// // //     const data = await res.json();
// // //     if (data.error) throw new Error(data.error.message || "YT API error");
// // //     if (!data.items || !data.items.length) return null;
// // //     const v = data.items[0];
// // //     return {
// // //       videoId: v.id.videoId,
// // //       title: v.snippet.title,
// // //       thumbnail: v.snippet.thumbnails?.default?.url,
// // //     };
// // //   };

// // //   // ================= Select & Play Song =================
// // //   const waitUntilPlayerReady = (timeout = 6000) =>
// // //     new Promise((resolve, reject) => {
// // //       const start = Date.now();
// // //       const check = () => {
// // //         if (playerReadyRef.current && youtubePlayerRef.current?.loadVideoById)
// // //           return resolve(true);
// // //         if (Date.now() - start > timeout)
// // //           return reject(new Error("YouTube player not ready"));
// // //         setTimeout(check, 300);
// // //       };
// // //       check();
// // //     });

// // //   const selectSong = async (song) => {
// // //     try {
// // //       setUserInteracted(true);
// // //       setLoadingError(null);
// // //       setIsLoadingYoutube(false);
// // //       setIsPlaying(false);
// // //       setCurrentTime(0);
// // //       setDuration(0);

// // //       console.log("Selecting:", song.title, song.source);

// // //       // LOCAL FILE
// // //       if (song.source === "local") {
// // //         // stop youtube
// // //         stopYouTubeTimeTracking();
// // //         try {
// // //           if (youtubePlayerRef.current?.stopVideo)
// // //             youtubePlayerRef.current.stopVideo();
// // //         } catch (e) {}
// // //         // set audio src and current song; audio element will pick up and load
// // //         setCurrentSong(song);

// // //         // ensure audioRef.src matches
// // //         if (audioRef.current) {
// // //           audioRef.current.src = song.streamUrl || "";
// // //           audioRef.current.load();
// // //           setTimeout(() => {
// // //             // do NOT autoplay on selection if we want user to interact; we set playing true only if user toggles play
// // //             // but to mimic previous behavior, start playing automatically if userInteracted is true
// // //             if (userInteracted) {
// // //               audioRef.current.currentTime = currentTime || 0;
// // //               audioRef.current.play().catch((err) => {
// // //                 console.warn("Auto-play failed (browser policy):", err);
// // //                 setIsPlaying(false);
// // //               });
// // //             }
// // //           }, 150);
// // //         }
// // //         return;
// // //       }

// // //       // YOUTUBE (mood recommendations)
// // //       if (song.source === "youtube") {
// // //         setIsLoadingYoutube(true);
// // //         // If song has youtubeId already, use it, otherwise search
// // //         let videoId = song.youtubeId || song.youtubeIdManual || null;
// // //         if (!videoId) {
// // //           const query = `${song.title} ${song.artist}`;
// // //           const result = await searchYoutube(query);
// // //           if (!result) throw new Error("No YouTube result found");
// // //           videoId = result.videoId;
// // //         }

// // //         // stop local audio
// // //         if (audioRef.current) {
// // //           try {
// // //             audioRef.current.pause();
// // //           } catch (e) {}
// // //         }

// // //         const updated = { ...song, youtubeId: videoId, source: "youtube" };
// // //         setCurrentSong(updated);

// // //         // wait until YT player ready
// // //         await waitUntilPlayerReady().catch((err) => {
// // //           throw new Error("YouTube player initialization failed");
// // //         });

// // //         // load and seek to saved time (if any)
// // //         try {
// // //           youtubePlayerRef.current.loadVideoById(videoId);
// // //           // we won't force autoplay — user controls play/pause
// // //         } catch (e) {
// // //           console.error("Failed to load videoId:", e);
// // //           throw e;
// // //         }

// // //         setIsLoadingYoutube(false);
// // //         return;
// // //       }

// // //       // Unknown source
// // //       throw new Error("Unsupported song source");
// // //     } catch (err) {
// // //       console.error("selectSong error:", err);
// // //       setLoadingError(err.message || "Playback error");
// // //       setIsLoadingYoutube(false);
// // //       setIsPlaying(false);
// // //     }
// // //   };

// // //   // Handle song end (repeat / next)
// // //   const handleSongEnd = () => {
// // //     if (repeatMode === "one") {
// // //       if (currentSong?.source === "youtube" && youtubePlayerRef.current) {
// // //         youtubePlayerRef.current.seekTo(0);
// // //         youtubePlayerRef.current.playVideo();
// // //       } else if (audioRef.current) {
// // //         audioRef.current.currentTime = 0;
// // //         audioRef.current.play();
// // //       }
// // //     } else if (repeatMode === "all") {
// // //       playNext();
// // //     } else {
// // //       setIsPlaying(false);
// // //     }
// // //   };

// // //   // Navigation helpers
// // //   const playNext = useCallback(() => {
// // //     if (!songs.length) return;
// // //     const nextIndex = isShuffled
// // //       ? Math.floor(Math.random() * songs.length)
// // //       : (songs.findIndex((s) => s.id === currentSong?.id) + 1) % songs.length;
// // //     const next = songs[nextIndex];
// // //     if (next) selectSong(next);
// // //   }, [songs, currentSong, isShuffled]);

// // //   const playPrevious = useCallback(() => {
// // //     if (!songs.length) return;
// // //     const idx = songs.findIndex((s) => s.id === currentSong?.id);
// // //     const prevIndex = idx <= 0 ? songs.length - 1 : idx - 1;
// // //     const prev = songs[prevIndex];
// // //     if (prev) selectSong(prev);
// // //   }, [songs, currentSong]);

// // //   // Audio element event wiring
// // //   useEffect(() => {
// // //     const audio = audioRef.current;
// // //     if (!audio) return;

// // //     const onTime = () => setCurrentTime(audio.currentTime || 0);
// // //     const onLoaded = () => setDuration(audio.duration || 0);
// // //     const onEnded = () => handleSongEnd();
// // //     const onError = () => {
// // //       setLoadingError("Audio playback error");
// // //       setIsPlaying(false);
// // //     };

// // //     audio.addEventListener("timeupdate", onTime);
// // //     audio.addEventListener("loadedmetadata", onLoaded);
// // //     audio.addEventListener("ended", onEnded);
// // //     audio.addEventListener("error", onError);

// // //     return () => {
// // //       audio.removeEventListener("timeupdate", onTime);
// // //       audio.removeEventListener("loadedmetadata", onLoaded);
// // //       audio.removeEventListener("ended", onEnded);
// // //       audio.removeEventListener("error", onError);
// // //     };
// // //   }, []);

// // //   // Play / Pause effect: sync UI state with underlying player
// // //   useEffect(() => {
// // //     if (!currentSong) return;

// // //     if (currentSong.source === "local") {
// // //       const audio = audioRef.current;
// // //       if (!audio) return;
// // //       if (isPlaying) {
// // //         audio.currentTime = currentTime || 0;
// // //         audio.play().catch((e) => {
// // //           console.warn("Audio play failed:", e);
// // //           setIsPlaying(false);
// // //         });
// // //       } else {
// // //         audio.pause();
// // //       }
// // //     }

// // //     if (currentSong.source === "youtube") {
// // //       if (!playerReadyRef.current || !youtubePlayerRef.current) return;
// // //       try {
// // //         if (isPlaying) youtubePlayerRef.current.playVideo();
// // //         else youtubePlayerRef.current.pauseVideo();
// // //       } catch (e) {
// // //         console.warn("YT play/pause error:", e);
// // //       }
// // //     }
// // //   }, [isPlaying, currentSong]);

// // //   // Volume sync
// // //   useEffect(() => {
// // //     if (audioRef.current) audioRef.current.volume = volume;
// // //     if (youtubePlayerRef.current?.setVolume)
// // //       youtubePlayerRef.current.setVolume(Math.round(volume * 100));
// // //   }, [volume]);

// // //   // Seek control
// // //   const handleSeek = (newTime) => {
// // //     setCurrentTime(newTime);
// // //     if (currentSong?.source === "local" && audioRef.current) {
// // //       audioRef.current.currentTime = newTime;
// // //     } else if (currentSong?.source === "youtube" && youtubePlayerRef.current) {
// // //       try {
// // //         youtubePlayerRef.current.seekTo(newTime, true);
// // //       } catch (e) {}
// // //     }
// // //   };

// // //   // File upload: convert to base64 and persist
// // //   const handleFileUpload = (e) => {
// // //     const files = Array.from(e.target.files || []);
// // //     if (!files.length) return;

// // //     const readers = files.map((file, idx) => {
// // //       return new Promise((resolve, reject) => {
// // //         const reader = new FileReader();
// // //         reader.onload = (ev) => {
// // //           const base64 = ev.target.result;
// // //           const song = {
// // //             id: `local-${Date.now()}-${idx}`,
// // //             title: file.name.replace(/\.[^/.]+$/, ""),
// // //             artist: "Local File",
// // //             album: "Device",
// // //             streamUrl: base64,
// // //             source: "local",
// // //           };
// // //           resolve(song);
// // //         };
// // //         reader.onerror = (err) => reject(err);
// // //         reader.readAsDataURL(file);
// // //       });
// // //     });

// // //     Promise.all(readers)
// // //       .then((newSongs) => {
// // //         setSongs((prev) => {
// // //           // avoid duplicates by filename+prefix of data
// // //           const existingKeys = new Set(
// // //             prev.map((p) => p.title + (p.streamUrl?.slice(0, 50) || ""))
// // //           );
// // //           const filtered = newSongs.filter(
// // //             (ns) => !existingKeys.has(ns.title + ns.streamUrl?.slice(0, 50))
// // //           );
// // //           const updated = [...prev, ...filtered];
// // //           try {
// // //             localStorage.setItem("melodymindSongs", JSON.stringify(updated));
// // //           } catch (e) {}
// // //           return updated;
// // //         });
// // //       })
// // //       .catch((err) => console.error("Failed to read files:", err));
// // //   };

// // //   // Remove song
// // //   const removeSong = (id) => {
// // //     removedSongsRef.current.add(id);
// // //     setSongs((prev) => {
// // //       const updated = prev.filter((s) => s.id !== id);
// // //       try {
// // //         localStorage.setItem("melodymindSongs", JSON.stringify(updated));
// // //       } catch (e) {}
// // //       return updated;
// // //     });

// // //     if (currentSong?.id === id) {
// // //       setCurrentSong(null);
// // //       setIsPlaying(false);
// // //       setCurrentTime(0);
// // //       setDuration(0);
// // //       if (audioRef.current) {
// // //         audioRef.current.pause();
// // //         audioRef.current.src = "";
// // //       }
// // //       try {
// // //         if (youtubePlayerRef.current?.stopVideo)
// // //           youtubePlayerRef.current.stopVideo();
// // //       } catch (e) {}
// // //     }
// // //   };

// // //   const retryLoad = () => {
// // //     if (currentSong) selectSong({ ...currentSong });
// // //   };

// // //   // Render
// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
// // //       <header className="bg-black/30 backdrop-blur-sm border-b border-white/10 px-6 py-4 flex justify-between items-center">
// // //         <Link to="/" className="font-['Pacifico'] text-2xl text-white">
// // //           MelodyMind
// // //         </Link>
// // //         <div className="flex gap-4 items-center">
// // //           <button
// // //             onClick={() => setShowVoiceControl(!showVoiceControl)}
// // //             className={`p-3 rounded-full transition-all ${
// // //               showVoiceControl
// // //                 ? "bg-purple-600 text-white"
// // //                 : "bg-white/10 text-purple-300 hover:bg-purple-600 hover:text-white"
// // //             }`}
// // //           >
// // //             🎤
// // //           </button>

// // //           <label
// // //             htmlFor="audio-upload"
// // //             className="cursor-pointer bg-white/10 text-purple-300 hover:bg-purple-600 hover:text-white px-4 py-2 rounded-full"
// // //           >
// // //             ⬆ Upload
// // //           </label>

// // //           <Link
// // //             to="/MoodDetection"
// // //             className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-full font-semibold transition-all"
// // //           >
// // //             Mood Detection
// // //           </Link>
// // //         </div>
// // //       </header>

// // //       <div className="flex flex-1">
// // //         <PlaylistSidebar
// // //           songs={songs}
// // //           currentSong={currentSong}
// // //           onSongSelect={selectSong}
// // //           onRemoveSong={removeSong}
// // //         />

// // //         <div className="flex-1 flex flex-col">
// // //           {showVoiceControl && (
// // //             <VoiceControl
// // //               playMusic={() => {
// // //                 setUserInteracted(true);
// // //                 setIsPlaying(true);
// // //               }}
// // //               pauseMusic={() => setIsPlaying(false)}
// // //               nextSong={playNext}
// // //               prevSong={playPrevious}
// // //               increaseVolume={() =>
// // //                 setVolume((v) => Math.min(1, +(v + 0.1).toFixed(1)))
// // //               }
// // //               decreaseVolume={() =>
// // //                 setVolume((v) => Math.max(0, +(v - 0.1).toFixed(1)))
// // //               }
// // //               toggleShuffle={(val) => setIsShuffled(val)}
// // //             />
// // //           )}

// // //           <div className="flex-1 flex items-center justify-center p-8">
// // //             {!YT_API_KEY ? (
// // //               <div className="text-center text-yellow-400 max-w-md">
// // //                 <div className="text-4xl mb-4">⚠️</div>
// // //                 <p className="text-lg mb-2">YouTube API Key Required</p>
// // //                 <p className="text-sm mb-4">
// // //                   Please add REACT_APP_YOUTUBE_API_KEY to your .env file
// // //                 </p>
// // //                 <div className="bg-black/30 p-4 rounded-lg text-left text-xs">
// // //                   <p className="mb-2">
// // //                     1. Get API key from Google Cloud Console
// // //                   </p>
// // //                   <p className="mb-2">2. Create .env file in project root</p>
// // //                   <p>3. Add: REACT_APP_YOUTUBE_API_KEY=your_key_here</p>
// // //                 </div>
// // //               </div>
// // //             ) : isLoadingYoutube ? (
// // //               <div className="text-center text-white">
// // //                 <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
// // //                 <p className="text-lg">Finding on YouTube...</p>
// // //                 <p className="text-sm text-gray-400 mt-2">
// // //                   {currentSong?.title || "Loading"}
// // //                 </p>
// // //               </div>
// // //             ) : loadingError ? (
// // //               <div className="text-center text-red-400 max-w-md">
// // //                 <div className="text-4xl mb-4">⚠️</div>
// // //                 <p className="text-lg mb-2">Playback Error</p>
// // //                 <p className="text-sm mb-4">{loadingError}</p>
// // //                 <button
// // //                   onClick={retryLoad}
// // //                   className="bg-purple-600 px-6 py-2 rounded-full text-white hover:bg-purple-700 transition"
// // //                 >
// // //                   🔄 Retry
// // //                 </button>
// // //               </div>
// // //             ) : currentSong ? (
// // //               <NowPlaying currentSong={currentSong} />
// // //             ) : (
// // //               <div className="text-center text-gray-400">
// // //                 <div className="text-6xl mb-4">🎵</div>
// // //                 <p className="text-lg">No song selected</p>
// // //                 <p className="text-sm mt-2">
// // //                   Upload local files or detect your mood
// // //                 </p>
// // //               </div>
// // //             )}
// // //           </div>

// // //           <PlayerControls
// // //             currentSong={currentSong}
// // //             isPlaying={isPlaying}
// // //             setIsPlaying={(playing) => {
// // //               setUserInteracted(true);
// // //               setIsPlaying(playing);
// // //             }}
// // //             currentTime={currentTime}
// // //             setCurrentTime={handleSeek}
// // //             duration={duration}
// // //             volume={volume}
// // //             setVolume={setVolume}
// // //             isShuffled={isShuffled}
// // //             setIsShuffled={setIsShuffled}
// // //             repeatMode={repeatMode}
// // //             setRepeatMode={setRepeatMode}
// // //             onNext={playNext}
// // //             onPrevious={playPrevious}
// // //           />
// // //         </div>
// // //       </div>

// // //       {/* Hidden YouTube Player */}
// // //       <div id="youtube-player" style={{ display: "none" }} />

// // //       {/* Audio Element for Local Files */}
// // //       {currentSong?.source === "local" && currentSong?.streamUrl && (
// // //         <audio ref={audioRef} src={currentSong.streamUrl} preload="auto" />
// // //       )}

// // //       {/* File Upload Input */}
// // //       <input
// // //         type="file"
// // //         id="audio-upload"
// // //         multiple
// // //         accept="audio/*"
// // //         onChange={handleFileUpload}
// // //         className="hidden"
// // //       />
// // //     </div>
// // //   );
// // // }
// // // "use client";

// // // import { useState, useRef, useEffect, useCallback } from "react";
// // // import { Link, useLocation } from "react-router-dom";
// // // import PlayerControls from "../components/player/PlayerControls";
// // // import PlaylistSidebar from "../components/player/PlaylistSidebar";
// // // import NowPlaying from "../components/player/NowPlaying";
// // // import VoiceControl from "../components/player/VoiceControl";

// // // // ====== MelodyMind Player (Fixed) ======
// // // // Fixed: localStorage quota, invalid time values, YT player race conditions

// // // export default function Player() {
// // //   const location = useLocation();
// // //   const incomingTrack = location.state?.track || null;
// // //   const incomingPlaylist = location.state?.playlist || null;
// // //   const removedSongsRef = useRef(new Set());

// // //   const YT_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY || "";

// // //   // Load songs from localStorage with size limit check
// // //   const [songs, setSongs] = useState(() => {
// // //     try {
// // //       const saved = localStorage.getItem("melodymindSongs");
// // //       if (!saved) return [];
// // //       const parsed = JSON.parse(saved);
// // //       return Array.isArray(parsed) ? parsed : [];
// // //     } catch (e) {
// // //       console.warn("Failed to read saved songs:", e);
// // //       return [];
// // //     }
// // //   });

// // //   const [playlist, setPlaylist] = useState([]);
// // //   const [currentSong, setCurrentSong] = useState(null);
// // //   const [isPlaying, setIsPlaying] = useState(false);
// // //   const [currentTime, setCurrentTime] = useState(0);
// // //   const [duration, setDuration] = useState(0);
// // //   const [volume, setVolume] = useState(0.7);
// // //   const [isShuffled, setIsShuffled] = useState(false);
// // //   const [repeatMode, setRepeatMode] = useState("none");
// // //   const [showVoiceControl, setShowVoiceControl] = useState(false);
// // //   const [isLoadingYoutube, setIsLoadingYoutube] = useState(false);
// // //   const [loadingError, setLoadingError] = useState(null);
// // //   const [userInteracted, setUserInteracted] = useState(false);

// // //   const audioRef = useRef(null);
// // //   const youtubePlayerRef = useRef(null);
// // //   const ytIntervalRef = useRef(null);
// // //   const playerReadyRef = useRef(false);
// // //   const processedTracksRef = useRef(new Set());

// // //   // Helper: Check if value is valid number
// // //   const isValidNumber = (val) => {
// // //     return typeof val === "number" && !isNaN(val) && isFinite(val);
// // //   };

// // //   // Helper: Safely persist to localStorage with quota handling
// // //   const safeSaveToLocalStorage = (key, data) => {
// // //     try {
// // //       const jsonStr = JSON.stringify(data);
// // //       const sizeKB = new Blob([jsonStr]).size / 1024;

// // //       // Warn if approaching 5MB limit (most browsers)
// // //       if (sizeKB > 4500) {
// // //         console.warn(
// // //           `⚠️ localStorage usage high: ${sizeKB.toFixed(
// // //             0
// // //           )}KB. Consider removing old songs.`
// // //         );
// // //       }

// // //       localStorage.setItem(key, jsonStr);
// // //       return true;
// // //     } catch (e) {
// // //       if (e.name === "QuotaExceededError") {
// // //         console.error("localStorage quota exceeded. Clearing old songs...");
// // //         // Keep only last 10 songs to free space
// // //         const limitedData = Array.isArray(data) ? data.slice(-10) : data;
// // //         try {
// // //           localStorage.setItem(key, JSON.stringify(limitedData));
// // //           return true;
// // //         } catch (e2) {
// // //           console.error("Failed to save even after cleanup:", e2);
// // //           return false;
// // //         }
// // //       }
// // //       console.warn(`Failed to save to localStorage:`, e);
// // //       return false;
// // //     }
// // //   };

// // //   // Persist songs list with quota handling
// // //   useEffect(() => {
// // //     safeSaveToLocalStorage("melodymindSongs", songs);
// // //   }, [songs]);

// // //   // Persist last played state with validation
// // //   useEffect(() => {
// // //     if (!currentSong) return;

// // //     const validTime = isValidNumber(currentTime) ? currentTime : 0;
// // //     const state = {
// // //       lastSongId: currentSong.id || null,
// // //       lastSongSource: currentSong.source || null,
// // //       lastTime: validTime,
// // //     };
// // //     safeSaveToLocalStorage("melodymindLastState", state);
// // //   }, [currentSong?.id, currentSong?.source, currentTime]);

// // //   // On mount: restore last state (paused)
// // //   useEffect(() => {
// // //     try {
// // //       const raw = localStorage.getItem("melodymindLastState");
// // //       if (!raw) return;
// // //       const parsed = JSON.parse(raw);
// // //       if (!parsed || !parsed.lastSongId) return;

// // //       const found = songs.find((s) => s.id === parsed.lastSongId);
// // //       if (found) {
// // //         setCurrentSong(found);
// // //         const validTime = isValidNumber(parsed.lastTime) ? parsed.lastTime : 0;
// // //         setCurrentTime(validTime);
// // //         setIsPlaying(false);
// // //       }
// // //     } catch (e) {
// // //       console.warn("Failed to restore last state:", e);
// // //     }
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, []);

// // //   // Handle incoming track/playlist
// // //   useEffect(() => {
// // //     if (!incomingTrack?.id) return;
// // //     if (processedTracksRef.current.has(incomingTrack.id)) return;
// // //     processedTracksRef.current.add(incomingTrack.id);

// // //     const normalized = {
// // //       id: incomingTrack.id,
// // //       title: incomingTrack.name || incomingTrack.title,
// // //       artist:
// // //         incomingTrack.artists?.map((a) => a.name).join(", ") ||
// // //         incomingTrack.artist ||
// // //         "Unknown Artist",
// // //       album: incomingTrack.album?.name || "Unknown Album",
// // //       source: "youtube",
// // //     };

// // //     if (incomingPlaylist && Array.isArray(incomingPlaylist)) {
// // //       const normalizedPlaylist = incomingPlaylist.map((track) => ({
// // //         id: track.id,
// // //         title: track.name || track.title,
// // //         artist:
// // //           track.artists?.map((a) => a.name).join(", ") ||
// // //           track.artist ||
// // //           "Unknown Artist",
// // //         album: track.album?.name || "Unknown Album",
// // //         source: "youtube",
// // //       }));

// // //       setSongs((prev) => {
// // //         const ids = new Set(prev.map((p) => p.id));
// // //         const newTracks = normalizedPlaylist.filter((t) => !ids.has(t.id));
// // //         return [...prev, ...newTracks];
// // //       });
// // //     } else {
// // //       setSongs((prev) => {
// // //         const exists = prev.some((s) => s.id === normalized.id);
// // //         if (exists) return prev;
// // //         return [...prev, normalized];
// // //       });
// // //     }

// // //     selectSong(normalized);
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [incomingTrack?.id, incomingPlaylist]);

// // //   // ================= YouTube IFrame API (Fixed) =================
// // //   useEffect(() => {
// // //     const createPlayer = () => {
// // //       if (!window?.YT?.Player) return;
// // //       if (youtubePlayerRef.current && playerReadyRef.current) return;

// // //       console.log("🎬 Creating YouTube player...");

// // //       try {
// // //         youtubePlayerRef.current = new window.YT.Player("youtube-player", {
// // //           height: "0",
// // //           width: "0",
// // //           playerVars: { autoplay: 0, controls: 0, modestbranding: 1 },
// // //           events: {
// // //             onReady: () => {
// // //               playerReadyRef.current = true;
// // //               console.log("✅ YouTube player ready");
// // //             },
// // //             onStateChange: (e) => {
// // //               const YT = window.YT;
// // //               if (e.data === YT.PlayerState.PLAYING) {
// // //                 setIsPlaying(true);
// // //                 startYouTubeTimeTracking();
// // //               } else if (e.data === YT.PlayerState.PAUSED) {
// // //                 setIsPlaying(false);
// // //                 stopYouTubeTimeTracking();
// // //               } else if (e.data === YT.PlayerState.ENDED) {
// // //                 setIsPlaying(false);
// // //                 stopYouTubeTimeTracking();
// // //                 handleSongEnd();
// // //               }
// // //             },
// // //             onError: (err) => {
// // //               console.error("YouTube player error:", err);
// // //               setLoadingError("YouTube playback error");
// // //               setIsPlaying(false);
// // //             },
// // //           },
// // //         });
// // //       } catch (err) {
// // //         console.error("Failed to create YouTube player:", err);
// // //       }
// // //     };

// // //     const loadAPI = () => {
// // //       if (window.YT && window.YT.Player) {
// // //         console.log("✅ YouTube API already loaded");
// // //         createPlayer();
// // //         return;
// // //       }

// // //       if (!document.getElementById("youtube-iframe-api")) {
// // //         console.log("📥 Loading YouTube IFrame API...");
// // //         const tag = document.createElement("script");
// // //         tag.id = "youtube-iframe-api";
// // //         tag.src = "https://www.youtube.com/iframe_api";
// // //         document.body.appendChild(tag);
// // //       }

// // //       window.onYouTubeIframeAPIReady = () => {
// // //         console.log("✅ YouTube IFrame API loaded");
// // //         createPlayer();
// // //       };
// // //     };

// // //     loadAPI();

// // //     return () => {
// // //       stopYouTubeTimeTracking();
// // //     };
// // //   }, []);

// // //   const startYouTubeTimeTracking = () => {
// // //     stopYouTubeTimeTracking();
// // //     ytIntervalRef.current = setInterval(() => {
// // //       if (youtubePlayerRef.current?.getCurrentTime) {
// // //         try {
// // //           const cur = youtubePlayerRef.current.getCurrentTime();
// // //           const d = youtubePlayerRef.current.getDuration?.() || 0;

// // //           if (isValidNumber(cur)) setCurrentTime(cur);
// // //           if (isValidNumber(d) && duration !== d) setDuration(d);
// // //         } catch (e) {
// // //           // Ignore errors during tracking
// // //         }
// // //       }
// // //     }, 250);
// // //   };

// // //   const stopYouTubeTimeTracking = () => {
// // //     if (ytIntervalRef.current) {
// // //       clearInterval(ytIntervalRef.current);
// // //       ytIntervalRef.current = null;
// // //     }
// // //   };

// // //   // ================= YouTube Search =================
// // //   const searchYoutube = async (query) => {
// // //     if (!YT_API_KEY) throw new Error("YouTube API key not configured");
// // //     const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(
// // //       query
// // //     )}&key=${YT_API_KEY}`;
// // //     const res = await fetch(url);
// // //     const data = await res.json();
// // //     if (data.error) throw new Error(data.error.message || "YT API error");
// // //     if (!data.items || !data.items.length) return null;
// // //     const v = data.items[0];
// // //     return {
// // //       videoId: v.id.videoId,
// // //       title: v.snippet.title,
// // //       thumbnail: v.snippet.thumbnails?.default?.url,
// // //     };
// // //   };

// // //   // ================= Select & Play Song (Fixed) =================
// // //   const waitUntilPlayerReady = (timeout = 8000) =>
// // //     new Promise((resolve, reject) => {
// // //       const start = Date.now();
// // //       const check = () => {
// // //         if (playerReadyRef.current && youtubePlayerRef.current?.loadVideoById) {
// // //           return resolve(true);
// // //         }
// // //         if (Date.now() - start > timeout) {
// // //           return reject(new Error("YouTube player timeout"));
// // //         }
// // //         setTimeout(check, 300);
// // //       };
// // //       check();
// // //     });

// // //   const selectSong = async (song) => {
// // //     try {
// // //       setUserInteracted(true);
// // //       setLoadingError(null);
// // //       setIsLoadingYoutube(false);
// // //       setIsPlaying(false);
// // //       setCurrentTime(0);
// // //       setDuration(0);

// // //       console.log("Selecting:", song.title, song.source);

// // //       // LOCAL FILE
// // //       if (song.source === "local") {
// // //         stopYouTubeTimeTracking();
// // //         try {
// // //           if (youtubePlayerRef.current?.stopVideo) {
// // //             youtubePlayerRef.current.stopVideo();
// // //           }
// // //         } catch (e) {}

// // //         setCurrentSong(song);

// // //         if (audioRef.current && song.streamUrl) {
// // //           audioRef.current.src = song.streamUrl;
// // //           audioRef.current.load();

// // //           // Wait for metadata before playing
// // //           audioRef.current.addEventListener(
// // //             "loadedmetadata",
// // //             function onLoaded() {
// // //               audioRef.current.removeEventListener("loadedmetadata", onLoaded);
// // //               if (userInteracted) {
// // //                 audioRef.current.play().catch((err) => {
// // //                   console.warn("Auto-play blocked:", err);
// // //                   setIsPlaying(false);
// // //                 });
// // //               }
// // //             }
// // //           );
// // //         }
// // //         return;
// // //       }

// // //       // YOUTUBE
// // //       if (song.source === "youtube") {
// // //         setIsLoadingYoutube(true);

// // //         let videoId = song.youtubeId || song.youtubeIdManual || null;
// // //         if (!videoId) {
// // //           const query = `${song.title} ${song.artist}`;
// // //           const result = await searchYoutube(query);
// // //           if (!result) throw new Error("No YouTube result found");
// // //           videoId = result.videoId;
// // //         }

// // //         if (audioRef.current) {
// // //           try {
// // //             audioRef.current.pause();
// // //             audioRef.current.src = "";
// // //           } catch (e) {}
// // //         }

// // //         const updated = { ...song, youtubeId: videoId, source: "youtube" };
// // //         setCurrentSong(updated);

// // //         await waitUntilPlayerReady();

// // //         if (!youtubePlayerRef.current?.loadVideoById) {
// // //           throw new Error("YouTube player not ready");
// // //         }

// // //         youtubePlayerRef.current.loadVideoById(videoId);
// // //         setIsLoadingYoutube(false);
// // //         return;
// // //       }

// // //       throw new Error("Unsupported song source");
// // //     } catch (err) {
// // //       console.error("selectSong error:", err);
// // //       setLoadingError(err.message || "Playback error");
// // //       setIsLoadingYoutube(false);
// // //       setIsPlaying(false);
// // //     }
// // //   };

// // //   // Handle song end
// // //   const handleSongEnd = () => {
// // //     if (repeatMode === "one") {
// // //       if (currentSong?.source === "youtube" && youtubePlayerRef.current) {
// // //         try {
// // //           youtubePlayerRef.current.seekTo(0);
// // //           youtubePlayerRef.current.playVideo();
// // //         } catch (e) {}
// // //       } else if (audioRef.current) {
// // //         audioRef.current.currentTime = 0;
// // //         audioRef.current.play();
// // //       }
// // //     } else if (repeatMode === "all") {
// // //       playNext();
// // //     } else {
// // //       setIsPlaying(false);
// // //     }
// // //   };

// // //   // Navigation
// // //   const playNext = useCallback(() => {
// // //     if (!songs.length) return;
// // //     const currentIdx = songs.findIndex((s) => s.id === currentSong?.id);
// // //     const nextIndex = isShuffled
// // //       ? Math.floor(Math.random() * songs.length)
// // //       : (currentIdx + 1) % songs.length;
// // //     const next = songs[nextIndex];
// // //     if (next) selectSong(next);
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [songs, currentSong, isShuffled]);

// // //   const playPrevious = useCallback(() => {
// // //     if (!songs.length) return;
// // //     const idx = songs.findIndex((s) => s.id === currentSong?.id);
// // //     const prevIndex = idx <= 0 ? songs.length - 1 : idx - 1;
// // //     const prev = songs[prevIndex];
// // //     if (prev) selectSong(prev);
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [songs, currentSong]);

// // //   // Audio event handlers
// // //   useEffect(() => {
// // //     const audio = audioRef.current;
// // //     if (!audio) return;

// // //     const onTime = () => {
// // //       const time = audio.currentTime;
// // //       if (isValidNumber(time)) setCurrentTime(time);
// // //     };

// // //     const onLoaded = () => {
// // //       const dur = audio.duration;
// // //       if (isValidNumber(dur)) setDuration(dur);
// // //     };

// // //     const onEnded = () => handleSongEnd();

// // //     const onError = (e) => {
// // //       console.error("Audio error:", e);
// // //       setLoadingError("Audio playback error");
// // //       setIsPlaying(false);
// // //     };

// // //     audio.addEventListener("timeupdate", onTime);
// // //     audio.addEventListener("loadedmetadata", onLoaded);
// // //     audio.addEventListener("ended", onEnded);
// // //     audio.addEventListener("error", onError);

// // //     return () => {
// // //       audio.removeEventListener("timeupdate", onTime);
// // //       audio.removeEventListener("loadedmetadata", onLoaded);
// // //       audio.removeEventListener("ended", onEnded);
// // //       audio.removeEventListener("error", onError);
// // //     };
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, []);

// // //   // Play/Pause sync
// // //   useEffect(() => {
// // //     if (!currentSong) return;

// // //     if (currentSong.source === "local") {
// // //       const audio = audioRef.current;
// // //       if (!audio) return;

// // //       if (isPlaying) {
// // //         audio.play().catch((e) => {
// // //           console.warn("Audio play failed:", e);
// // //           setIsPlaying(false);
// // //         });
// // //       } else {
// // //         audio.pause();
// // //       }
// // //     }

// // //     if (currentSong.source === "youtube") {
// // //       if (!playerReadyRef.current || !youtubePlayerRef.current) return;

// // //       try {
// // //         if (isPlaying) {
// // //           youtubePlayerRef.current.playVideo();
// // //         } else {
// // //           youtubePlayerRef.current.pauseVideo();
// // //         }
// // //       } catch (e) {
// // //         console.warn("YT play/pause error:", e);
// // //       }
// // //     }
// // //   }, [isPlaying, currentSong]);

// // //   // Volume sync
// // //   useEffect(() => {
// // //     if (audioRef.current) {
// // //       audioRef.current.volume = volume;
// // //     }
// // //     if (youtubePlayerRef.current?.setVolume) {
// // //       try {
// // //         youtubePlayerRef.current.setVolume(Math.round(volume * 100));
// // //       } catch (e) {}
// // //     }
// // //   }, [volume]);

// // //   // Seek control (FIXED)
// // //   const handleSeek = (newTime) => {
// // //     if (!isValidNumber(newTime)) {
// // //       console.warn("Invalid seek time:", newTime);
// // //       return;
// // //     }

// // //     setCurrentTime(newTime);

// // //     if (currentSong?.source === "local" && audioRef.current) {
// // //       audioRef.current.currentTime = newTime;
// // //     } else if (currentSong?.source === "youtube" && youtubePlayerRef.current) {
// // //       try {
// // //         youtubePlayerRef.current.seekTo(newTime, true);
// // //       } catch (e) {
// // //         console.warn("YT seek error:", e);
// // //       }
// // //     }
// // //   };

// // //   // File upload with quota warning
// // //   const handleFileUpload = (e) => {
// // //     const files = Array.from(e.target.files || []);
// // //     if (!files.length) return;

// // //     const readers = files.map((file, idx) => {
// // //       return new Promise((resolve, reject) => {
// // //         const reader = new FileReader();
// // //         reader.onload = (ev) => {
// // //           const base64 = ev.target.result;
// // //           const song = {
// // //             id: `local-${Date.now()}-${idx}`,
// // //             title: file.name.replace(/\.[^/.]+$/, ""),
// // //             artist: "Local File",
// // //             album: "Device",
// // //             streamUrl: base64,
// // //             source: "local",
// // //           };
// // //           resolve(song);
// // //         };
// // //         reader.onerror = (err) => reject(err);
// // //         reader.readAsDataURL(file);
// // //       });
// // //     });

// // //     Promise.all(readers)
// // //       .then((newSongs) => {
// // //         setSongs((prev) => {
// // //           const existingKeys = new Set(
// // //             prev.map((p) => p.title + (p.streamUrl?.slice(0, 50) || ""))
// // //           );
// // //           const filtered = newSongs.filter(
// // //             (ns) => !existingKeys.has(ns.title + ns.streamUrl?.slice(0, 50))
// // //           );
// // //           return [...prev, ...filtered];
// // //         });
// // //       })
// // //       .catch((err) => console.error("Failed to read files:", err));
// // //   };

// // //   // Remove song
// // //   const removeSong = (id) => {
// // //     removedSongsRef.current.add(id);
// // //     setSongs((prev) => prev.filter((s) => s.id !== id));

// // //     if (currentSong?.id === id) {
// // //       setCurrentSong(null);
// // //       setIsPlaying(false);
// // //       setCurrentTime(0);
// // //       setDuration(0);

// // //       if (audioRef.current) {
// // //         audioRef.current.pause();
// // //         audioRef.current.src = "";
// // //       }
// // //       try {
// // //         if (youtubePlayerRef.current?.stopVideo) {
// // //           youtubePlayerRef.current.stopVideo();
// // //         }
// // //       } catch (e) {}
// // //     }
// // //   };

// // //   const retryLoad = () => {
// // //     if (currentSong) selectSong({ ...currentSong });
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
// // //       <header className="bg-black/30 backdrop-blur-sm border-b border-white/10 px-6 py-4 flex justify-between items-center">
// // //         <Link to="/" className="font-['Pacifico'] text-2xl text-white">
// // //           MelodyMind
// // //         </Link>
// // //         <div className="flex gap-4 items-center">
// // //           <button
// // //             onClick={() => setShowVoiceControl(!showVoiceControl)}
// // //             className={`p-3 rounded-full transition-all ${
// // //               showVoiceControl
// // //                 ? "bg-purple-600 text-white"
// // //                 : "bg-white/10 text-purple-300 hover:bg-purple-600 hover:text-white"
// // //             }`}
// // //           >
// // //             🎤
// // //           </button>

// // //           <label
// // //             htmlFor="audio-upload"
// // //             className="cursor-pointer bg-white/10 text-purple-300 hover:bg-purple-600 hover:text-white px-4 py-2 rounded-full"
// // //           >
// // //             ⬆ Upload
// // //           </label>

// // //           <Link
// // //             to="/MoodDetection"
// // //             className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-full font-semibold transition-all"
// // //           >
// // //             Mood Detection
// // //           </Link>
// // //         </div>
// // //       </header>

// // //       <div className="flex flex-1">
// // //         <PlaylistSidebar
// // //           songs={songs}
// // //           currentSong={currentSong}
// // //           onSongSelect={selectSong}
// // //           onRemoveSong={removeSong}
// // //         />

// // //         <div className="flex-1 flex flex-col">
// // //           {showVoiceControl && (
// // //             <VoiceControl
// // //               playMusic={() => {
// // //                 setUserInteracted(true);
// // //                 setIsPlaying(true);
// // //               }}
// // //               pauseMusic={() => setIsPlaying(false)}
// // //               nextSong={playNext}
// // //               prevSong={playPrevious}
// // //               increaseVolume={() =>
// // //                 setVolume((v) => Math.min(1, +(v + 0.1).toFixed(1)))
// // //               }
// // //               decreaseVolume={() =>
// // //                 setVolume((v) => Math.max(0, +(v - 0.1).toFixed(1)))
// // //               }
// // //               toggleShuffle={(val) => setIsShuffled(val)}
// // //             />
// // //           )}

// // //           <div className="flex-1 flex items-center justify-center p-8">
// // //             {!YT_API_KEY ? (
// // //               <div className="text-center text-yellow-400 max-w-md">
// // //                 <div className="text-4xl mb-4">⚠️</div>
// // //                 <p className="text-lg mb-2">YouTube API Key Required</p>
// // //                 <p className="text-sm mb-4">
// // //                   Please add REACT_APP_YOUTUBE_API_KEY to your .env
// // //                 </p>
// // //               </div>
// // //             ) : isLoadingYoutube ? (
// // //               <div className="text-center text-white">
// // //                 <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
// // //                 <p className="text-lg">Finding on YouTube...</p>
// // //                 <p className="text-sm text-gray-400 mt-2">
// // //                   {currentSong?.title || "Loading"}
// // //                 </p>
// // //               </div>
// // //             ) : loadingError ? (
// // //               <div className="text-center text-red-400 max-w-md">
// // //                 <div className="text-4xl mb-4">⚠️</div>
// // //                 <p className="text-lg mb-2">Playback Error</p>
// // //                 <p className="text-sm mb-4">{loadingError}</p>
// // //                 <button
// // //                   onClick={retryLoad}
// // //                   className="bg-purple-600 px-6 py-2 rounded-full text-white hover:bg-purple-700 transition"
// // //                 >
// // //                   🔄 Retry
// // //                 </button>
// // //               </div>
// // //             ) : currentSong ? (
// // //               <NowPlaying currentSong={currentSong} />
// // //             ) : (
// // //               <div className="text-center text-gray-400">
// // //                 <div className="text-6xl mb-4">🎵</div>
// // //                 <p className="text-lg">No song selected</p>
// // //                 <p className="text-sm mt-2">
// // //                   Upload local files or detect your mood
// // //                 </p>
// // //               </div>
// // //             )}
// // //           </div>

// // //           <PlayerControls
// // //             currentSong={currentSong}
// // //             isPlaying={isPlaying}
// // //             setIsPlaying={(playing) => {
// // //               setUserInteracted(true);
// // //               setIsPlaying(playing);
// // //             }}
// // //             currentTime={currentTime}
// // //             setCurrentTime={handleSeek}
// // //             duration={duration}
// // //             volume={volume}
// // //             setVolume={setVolume}
// // //             isShuffled={isShuffled}
// // //             setIsShuffled={setIsShuffled}
// // //             repeatMode={repeatMode}
// // //             setRepeatMode={setRepeatMode}
// // //             onNext={playNext}
// // //             onPrevious={playPrevious}
// // //           />
// // //         </div>
// // //       </div>

// // //       <div id="youtube-player" style={{ display: "none" }} />

// // //       {currentSong?.source === "local" && currentSong?.streamUrl && (
// // //         <audio ref={audioRef} preload="auto" />
// // //       )}

// // //       <input
// // //         type="file"
// // //         id="audio-upload"
// // //         multiple
// // //         accept="audio/*"
// // //         onChange={handleFileUpload}
// // //         className="hidden"
// // //       />
// // //     </div>
// // //   );
// // // }
// // "use client";

// // import { useState, useRef, useEffect, useCallback } from "react";
// // import { Link, useLocation } from "react-router-dom";
// // import PlayerControls from "../components/player/PlayerControls";
// // import PlaylistSidebar from "../components/player/PlaylistSidebar";
// // import NowPlaying from "../components/player/NowPlaying";
// // import VoiceControl from "../components/player/VoiceControl";

// // // ====== MelodyMind Player (Fixed: localStorage + seek issues) ======

// // export default function Player() {
// //   const location = useLocation();
// //   const incomingTrack = location.state?.track || null;
// //   const incomingPlaylist = location.state?.playlist || null;
// //   const removedSongsRef = useRef(new Set());

// //   const YT_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY || "";

// //   // Load songs - DON'T store local files in localStorage (too large!)
// //   const [songs, setSongs] = useState(() => {
// //     try {
// //       const saved = localStorage.getItem("melodymindSongs");
// //       if (!saved) return [];
// //       const parsed = JSON.parse(saved);
// //       // Filter out local files from localStorage on load
// //       return Array.isArray(parsed)
// //         ? parsed.filter((s) => s.source !== "local")
// //         : [];
// //     } catch (e) {
// //       console.warn("Failed to read saved songs:", e);
// //       localStorage.removeItem("melodymindSongs"); // Clear corrupted data
// //       return [];
// //     }
// //   });

// //   // Separate state for local files (in-memory only, not persisted)
// //   const [localFiles, setLocalFiles] = useState([]);

// //   const [currentSong, setCurrentSong] = useState(null);
// //   const [isPlaying, setIsPlaying] = useState(false);
// //   const [currentTime, setCurrentTime] = useState(0);
// //   const [duration, setDuration] = useState(0);
// //   const [volume, setVolume] = useState(0.7);
// //   const [isShuffled, setIsShuffled] = useState(false);
// //   const [repeatMode, setRepeatMode] = useState("none");
// //   const [showVoiceControl, setShowVoiceControl] = useState(false);
// //   const [isLoadingYoutube, setIsLoadingYoutube] = useState(false);
// //   const [loadingError, setLoadingError] = useState(null);
// //   const [userInteracted, setUserInteracted] = useState(false);

// //   const audioRef = useRef(null);
// //   const youtubePlayerRef = useRef(null);
// //   const ytIntervalRef = useRef(null);
// //   const playerReadyRef = useRef(false);
// //   const processedTracksRef = useRef(new Set());

// //   // Combined playlist (YouTube + local files)
// //   const allSongs = [...songs, ...localFiles];

// //   // Helper: Check if value is valid number
// //   const isValidNumber = (val) => {
// //     return typeof val === "number" && !isNaN(val) && isFinite(val);
// //   };

// //   // Persist only YouTube songs (never local files with base64 data!)
// //   useEffect(() => {
// //     try {
// //       // Only save YouTube tracks (no streamUrl data)
// //       const youtubeOnly = songs.filter(
// //         (s) => s.source === "youtube" || !s.streamUrl
// //       );
// //       localStorage.setItem("melodymindSongs", JSON.stringify(youtubeOnly));
// //     } catch (e) {
// //       console.warn("Failed to save songs:", e);
// //       // Clear if save fails
// //       try {
// //         localStorage.removeItem("melodymindSongs");
// //       } catch {}
// //     }
// //   }, [songs]);

// //   // Persist last played state
// //   useEffect(() => {
// //     if (!currentSong) return;

// //     const validTime = isValidNumber(currentTime) ? currentTime : 0;
// //     const state = {
// //       lastSongId: currentSong.id || null,
// //       lastSongSource: currentSong.source || null,
// //       lastTime: validTime,
// //     };
// //     try {
// //       localStorage.setItem("melodymindLastState", JSON.stringify(state));
// //     } catch (e) {
// //       console.warn("Failed to save last state:", e);
// //     }
// //   }, [currentSong?.id, currentSong?.source, currentTime]);

// //   // Restore last state on mount
// //   useEffect(() => {
// //     try {
// //       const raw = localStorage.getItem("melodymindLastState");
// //       if (!raw) return;
// //       const parsed = JSON.parse(raw);
// //       if (!parsed || !parsed.lastSongId) return;

// //       const found = allSongs.find((s) => s.id === parsed.lastSongId);
// //       if (found) {
// //         setCurrentSong(found);
// //         const validTime = isValidNumber(parsed.lastTime) ? parsed.lastTime : 0;
// //         setCurrentTime(validTime);
// //         setIsPlaying(false);
// //       }
// //     } catch (e) {
// //       console.warn("Failed to restore last state:", e);
// //     }
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, []);

// //   // Handle incoming YouTube track/playlist
// //   useEffect(() => {
// //     if (!incomingTrack?.id) return;
// //     if (processedTracksRef.current.has(incomingTrack.id)) return;
// //     processedTracksRef.current.add(incomingTrack.id);

// //     const normalized = {
// //       id: incomingTrack.id,
// //       title: incomingTrack.name || incomingTrack.title,
// //       artist:
// //         incomingTrack.artists?.map((a) => a.name).join(", ") ||
// //         incomingTrack.artist ||
// //         "Unknown Artist",
// //       album: incomingTrack.album?.name || "Unknown Album",
// //       source: "youtube",
// //     };

// //     if (incomingPlaylist && Array.isArray(incomingPlaylist)) {
// //       const normalizedPlaylist = incomingPlaylist.map((track) => ({
// //         id: track.id,
// //         title: track.name || track.title,
// //         artist:
// //           track.artists?.map((a) => a.name).join(", ") ||
// //           track.artist ||
// //           "Unknown Artist",
// //         album: track.album?.name || "Unknown Album",
// //         source: "youtube",
// //       }));

// //       setSongs((prev) => {
// //         const ids = new Set(prev.map((p) => p.id));
// //         const newTracks = normalizedPlaylist.filter((t) => !ids.has(t.id));
// //         return [...prev, ...newTracks];
// //       });
// //     } else {
// //       setSongs((prev) => {
// //         const exists = prev.some((s) => s.id === normalized.id);
// //         if (exists) return prev;
// //         return [...prev, normalized];
// //       });
// //     }

// //     selectSong(normalized);
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [incomingTrack?.id, incomingPlaylist]);

// //   // ================= YouTube IFrame API =================
// //   useEffect(() => {
// //     const createPlayer = () => {
// //       if (!window?.YT?.Player) return;
// //       if (youtubePlayerRef.current && playerReadyRef.current) return;

// //       console.log("🎬 Creating YouTube player...");

// //       try {
// //         youtubePlayerRef.current = new window.YT.Player("youtube-player", {
// //           height: "0",
// //           width: "0",
// //           playerVars: { autoplay: 0, controls: 0, modestbranding: 1 },
// //           events: {
// //             onReady: () => {
// //               playerReadyRef.current = true;
// //               console.log("✅ YouTube player ready");
// //             },
// //             onStateChange: (e) => {
// //               const YT = window.YT;
// //               if (e.data === YT.PlayerState.PLAYING) {
// //                 setIsPlaying(true);
// //                 startYouTubeTimeTracking();
// //               } else if (e.data === YT.PlayerState.PAUSED) {
// //                 setIsPlaying(false);
// //                 stopYouTubeTimeTracking();
// //               } else if (e.data === YT.PlayerState.ENDED) {
// //                 setIsPlaying(false);
// //                 stopYouTubeTimeTracking();
// //                 handleSongEnd();
// //               }
// //             },
// //             onError: (err) => {
// //               console.error("YouTube player error:", err);
// //               setLoadingError("YouTube playback error");
// //               setIsPlaying(false);
// //             },
// //           },
// //         });
// //       } catch (err) {
// //         console.error("Failed to create YouTube player:", err);
// //       }
// //     };

// //     const loadAPI = () => {
// //       if (window.YT && window.YT.Player) {
// //         createPlayer();
// //         return;
// //       }

// //       if (!document.getElementById("youtube-iframe-api")) {
// //         const tag = document.createElement("script");
// //         tag.id = "youtube-iframe-api";
// //         tag.src = "https://www.youtube.com/iframe_api";
// //         document.body.appendChild(tag);
// //       }

// //       window.onYouTubeIframeAPIReady = () => {
// //         createPlayer();
// //       };
// //     };

// //     loadAPI();

// //     return () => {
// //       stopYouTubeTimeTracking();
// //     };
// //   }, []);

// //   const startYouTubeTimeTracking = () => {
// //     stopYouTubeTimeTracking();
// //     ytIntervalRef.current = setInterval(() => {
// //       if (youtubePlayerRef.current?.getCurrentTime) {
// //         try {
// //           const cur = youtubePlayerRef.current.getCurrentTime();
// //           const d = youtubePlayerRef.current.getDuration?.() || 0;

// //           if (isValidNumber(cur)) setCurrentTime(cur);
// //           if (isValidNumber(d) && duration !== d) setDuration(d);
// //         } catch (e) {
// //           // Ignore errors
// //         }
// //       }
// //     }, 250);
// //   };

// //   const stopYouTubeTimeTracking = () => {
// //     if (ytIntervalRef.current) {
// //       clearInterval(ytIntervalRef.current);
// //       ytIntervalRef.current = null;
// //     }
// //   };

// //   // ================= YouTube Search =================
// //   const searchYoutube = async (query) => {
// //     if (!YT_API_KEY) throw new Error("YouTube API key not configured");
// //     const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(
// //       query
// //     )}&key=${YT_API_KEY}`;
// //     const res = await fetch(url);
// //     const data = await res.json();
// //     if (data.error) throw new Error(data.error.message || "YT API error");
// //     if (!data.items || !data.items.length) return null;
// //     const v = data.items[0];
// //     return {
// //       videoId: v.id.videoId,
// //       title: v.snippet.title,
// //       thumbnail: v.snippet.thumbnails?.default?.url,
// //     };
// //   };

// //   // ================= Select & Play Song =================
// //   const waitUntilPlayerReady = (timeout = 8000) =>
// //     new Promise((resolve, reject) => {
// //       const start = Date.now();
// //       const check = () => {
// //         if (playerReadyRef.current && youtubePlayerRef.current?.loadVideoById) {
// //           return resolve(true);
// //         }
// //         if (Date.now() - start > timeout) {
// //           return reject(new Error("YouTube player timeout"));
// //         }
// //         setTimeout(check, 300);
// //       };
// //       check();
// //     });

// //   const selectSong = async (song) => {
// //     try {
// //       setUserInteracted(true);
// //       setLoadingError(null);
// //       setIsLoadingYoutube(false);

// //       // DON'T reset isPlaying and currentTime here - let the song load first
// //       // setIsPlaying(false);
// //       // setCurrentTime(0);
// //       setDuration(0);

// //       console.log("Selecting:", song.title, song.source);

// //       // LOCAL FILE
// //       if (song.source === "local") {
// //         stopYouTubeTimeTracking();
// //         try {
// //           if (youtubePlayerRef.current?.stopVideo) {
// //             youtubePlayerRef.current.stopVideo();
// //           }
// //         } catch (e) {}

// //         // Stop current audio if playing different song
// //         if (audioRef.current && currentSong?.id !== song.id) {
// //           audioRef.current.pause();
// //           audioRef.current.currentTime = 0;
// //         }

// //         setCurrentSong(song);
// //         setCurrentTime(0); // Reset time for new song

// //         if (audioRef.current && song.streamUrl) {
// //           audioRef.current.src = song.streamUrl;
// //           audioRef.current.load();

// //           // Wait for metadata, then auto-play
// //           const onLoaded = () => {
// //             audioRef.current.removeEventListener("loadedmetadata", onLoaded);
// //             audioRef.current.removeEventListener("error", onError);

// //             // Auto-play the song
// //             audioRef.current
// //               .play()
// //               .then(() => {
// //                 setIsPlaying(true); // Update UI after successful play
// //               })
// //               .catch((err) => {
// //                 console.warn("Auto-play blocked:", err);
// //                 setIsPlaying(false);
// //               });
// //           };

// //           const onError = () => {
// //             audioRef.current.removeEventListener("loadedmetadata", onLoaded);
// //             audioRef.current.removeEventListener("error", onError);
// //             setLoadingError("Failed to load audio file");
// //             setIsPlaying(false);
// //           };

// //           audioRef.current.addEventListener("loadedmetadata", onLoaded);
// //           audioRef.current.addEventListener("error", onError);
// //         }
// //         return;
// //       }

// //       // YOUTUBE
// //       if (song.source === "youtube") {
// //         setIsLoadingYoutube(true);

// //         let videoId = song.youtubeId || song.youtubeIdManual || null;
// //         if (!videoId) {
// //           const query = `${song.title} ${song.artist}`;
// //           const result = await searchYoutube(query);
// //           if (!result) throw new Error("No YouTube result found");
// //           videoId = result.videoId;
// //         }

// //         if (audioRef.current) {
// //           try {
// //             audioRef.current.pause();
// //             audioRef.current.src = "";
// //           } catch (e) {}
// //         }

// //         const updated = { ...song, youtubeId: videoId, source: "youtube" };
// //         setCurrentSong(updated);

// //         await waitUntilPlayerReady();

// //         if (!youtubePlayerRef.current?.loadVideoById) {
// //           throw new Error("YouTube player not ready");
// //         }

// //         youtubePlayerRef.current.loadVideoById(videoId);
// //         setIsLoadingYoutube(false);
// //         return;
// //       }

// //       throw new Error("Unsupported song source");
// //     } catch (err) {
// //       console.error("selectSong error:", err);
// //       setLoadingError(err.message || "Playback error");
// //       setIsLoadingYoutube(false);
// //       setIsPlaying(false);
// //     }
// //   };

// //   // Handle song end
// //   const handleSongEnd = () => {
// //     if (repeatMode === "one") {
// //       if (currentSong?.source === "youtube" && youtubePlayerRef.current) {
// //         try {
// //           youtubePlayerRef.current.seekTo(0);
// //           youtubePlayerRef.current.playVideo();
// //         } catch (e) {}
// //       } else if (audioRef.current) {
// //         audioRef.current.currentTime = 0;
// //         audioRef.current.play();
// //       }
// //     } else if (repeatMode === "all") {
// //       playNext();
// //     } else {
// //       setIsPlaying(false);
// //     }
// //   };

// //   // Navigation
// //   const playNext = useCallback(() => {
// //     if (!allSongs.length) return;
// //     const currentIdx = allSongs.findIndex((s) => s.id === currentSong?.id);
// //     const nextIndex = isShuffled
// //       ? Math.floor(Math.random() * allSongs.length)
// //       : (currentIdx + 1) % allSongs.length;
// //     const next = allSongs[nextIndex];
// //     if (next) selectSong(next);
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [allSongs, currentSong, isShuffled]);

// //   const playPrevious = useCallback(() => {
// //     if (!allSongs.length) return;
// //     const idx = allSongs.findIndex((s) => s.id === currentSong?.id);
// //     const prevIndex = idx <= 0 ? allSongs.length - 1 : idx - 1;
// //     const prev = allSongs[prevIndex];
// //     if (prev) selectSong(prev);
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [allSongs, currentSong]);

// //   // Audio event handlers
// //   useEffect(() => {
// //     const audio = audioRef.current;
// //     if (!audio) return;

// //     const onTime = () => {
// //       const time = audio.currentTime;
// //       if (isValidNumber(time)) setCurrentTime(time);
// //     };

// //     const onLoaded = () => {
// //       const dur = audio.duration;
// //       if (isValidNumber(dur)) setDuration(dur);
// //     };

// //     const onEnded = () => handleSongEnd();

// //     const onError = (e) => {
// //       console.error("Audio error:", e);
// //       setLoadingError("Audio playback error");
// //       setIsPlaying(false);
// //     };

// //     audio.addEventListener("timeupdate", onTime);
// //     audio.addEventListener("loadedmetadata", onLoaded);
// //     audio.addEventListener("ended", onEnded);
// //     audio.addEventListener("error", onError);

// //     return () => {
// //       audio.removeEventListener("timeupdate", onTime);
// //       audio.removeEventListener("loadedmetadata", onLoaded);
// //       audio.removeEventListener("ended", onEnded);
// //       audio.removeEventListener("error", onError);
// //     };
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, []);

// //   // Play/Pause sync - DON'T reset currentTime!
// //   useEffect(() => {
// //     if (!currentSong) return;

// //     if (currentSong.source === "local") {
// //       const audio = audioRef.current;
// //       if (!audio) return;

// //       // Check if audio is ready before playing
// //       if (isPlaying) {
// //         if (audio.readyState >= 2) {
// //           // HAVE_CURRENT_DATA or better
// //           audio.play().catch((e) => {
// //             console.warn("Audio play failed:", e);
// //             setIsPlaying(false);
// //           });
// //         }
// //       } else {
// //         audio.pause();
// //       }
// //     }

// //     if (currentSong.source === "youtube") {
// //       if (!playerReadyRef.current || !youtubePlayerRef.current) return;

// //       try {
// //         if (isPlaying) {
// //           youtubePlayerRef.current.playVideo();
// //         } else {
// //           youtubePlayerRef.current.pauseVideo();
// //         }
// //       } catch (e) {
// //         console.warn("YT play/pause error:", e);
// //       }
// //     }
// //   }, [isPlaying, currentSong]);

// //   // Volume sync
// //   useEffect(() => {
// //     if (audioRef.current) {
// //       audioRef.current.volume = volume;
// //     }
// //     if (youtubePlayerRef.current?.setVolume) {
// //       try {
// //         youtubePlayerRef.current.setVolume(Math.round(volume * 100));
// //       } catch (e) {}
// //     }
// //   }, [volume]);

// //   // Seek control (FIXED - expects number, not function!)
// //   const handleSeek = useCallback(
// //     (newTime) => {
// //       // PlayerControls sometimes passes a function - handle that
// //       const timeValue =
// //         typeof newTime === "function" ? newTime(currentTime) : newTime;

// //       if (!isValidNumber(timeValue)) {
// //         console.warn("Invalid seek time:", newTime);
// //         return;
// //       }

// //       setCurrentTime(timeValue);

// //       if (currentSong?.source === "local" && audioRef.current) {
// //         audioRef.current.currentTime = timeValue;
// //       } else if (
// //         currentSong?.source === "youtube" &&
// //         youtubePlayerRef.current
// //       ) {
// //         try {
// //           youtubePlayerRef.current.seekTo(timeValue, true);
// //         } catch (e) {
// //           console.warn("YT seek error:", e);
// //         }
// //       }
// //     },
// //     [currentSong, currentTime]
// //   );

// //   // File upload - store in memory only!
// //   const handleFileUpload = (e) => {
// //     const files = Array.from(e.target.files || []);
// //     if (!files.length) return;

// //     const readers = files.map((file, idx) => {
// //       return new Promise((resolve, reject) => {
// //         const reader = new FileReader();
// //         reader.onload = (ev) => {
// //           const base64 = ev.target.result;
// //           const song = {
// //             id: `local-${Date.now()}-${idx}`,
// //             title: file.name.replace(/\.[^/.]+$/, ""),
// //             artist: "Local File",
// //             album: "Device",
// //             streamUrl: base64,
// //             source: "local",
// //           };
// //           resolve(song);
// //         };
// //         reader.onerror = (err) => reject(err);
// //         reader.readAsDataURL(file);
// //       });
// //     });

// //     Promise.all(readers)
// //       .then((newSongs) => {
// //         setLocalFiles((prev) => {
// //           const existingKeys = new Set(
// //             prev.map((p) => p.title + (p.streamUrl?.slice(0, 50) || ""))
// //           );
// //           const filtered = newSongs.filter(
// //             (ns) => !existingKeys.has(ns.title + ns.streamUrl?.slice(0, 50))
// //           );
// //           return [...prev, ...filtered];
// //         });
// //       })
// //       .catch((err) => console.error("Failed to read files:", err));
// //   };

// //   // Remove song
// //   const removeSong = (id) => {
// //     removedSongsRef.current.add(id);

// //     // Remove from appropriate list
// //     setSongs((prev) => prev.filter((s) => s.id !== id));
// //     setLocalFiles((prev) => prev.filter((s) => s.id !== id));

// //     if (currentSong?.id === id) {
// //       setCurrentSong(null);
// //       setIsPlaying(false);
// //       setCurrentTime(0);
// //       setDuration(0);

// //       if (audioRef.current) {
// //         audioRef.current.pause();
// //         audioRef.current.src = "";
// //       }
// //       try {
// //         if (youtubePlayerRef.current?.stopVideo) {
// //           youtubePlayerRef.current.stopVideo();
// //         }
// //       } catch (e) {}
// //     }
// //   };

// //   const retryLoad = () => {
// //     if (currentSong) selectSong({ ...currentSong });
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
// //       <header className="bg-black/30 backdrop-blur-sm border-b border-white/10 px-6 py-4 flex justify-between items-center">
// //         <Link to="/" className="font-['Pacifico'] text-2xl text-white">
// //           MelodyMind
// //         </Link>
// //         <div className="flex gap-4 items-center">
// //           <button
// //             onClick={() => setShowVoiceControl(!showVoiceControl)}
// //             className={`p-3 rounded-full transition-all ${
// //               showVoiceControl
// //                 ? "bg-purple-600 text-white"
// //                 : "bg-white/10 text-purple-300 hover:bg-purple-600 hover:text-white"
// //             }`}
// //           >
// //             🎤
// //           </button>

// //           <label
// //             htmlFor="audio-upload"
// //             className="cursor-pointer bg-white/10 text-purple-300 hover:bg-purple-600 hover:text-white px-4 py-2 rounded-full"
// //           >
// //             ⬆ Upload
// //           </label>

// //           <Link
// //             to="/MoodDetection"
// //             className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-full font-semibold transition-all"
// //           >
// //             Mood Detection
// //           </Link>
// //         </div>
// //       </header>

// //       <div className="flex flex-1">
// //         <PlaylistSidebar
// //           songs={allSongs}
// //           currentSong={currentSong}
// //           onSongSelect={selectSong}
// //           onRemoveSong={removeSong}
// //         />

// //         <div className="flex-1 flex flex-col">
// //           {showVoiceControl && (
// //             <VoiceControl
// //               playMusic={() => {
// //                 setUserInteracted(true);
// //                 setIsPlaying(true);
// //               }}
// //               pauseMusic={() => setIsPlaying(false)}
// //               nextSong={playNext}
// //               prevSong={playPrevious}
// //               increaseVolume={() =>
// //                 setVolume((v) => Math.min(1, +(v + 0.1).toFixed(1)))
// //               }
// //               decreaseVolume={() =>
// //                 setVolume((v) => Math.max(0, +(v - 0.1).toFixed(1)))
// //               }
// //               toggleShuffle={(val) => setIsShuffled(val)}
// //             />
// //           )}

// //           <div className="flex-1 flex items-center justify-center p-8">
// //             {!YT_API_KEY ? (
// //               <div className="text-center text-yellow-400 max-w-md">
// //                 <div className="text-4xl mb-4">⚠️</div>
// //                 <p className="text-lg mb-2">YouTube API Key Required</p>
// //                 <p className="text-sm mb-4">
// //                   Please add REACT_APP_YOUTUBE_API_KEY to your .env
// //                 </p>
// //               </div>
// //             ) : isLoadingYoutube ? (
// //               <div className="text-center text-white">
// //                 <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
// //                 <p className="text-lg">Finding on YouTube...</p>
// //                 <p className="text-sm text-gray-400 mt-2">
// //                   {currentSong?.title || "Loading"}
// //                 </p>
// //               </div>
// //             ) : loadingError ? (
// //               <div className="text-center text-red-400 max-w-md">
// //                 <div className="text-4xl mb-4">⚠️</div>
// //                 <p className="text-lg mb-2">Playback Error</p>
// //                 <p className="text-sm mb-4">{loadingError}</p>
// //                 <button
// //                   onClick={retryLoad}
// //                   className="bg-purple-600 px-6 py-2 rounded-full text-white hover:bg-purple-700 transition"
// //                 >
// //                   🔄 Retry
// //                 </button>
// //               </div>
// //             ) : currentSong ? (
// //               <NowPlaying currentSong={currentSong} />
// //             ) : (
// //               <div className="text-center text-gray-400">
// //                 <div className="text-6xl mb-4">🎵</div>
// //                 <p className="text-lg">No song selected</p>
// //                 <p className="text-sm mt-2">
// //                   Upload local files or detect your mood
// //                 </p>
// //               </div>
// //             )}
// //           </div>

// //           <PlayerControls
// //             currentSong={currentSong}
// //             isPlaying={isPlaying}
// //             setIsPlaying={(playing) => {
// //               setUserInteracted(true);
// //               setIsPlaying(playing);
// //             }}
// //             currentTime={currentTime}
// //             setCurrentTime={handleSeek}
// //             duration={duration}
// //             volume={volume}
// //             setVolume={setVolume}
// //             isShuffled={isShuffled}
// //             setIsShuffled={setIsShuffled}
// //             repeatMode={repeatMode}
// //             setRepeatMode={setRepeatMode}
// //             onNext={playNext}
// //             onPrevious={playPrevious}
// //           />
// //         </div>
// //       </div>

// //       <div id="youtube-player" style={{ display: "none" }} />

// //       {currentSong?.source === "local" && currentSong?.streamUrl && (
// //         <audio ref={audioRef} preload="auto" />
// //       )}

// //       <input
// //         type="file"
// //         id="audio-upload"
// //         multiple
// //         accept="audio/*"
// //         onChange={handleFileUpload}
// //         className="hidden"
// //       />
// //     </div>
// //   );
// // }
// "use client";

// import { useState, useRef, useEffect, useCallback } from "react";
// import { Link, useLocation } from "react-router-dom";
// import PlayerControls from "../components/player/PlayerControls";
// import PlaylistSidebar from "../components/player/PlaylistSidebar";
// import NowPlaying from "../components/player/NowPlaying";
// import VoiceControl from "../components/player/VoiceControl";

// // ====== MelodyMind Player (Fixed: localStorage + seek issues) ======

// export default function Player() {
//   const location = useLocation();
//   const incomingTrack = location.state?.track || null;
//   const incomingPlaylist = location.state?.playlist || null;
//   const removedSongsRef = useRef(new Set());

//   const YT_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY || "";

//   // Load songs - DON'T store local files in localStorage (too large!)
//   const [songs, setSongs] = useState(() => {
//     try {
//       const saved = localStorage.getItem("melodymindSongs");
//       if (!saved) return [];
//       const parsed = JSON.parse(saved);
//       // Filter out local files from localStorage on load
//       return Array.isArray(parsed)
//         ? parsed.filter((s) => s.source !== "local")
//         : [];
//     } catch (e) {
//       console.warn("Failed to read saved songs:", e);
//       localStorage.removeItem("melodymindSongs"); // Clear corrupted data
//       return [];
//     }
//   });

//   // Separate state for local files (in-memory only, not persisted)
//   const [localFiles, setLocalFiles] = useState([]);

//   const [currentSong, setCurrentSong] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [volume, setVolume] = useState(0.7);
//   const [isShuffled, setIsShuffled] = useState(false);
//   const [repeatMode, setRepeatMode] = useState("none");
//   const [showVoiceControl, setShowVoiceControl] = useState(false);
//   const [isLoadingYoutube, setIsLoadingYoutube] = useState(false);
//   const [loadingError, setLoadingError] = useState(null);
//   const [userInteracted, setUserInteracted] = useState(false);
//   const [likedSongs, setLikedSongs] = useState(() => {
//     try {
//       const saved = localStorage.getItem("melodymindLikedSongs");
//       return saved ? JSON.parse(saved) : [];
//     } catch (e) {
//       return [];
//     }
//   });
//   const [userPlaylists, setUserPlaylists] = useState(() => {
//     try {
//       const saved = localStorage.getItem("melodymindPlaylists");
//       return saved ? JSON.parse(saved) : [];
//     } catch (e) {
//       return [];
//     }
//   });
//   const [showAddToPlaylist, setShowAddToPlaylist] = useState(false);
//   const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
//   const [newPlaylistName, setNewPlaylistName] = useState("");

//   const audioRef = useRef(null);
//   const youtubePlayerRef = useRef(null);
//   const ytIntervalRef = useRef(null);
//   const playerReadyRef = useRef(false);
//   const processedTracksRef = useRef(new Set());

//   // Combined playlist (YouTube + local files)
//   const allSongs = [...songs, ...localFiles];

//   // Helper: Check if value is valid number
//   const isValidNumber = (val) => {
//     return typeof val === "number" && !isNaN(val) && isFinite(val);
//   };

//   // Persist liked songs
//   useEffect(() => {
//     try {
//       localStorage.setItem("melodymindLikedSongs", JSON.stringify(likedSongs));
//     } catch (e) {
//       console.warn("Failed to save liked songs:", e);
//     }
//   }, [likedSongs]);

//   // Persist playlists
//   useEffect(() => {
//     try {
//       localStorage.setItem(
//         "melodymindPlaylists",
//         JSON.stringify(userPlaylists)
//       );
//     } catch (e) {
//       console.warn("Failed to save playlists:", e);
//     }
//   }, [userPlaylists]);

//   // Check if song is liked
//   const isSongLiked = (songId) => {
//     return likedSongs.some((s) => s.id === songId);
//   };

//   // Toggle like
//   const toggleLike = () => {
//     if (!currentSong) return;

//     if (isSongLiked(currentSong.id)) {
//       // Unlike
//       setLikedSongs((prev) => prev.filter((s) => s.id !== currentSong.id));
//     } else {
//       // Like
//       setLikedSongs((prev) => [...prev, currentSong]);
//     }
//   };

//   // Create new playlist
//   const createPlaylist = () => {
//     if (!newPlaylistName.trim()) return;

//     const newPlaylist = {
//       id: `playlist-${Date.now()}`,
//       name: newPlaylistName.trim(),
//       songs: currentSong ? [currentSong] : [],
//       createdAt: new Date().toISOString(),
//     };

//     setUserPlaylists((prev) => [...prev, newPlaylist]);
//     setNewPlaylistName("");
//     setShowCreatePlaylist(false);
//     setShowAddToPlaylist(false);
//   };

//   // Add song to existing playlist
//   const addToPlaylist = (playlistId) => {
//     if (!currentSong) return;

//     setUserPlaylists((prev) =>
//       prev.map((pl) => {
//         if (pl.id === playlistId) {
//           // Check if song already exists
//           if (pl.songs.some((s) => s.id === currentSong.id)) {
//             return pl;
//           }
//           return {
//             ...pl,
//             songs: [...pl.songs, currentSong],
//           };
//         }
//         return pl;
//       })
//     );

//     setShowAddToPlaylist(false);
//   };

//   // Persist only YouTube songs (never local files with base64 data!)
//   useEffect(() => {
//     try {
//       // Only save YouTube tracks (no streamUrl data)
//       const youtubeOnly = songs.filter(
//         (s) => s.source === "youtube" || !s.streamUrl
//       );
//       localStorage.setItem("melodymindSongs", JSON.stringify(youtubeOnly));
//     } catch (e) {
//       console.warn("Failed to save songs:", e);
//       // Clear if save fails
//       try {
//         localStorage.removeItem("melodymindSongs");
//       } catch {}
//     }
//   }, [songs]);

//   // Persist last played state
//   useEffect(() => {
//     if (!currentSong) return;

//     const validTime = isValidNumber(currentTime) ? currentTime : 0;
//     const state = {
//       lastSongId: currentSong.id || null,
//       lastSongSource: currentSong.source || null,
//       lastTime: validTime,
//     };
//     try {
//       localStorage.setItem("melodymindLastState", JSON.stringify(state));
//     } catch (e) {
//       console.warn("Failed to save last state:", e);
//     }
//   }, [currentSong?.id, currentSong?.source, currentTime]);

//   // Restore last state on mount
//   useEffect(() => {
//     try {
//       const raw = localStorage.getItem("melodymindLastState");
//       if (!raw) return;
//       const parsed = JSON.parse(raw);
//       if (!parsed || !parsed.lastSongId) return;

//       const found = allSongs.find((s) => s.id === parsed.lastSongId);
//       if (found) {
//         setCurrentSong(found);
//         const validTime = isValidNumber(parsed.lastTime) ? parsed.lastTime : 0;
//         setCurrentTime(validTime);
//         setIsPlaying(false);
//       }
//     } catch (e) {
//       console.warn("Failed to restore last state:", e);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // Handle incoming YouTube track/playlist
//   useEffect(() => {
//     if (!incomingTrack?.id) return;
//     if (processedTracksRef.current.has(incomingTrack.id)) return;
//     processedTracksRef.current.add(incomingTrack.id);

//     const normalized = {
//       id: incomingTrack.id,
//       title: incomingTrack.name || incomingTrack.title,
//       artist:
//         incomingTrack.artists?.map((a) => a.name).join(", ") ||
//         incomingTrack.artist ||
//         "Unknown Artist",
//       album: incomingTrack.album?.name || "Unknown Album",
//       source: "youtube",
//     };

//     if (incomingPlaylist && Array.isArray(incomingPlaylist)) {
//       const normalizedPlaylist = incomingPlaylist.map((track) => ({
//         id: track.id,
//         title: track.name || track.title,
//         artist:
//           track.artists?.map((a) => a.name).join(", ") ||
//           track.artist ||
//           "Unknown Artist",
//         album: track.album?.name || "Unknown Album",
//         source: "youtube",
//       }));

//       setSongs((prev) => {
//         const ids = new Set(prev.map((p) => p.id));
//         const newTracks = normalizedPlaylist.filter((t) => !ids.has(t.id));
//         return [...prev, ...newTracks];
//       });
//     } else {
//       setSongs((prev) => {
//         const exists = prev.some((s) => s.id === normalized.id);
//         if (exists) return prev;
//         return [...prev, normalized];
//       });
//     }

//     selectSong(normalized);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [incomingTrack?.id, incomingPlaylist]);

//   // ================= YouTube IFrame API =================
//   useEffect(() => {
//     const createPlayer = () => {
//       if (!window?.YT?.Player) return;
//       if (youtubePlayerRef.current && playerReadyRef.current) return;

//       console.log("🎬 Creating YouTube player...");

//       try {
//         youtubePlayerRef.current = new window.YT.Player("youtube-player", {
//           height: "0",
//           width: "0",
//           playerVars: { autoplay: 0, controls: 0, modestbranding: 1 },
//           events: {
//             onReady: () => {
//               playerReadyRef.current = true;
//               console.log("✅ YouTube player ready");
//             },
//             onStateChange: (e) => {
//               const YT = window.YT;
//               if (e.data === YT.PlayerState.PLAYING) {
//                 setIsPlaying(true);
//                 startYouTubeTimeTracking();
//               } else if (e.data === YT.PlayerState.PAUSED) {
//                 setIsPlaying(false);
//                 stopYouTubeTimeTracking();
//               } else if (e.data === YT.PlayerState.ENDED) {
//                 setIsPlaying(false);
//                 stopYouTubeTimeTracking();
//                 handleSongEnd();
//               }
//             },
//             onError: (err) => {
//               console.error("YouTube player error:", err);
//               setLoadingError("YouTube playback error");
//               setIsPlaying(false);
//             },
//           },
//         });
//       } catch (err) {
//         console.error("Failed to create YouTube player:", err);
//       }
//     };

//     const loadAPI = () => {
//       if (window.YT && window.YT.Player) {
//         createPlayer();
//         return;
//       }

//       if (!document.getElementById("youtube-iframe-api")) {
//         const tag = document.createElement("script");
//         tag.id = "youtube-iframe-api";
//         tag.src = "https://www.youtube.com/iframe_api";
//         document.body.appendChild(tag);
//       }

//       window.onYouTubeIframeAPIReady = () => {
//         createPlayer();
//       };
//     };

//     loadAPI();

//     return () => {
//       stopYouTubeTimeTracking();
//     };
//   }, []);

//   const startYouTubeTimeTracking = () => {
//     stopYouTubeTimeTracking();
//     ytIntervalRef.current = setInterval(() => {
//       if (youtubePlayerRef.current?.getCurrentTime) {
//         try {
//           const cur = youtubePlayerRef.current.getCurrentTime();
//           const d = youtubePlayerRef.current.getDuration?.() || 0;

//           if (isValidNumber(cur)) setCurrentTime(cur);
//           if (isValidNumber(d) && duration !== d) setDuration(d);
//         } catch (e) {
//           // Ignore errors
//         }
//       }
//     }, 250);
//   };

//   const stopYouTubeTimeTracking = () => {
//     if (ytIntervalRef.current) {
//       clearInterval(ytIntervalRef.current);
//       ytIntervalRef.current = null;
//     }
//   };

//   // ================= YouTube Search =================
//   const searchYoutube = async (query) => {
//     if (!YT_API_KEY) throw new Error("YouTube API key not configured");
//     const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(
//       query
//     )}&key=${YT_API_KEY}`;
//     const res = await fetch(url);
//     const data = await res.json();
//     if (data.error) throw new Error(data.error.message || "YT API error");
//     if (!data.items || !data.items.length) return null;
//     const v = data.items[0];
//     return {
//       videoId: v.id.videoId,
//       title: v.snippet.title,
//       thumbnail: v.snippet.thumbnails?.default?.url,
//     };
//   };

//   // ================= Select & Play Song =================
//   const waitUntilPlayerReady = (timeout = 8000) =>
//     new Promise((resolve, reject) => {
//       const start = Date.now();
//       const check = () => {
//         if (playerReadyRef.current && youtubePlayerRef.current?.loadVideoById) {
//           return resolve(true);
//         }
//         if (Date.now() - start > timeout) {
//           return reject(new Error("YouTube player timeout"));
//         }
//         setTimeout(check, 300);
//       };
//       check();
//     });

//   const selectSong = async (song) => {
//     try {
//       setUserInteracted(true);
//       setLoadingError(null);
//       setIsLoadingYoutube(false);

//       // DON'T reset isPlaying and currentTime here - let the song load first
//       // setIsPlaying(false);
//       // setCurrentTime(0);
//       setDuration(0);

//       console.log("Selecting:", song.title, song.source);

//       // LOCAL FILE
//       if (song.source === "local") {
//         stopYouTubeTimeTracking();
//         try {
//           if (youtubePlayerRef.current?.stopVideo) {
//             youtubePlayerRef.current.stopVideo();
//           }
//         } catch (e) {}

//         // Stop current audio if playing different song
//         if (audioRef.current && currentSong?.id !== song.id) {
//           audioRef.current.pause();
//           audioRef.current.currentTime = 0;
//         }

//         setCurrentSong(song);
//         setCurrentTime(0); // Reset time for new song

//         if (audioRef.current && song.streamUrl) {
//           audioRef.current.src = song.streamUrl;
//           audioRef.current.load();

//           // Wait for metadata, then auto-play
//           const onLoaded = () => {
//             audioRef.current.removeEventListener("loadedmetadata", onLoaded);
//             audioRef.current.removeEventListener("error", onError);

//             // Auto-play the song
//             audioRef.current
//               .play()
//               .then(() => {
//                 setIsPlaying(true); // Update UI after successful play
//               })
//               .catch((err) => {
//                 console.warn("Auto-play blocked:", err);
//                 setIsPlaying(false);
//               });
//           };

//           const onError = () => {
//             audioRef.current.removeEventListener("loadedmetadata", onLoaded);
//             audioRef.current.removeEventListener("error", onError);
//             setLoadingError("Failed to load audio file");
//             setIsPlaying(false);
//           };

//           audioRef.current.addEventListener("loadedmetadata", onLoaded);
//           audioRef.current.addEventListener("error", onError);
//         }
//         return;
//       }

//       // YOUTUBE
//       if (song.source === "youtube") {
//         setIsLoadingYoutube(true);

//         let videoId = song.youtubeId || song.youtubeIdManual || null;
//         if (!videoId) {
//           const query = `${song.title} ${song.artist}`;
//           const result = await searchYoutube(query);
//           if (!result) throw new Error("No YouTube result found");
//           videoId = result.videoId;
//         }

//         if (audioRef.current) {
//           try {
//             audioRef.current.pause();
//             audioRef.current.src = "";
//           } catch (e) {}
//         }

//         const updated = { ...song, youtubeId: videoId, source: "youtube" };
//         setCurrentSong(updated);

//         await waitUntilPlayerReady();

//         if (!youtubePlayerRef.current?.loadVideoById) {
//           throw new Error("YouTube player not ready");
//         }

//         youtubePlayerRef.current.loadVideoById(videoId);
//         setIsLoadingYoutube(false);
//         return;
//       }

//       throw new Error("Unsupported song source");
//     } catch (err) {
//       console.error("selectSong error:", err);
//       setLoadingError(err.message || "Playback error");
//       setIsLoadingYoutube(false);
//       setIsPlaying(false);
//     }
//   };

//   // Handle song end
//   const handleSongEnd = () => {
//     if (repeatMode === "one") {
//       if (currentSong?.source === "youtube" && youtubePlayerRef.current) {
//         try {
//           youtubePlayerRef.current.seekTo(0);
//           youtubePlayerRef.current.playVideo();
//         } catch (e) {}
//       } else if (audioRef.current) {
//         audioRef.current.currentTime = 0;
//         audioRef.current.play();
//       }
//     } else if (repeatMode === "all") {
//       playNext();
//     } else {
//       setIsPlaying(false);
//     }
//   };

//   // Navigation
//   const playNext = useCallback(() => {
//     if (!allSongs.length) return;
//     const currentIdx = allSongs.findIndex((s) => s.id === currentSong?.id);
//     const nextIndex = isShuffled
//       ? Math.floor(Math.random() * allSongs.length)
//       : (currentIdx + 1) % allSongs.length;
//     const next = allSongs[nextIndex];
//     if (next) selectSong(next);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [allSongs, currentSong, isShuffled]);

//   const playPrevious = useCallback(() => {
//     if (!allSongs.length) return;
//     const idx = allSongs.findIndex((s) => s.id === currentSong?.id);
//     const prevIndex = idx <= 0 ? allSongs.length - 1 : idx - 1;
//     const prev = allSongs[prevIndex];
//     if (prev) selectSong(prev);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [allSongs, currentSong]);

//   // Audio event handlers
//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     const onTime = () => {
//       const time = audio.currentTime;
//       if (isValidNumber(time)) setCurrentTime(time);
//     };

//     const onLoaded = () => {
//       const dur = audio.duration;
//       if (isValidNumber(dur)) setDuration(dur);
//     };

//     const onEnded = () => handleSongEnd();

//     const onError = (e) => {
//       console.error("Audio error:", e);
//       setLoadingError("Audio playback error");
//       setIsPlaying(false);
//     };

//     audio.addEventListener("timeupdate", onTime);
//     audio.addEventListener("loadedmetadata", onLoaded);
//     audio.addEventListener("ended", onEnded);
//     audio.addEventListener("error", onError);

//     return () => {
//       audio.removeEventListener("timeupdate", onTime);
//       audio.removeEventListener("loadedmetadata", onLoaded);
//       audio.removeEventListener("ended", onEnded);
//       audio.removeEventListener("error", onError);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // Play/Pause sync - DON'T reset currentTime!
//   useEffect(() => {
//     if (!currentSong) return;

//     if (currentSong.source === "local") {
//       const audio = audioRef.current;
//       if (!audio) return;

//       // Check if audio is ready before playing
//       if (isPlaying) {
//         if (audio.readyState >= 2) {
//           // HAVE_CURRENT_DATA or better
//           audio.play().catch((e) => {
//             console.warn("Audio play failed:", e);
//             setIsPlaying(false);
//           });
//         }
//       } else {
//         audio.pause();
//       }
//     }

//     if (currentSong.source === "youtube") {
//       if (!playerReadyRef.current || !youtubePlayerRef.current) return;

//       try {
//         if (isPlaying) {
//           youtubePlayerRef.current.playVideo();
//         } else {
//           youtubePlayerRef.current.pauseVideo();
//         }
//       } catch (e) {
//         console.warn("YT play/pause error:", e);
//       }
//     }
//   }, [isPlaying, currentSong]);

//   // Volume sync
//   useEffect(() => {
//     if (audioRef.current) {
//       audioRef.current.volume = volume;
//     }
//     if (youtubePlayerRef.current?.setVolume) {
//       try {
//         youtubePlayerRef.current.setVolume(Math.round(volume * 100));
//       } catch (e) {}
//     }
//   }, [volume]);

//   // Seek control (FIXED - expects number, not function!)
//   const handleSeek = useCallback(
//     (newTime) => {
//       // PlayerControls sometimes passes a function - handle that
//       const timeValue =
//         typeof newTime === "function" ? newTime(currentTime) : newTime;

//       if (!isValidNumber(timeValue)) {
//         console.warn("Invalid seek time:", newTime);
//         return;
//       }

//       setCurrentTime(timeValue);

//       if (currentSong?.source === "local" && audioRef.current) {
//         audioRef.current.currentTime = timeValue;
//       } else if (
//         currentSong?.source === "youtube" &&
//         youtubePlayerRef.current
//       ) {
//         try {
//           youtubePlayerRef.current.seekTo(timeValue, true);
//         } catch (e) {
//           console.warn("YT seek error:", e);
//         }
//       }
//     },
//     [currentSong, currentTime]
//   );

//   // File upload - store in memory only!
//   const handleFileUpload = (e) => {
//     const files = Array.from(e.target.files || []);
//     if (!files.length) return;

//     const readers = files.map((file, idx) => {
//       return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = (ev) => {
//           const base64 = ev.target.result;
//           const song = {
//             id: `local-${Date.now()}-${idx}`,
//             title: file.name.replace(/\.[^/.]+$/, ""),
//             artist: "Local File",
//             album: "Device",
//             streamUrl: base64,
//             source: "local",
//           };
//           resolve(song);
//         };
//         reader.onerror = (err) => reject(err);
//         reader.readAsDataURL(file);
//       });
//     });

//     Promise.all(readers)
//       .then((newSongs) => {
//         setLocalFiles((prev) => {
//           const existingKeys = new Set(
//             prev.map((p) => p.title + (p.streamUrl?.slice(0, 50) || ""))
//           );
//           const filtered = newSongs.filter(
//             (ns) => !existingKeys.has(ns.title + ns.streamUrl?.slice(0, 50))
//           );
//           return [...prev, ...filtered];
//         });
//       })
//       .catch((err) => console.error("Failed to read files:", err));
//   };

//   // Remove song
//   const removeSong = (id) => {
//     removedSongsRef.current.add(id);

//     // Remove from appropriate list
//     setSongs((prev) => prev.filter((s) => s.id !== id));
//     setLocalFiles((prev) => prev.filter((s) => s.id !== id));

//     if (currentSong?.id === id) {
//       setCurrentSong(null);
//       setIsPlaying(false);
//       setCurrentTime(0);
//       setDuration(0);

//       if (audioRef.current) {
//         audioRef.current.pause();
//         audioRef.current.src = "";
//       }
//       try {
//         if (youtubePlayerRef.current?.stopVideo) {
//           youtubePlayerRef.current.stopVideo();
//         }
//       } catch (e) {}
//     }
//   };

//   const retryLoad = () => {
//     if (currentSong) selectSong({ ...currentSong });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
//       <header className="bg-black/30 backdrop-blur-sm border-b border-white/10 px-6 py-4 flex justify-between items-center">
//         <Link to="/" className="font-['Pacifico'] text-2xl text-white">
//           MelodyMind
//         </Link>
//         <div className="flex gap-4 items-center">
//           <button
//             onClick={() => setShowVoiceControl(!showVoiceControl)}
//             className={`p-3 rounded-full transition-all ${
//               showVoiceControl
//                 ? "bg-purple-600 text-white"
//                 : "bg-white/10 text-purple-300 hover:bg-purple-600 hover:text-white"
//             }`}
//           >
//             🎤
//           </button>

//           <label
//             htmlFor="audio-upload"
//             className="cursor-pointer bg-white/10 text-purple-300 hover:bg-purple-600 hover:text-white px-4 py-2 rounded-full"
//           >
//             ⬆ Upload
//           </label>

//           <Link
//             to="/library"
//             className="bg-white/10 text-purple-300 hover:bg-purple-600 hover:text-white px-4 py-2 rounded-full transition-all"
//           >
//             📚 Library
//           </Link>

//           <Link
//             to="/MoodDetection"
//             className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-full font-semibold transition-all"
//           >
//             Mood Detection
//           </Link>
//         </div>
//       </header>

//       <div className="flex flex-1">
//         <PlaylistSidebar
//           songs={allSongs}
//           currentSong={currentSong}
//           onSongSelect={selectSong}
//           onRemoveSong={removeSong}
//         />

//         <div className="flex-1 flex flex-col">
//           {showVoiceControl && (
//             <VoiceControl
//               playMusic={() => {
//                 setUserInteracted(true);
//                 setIsPlaying(true);
//               }}
//               pauseMusic={() => setIsPlaying(false)}
//               nextSong={playNext}
//               prevSong={playPrevious}
//               increaseVolume={() =>
//                 setVolume((v) => Math.min(1, +(v + 0.1).toFixed(1)))
//               }
//               decreaseVolume={() =>
//                 setVolume((v) => Math.max(0, +(v - 0.1).toFixed(1)))
//               }
//               toggleShuffle={(val) => setIsShuffled(val)}
//             />
//           )}

//           <div className="flex-1 flex items-center justify-center p-8">
//             {!YT_API_KEY ? (
//               <div className="text-center text-yellow-400 max-w-md">
//                 <div className="text-4xl mb-4">⚠️</div>
//                 <p className="text-lg mb-2">YouTube API Key Required</p>
//                 <p className="text-sm mb-4">
//                   Please add REACT_APP_YOUTUBE_API_KEY to your .env
//                 </p>
//               </div>
//             ) : isLoadingYoutube ? (
//               <div className="text-center text-white">
//                 <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
//                 <p className="text-lg">Finding on YouTube...</p>
//                 <p className="text-sm text-gray-400 mt-2">
//                   {currentSong?.title || "Loading"}
//                 </p>
//               </div>
//             ) : loadingError ? (
//               <div className="text-center text-red-400 max-w-md">
//                 <div className="text-4xl mb-4">⚠️</div>
//                 <p className="text-lg mb-2">Playback Error</p>
//                 <p className="text-sm mb-4">{loadingError}</p>
//                 <button
//                   onClick={retryLoad}
//                   className="bg-purple-600 px-6 py-2 rounded-full text-white hover:bg-purple-700 transition"
//                 >
//                   🔄 Retry
//                 </button>
//               </div>
//             ) : currentSong ? (
//               <NowPlaying currentSong={currentSong} />
//             ) : (
//               <div className="text-center text-gray-400">
//                 <div className="text-6xl mb-4">🎵</div>
//                 <p className="text-lg">No song selected</p>
//                 <p className="text-sm mt-2">
//                   Upload local files or detect your mood
//                 </p>
//               </div>
//             )}
//           </div>

//           <PlayerControls
//             currentSong={currentSong}
//             isPlaying={isPlaying}
//             setIsPlaying={(playing) => {
//               setUserInteracted(true);
//               setIsPlaying(playing);
//             }}
//             currentTime={currentTime}
//             setCurrentTime={handleSeek}
//             duration={duration}
//             volume={volume}
//             setVolume={setVolume}
//             isShuffled={isShuffled}
//             setIsShuffled={setIsShuffled}
//             repeatMode={repeatMode}
//             setRepeatMode={setRepeatMode}
//             onNext={playNext}
//             onPrevious={playPrevious}
//           />

//           {/* Like and Add to Playlist buttons */}
//           {currentSong && (
//             <div className="bg-black/30 backdrop-blur-sm border-t border-white/10 px-6 py-3 flex justify-center gap-4">
//               <button
//                 onClick={toggleLike}
//                 className={`p-3 rounded-full transition-all ${
//                   isSongLiked(currentSong.id)
//                     ? "bg-pink-600 text-white"
//                     : "bg-white/10 text-purple-300 hover:bg-pink-600 hover:text-white"
//                 }`}
//                 title={isSongLiked(currentSong.id) ? "Unlike" : "Like"}
//               >
//                 {isSongLiked(currentSong.id) ? "❤️" : "🤍"}
//               </button>

//               <div className="relative">
//                 <button
//                   onClick={() => setShowAddToPlaylist(!showAddToPlaylist)}
//                   className="bg-white/10 text-purple-300 hover:bg-purple-600 hover:text-white px-4 py-2 rounded-full transition-all"
//                   title="Add to Playlist"
//                 >
//                   ➕ Playlist
//                 </button>

//                 {showAddToPlaylist && (
//                   <div className="absolute bottom-full mb-2 right-0 bg-gray-900 border border-purple-500/30 rounded-lg shadow-xl p-4 min-w-[250px] max-h-[300px] overflow-y-auto">
//                     <div className="mb-3">
//                       <button
//                         onClick={() => setShowCreatePlaylist(true)}
//                         className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all"
//                       >
//                         + Create New Playlist
//                       </button>
//                     </div>

//                     {showCreatePlaylist && (
//                       <div className="mb-3 p-3 bg-black/30 rounded-lg">
//                         <input
//                           type="text"
//                           value={newPlaylistName}
//                           onChange={(e) => setNewPlaylistName(e.target.value)}
//                           placeholder="Playlist name..."
//                           className="w-full bg-white/10 text-white border border-purple-500/30 rounded px-3 py-2 mb-2 focus:outline-none focus:border-purple-500"
//                           onKeyPress={(e) =>
//                             e.key === "Enter" && createPlaylist()
//                           }
//                         />
//                         <div className="flex gap-2">
//                           <button
//                             onClick={createPlaylist}
//                             className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded transition-all"
//                           >
//                             Create
//                           </button>
//                           <button
//                             onClick={() => {
//                               setShowCreatePlaylist(false);
//                               setNewPlaylistName("");
//                             }}
//                             className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded transition-all"
//                           >
//                             Cancel
//                           </button>
//                         </div>
//                       </div>
//                     )}

//                     {userPlaylists.length > 0 ? (
//                       <div className="space-y-2">
//                         <p className="text-xs text-gray-400 mb-2">
//                           Add to existing playlist:
//                         </p>
//                         {userPlaylists.map((playlist) => (
//                           <button
//                             key={playlist.id}
//                             onClick={() => addToPlaylist(playlist.id)}
//                             className="w-full text-left bg-white/5 hover:bg-purple-600/30 text-white px-3 py-2 rounded transition-all"
//                           >
//                             {playlist.name} ({playlist.songs?.length || 0})
//                           </button>
//                         ))}
//                       </div>
//                     ) : (
//                       !showCreatePlaylist && (
//                         <p className="text-gray-400 text-sm text-center">
//                           No playlists yet
//                         </p>
//                       )
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <div id="youtube-player" style={{ display: "none" }} />

//       {currentSong?.source === "local" && currentSong?.streamUrl && (
//         <audio ref={audioRef} preload="auto" />
//       )}

//       <input
//         type="file"
//         id="audio-upload"
//         multiple
//         accept="audio/*"
//         onChange={handleFileUpload}
//         className="hidden"
//       />
//     </div>
//   );
// }
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import PlayerControls from "../components/player/PlayerControls";
import PlaylistSidebar from "../components/player/PlaylistSidebar";
import NowPlaying from "../components/player/NowPlaying";
import VoiceControl from "../components/player/VoiceControl";
import musicAnalytics from "../components/analytics/musicanalytics";

// ====== MelodyMind Player (Fixed: localStorage + seek issues + analytics) ======

export default function Player() {
  const location = useLocation();
  const incomingTrack = location.state?.track || null;
  const incomingPlaylist = location.state?.playlist || null;
  const removedSongsRef = useRef(new Set());

  const YT_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY || "";

  // Load songs - DON'T store local files in localStorage (too large!)
  const [songs, setSongs] = useState(() => {
    try {
      const saved = localStorage.getItem("melodymindSongs");
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed)
        ? parsed.filter((s) => s.source !== "local")
        : [];
    } catch (e) {
      console.warn("Failed to read saved songs:", e);
      localStorage.removeItem("melodymindSongs");
      return [];
    }
  });

  const [localFiles, setLocalFiles] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState("none");
  const [showVoiceControl, setShowVoiceControl] = useState(false);
  const [isLoadingYoutube, setIsLoadingYoutube] = useState(false);
  const [loadingError, setLoadingError] = useState(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const [likedSongs, setLikedSongs] = useState(() => {
    try {
      const saved = localStorage.getItem("melodymindLikedSongs");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [userPlaylists, setUserPlaylists] = useState(() => {
    try {
      const saved = localStorage.getItem("melodymindPlaylists");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [showAddToPlaylist, setShowAddToPlaylist] = useState(false);
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");

  const audioRef = useRef(null);
  const youtubePlayerRef = useRef(null);
  const ytIntervalRef = useRef(null);
  const playerReadyRef = useRef(false);
  const processedTracksRef = useRef(new Set());

  const allSongs = [...songs, ...localFiles];

  const isValidNumber = (val) => {
    return typeof val === "number" && !isNaN(val) && isFinite(val);
  };

  // ========== ANALYTICS: Track when song plays (FIXED) ==========
  useEffect(() => {
    if (currentSong && currentSong.id && isPlaying) {
      musicAnalytics.trackSongPlay({
        id: currentSong.id,
        title: currentSong.title || "Unknown",
        artist: currentSong.artist || "Unknown Artist",
        genre: currentSong.genre || "Unknown",
        duration: duration || 0,
      });
    }
  }, [currentSong, isPlaying, duration]);

  // ========== ANALYTICS: Track when song completes ==========
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (currentSong && currentSong.id && duration > 0) {
        const completion = (currentTime / duration) * 100;
        musicAnalytics.trackSongComplete(completion);
      }
      handleSongEnd();
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [currentSong, currentTime, duration]);

  useEffect(() => {
    try {
      localStorage.setItem("melodymindLikedSongs", JSON.stringify(likedSongs));
    } catch (e) {
      console.warn("Failed to save liked songs:", e);
    }
  }, [likedSongs]);

  useEffect(() => {
    try {
      localStorage.setItem(
        "melodymindPlaylists",
        JSON.stringify(userPlaylists)
      );
    } catch (e) {
      console.warn("Failed to save playlists:", e);
    }
  }, [userPlaylists]);

  const isSongLiked = (songId) => {
    return likedSongs.some((s) => s.id === songId);
  };

  const toggleLike = () => {
    if (!currentSong) return;

    if (isSongLiked(currentSong.id)) {
      setLikedSongs((prev) => prev.filter((s) => s.id !== currentSong.id));
    } else {
      if (currentSong.id) {
        musicAnalytics.trackSongLike({
          id: currentSong.id,
          title: currentSong.title,
          artist: currentSong.artist,
        });
      }
      setLikedSongs((prev) => [...prev, currentSong]);
    }
  };

  const createPlaylist = () => {
    if (!newPlaylistName.trim()) return;

    const newPlaylist = {
      id: `playlist-${Date.now()}`,
      name: newPlaylistName.trim(),
      songs: currentSong ? [currentSong] : [],
      createdAt: new Date().toISOString(),
    };

    musicAnalytics.trackPlaylistCreate({
      id: newPlaylist.id,
      name: newPlaylist.name,
      songs: newPlaylist.songs,
    });

    setUserPlaylists((prev) => [...prev, newPlaylist]);
    setNewPlaylistName("");
    setShowCreatePlaylist(false);
    setShowAddToPlaylist(false);
  };

  const addToPlaylist = (playlistId) => {
    if (!currentSong) return;

    setUserPlaylists((prev) =>
      prev.map((pl) => {
        if (pl.id === playlistId) {
          if (pl.songs.some((s) => s.id === currentSong.id)) {
            return pl;
          }
          return {
            ...pl,
            songs: [...pl.songs, currentSong],
          };
        }
        return pl;
      })
    );

    setShowAddToPlaylist(false);
  };

  useEffect(() => {
    try {
      const youtubeOnly = songs.filter(
        (s) => s.source === "youtube" || !s.streamUrl
      );
      localStorage.setItem("melodymindSongs", JSON.stringify(youtubeOnly));
    } catch (e) {
      console.warn("Failed to save songs:", e);
      try {
        localStorage.removeItem("melodymindSongs");
      } catch {}
    }
  }, [songs]);

  useEffect(() => {
    if (!currentSong) return;

    const validTime = isValidNumber(currentTime) ? currentTime : 0;
    const state = {
      lastSongId: currentSong.id || null,
      lastSongSource: currentSong.source || null,
      lastTime: validTime,
    };
    try {
      localStorage.setItem("melodymindLastState", JSON.stringify(state));
    } catch (e) {
      console.warn("Failed to save last state:", e);
    }
  }, [currentSong?.id, currentSong?.source, currentTime]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("melodymindLastState");
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (!parsed || !parsed.lastSongId) return;

      const found = allSongs.find((s) => s.id === parsed.lastSongId);
      if (found) {
        setCurrentSong(found);
        const validTime = isValidNumber(parsed.lastTime) ? parsed.lastTime : 0;
        setCurrentTime(validTime);
        setIsPlaying(false);
      }
    } catch (e) {
      console.warn("Failed to restore last state:", e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!incomingTrack?.id) return;
    if (processedTracksRef.current.has(incomingTrack.id)) return;
    processedTracksRef.current.add(incomingTrack.id);

    const normalized = {
      id: incomingTrack.id,
      title: incomingTrack.name || incomingTrack.title,
      artist:
        incomingTrack.artists?.map((a) => a.name).join(", ") ||
        incomingTrack.artist ||
        "Unknown Artist",
      album: incomingTrack.album?.name || "Unknown Album",
      source: "youtube",
    };

    if (incomingPlaylist && Array.isArray(incomingPlaylist)) {
      const normalizedPlaylist = incomingPlaylist.map((track) => ({
        id: track.id,
        title: track.name || track.title,
        artist:
          track.artists?.map((a) => a.name).join(", ") ||
          track.artist ||
          "Unknown Artist",
        album: track.album?.name || "Unknown Album",
        source: "youtube",
      }));

      setSongs((prev) => {
        const ids = new Set(prev.map((p) => p.id));
        const newTracks = normalizedPlaylist.filter((t) => !ids.has(t.id));
        return [...prev, ...newTracks];
      });
    } else {
      setSongs((prev) => {
        const exists = prev.some((s) => s.id === normalized.id);
        if (exists) return prev;
        return [...prev, normalized];
      });
    }

    selectSong(normalized);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incomingTrack?.id, incomingPlaylist]);

  // ================= YouTube IFrame API =================
  useEffect(() => {
    let mounted = true;

    const createPlayer = () => {
      if (!mounted) return;
      if (!window?.YT?.Player) return;
      if (youtubePlayerRef.current) return;

      const playerDiv = document.getElementById("youtube-player");
      if (!playerDiv) {
        console.warn("YouTube player div not found");
        return;
      }

      console.log("🎬 Creating YouTube player...");

      try {
        youtubePlayerRef.current = new window.YT.Player("youtube-player", {
          height: "0",
          width: "0",
          playerVars: { autoplay: 0, controls: 0, modestbranding: 1 },
          events: {
            onReady: () => {
              if (!mounted) return;
              playerReadyRef.current = true;
              console.log("✅ YouTube player ready");
            },
            onStateChange: (e) => {
              if (!mounted) return;
              const YT = window.YT;
              if (e.data === YT.PlayerState.PLAYING) {
                setIsPlaying(true);
                startYouTubeTimeTracking();
              } else if (e.data === YT.PlayerState.PAUSED) {
                setIsPlaying(false);
                stopYouTubeTimeTracking();
              } else if (e.data === YT.PlayerState.ENDED) {
                setIsPlaying(false);
                stopYouTubeTimeTracking();
                if (currentSong && currentSong.id && duration > 0) {
                  const completion = (currentTime / duration) * 100;
                  musicAnalytics.trackSongComplete(completion);
                }
                handleSongEnd();
              }
            },
            onError: (err) => {
              console.error("YouTube player error:", err);
              setLoadingError("YouTube playback error");
              setIsPlaying(false);
            },
          },
        });
      } catch (err) {
        console.error("Failed to create YouTube player:", err);
      }
    };

    const loadAPI = () => {
      if (window.YT && window.YT.Player) {
        createPlayer();
        return;
      }

      if (!document.getElementById("youtube-iframe-api")) {
        const tag = document.createElement("script");
        tag.id = "youtube-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }

      window.onYouTubeIframeAPIReady = () => {
        if (mounted) createPlayer();
      };
    };

    loadAPI();

    return () => {
      mounted = false;
      stopYouTubeTimeTracking();
    };
  }, []);

  const startYouTubeTimeTracking = () => {
    stopYouTubeTimeTracking();
    ytIntervalRef.current = setInterval(() => {
      if (youtubePlayerRef.current?.getCurrentTime) {
        try {
          const cur = youtubePlayerRef.current.getCurrentTime();
          const d = youtubePlayerRef.current.getDuration?.() || 0;

          if (isValidNumber(cur)) setCurrentTime(cur);
          if (isValidNumber(d) && duration !== d) setDuration(d);
        } catch (e) {
          // Ignore errors
        }
      }
    }, 250);
  };

  const stopYouTubeTimeTracking = () => {
    if (ytIntervalRef.current) {
      clearInterval(ytIntervalRef.current);
      ytIntervalRef.current = null;
    }
  };

  // ================= YouTube Search =================
  const searchYoutube = async (query) => {
    if (!YT_API_KEY) throw new Error("YouTube API key not configured");
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(
      query
    )}&key=${YT_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.error) throw new Error(data.error.message || "YT API error");
    if (!data.items || !data.items.length) return null;
    const v = data.items[0];
    return {
      videoId: v.id.videoId,
      title: v.snippet.title,
      thumbnail: v.snippet.thumbnails?.default?.url,
    };
  };

  const waitUntilPlayerReady = (timeout = 8000) =>
    new Promise((resolve, reject) => {
      const start = Date.now();
      const check = () => {
        if (playerReadyRef.current && youtubePlayerRef.current?.loadVideoById) {
          return resolve(true);
        }
        if (Date.now() - start > timeout) {
          return reject(new Error("YouTube player timeout"));
        }
        setTimeout(check, 300);
      };
      check();
    });

  const selectSong = async (song) => {
    try {
      setUserInteracted(true);
      setLoadingError(null);
      setIsLoadingYoutube(false);
      setDuration(0);

      console.log("Selecting:", song.title, song.source);

      // LOCAL FILE
      if (song.source === "local") {
        stopYouTubeTimeTracking();
        try {
          if (youtubePlayerRef.current?.stopVideo) {
            youtubePlayerRef.current.stopVideo();
          }
        } catch (e) {}

        if (audioRef.current && currentSong?.id !== song.id) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }

        setCurrentSong(song);
        setCurrentTime(0);

        if (audioRef.current && song.streamUrl) {
          audioRef.current.src = song.streamUrl;
          audioRef.current.load();

          const onLoaded = () => {
            audioRef.current.removeEventListener("loadedmetadata", onLoaded);
            audioRef.current.removeEventListener("error", onError);

            audioRef.current
              .play()
              .then(() => {
                setIsPlaying(true);
              })
              .catch((err) => {
                console.warn("Auto-play blocked:", err);
                setIsPlaying(false);
              });
          };

          const onError = () => {
            audioRef.current.removeEventListener("loadedmetadata", onLoaded);
            audioRef.current.removeEventListener("error", onError);
            setLoadingError("Failed to load audio file");
            setIsPlaying(false);
          };

          audioRef.current.addEventListener("loadedmetadata", onLoaded);
          audioRef.current.addEventListener("error", onError);
        }
        return;
      }

      // YOUTUBE
      if (song.source === "youtube") {
        setIsLoadingYoutube(true);

        let videoId = song.youtubeId || song.youtubeIdManual || null;
        if (!videoId) {
          const query = `${song.title} ${song.artist}`;
          const result = await searchYoutube(query);
          if (!result) throw new Error("No YouTube result found");
          videoId = result.videoId;
        }

        if (audioRef.current) {
          try {
            audioRef.current.pause();
            audioRef.current.src = "";
          } catch (e) {}
        }

        const updated = { ...song, youtubeId: videoId, source: "youtube" };
        setCurrentSong(updated);

        await waitUntilPlayerReady();

        if (!youtubePlayerRef.current?.loadVideoById) {
          throw new Error("YouTube player not ready");
        }

        youtubePlayerRef.current.loadVideoById(videoId);
        setIsLoadingYoutube(false);
        return;
      }

      throw new Error("Unsupported song source");
    } catch (err) {
      console.error("selectSong error:", err);
      setLoadingError(err.message || "Playback error");
      setIsLoadingYoutube(false);
      setIsPlaying(false);
    }
  };

  const handleSongEnd = () => {
    if (repeatMode === "one") {
      if (currentSong?.source === "youtube" && youtubePlayerRef.current) {
        try {
          youtubePlayerRef.current.seekTo(0);
          youtubePlayerRef.current.playVideo();
        } catch (e) {}
      } else if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else if (repeatMode === "all") {
      playNext();
    } else {
      setIsPlaying(false);
    }
  };

  const playNext = useCallback(() => {
    if (!allSongs.length) return;

    if (currentSong && currentSong.id && duration > 0) {
      musicAnalytics.trackSongSkip(currentTime, duration);
    }

    const currentIdx = allSongs.findIndex((s) => s.id === currentSong?.id);
    const nextIndex = isShuffled
      ? Math.floor(Math.random() * allSongs.length)
      : (currentIdx + 1) % allSongs.length;
    const next = allSongs[nextIndex];
    if (next) selectSong(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allSongs, currentSong, isShuffled, currentTime, duration]);

  const playPrevious = useCallback(() => {
    if (!allSongs.length) return;
    const idx = allSongs.findIndex((s) => s.id === currentSong?.id);
    const prevIndex = idx <= 0 ? allSongs.length - 1 : idx - 1;
    const prev = allSongs[prevIndex];
    if (prev) selectSong(prev);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allSongs, currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => {
      const time = audio.currentTime;
      if (isValidNumber(time)) setCurrentTime(time);
    };

    const onLoaded = () => {
      const dur = audio.duration;
      if (isValidNumber(dur)) setDuration(dur);
    };

    const onError = (e) => {
      console.error("Audio error:", e);
      setLoadingError("Audio playback error");
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("error", onError);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!currentSong) return;

    if (currentSong.source === "local") {
      const audio = audioRef.current;
      if (!audio) return;

      if (isPlaying) {
        if (audio.readyState >= 2) {
          audio.play().catch((e) => {
            console.warn("Audio play failed:", e);
            setIsPlaying(false);
          });
        }
      } else {
        audio.pause();
      }
    }

    if (currentSong.source === "youtube") {
      if (!playerReadyRef.current || !youtubePlayerRef.current) return;

      try {
        if (isPlaying) {
          youtubePlayerRef.current.playVideo();
        } else {
          youtubePlayerRef.current.pauseVideo();
        }
      } catch (e) {
        console.warn("YT play/pause error:", e);
      }
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    if (youtubePlayerRef.current?.setVolume) {
      try {
        youtubePlayerRef.current.setVolume(Math.round(volume * 100));
      } catch (e) {}
    }
  }, [volume]);

  const handleSeek = useCallback(
    (newTime) => {
      const timeValue =
        typeof newTime === "function" ? newTime(currentTime) : newTime;

      if (!isValidNumber(timeValue)) {
        console.warn("Invalid seek time:", newTime);
        return;
      }

      setCurrentTime(timeValue);

      if (currentSong?.source === "local" && audioRef.current) {
        audioRef.current.currentTime = timeValue;
      } else if (
        currentSong?.source === "youtube" &&
        youtubePlayerRef.current
      ) {
        try {
          youtubePlayerRef.current.seekTo(timeValue, true);
        } catch (e) {
          console.warn("YT seek error:", e);
        }
      }
    },
    [currentSong, currentTime]
  );

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const readers = files.map((file, idx) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (ev) => {
          const base64 = ev.target.result;
          const song = {
            id: `local-${Date.now()}-${idx}`,
            title: file.name.replace(/\.[^/.]+$/, ""),
            artist: "Local File",
            album: "Device",
            streamUrl: base64,
            source: "local",
          };
          resolve(song);
        };
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers)
      .then((newSongs) => {
        setLocalFiles((prev) => {
          const existingKeys = new Set(
            prev.map((p) => p.title + (p.streamUrl?.slice(0, 50) || ""))
          );
          const filtered = newSongs.filter(
            (ns) => !existingKeys.has(ns.title + ns.streamUrl?.slice(0, 50))
          );
          return [...prev, ...filtered];
        });
      })
      .catch((err) => console.error("Failed to read files:", err));
  };

  const removeSong = (id) => {
    removedSongsRef.current.add(id);

    setSongs((prev) => prev.filter((s) => s.id !== id));
    setLocalFiles((prev) => prev.filter((s) => s.id !== id));

    if (currentSong?.id === id) {
      setCurrentSong(null);
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      try {
        if (youtubePlayerRef.current?.stopVideo) {
          youtubePlayerRef.current.stopVideo();
        }
      } catch (e) {}
    }
  };

  const retryLoad = () => {
    if (currentSong) selectSong({ ...currentSong });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      <header className="bg-black/30 backdrop-blur-sm border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <Link to="/" className="font-['Pacifico'] text-2xl text-white">
          MelodyMind
        </Link>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setShowVoiceControl(!showVoiceControl)}
            className={`p-3 rounded-full transition-all ${
              showVoiceControl
                ? "bg-purple-600 text-white"
                : "bg-white/10 text-purple-300 hover:bg-purple-600 hover:text-white"
            }`}
          >
            🎤
          </button>

          <label
            htmlFor="audio-upload"
            className="cursor-pointer bg-white/10 text-purple-300 hover:bg-purple-600 hover:text-white px-4 py-2 rounded-full"
          >
            ⬆ Upload
          </label>
          <input
            id="audio-upload"
            type="file"
            accept="audio/*"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />

          <Link
            to="/library"
            className="bg-white/10 text-purple-300 hover:bg-purple-600 hover:text-white px-4 py-2 rounded-full transition-all"
          >
            📚 Library
          </Link>

          <Link
            to="/analytics"
            className="bg-white/10 text-purple-300 hover:bg-purple-600 hover:text-white px-4 py-2 rounded-full transition-all"
          >
            📊 Analytics
          </Link>

          <Link
            to="/MoodDetection"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-full font-semibold transition-all"
          >
            Mood Detection
          </Link>
        </div>
      </header>

      <div className="flex flex-1">
        <PlaylistSidebar
          songs={allSongs}
          currentSong={currentSong}
          onSongSelect={selectSong}
          onRemoveSong={removeSong}
        />

        <div className="flex-1 flex flex-col">
          {showVoiceControl && (
            <VoiceControl
              playMusic={() => {
                setUserInteracted(true);
                setIsPlaying(true);
              }}
              pauseMusic={() => setIsPlaying(false)}
              nextSong={playNext}
              prevSong={playPrevious}
              increaseVolume={() =>
                setVolume((v) => Math.min(1, +(v + 0.1).toFixed(1)))
              }
              decreaseVolume={() =>
                setVolume((v) => Math.max(0, +(v - 0.1).toFixed(1)))
              }
              toggleShuffle={(value) => setIsShuffled(value)}
            />
          )}

          <NowPlaying
            song={currentSong}
            isPlaying={isPlaying}
            isLiked={currentSong ? isSongLiked(currentSong.id) : false}
            onToggleLike={toggleLike}
            onAddToPlaylist={() => setShowAddToPlaylist(true)}
          />

          <PlayerControls
            isPlaying={isPlaying}
            onPlayPause={() => {
              setUserInteracted(true);
              setIsPlaying(!isPlaying);
            }}
            onNext={playNext}
            onPrevious={playPrevious}
            currentTime={currentTime}
            duration={duration}
            onSeek={handleSeek}
            volume={volume}
            onVolumeChange={setVolume}
            isShuffled={isShuffled}
            onShuffleToggle={() => setIsShuffled(!isShuffled)}
            repeatMode={repeatMode}
            onRepeatToggle={() => {
              const modes = ["none", "all", "one"];
              const idx = modes.indexOf(repeatMode);
              setRepeatMode(modes[(idx + 1) % modes.length]);
            }}
          />

          {loadingError && (
            <div className="mt-4 bg-red-500/20 text-red-200 px-4 py-2 rounded mx-auto">
              {loadingError}
              <button
                onClick={retryLoad}
                className="ml-4 bg-purple-600 px-3 py-1 rounded hover:bg-purple-700"
              >
                Retry
              </button>
            </div>
          )}

          {isLoadingYoutube && (
            <div className="mt-4 text-purple-300 text-center">
              Loading YouTube video...
            </div>
          )}
        </div>
      </div>

      {/* Hidden audio elements */}
      <audio ref={audioRef} />
      <div id="youtube-player" style={{ display: "none" }} />

      {/* Add to Playlist Modal */}
      {showAddToPlaylist && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-4">
              Add to Playlist
            </h3>

            {userPlaylists.length === 0 ? (
              <p className="text-gray-400 mb-4">
                No playlists yet. Create one!
              </p>
            ) : (
              <div className="max-h-64 overflow-y-auto mb-4">
                {userPlaylists.map((pl) => (
                  <button
                    key={pl.id}
                    onClick={() => addToPlaylist(pl.id)}
                    className="w-full text-left px-4 py-3 hover:bg-purple-600 rounded text-white mb-2 transition-all"
                  >
                    <div className="font-semibold">{pl.name}</div>
                    <div className="text-sm text-gray-400">
                      {pl.songs.length} songs
                    </div>
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={() => {
                setShowAddToPlaylist(false);
                setShowCreatePlaylist(true);
              }}
              className="w-full bg-purple-600 text-white px-4 py-3 rounded font-semibold hover:bg-purple-700 transition-all mb-2"
            >
              + Create New Playlist
            </button>

            <button
              onClick={() => setShowAddToPlaylist(false)}
              className="w-full bg-gray-700 text-white px-4 py-3 rounded hover:bg-gray-600 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Create Playlist Modal */}
      {showCreatePlaylist && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-4">
              Create New Playlist
            </h3>

            <input
              type="text"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              placeholder="Enter playlist name..."
              className="w-full px-4 py-3 rounded bg-gray-700 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
              autoFocus
              onKeyPress={(e) => {
                if (e.key === "Enter" && newPlaylistName.trim()) {
                  createPlaylist();
                }
              }}
            />

            <button
              onClick={createPlaylist}
              disabled={!newPlaylistName.trim()}
              className={`w-full px-4 py-3 rounded font-semibold mb-2 transition-all ${
                newPlaylistName.trim()
                  ? "bg-purple-600 text-white hover:bg-purple-700"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
            >
              Create Playlist
            </button>

            <button
              onClick={() => {
                setShowCreatePlaylist(false);
                setNewPlaylistName("");
              }}
              className="w-full bg-gray-700 text-white px-4 py-3 rounded hover:bg-gray-600 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
