"use client";

import { useState, useRef, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";
import { formatDuration } from "../../utils/musicUtils";

const MusicPlayer = ({ playlist, albumInfo }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [waveformData, setWaveformData] = useState([]);

  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const prevPlaylistRef = useRef(null);
  const animationRef = useRef(null);

  const currentTrack = playlist[currentTrackIndex];

  // 플레이리스트가 변경되면 첫 번째 곡으로 리셋
  useEffect(() => {
    // 플레이리스트가 변경되었는지 확인 (앨범 ID로 비교)
    if (prevPlaylistRef.current !== albumInfo?.id && playlist.length > 0) {
      // 플레이리스트가 변경되었으면 첫 번째 곡으로 설정
      setCurrentTrackIndex(0);
      setCurrentTime(0);
      setIsPlaying(false);

      // 현재 재생 중인 오디오 정지
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      // 현재 앨범 ID 저장
      prevPlaylistRef.current = albumInfo?.id;
    }
  }, [playlist, albumInfo]);

  // 오디오 이벤트 리스너 설정
  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      handleNext();
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentTrackIndex]);

  // 트랙이 변경될 때마다 재생 시작
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch((error) => {
        console.error("Audio playback failed:", error);
        setIsPlaying(false);
      });
    }
  }, [currentTrackIndex]);

  // 볼륨 변경 처리
  useEffect(() => {
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

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

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    setCurrentTrackIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? playlist.length - 1 : prevIndex - 1;
      return newIndex;
    });
  };

  const handleNext = () => {
    setCurrentTrackIndex((prevIndex) => {
      const newIndex = prevIndex === playlist.length - 1 ? 0 : prevIndex + 1;
      return newIndex;
    });
  };

  const handleProgressChange = (e) => {
    const progressBar = progressBarRef.current;
    const percent = e.nativeEvent.offsetX / progressBar.offsetWidth;
    const newTime = percent * duration;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = Number.parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // 파형 렌더링
  const renderWaveform = () => {
    return (
      <div className="flex items-end justify-center h-6 mb-4">
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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <audio ref={audioRef} src={currentTrack?.url} preload="metadata" />

      <div className="flex items-center mb-4">
        <div className="w-16 h-16 mr-4 flex-shrink-0">
          <img
            src={albumInfo?.coverImage || "/placeholder.svg"}
            alt={albumInfo?.title}
            className="w-full h-full object-cover rounded"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {currentTrack?.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {albumInfo?.artist}
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

      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-4">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div className="flex justify-center items-center space-x-6">
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

      <div className="flex items-center mt-4">
        <button
          onClick={toggleMute}
          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none mr-2"
        >
          {isMuted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer"
        />
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          재생 목록
        </h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {playlist.map((track, index) => (
            <div
              key={index}
              onClick={() => setCurrentTrackIndex(index)}
              className={`flex items-center p-2 rounded cursor-pointer ${
                currentTrackIndex === index
                  ? "bg-blue-100 dark:bg-blue-900/30"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <div className="w-8 h-8 mr-2 flex-shrink-0">
                <img
                  src={albumInfo?.coverImage || "/placeholder.svg"}
                  alt={track.title}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium truncate ${
                    currentTrackIndex === index
                      ? "text-blue-700 dark:text-blue-400"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  {track.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {formatDuration(track.duration)}
                </p>
              </div>
              {currentTrackIndex === index && isPlaying && (
                <div className="ml-2 flex space-x-1">
                  <div className="w-1 h-3 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse"></div>
                  <div className="w-1 h-4 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse"></div>
                  <div className="w-1 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
