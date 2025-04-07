import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageTitle from "../../components/Shared/PageTitle";
import ProductsForm from "../../components/Products/ProductsForm";
import { products } from "../../datas/mockData";

const ProductsEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 실제 구현에서는 API 호출 등을 통해 데이터를 가져옴
    const foundProduct = products.find((p) => p.id === parseInt(id));

    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      // 상품을 찾을 수 없는 경우 목록 페이지로 리다이렉트
      navigate("/products");
    }

    setLoading(false);
  }, [id, navigate]);

  const handleSubmit = (formData) => {
    // 실제 구현에서는 API 호출 등을 통해 데이터를 업데이트
    console.log("상품 수정 데이터:", formData);

    // 수정 후 상품 목록 페이지로 이동
    navigate("/products");
  };

  if (loading) {
    return <div className="text-center py-10">로딩 중...</div>;
  }

  return (
    <div>
      <PageTitle
        title="상품 수정"
        subtitle={`${product.name} 상품의 정보를 수정합니다.`}
      />

      <ProductsForm
        product={product}
        onSubmit={handleSubmit}
        isEditing={true}
      />
    </div>
  );
};

export default ProductsEdit;
