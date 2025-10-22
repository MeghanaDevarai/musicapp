// "use client";

// import { useState, useEffect } from "react";
// // import { useEffect } from "react"; // but you're not using it → warning
// // const [lastCommand, setLastCommand] = useState(""); // if lastCommand is never used → warning

// export default function VoiceControl() {
//   const [isListening, setIsListening] = useState(false);
//   const [transcript, setTranscript] = useState("");
//   const [lastCommand, setLastCommand] = useState("");
//   const [commandFeedback, setCommandFeedback] = useState("");

//   const mockCommands = [
//     "play music",
//     "pause music",
//     "next song",
//     "previous song",
//     "play happy music",
//     "play relaxed music",
//     "increase volume",
//     "decrease volume",
//     "shuffle on",
//     "shuffle off",
//   ];

//   const startListening = () => {
//     setIsListening(true);
//     setTranscript("");
//     setCommandFeedback("Listening...");

//     // Simulated voice recognition logic
//     setTimeout(() => {
//       const randomCommand =
//         mockCommands[Math.floor(Math.random() * mockCommands.length)];
//       setTranscript(randomCommand);
//       setLastCommand(randomCommand);
//       setIsListening(false);
//       processCommand(randomCommand);
//     }, 2000);
//   };

//   const processCommand = (command) => {
//     let feedback = "";

//     if (command.includes("play") && command.includes("happy")) {
//       feedback = "Playing happy music for you!";
//     } else if (command.includes("play") && command.includes("relaxed")) {
//       feedback = "Playing relaxed music to help you unwind.";
//     } else if (command.includes("next")) {
//       feedback = "Skipping to next song.";
//     } else if (command.includes("previous")) {
//       feedback = "Going back to previous song.";
//     } else if (command.includes("pause")) {
//       feedback = "Music paused.";
//     } else if (command.includes("play")) {
//       feedback = "Music resumed.";
//     } else if (command.includes("volume")) {
//       feedback = command.includes("increase")
//         ? "Volume increased."
//         : "Volume decreased.";
//     } else if (command.includes("shuffle")) {
//       feedback = command.includes("on")
//         ? "Shuffle enabled."
//         : "Shuffle disabled.";
//     } else {
//       feedback = "Command not recognized. Try again.";
//     }

//     setCommandFeedback(feedback);

//     setTimeout(() => {
//       setCommandFeedback("");
//     }, 3000);
//   };

//   return (
//     <div className="bg-black/40 backdrop-blur-sm border-b border-white/10 p-6">
//       <div className="max-w-4xl mx-auto">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-xl font-semibold text-white flex items-center">
//             <div className="w-6 h-6 mr-3 flex items-center justify-center">
//               <i className="ri-mic-line"></i>
//             </div>
//             Voice Control
//           </h3>

//           <div className="flex items-center space-x-3">
//             <div className="text-sm text-purple-300">
//               Status: {isListening ? "Listening..." : "Ready"}
//             </div>
//             <div
//               className={`w-3 h-3 rounded-full ${
//                 isListening ? "bg-red-500 animate-pulse" : "bg-green-500"
//               }`}
//             ></div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Voice Input */}
//           <div className="lg:col-span-2">
//             <div className="bg-white/10 rounded-xl p-6 border border-white/20">
//               <div className="text-center mb-6">
//                 <button
//                   onClick={startListening}
//                   disabled={isListening}
//                   className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl transition-all duration-300 ${
//                     isListening
//                       ? "bg-red-500 text-white animate-pulse cursor-not-allowed"
//                       : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white hover:scale-105 cursor-pointer"
//                   }`}
//                 >
//                   <i className="ri-mic-line"></i>
//                 </button>
//                 <p className="text-white mt-4 font-medium">
//                   {isListening ? "Listening for commands..." : "Tap to speak"}
//                 </p>
//               </div>

//               {transcript && (
//                 <div className="bg-black/30 rounded-lg p-4 mb-4">
//                   <div className="text-sm text-purple-300 mb-1">You said:</div>
//                   <div className="text-white font-medium">"{transcript}"</div>
//                 </div>
//               )}

//               {commandFeedback && (
//                 <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg p-4">
//                   <div className="text-sm text-purple-300 mb-1">
//                     System response:
//                   </div>
//                   <div className="text-purple-200">{commandFeedback}</div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Command Examples */}
//           <div>
//             <div className="bg-white/10 rounded-xl p-6 border border-white/20">
//               <h4 className="text-lg font-semibold text-white mb-4">
//                 Voice Commands
//               </h4>
//               <div className="space-y-2">
//                 {mockCommands.map((command, index) => (
//                   <div
//                     key={index}
//                     className="text-sm text-purple-200 bg-white/5 rounded-lg p-3 border border-white/10"
//                   >
//                     "{command}"
//                   </div>
//                 ))}
//               </div>

