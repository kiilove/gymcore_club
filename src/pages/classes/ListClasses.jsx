import React, { useState } from "react";
import { HEALTH_CLUB_PRODUCTS } from "../../utils/consts";
import FormClasses from "./FormClasses";

const ListClasses = () => {
  // 부모에서 데이터를 상태로 관리
  const [products, setProducts] = useState(HEALTH_CLUB_PRODUCTS);

  const handleSave = (updatedProducts) => {
    console.log("Updated Products:", updatedProducts);
    setProducts(updatedProducts); // 부모 상태 업데이트
    // API 연동 또는 저장 로직 추가 가능
  };

  return (
    <div
      className="p-6 bg-white rounded-lg shadow-lg w-full"
      style={{ maxWidth: "1200px" }}
    >
      <h2 className="text-xl font-semibold mb-6 text-center">상품 목록</h2>
      <FormClasses classesData={products} onSave={handleSave} />
    </div>
  );
};

export default ListClasses;
