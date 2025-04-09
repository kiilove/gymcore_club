// BMI 계산
export const calculateBMI = (weight, height) => {
  if (!weight || !height) return 0;

  // 키는 미터 단위로 변환
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  return Number.parseFloat(bmi.toFixed(1));
};

// BMI 상태 확인
export const getBMIStatus = (bmi) => {
  if (bmi < 18.5) {
    return {
      status: "underweight",
      text: "저체중",
      className: "text-blue-600",
    };
  } else if (bmi >= 18.5 && bmi < 23) {
    return { status: "normal", text: "정상", className: "text-green-600" };
  } else if (bmi >= 23 && bmi < 25) {
    return {
      status: "overweight",
      text: "과체중",
      className: "text-yellow-600",
    };
  } else if (bmi >= 25 && bmi < 30) {
    return { status: "obese1", text: "비만", className: "text-orange-600" };
  } else {
    return { status: "obese2", text: "고도비만", className: "text-red-600" };
  }
};

// 회원 필터링
export const filterMembers = (members, filters) => {
  return members.filter((member) => {
    // 이름 필터
    if (filters.name && !member.name.includes(filters.name)) {
      return false;
    }

    // 상태 필터
    if (filters.status && member.status !== filters.status) {
      return false;
    }

    // 회원권 타입 필터
    if (
      filters.membershipType &&
      member.membershipType !== filters.membershipType
    ) {
      return false;
    }

    return true;
  });
};

// 회원 정렬
export const sortMembers = (members, sortBy, sortOrder) => {
  return [...members].sort((a, b) => {
    let valueA, valueB;

    switch (sortBy) {
      case "name":
        valueA = a.name;
        valueB = b.name;
        break;
      case "startDate":
        valueA = new Date(a.startDate);
        valueB = new Date(b.startDate);
        break;
      case "endDate":
        valueA = new Date(a.endDate);
        valueB = new Date(b.endDate);
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

// 생년월일로부터 만 나이 계산
export const calculateAge = (birthdate) => {
  if (!birthdate) return null;

  const today = new Date();
  const birthDate = new Date(birthdate);

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  // 아직 생일이 지나지 않았으면 나이에서 1을 빼줌
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};
