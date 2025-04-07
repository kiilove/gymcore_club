"use client";

import { useState, useRef } from "react";
import PageTitle from "../../components/Shared/PageTitle";
import SectionCard from "../../components/Shared/SectionCard";
import { music } from "../../datas/mockData";
import { filterMusicByCategory, searchMusic } from "../../utils/musicUtils";
import { useMusic } from "../../context/MusicContext";
import { FaPlay, FaPause } from "react-icons/fa";

const Music = () => {
  const { playMusic, currentMusic, isPlaying, handlePlayPause, showPlayer } =
    useMusic();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const playerStateRef = useRef({ currentMusic, isPlaying, showPlayer });

  const categories = ["all", ...new Set(music.map((item) => item.category))];

  const filteredMusic = searchMusic(
    filterMusicByCategory(
      music,
      selectedCategory === "all" ? "" : selectedCategory
    ),
    searchTerm
  );

  // 음악 선택 핸들러에 디버깅 로그 추가
  const handleMusicSelect = (musicItem) => {
    console.log("handleMusicSelect called with:", musicItem);
    playMusic(musicItem);

    // 디버깅을 위해 상태 확인
    setTimeout(() => {
      console.log("Music player state after selection:", {
        currentMusic,
        isPlaying,
        showPlayer: playerStateRef.current.showPlayer,
      });
    }, 200);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div>
      <PageTitle
        title="음악 관리"
        subtitle="클럽에서 사용할 음악을 관리하고 재생할 수 있습니다."
      />

      <SectionCard title="음악 목록">
        <div className="mb-4 space-y-3">
          <div>
            <input
              type="text"
              placeholder="음악 검색..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category === "all" ? "모든 카테고리" : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMusic.map((musicItem) => (
            <div
              key={musicItem.id}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow ${
                currentMusic?.id === musicItem.id ? "ring-2 ring-blue-500" : ""
              }`}
            >
              <div className="relative">
                <img
                  src={musicItem.coverImage || "/placeholder.svg"}
                  alt={musicItem.title}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() =>
                    currentMusic?.id === musicItem.id
                      ? handlePlayPause()
                      : handleMusicSelect(musicItem)
                  }
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity"
                >
                  {currentMusic?.id === musicItem.id && isPlaying ? (
                    <FaPause size={48} className="text-white" />
                  ) : (
                    <FaPlay size={48} className="text-white" />
                  )}
                </button>
                {currentMusic?.id === musicItem.id && (
                  <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    {isPlaying ? "재생 중" : "일시 정지"}
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  {musicItem.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {musicItem.artist}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300">
                    {musicItem.category}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    BPM: {musicItem.bpm} • {musicItem.duration}
                  </span>
                </div>
                <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                  {musicItem.tracks.length}개 트랙
                </div>
              </div>
            </div>
          ))}

          {filteredMusic.length === 0 && (
            <div className="col-span-full text-center py-6 text-gray-500 dark:text-gray-400">
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      </SectionCard>
    </div>
  );
};

export default Music;
