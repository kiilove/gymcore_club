// 시간 포맷팅 (분:초)
export const formatDuration = (durationString) => {
  if (!durationString) return "00:00"

  const parts = durationString.split(":")
  if (parts.length === 2) {
    return durationString
  }

  // 초 단위만 있는 경우
  const seconds = Number.parseInt(durationString, 10)
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
}

// 음악 카테고리별 필터링
export const filterMusicByCategory = (musicList, category) => {
  if (!category || category === "all") {
    return musicList
  }

  return musicList.filter((music) => music.category === category)
}

// BPM 범위로 필터링
export const filterMusicByBPM = (musicList, minBPM, maxBPM) => {
  if (!minBPM && !maxBPM) {
    return musicList
  }

  return musicList.filter((music) => {
    if (minBPM && maxBPM) {
      return music.bpm >= minBPM && music.bpm <= maxBPM
    } else if (minBPM) {
      return music.bpm >= minBPM
    } else {
      return music.bpm <= maxBPM
    }
  })
}

// 음악 검색
export const searchMusic = (musicList, searchTerm) => {
  if (!searchTerm) {
    return musicList
  }

  const term = searchTerm.toLowerCase()

  return musicList.filter(
    (music) =>
      music.title.toLowerCase().includes(term) ||
      music.artist.toLowerCase().includes(term) ||
      music.category.toLowerCase().includes(term),
  )
}

