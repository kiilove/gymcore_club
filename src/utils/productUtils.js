// 상품 필터링 함수
export const filterProducts = (products, filters) => {
  return products.filter((product) => {
    // 검색어 필터링
    if (
      filters.name &&
      !product.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      !product.description.toLowerCase().includes(filters.name.toLowerCase())
    ) {
      return false;
    }

    // 카테고리 필터링
    if (
      filters.category &&
      filters.category !== "all" &&
      product.category !== filters.category
    ) {
      return false;
    }

    // 상태 필터링
    if (
      filters.status &&
      filters.status !== "all" &&
      product.status !== filters.status
    ) {
      return false;
    }

    return true;
  });
};

// 상품 정렬 함수
export const sortProducts = (products, sortBy, sortOrder) => {
  return [...products].sort((a, b) => {
    let valueA, valueB;

    switch (sortBy) {
      case "name":
        valueA = a.name;
        valueB = b.name;
        break;
      case "price":
        valueA = a.price;
        valueB = b.price;
        break;
      case "category":
        valueA = a.category;
        valueB = b.category;
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
