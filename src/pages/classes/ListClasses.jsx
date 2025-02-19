import React, { useState } from "react";
import { HEALTH_CLUB_PRODUCTS } from "../../utils/consts";
import FormClasses from "./FormClasses";

const ListClasses = () => {
  // 부모에서 데이터를 상태로 관리
  const [products, setProducts] = useState(HEALTH_CLUB_PRODUCTS);

  // 상품 추가 (추후 API 연동이나 상태 업데이트 로직을 추가할 수 있음)
  const handleAdd = (newProduct) => {
    console.log("Add new product:", newProduct);
    // 신규 상품 추가 로직 (예시)
    // setProducts((prev) => ({
    //   ...prev,
    //   [newProduct.category]: {
    //     ...prev[newProduct.category],
    //     classes: [...prev[newProduct.category].classes, newProduct],
    //   },
    // }));
  };

  // 상품 수정: 수정할 항목의 id와 업데이트된 값을 받아 상태 업데이트 처리
  const handleUpdate = (id, updatedValues) => {
    console.log("Update product - ID:", id, "Updated Values:", updatedValues);
    setProducts((prevProducts) => {
      const updatedProducts = { ...prevProducts };
      // 모든 카테고리를 순회하여 해당 id를 가진 항목을 업데이트
      Object.keys(updatedProducts).forEach((category) => {
        updatedProducts[category].classes = updatedProducts[
          category
        ].classes.map((item) => {
          if (item.id === id) {
            return { ...item, ...updatedValues };
          }
          return item;
        });
      });
      return updatedProducts;
    });
  };

  // 상품 삭제: 삭제할 항목의 id를 받아 처리
  const handleDelete = (id) => {
    console.log("Delete product - ID:", id);
    setProducts((prevProducts) => {
      const updatedProducts = { ...prevProducts };
      Object.keys(updatedProducts).forEach((category) => {
        updatedProducts[category].classes = updatedProducts[
          category
        ].classes.filter((item) => item.id !== id);
      });
      return updatedProducts;
    });
  };

  return (
    <div
      className="p-6 bg-white rounded-lg shadow-lg w-full"
      style={{ maxWidth: "1200px" }}
    >
      <h2 className="text-xl font-semibold mb-6 text-center">상품 목록</h2>
      <FormClasses
        classesData={products}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ListClasses;
