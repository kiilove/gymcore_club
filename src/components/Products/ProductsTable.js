"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronUp, ChevronDown, MoreHorizontal } from "lucide-react";

const ProductsTable = ({
  products,
  onSort,
  sortConfig = {},
  onSelectItems,
}) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  // 모바일 감지
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // 행 클릭 처리
  const handleRowClick = (id, event) => {
    // 체크박스 클릭 시 이벤트 처리 방지
    if (
      event.target.closest("button") ||
      event.target.closest("a") ||
      event.target.tagName.toLowerCase() === "a" ||
      event.target.tagName.toLowerCase() === "button" ||
      event.target.type === "checkbox"
    ) {
      return;
    }

    // 모바일에서는 상세보기 버튼을 클릭했을 때만 이동하도록 처리
    if (isMobile) {
      return;
    }

    navigate(`/products/detail/${id}`);
  };

  const handleCheckboxChange = (e, id) => {
    e.stopPropagation(); // 이벤트 버블링 방지

    setSelectedItems((prev) => {
      const newSelected = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];

      // 부모 컴포넌트에 선택된 항목 전달
      onSelectItems(newSelected);
      return newSelected;
    });
  };

  const handleHeaderCheckboxChange = (e) => {
    if (e.target.checked) {
      const allIds = products.map((product) => product.id);
      setSelectedItems(allIds);
      onSelectItems(allIds);
    } else {
      setSelectedItems([]);
      onSelectItems([]);
    }
  };

  const handleSortClick = (field) => {
    if (onSort) {
      onSort(field);
    }
  };

  const getSortIcon = (field) => {
    if (!sortConfig || sortConfig.sortBy !== field) {
      return <MoreHorizontal className="h-4 w-4 text-gray-400" />;
    }
    return sortConfig.sortOrder === "asc" ? (
      <ChevronUp className="h-4 w-4 text-blue-500" />
    ) : (
      <ChevronDown className="h-4 w-4 text-blue-500" />
    );
  };

  // 모바일 테이블 렌더링
  const renderMobileTable = () => {
    return (
      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 relative"
            onClick={(e) => handleRowClick(product.id, e)}
          >
            <div
              className="absolute top-3 right-3"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                onChange={(e) => handleCheckboxChange(e, product.id)}
                checked={selectedItems.includes(product.id)}
              />
            </div>

            <div className="mb-3">
              <div className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                {product.name}
                {product.isPopular && (
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                    인기
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                {product.description}
              </div>
            </div>

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
                <span className="text-gray-500 dark:text-gray-400">가격:</span>
                <div className="font-medium text-gray-900 dark:text-white">
                  {formatCurrency(product.price)}
                </div>
              </div>

              <div>
                <span className="text-gray-500 dark:text-gray-400">기간:</span>
                <div className="font-medium text-gray-900 dark:text-white">
                  {product.duration ? `${product.duration}일` : "-"}
                </div>
              </div>

              <div>
                <span className="text-gray-500 dark:text-gray-400">상태:</span>
                <div>
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-md ${
                      product.status === "active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {product.status === "active" ? "판매중" : "판매중지"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-3 flex justify-end">
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
        ))}
      </div>
    );
  };

  // 데스크톱 테이블
  const renderDesktopTable = () => {
    return (
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-3 py-3 text-left">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  onChange={handleHeaderCheckboxChange}
                  checked={
                    selectedItems.length === products.length &&
                    products.length > 0
                  }
                />
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSortClick("name")}
              >
                <div className="flex items-center gap-1">
                  상품명
                  {getSortIcon("name")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSortClick("category")}
              >
                <div className="flex items-center gap-1">
                  카테고리
                  {getSortIcon("category")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSortClick("price")}
              >
                <div className="flex items-center gap-1">
                  가격
                  {getSortIcon("price")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                기간
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSortClick("status")}
              >
                <div className="flex items-center gap-1">
                  상태
                  {getSortIcon("status")}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {products.map((product) => (
              <tr
                key={product.id}
                className={`${
                  product.isPopular ? "bg-yellow-50 dark:bg-yellow-900/10" : ""
                } ${
                  selectedItems.includes(product.id)
                    ? "bg-blue-50 dark:bg-blue-900/20"
                    : ""
                } hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors duration-150`}
                onClick={(e) => handleRowClick(product.id, e)}
              >
                <td
                  className="px-3 py-4 whitespace-nowrap"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    onChange={(e) => handleCheckboxChange(e, product.id)}
                    checked={selectedItems.includes(product.id)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {product.name}
                        {product.isPopular && (
                          <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                            인기
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                        {product.description}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {product.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {formatCurrency(product.price)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {product.duration ? `${product.duration}일` : "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.status === "active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {product.status === "active" ? "판매중" : "판매중지"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return isMobile ? renderMobileTable() : renderDesktopTable();
};

export default ProductsTable;
