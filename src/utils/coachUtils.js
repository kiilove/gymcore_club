// 코치 필터링 함수
export const filterCoaches = (coaches, filters) => {
  return coaches.filter((coach) => {
    // 이름 필터링
    if (
      filters.name &&
      !coach.name.toLowerCase().includes(filters.name.toLowerCase())
    ) {
      return false;
    }

    // 상태 필터링
    if (
      filters.status &&
      filters.status !== "all" &&
      coach.status !== filters.status
    ) {
      return false;
    }

    // 전문 분야 필터링
    if (
      filters.specialty &&
      filters.specialty !== "all" &&
      !coach.specialty.includes(filters.specialty)
    ) {
      return false;
    }

    return true;
  });
};

// 코치 정렬 함수
export const sortCoaches = (coaches, sortBy, sortOrder) => {
  return [...coaches].sort((a, b) => {
    let valueA, valueB;

    switch (sortBy) {
      case "name":
        valueA = a.name;
        valueB = b.name;
        break;
      case "specialty":
        valueA = a.specialty.join(", ");
        valueB = b.specialty.join(", ");
        break;
      case "hireDate":
        valueA = new Date(a.hireDate);
        valueB = new Date(b.hireDate);
        break;
      case "status":
        valueA = a.status;
        valueB = b.status;
        break;
      default:
        return 0;
    }

    if (valueA < valueB) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });
};