//               <div className="mt-4 pt-4 border-t border-white/10">
//                 <div className="text-xs text-white/60">
//                   <div className="flex items-center mb-2">
//                     <div className="w-3 h-3 mr-2 flex items-center justify-center">
//                       <i className="ri-information-line"></i>
//                     </div>
//                     Tips for better recognition:
//                   </div>
//                   <ul className="space-y-1 ml-5">
//                     <li>• Speak clearly and naturally</li>
//                     <li>• Use simple commands</li>
//                     <li>• Wait for the response</li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect, useRef } from "react";

// export default function VoiceControl({
//   audioRef,
//   playMusic,
//   pauseMusic,
//   nextSong,
//   prevSong,
//   increaseVolume,
//   decreaseVolume,
//   toggleShuffle,
// }) {
//   const [isListening, setIsListening] = useState(false);
//   const [transcript, setTranscript] = useState("");
//   const [commandFeedback, setCommandFeedback] = useState("");
//   const recognitionRef = useRef(null);

//   const mockCommands = [
//     "play music",
//     "pause music",
//     "next song",
//     "previous song",
//     "play happy music",
//     "play relaxed music",
//     "increase volume",
//     "decrease volume",
//     "shuffle on",
//     "shuffle off",
//   ];

//   useEffect(() => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       alert("Speech Recognition not supported in this browser. Use Chrome.");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.continuous = false;
//     recognition.interimResults = false;
//     recognition.lang = "en-US";

//     recognition.onstart = () => {
//       setIsListening(true);
//       setTranscript("");
//       setCommandFeedback("Listening...");
//     };

//     recognition.onresult = (event) => {
//       const spokenText = event.results[0][0].transcript.toLowerCase().trim();
//       setTranscript(spokenText);
//       processCommand(spokenText);
//     };

//     recognition.onerror = (event) => {
//       setCommandFeedback(`Error: ${event.error}`);
//       setIsListening(false);
//     };

//     recognition.onend = () => {
//       setIsListening(false);
//     };

//     recognitionRef.current = recognition;
//   }, []);

//   const startListening = () => {
//     if (recognitionRef.current && !isListening) {
//       recognitionRef.current.start();
//     }
//   };

//   const processCommand = (command) => {
//     let feedback = "";

//     if (command.includes("play music")) {
//       playMusic();
//       feedback = "Music playing.";
//     } else if (command.includes("pause music")) {
//       pauseMusic();
//       feedback = "Music paused.";
//     } else if (command.includes("next song")) {
//       nextSong();
//       feedback = "Playing next song.";
//     } else if (command.includes("previous song")) {
//       prevSong();
//       feedback = "Playing previous song.";
//     } else if (command.includes("increase volume")) {
//       increaseVolume();
//       feedback = "Volume increased.";
//     } else if (command.includes("decrease volume")) {
//       decreaseVolume();
//       feedback = "Volume decreased.";
//     } else if (command.includes("shuffle on")) {
//       toggleShuffle(true);
//       feedback = "Shuffle turned on.";
//     } else if (command.includes("shuffle off")) {
//       toggleShuffle(false);
//       feedback = "Shuffle turned off.";
//     } else {
//       feedback = "Command not recognized.";
//     }

//     setCommandFeedback(feedback);
//     setTimeout(() => setCommandFeedback(""), 3000);
//   };

//   return (
//     <div className="bg-black/40 backdrop-blur-sm border-b border-white/10 p-6">
//       <div className="max-w-4xl mx-auto">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-xl font-semibold text-white flex items-center">
//             <div className="w-6 h-6 mr-3 flex items-center justify-center">
//               <i className="ri-mic-line"></i>
//             </div>
//             Voice Control
//           </h3>

//           <div className="flex items-center space-x-3">
//             <div className="text-sm text-purple-300">
//               Status: {isListening ? "Listening..." : "Ready"}
//             </div>
//             <div
//               className={`w-3 h-3 rounded-full ${
//                 isListening ? "bg-red-500 animate-pulse" : "bg-green-500"
//               }`}
//             ></div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Voice Input */}
//           <div className="lg:col-span-2">
//             <div className="bg-white/10 rounded-xl p-6 border border-white/20">
//               <div className="text-center mb-6">
//                 <button
//                   onClick={startListening}
//                   disabled={isListening}
//                   className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl transition-all duration-300 ${
//                     isListening
//                       ? "bg-red-500 text-white animate-pulse cursor-not-allowed"
//                       : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white hover:scale-105 cursor-pointer"
//                   }`}
//                 >
//                   <i className="ri-mic-line"></i>
//                 </button>
//                 <p className="text-white mt-4 font-medium">
//                   {isListening ? "Listening for commands..." : "Tap to speak"}
//                 </p>
//               </div>

//               {transcript && (
//                 <div className="bg-black/30 rounded-lg p-4 mb-4">
//                   <div className="text-sm text-purple-300 mb-1">You said:</div>
//                   <div className="text-white font-medium">"{transcript}"</div>
//                 </div>
//               )}

