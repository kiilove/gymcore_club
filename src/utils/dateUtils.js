// 날짜 포맷팅 함수
export const formatDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// 날짜 간 차이 계산 (일 단위)
export const getDaysDifference = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = end - start;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// 오늘 날짜와 비교하여 남은 일수 계산
export const getRemainingDays = (endDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);
  const diffTime = end - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// 회원권 상태 확인
export const getMembershipStatus = (endDate) => {
  const remainingDays = getRemainingDays(endDate);

  if (remainingDays < 0) {
    return {
      status: "expired",
      text: "만료됨",
      className: "text-red-600 bg-red-100 dark:bg-red-900/30",
    };
  } else if (remainingDays <= 7) {
    return {
      status: "expiring",
      text: `${remainingDays}일 남음`,
      className: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30",
    };
  } else {
    return {
      status: "active",
      text: `${remainingDays}일 남음`,
      className: "text-green-600 bg-green-100 dark:bg-green-900/30",
    };
  }
};

// 날짜 입력용 포맷 (YYYY-MM-DD)
export const formatDateForInput = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// 금액 포맷팅 함수
export const formatCurrency = (value) => {
  if (value === undefined || value === null) return "";

  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(value);
};
