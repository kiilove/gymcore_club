import React from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/Shared/PageTitle";
import ProductsForm from "../../components/Products/ProductsForm";

const ProductsAdd = () => {
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    // 실제 구현에서는 API 호출 등을 통해 데이터를 저장
    console.log("상품 등록 데이터:", formData);

    // 등록 후 상품 목록 페이지로 이동
    navigate("/products");
  };

  return (
    <div>
      <PageTitle title="상품 등록" subtitle="새로운 상품 정보를 등록합니다." />

      <ProductsForm onSubmit={handleSubmit} />
    </div>
  );
};

export default ProductsAdd;
