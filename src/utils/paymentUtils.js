// 결제 필터링 함수
export const filterPayments = (payments, filters) => {
  return payments.filter((payment) => {
    // 검색어 필터링
    if (
      filters.search &&
      !payment.memberName
        .toLowerCase()
        .includes(filters.search.toLowerCase()) &&
      !payment.productName
        .toLowerCase()
        .includes(filters.search.toLowerCase()) &&
      !payment.paymentId.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    // 상태 필터링
    if (
      filters.status &&
      filters.status !== "all" &&
      payment.status !== filters.status
    ) {
      return false;
    }

    // 결제 방법 필터링
    if (
      filters.paymentMethod &&
      filters.paymentMethod !== "all" &&
      payment.paymentMethod !== filters.paymentMethod
    ) {
      return false;
    }

    // 날짜 범위 필터링
    if (filters.dateRange && filters.dateRange !== "all") {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const paymentDate = new Date(payment.date);

      switch (filters.dateRange) {
        case "today":
          if (paymentDate < today) {
            return false;
          }
          break;
        case "week":
          const weekStart = new Date(today);
          weekStart.setDate(today.getDate() - today.getDay());
          if (paymentDate < weekStart) {
            return false;
          }
          break;
        case "month":
          const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
          if (paymentDate < monthStart) {
            return false;
          }
          break;
        case "custom":
          if (filters.startDate) {
            const startDate = new Date(filters.startDate);
            if (paymentDate < startDate) {
              return false;
            }
          }
          if (filters.endDate) {
            const endDate = new Date(filters.endDate);
            endDate.setHours(23, 59, 59, 999);
            if (paymentDate > endDate) {
              return false;
            }
          }
          break;
        default:
          break;
      }
    }

    // 금액 범위 필터링
    if (filters.minAmount && payment.amount < Number(filters.minAmount)) {
      return false;
    }
    if (filters.maxAmount && payment.amount > Number(filters.maxAmount)) {
      return false;
    }

    return true;
  });
};

// 결제 정렬 함수
export const sortPayments = (payments, sortBy, sortOrder) => {
  return [...payments].sort((a, b) => {
    let valueA, valueB;

    switch (sortBy) {
      case "paymentId":
        valueA = a.paymentId || `#${a.id}`;
        valueB = b.paymentId || `#${b.id}`;
        break;
      case "memberName":
        valueA = a.memberName;
        valueB = b.memberName;
        break;
      case "productName":
        valueA = a.productName;
        valueB = b.productName;
        break;
      case "amount":
        valueA = a.amount;
        valueB = b.amount;
        break;
      case "paymentMethod":
        valueA = a.paymentMethod;
        valueB = b.paymentMethod;
        break;
      case "date":
        valueA = new Date(a.date).getTime();
        valueB = new Date(b.date).getTime();
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