//               {commandFeedback && (
//                 <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg p-4">
//                   <div className="text-sm text-purple-300 mb-1">
//                     System response:
//                   </div>
//                   <div className="text-purple-200">{commandFeedback}</div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Command Examples */}
//           <div>
//             <div className="bg-white/10 rounded-xl p-6 border border-white/20">
//               <h4 className="text-lg font-semibold text-white mb-4">
//                 Voice Commands
//               </h4>
//               <div className="space-y-2">
//                 {mockCommands.map((command, index) => (
//                   <div
//                     key={index}
//                     className="text-sm text-purple-200 bg-white/5 rounded-lg p-3 border border-white/10"
//                   >
//                     "{command}"
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// components/player/VoiceControl.js
"use client";

import { useState, useEffect, useRef } from "react";

export default function VoiceControl({
  playMusic,
  pauseMusic,
  nextSong,
  prevSong,
  increaseVolume,
  decreaseVolume,
  toggleShuffle,
}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [lastCommand, setLastCommand] = useState("");
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Speech recognition not supported in this browser");
      return;
    }

    // Initialize speech recognition
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      setTranscript(interimTranscript || finalTranscript);

      if (finalTranscript) {
        processCommand(finalTranscript.toLowerCase().trim());
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setError(`Error: ${event.error}`);
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const processCommand = (command) => {
    console.log("Voice command:", command);
    setLastCommand(command);

    // Play commands
    if (
      command.includes("play") ||
      command.includes("start") ||
      command.includes("resume")
    ) {
      playMusic();
      showFeedback("▶️ Playing music");
    }
    // Pause commands
    else if (
      command.includes("pause") ||
      command.includes("stop") ||
      command.includes("halt")
    ) {
      pauseMusic();
      showFeedback("⏸️ Music paused");
    }
    // Next song
    else if (
      command.includes("next") ||
      command.includes("skip") ||
      command.includes("forward")
    ) {
      nextSong();
      showFeedback("⏭️ Next song");
    }
    // Previous song
    else if (
      command.includes("previous") ||
      command.includes("back") ||
      command.includes("last")
    ) {
      prevSong();
      showFeedback("⏮️ Previous song");
    }
    // Volume up
    else if (
      command.includes("volume up") ||
      command.includes("louder") ||
      command.includes("increase volume")
    ) {
      increaseVolume();
      showFeedback("🔊 Volume increased");
    }
    // Volume down
    else if (
      command.includes("volume down") ||
      command.includes("quieter") ||
      command.includes("decrease volume") ||
      command.includes("lower volume")
    ) {
      decreaseVolume();
      showFeedback("🔉 Volume decreased");
    }
    // Unrecognized command
    else {
      showFeedback("❓ Command not recognized");
    }
  };

  const showFeedback = (message) => {
    // Create temporary feedback element
    const feedback = document.createElement("div");
    feedback.textContent = message;
    feedback.className =
      "fixed top-20 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in";
    document.body.appendChild(feedback);

    setTimeout(() => {
      feedback.remove();
    }, 2000);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      setError("Speech recognition not available");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  return (
    <div className="fixed top-20 right-6 bg-black/40 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-white/10 max-w-sm z-40">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">🎤 Voice Control</h3>
        <div
          className={`w-3 h-3 rounded-full ${
            isListening ? "bg-red-500 animate-pulse" : "bg-gray-500"
          }`}
        ></div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* Status */}
      <div className="mb-4">
        <div className="text-sm text-gray-400 mb-2">
          Status: {isListening ? "🎙️ Listening..." : "⏸️ Inactive"}
        </div>

        {/* Transcript */}
        {transcript && (
          <div className="p-3 bg-white/5 rounded-lg">
            <div className="text-xs text-gray-400 mb-1">You said:</div>
            <div className="text-white text-sm italic">"{transcript}"</div>
          </div>
        )}
      </div>

      {/* Last Command */}
      {lastCommand && (
        <div className="mb-4 p-3 bg-purple-500/20 rounded-lg">
          <div className="text-xs text-gray-400 mb-1">Last command:</div>
          <div className="text-purple-300 text-sm font-semibold">
            {lastCommand}
          </div>
        </div>
      )}

      {/* Control Button */}
      <button
        onClick={toggleListening}
        disabled={!!error}
        className={`w-full py-3 rounded-lg font-semibold transition-all ${
          isListening
            ? "bg-red-600 hover:bg-red-700 text-white"
            : error
            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
            : "bg-purple-600 hover:bg-purple-700 text-white"
        }`}
      >
        {isListening ? "🛑 Stop Listening" : "🎤 Start Listening"}
      </button>

      {/* Available Commands */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="text-xs font-semibold text-gray-400 mb-2">
          Available Commands:
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
          <div>• "Play"</div>
          <div>• "Pause"</div>
          <div>• "Next"</div>
          <div>• "Previous"</div>
          <div>• "Volume up"</div>
          <div>• "Volume down"</div>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-3 p-2 bg-blue-500/10 rounded text-xs text-blue-300">
        💡 Tip: Speak clearly and allow microphone access
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translate(-50%, -20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
