"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, X } from "lucide-react";

const ProductsGrid = ({ products, onSelectItems }) => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectItem = (id) => {
    setSelectedItems((prev) => {
      const newSelected = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];

      // 부모 컴포넌트에 선택된 항목 전달
      onSelectItems(newSelected);
      return newSelected;
    });
  };

  const handleSelectAll = () => {
    if (selectedItems.length === products.length) {
      setSelectedItems([]);
      onSelectItems([]);
    } else {
      const allIds = products.map((product) => product.id);
      setSelectedItems(allIds);
      onSelectItems(allIds);
    }
  };

  const handleCardClick = (id, event) => {
    // 체크박스나 버튼 클릭 시 이벤트 처리 방지
    if (
      event.target.closest("button") ||
      event.target.closest("a") ||
      event.target.tagName.toLowerCase() === "a" ||
      event.target.tagName.toLowerCase() === "button" ||
      event.target.type === "checkbox"
    ) {
      return;
    }

    navigate(`/products/detail/${id}`);
  };

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={
              selectedItems.length === products.length && products.length > 0
            }
            onChange={handleSelectAll}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            {selectedItems.length > 0
              ? `${selectedItems.length}개 선택됨`
              : "전체 선택"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className={`bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border ${
              selectedItems.includes(product.id)
                ? "border-blue-500"
                : "border-transparent"
            } hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors duration-150`}
            onClick={(e) => handleCardClick(product.id, e)}
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {product.name}
                </h3>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(product.id)}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleSelectItem(product.id);
                  }}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
              </div>

              {product.isPopular && (
                <span className="inline-block px-2 py-1 mb-2 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
                  인기
                </span>
              )}

              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                {product.description}
              </p>

              <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">
                    카테고리:
                  </span>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {product.category}
                  </div>
                </div>

                <div>
                  <span className="text-gray-500 dark:text-gray-400">
                    가격:
                  </span>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {product.price.toLocaleString()}원
                  </div>
                </div>

                {product.duration && (
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">
                      기간:
                    </span>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {product.duration}일
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mt-3">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    product.status === "active"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                  }`}
                >
                  {product.status === "active" ? (
                    <>
                      <Check className="inline h-3 w-3 mr-1" />
                      판매중
                    </>
                  ) : (
                    <>
                      <X className="inline h-3 w-3 mr-1" />
                      판매중지
                    </>
                  )}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/products/detail/${product.id}`);
                  }}
                  className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-md text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800/40"
                >
                  상세보기
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsGrid;
