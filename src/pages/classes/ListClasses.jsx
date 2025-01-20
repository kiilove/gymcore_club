import React from "react";
import { HEALTH_CLUB_PRODUCTS } from "../../utils/consts";
import FormClasses from "./FormClasses";

const ListClasses = () => {
  const initClasses = HEALTH_CLUB_PRODUCTS;
  return (
    <div
      className="p-6 bg-white rounded-lg shadow-lg w-full"
      style={{ maxWidth: "1200px" }}
    >
      <h2 className="text-xl font-semibold mb-6 text-center">상품 목록</h2>
      <FormClasses products={initClasses} />
    </div>
  );
};

export default ListClasses;
