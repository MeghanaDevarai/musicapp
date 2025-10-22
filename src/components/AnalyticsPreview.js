import React, { useState, useEffect } from "react";
import { db, auth } from "../firebaseConfig";
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AnalyticsPreview() {
  const [moodData, setMoodData] = useState([]);
  const [genreData, setGenreData] = useState([]);
  const [topSongs, setTopSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setLoading(false);
          return;
        }

        // Get last 7 days of data
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);

        const q = query(
          collection(db, "analytics"),
          where("userId", "==", user.uid),
          where("playedAt", ">=", weekAgo),
          orderBy("playedAt", "desc")
        );

        const querySnapshot = await getDocs(q);
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });

        // Process mood data
        const moodByDay = {};
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        
        data.forEach(item => {
          const date = item.playedAt?.toDate ? item.playedAt.toDate() : new Date(item.playedAt);
          const day = daysOfWeek[date.getDay()];
          
          if (!moodByDay[day]) {
            moodByDay[day] = { day, happy: 0, calm: 0, energetic: 0 };
          }
          
          const mood = item.moodDuringListening?.toLowerCase() || '';
          if (mood.includes('happy')) moodByDay[day].happy += 1;
          if (mood.includes('calm') || mood.includes('relax')) moodByDay[day].calm += 1;
          if (mood.includes('energetic') || mood.includes('energy')) moodByDay[day].energetic += 1;
        });

        const moodChartData = Object.values(moodByDay);

        // Process genre data
        const genreCount = {};
        data.forEach(item => {
          const genre = item.genre || 'Unknown';
          genreCount[genre] = (genreCount[genre] || 0) + 1;
        });

        const colors = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B'];
        const genreChartData = Object.entries(genreCount).map(([name, count], index) => ({
          name,
          value: Math.round((count / data.length) * 100),
          color: colors[index % colors.length]
        })).slice(0, 4);

        // Process top songs
        const songCount = {};
        data.forEach(item => {
          const key = `${item.songTitle}_${item.artist}`;
          if (!songCount[key]) {
            songCount[key] = {
              title: item.songTitle,
              artist: item.artist,
              plays: 0,
              mood: item.moodDuringListening || 'Neutral'
            };
          }
          songCount[key].plays += 1;
        });

        const topSongsData = Object.values(songCount)
          .sort((a, b) => b.plays - a.plays)
          .slice(0, 3);

        setMoodData(moodChartData);
        setGenreData(genreChartData);
        setTopSongs(topSongsData);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch analytics data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (loading) {
    return <div className="text-white text-center">Loading analytics...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        Error loading analytics: {error}
      </div>
    );
  }

  // Show empty state if no data
  if (!moodData.length && !genreData.length && !topSongs.length) {
    return (
      <div className="mb-8 bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 text-center">
        <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="ri-music-2-line text-3xl text-purple-300"></i>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No Analytics Yet</h3>
        <p className="text-purple-200">
          Start listening to music to see your analytics here!
        </p>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Your Music Analytics</h2>
        <button className="text-blue-300 hover:text-blue-200 transition-colors text-sm whitespace-nowrap cursor-pointer">
          View Full Analytics →
        </button>
      </div>

      {/* Rest of your existing JSX remains the same */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <div className="w-5 h-5 flex items-center justify-center mr-2">
              <i className="ri-line-chart-line text-purple-400"></i>
            </div>
            Weekly Mood Trends
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={moodData}>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
              />
              <YAxis hide />
              <Line
                type="monotone"
                dataKey="happy"
                stroke="#8B5CF6"
                strokeWidth={3}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="calm"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="energetic"
                stroke="#10B981"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
              <span className="text-white/70 text-sm">Happy</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-white/70 text-sm">Calm</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-white/70 text-sm">Energetic</span>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <div className="w-5 h-5 flex items-center justify-center mr-2">
              <i className="ri-pie-chart-line text-blue-400"></i>
            </div>
            Genre Distribution
          </h3>
          <div className="flex items-center">
            <ResponsiveContainer width="60%" height={160}>
              <PieChart>
                <Pie
                  data={genreData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  dataKey="value"
                >
                  {genreData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {genreData.map((genre, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-3"
                    style={{ backgroundColor: genre.color }}
                  ></div>
                  <div>
                    <p className="text-white text-sm font-medium">
                      {genre.name}
                    </p>
                    <p className="text-white/60 text-xs">{genre.value}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h3 className="text-white font-semibold mb-4 flex items-center">
          <div className="w-5 h-5 flex items-center justify-center mr-2">
            <i className="ri-music-2-line text-green-400"></i>
          </div>
          Most Played This Week
        </h3>
        <div className="space-y-4">
          {topSongs.map((song, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <i className="ri-music-line text-white"></i>
                </div>
                <div>
                  <p className="text-white font-medium">{song.title}</p>
                  <p className="text-white/60 text-sm">{song.artist}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white/80 text-sm">{song.plays} plays</p>
                <div className="flex items-center">
                  <span className="text-xs text-purple-300 bg-purple-500/20 px-2 py-1 rounded-full">
                    {song.mood}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}