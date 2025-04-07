"use client";

import { createContext, useState, useContext, useRef, useEffect } from "react";

// 음악 컨텍스트 생성
export const MusicContext = createContext();

// 음악 컨텍스트 제공자 컴포넌트
export const MusicProvider = ({ children }) => {
  // 현재 재생 중인 음악 정보
  const [currentMusic, setCurrentMusic] = useState(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [minimized, setMinimized] = useState(true);

  // 오디오 요소 참조
  const audioRef = useRef(null);
  const animationRef = useRef(null);

  // 현재 트랙 정보
  const currentTrack = currentMusic?.tracks?.[currentTrackIndex];

  // 오디오 이벤트 리스너 설정
  useEffect(() => {
    if (!audioRef.current) return;

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
  }, [currentTrackIndex, currentMusic]);

  // 트랙이 변경될 때마다 재생 시작
  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;

    if (isPlaying) {
      audioRef.current.play().catch((error) => {
        console.error("Audio playback failed:", error);
        setIsPlaying(false);
      });
    }
  }, [currentTrackIndex, currentTrack, isPlaying]);

  // 볼륨 변경 처리
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  // 음악 재생/일시정지
  const handlePlayPause = () => {
    if (!audioRef.current || !currentTrack) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  // 이전 트랙으로 이동
  const handlePrevious = () => {
    if (!currentMusic?.tracks?.length) return;

    setCurrentTrackIndex((prevIndex) => {
      const newIndex =
        prevIndex === 0 ? currentMusic.tracks.length - 1 : prevIndex - 1;
      return newIndex;
    });
  };

  // 다음 트랙으로 이동
  const handleNext = () => {
    if (!currentMusic?.tracks?.length) return;

    setCurrentTrackIndex((prevIndex) => {
      const newIndex =
        prevIndex === currentMusic.tracks.length - 1 ? 0 : prevIndex + 1;
      return newIndex;
    });
  };

  // 재생 위치 변경
  const handleSeek = (newTime) => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // 볼륨 변경
  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  // 음소거 토글
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // 음악 재생 시작
  const playMusic = (music, trackIndex = 0) => {
    console.log("playMusic called with:", music);
    setCurrentMusic(music);
    setCurrentTrackIndex(trackIndex);
    setIsPlaying(true);
    setShowPlayer(true); // 이 부분이 제대로 실행되는지 확인
    setCurrentTime(0);

    // 디버깅을 위해 상태 변경 후 로그 추가
    setTimeout(() => {
      console.log("After playMusic:", {
        currentMusic: music,
        isPlaying: true,
        showPlayer: true,
      });
    }, 100);
  };

  // 플레이어 최소화/최대화 토글
  const toggleMinimize = () => {
    setMinimized(!minimized);
  };

  // 플레이어 닫기
  const closePlayer = () => {
    console.log("Closing player and stopping music");
    setIsPlaying(false);
    setShowPlayer(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      // 현재 음악 정보도 초기화
      setCurrentMusic(null);
      setCurrentTrackIndex(0);
    }
  };

  // 컨텍스트 값
  const value = {
    currentMusic,
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    showPlayer,
    minimized,
    audioRef,
    playMusic,
    handlePlayPause,
    handlePrevious,
    handleNext,
    handleSeek,
    handleVolumeChange,
    toggleMute,
    toggleMinimize,
    closePlayer,
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
      {/* 오디오 요소 */}
      <audio ref={audioRef} src={currentTrack?.url} preload="metadata" />
    </MusicContext.Provider>
  );
};

// 음악 컨텍스트 사용을 위한 커스텀 훅
export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
};
