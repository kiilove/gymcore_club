"use client";

import { useState, useRef, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaCompress,
  FaTimes,
} from "react-icons/fa";
import { useMusic } from "../../context/MusicContext";

const MiniMusicPlayer = () => {
  const {
    currentMusic,
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    showPlayer,
    minimized,
    handlePlayPause,
    handlePrevious,
    handleNext,
    handleSeek,
    handleVolumeChange,
    toggleMute,
    toggleMinimize,
    closePlayer,
  } = useMusic();

  const [waveformData, setWaveformData] = useState([]);
  const progressBarRef = useRef(null);
  const animationRef = useRef(null);

  // 파형 애니메이션 생성
  useEffect(() => {
    if (isPlaying) {
      // 애니메이션 시작
      let lastUpdate = Date.now();
      const generateWaveform = () => {
        // 실제 오디오 분석 대신 시간 기반 랜덤 파형 생성
        const now = Date.now();
        if (now - lastUpdate > 100) {
          // 100ms마다 업데이트
          const newWaveform = [];
          for (let i = 0; i < 20; i++) {
            // 현재 시간과 인덱스를 기반으로 한 의사 랜덤 높이 생성
            const height = 2 + Math.floor(Math.random() * 20);
            newWaveform.push(height);
          }
          setWaveformData(newWaveform);
          lastUpdate = now;
        }
        animationRef.current = requestAnimationFrame(generateWaveform);
      };

      generateWaveform();

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [isPlaying]);

  const handleProgressChange = (e) => {
    if (!progressBarRef.current) return;

    const progressBar = progressBarRef.current;
    const percent = e.nativeEvent.offsetX / progressBar.offsetWidth;
    const newTime = percent * duration;

    handleSeek(newTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // 파형 렌더링
  const renderWaveform = () => {
    return (
      <div className="flex items-end justify-center h-6 mb-2">
        {waveformData.map((height, index) => (
          <div
            key={index}
            className="w-1 bg-blue-600 dark:bg-blue-400 rounded-full mx-0.5 transition-all duration-100"
            style={{ height: `${height}px` }}
          ></div>
        ))}
      </div>
    );
  };

  // 플레이어가 표시되지 않으면 렌더링하지 않음
  if (!showPlayer) {
    console.log("MiniMusicPlayer: showPlayer is false");
    // 디버깅을 위해 임시로 항상 표시하던 코드를 제거하고 null을 반환하도록 수정
    return null;
  }

  // 콘솔에 현재 상태 출력
  console.log("MiniMusicPlayer rendering:", {
    showPlayer,
    currentMusic,
    currentTrack,
    isPlaying,
  });

  // 최소화된 플레이어
  if (minimized) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-50 p-2">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center flex-1">
            <div className="w-10 h-10 mr-3 flex-shrink-0">
              <img
                src={currentMusic?.coverImage || "/placeholder.svg"}
                alt={currentMusic?.title}
                className="w-full h-full object-cover rounded"
              />
            </div>
            <div className="truncate mr-4">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {currentTrack?.title}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {currentMusic?.artist}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrevious}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
            >
              <FaStepBackward size={16} />
            </button>

            <button
              onClick={handlePlayPause}
              className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 focus:outline-none"
            >
              {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
            </button>

            <button
              onClick={handleNext}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
            >
              <FaStepForward size={16} />
            </button>
          </div>

          <div className="flex-1 mx-4 hidden md:block">
            <div
              ref={progressBarRef}
              className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer"
              onClick={handleProgressChange}
            >
              <div
                className="h-full bg-blue-600 rounded-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={toggleMute}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none hidden md:block"
            >
              {isMuted ? <FaVolumeMute size={16} /> : <FaVolumeUp size={16} />}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) =>
                handleVolumeChange(Number.parseFloat(e.target.value))
              }
              className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer hidden md:block"
            />

            <button
              onClick={toggleMinimize}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
            >
              <FaExpand size={16} />
            </button>

            <button
              onClick={closePlayer}
              className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 focus:outline-none"
            >
              <FaTimes size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 확장된 플레이어
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-50 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {currentTrack?.title}
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleMinimize}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
            >
              <FaCompress size={16} />
            </button>

            <button
              onClick={closePlayer}
              className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 focus:outline-none"
            >
              <FaTimes size={16} />
            </button>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <div className="w-16 h-16 mr-4 flex-shrink-0">
            <img
              src={currentMusic?.coverImage || "/placeholder.svg"}
              alt={currentMusic?.title}
              className="w-full h-full object-cover rounded"
            />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {currentMusic?.artist}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {currentMusic?.category} • BPM: {currentMusic?.bpm}
            </p>
          </div>
        </div>

        {/* 파형 표시 */}
        {isPlaying && renderWaveform()}

        <div
          ref={progressBarRef}
          className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-2 cursor-pointer"
          onClick={handleProgressChange}
        >
          <div
            className="h-full bg-blue-600 rounded-full"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          ></div>
        </div>

        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <button
              onClick={handlePrevious}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
            >
              <FaStepBackward size={20} />
            </button>

            <button
              onClick={handlePlayPause}
              className="bg-blue-600 text-white rounded-full p-3 hover:bg-blue-700 focus:outline-none"
            >
              {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
            </button>

            <button
              onClick={handleNext}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
            >
              <FaStepForward size={20} />
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={toggleMute}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
            >
              {isMuted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) =>
                handleVolumeChange(Number.parseFloat(e.target.value))
              }
              className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniMusicPlayer;
