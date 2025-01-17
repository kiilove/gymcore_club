export const cleanedFormValues = (values) => {
  return Object.entries(values).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value ?? "",
    }),
    {}
  );
};

export const calAge = (birthYear, birthMonth, birthDay) => {
  const today = new Date();
  const birthDate = new Date(birthYear, birthMonth - 1, birthDay);

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--; // 생일이 지나지 않은 경우
  }

  return age;
};
