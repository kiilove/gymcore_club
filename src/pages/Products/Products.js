"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Grid, List, Trash2, Plus, Filter, MoreVertical } from "lucide-react";
import PageTitle from "../../components/Shared/PageTitle";
import Button from "../../components/Shared/Button";
import ProductsFilter from "../../components/Products/ProductsFilter";
import ProductsTable from "../../components/Products/ProductsTable";
import ProductsGrid from "../../components/Products/ProductsGrid";
import { products } from "../../datas/mockData";
import { filterProducts, sortProducts } from "../../utils/productUtils";
import { useToast } from "../../hooks/use-toast";
import { useModal } from "../../hooks/use-modal";
import { FaBoxOpen } from "react-icons/fa";

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    status: "",
  });
  const [sortConfig, setSortConfig] = useState({
    sortBy: "name",
    sortOrder: "asc",
  });
  const [viewMode, setViewMode] = useState("table");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const mobileMenuRef = useRef(null);

  const { toast } = useToast();
  const { showModal } = useModal();

  // 초기 데이터 로드
  useEffect(() => {
    setFilteredProducts(products);
  }, []);

  // 모바일 감지 및 화면 크기 변경 감지
  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      // 모바일에서는 자동으로 그리드 뷰로 설정
      if (mobile && viewMode !== "grid") {
        setViewMode("grid");
      }
    };

    // 초기 로드 시 체크
    checkIsMobile();

    // 화면 크기 변경 시 체크
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, [viewMode]);

  // 모바일 메뉴 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let result = filterProducts(products, filters);
    result = sortProducts(result, sortConfig.sortBy, sortConfig.sortOrder);
    setFilteredProducts(result);
  }, [filters, sortConfig]);

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSort = (sortBy) => {
    setSortConfig((prevConfig) => ({
      sortBy,
      sortOrder:
        prevConfig.sortBy === sortBy && prevConfig.sortOrder === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const handleSelectItems = (items) => {
    setSelectedProducts(items);
  };

  const handleDeleteSelected = () => {
    if (selectedProducts.length === 0) return;

    showModal({
      title: "상품 삭제",
      message: `선택한 ${selectedProducts.length}개의 상품을 삭제하시겠습니까?`,
      confirmText: "삭제",
      cancelText: "취소",
      confirmVariant: "danger",
      onConfirm: () => {
        // 실제 구현에서는 API 호출 등을 통해 데이터를 삭제
        console.log("삭제할 상품 ID:", selectedProducts);

        // 삭제 후 목록 업데이트 (실제 구현에서는 API 응답 후 처리)
        const updatedProducts = filteredProducts.filter(
          (product) => !selectedProducts.includes(product.id)
        );
        setFilteredProducts(updatedProducts);
        setSelectedProducts([]);

        toast({
          title: "삭제 완료",
          description: `${selectedProducts.length}개의 상품이 삭제되었습니다.`,
          variant: "success",
        });
      },
    });
  };

  // 모바일 메뉴 렌더링
  const renderMobileMenu = () => {
    return (
      <div className="relative" ref={mobileMenuRef}>
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md"
        >
          <MoreVertical className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>

        {showMobileMenu && (
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
            <div className="py-1" role="menu" aria-orientation="vertical">
              <button
                onClick={() => {
                  setShowFilter(!showFilter);
                  setShowMobileMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
              >
                <Filter className="h-4 w-4 mr-2" />
                필터
              </button>

              <button
                onClick={() => {
                  setViewMode(viewMode === "table" ? "grid" : "table");
                  setShowMobileMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
              >
                {viewMode === "table" ? (
                  <>
                    <Grid className="h-4 w-4 mr-2" />
                    그리드 보기
                  </>
                ) : (
                  <>
                    <List className="h-4 w-4 mr-2" />
                    테이블 보기
                  </>
                )}
              </button>

              {selectedProducts.length > 0 && (
                <button
                  onClick={() => {
                    handleDeleteSelected();
                    setShowMobileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {selectedProducts.length}개 삭제
                </button>
              )}

              <Link
                to="/products/add"
                className="block px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                onClick={() => setShowMobileMenu(false)}
              >
                <Plus className="h-4 w-4 mr-2" />
                상품 등록
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  };

  // 데스크톱 메뉴 렌더링
  const renderDesktopMenu = () => {
    return (
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setShowFilter(!showFilter)}
          className="flex items-center gap-1"
        >
          <Filter className="h-4 w-4" />
          필터
        </Button>
        <div className="flex items-center bg-white dark:bg-gray-800 rounded-md shadow p-1">
          <button
            className={`p-1.5 rounded flex items-center justify-center ${
              viewMode === "table"
                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                : "text-gray-500 dark:text-gray-400"
            }`}
            onClick={() => setViewMode("table")}
            aria-label="테이블 보기"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            className={`p-1.5 rounded flex items-center justify-center ${
              viewMode === "grid"
                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                : "text-gray-500 dark:text-gray-400"
            }`}
            onClick={() => setViewMode("grid")}
            aria-label="그리드 보기"
          >
            <Grid className="h-4 w-4" />
          </button>
        </div>
        {selectedProducts.length > 0 && (
          <Button
            variant="danger"
            size="sm"
            onClick={handleDeleteSelected}
            className="flex items-center gap-1"
          >
            <Trash2 className="h-4 w-4" />
            {selectedProducts.length}개 삭제
          </Button>
        )}
        <Link to="/products/add">
          <Button
            variant="primary"
            size="sm"
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            상품 등록
          </Button>
        </Link>
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle
          title="상품 관리"
          subtitle="상품 목록을 조회하고 관리할 수 있습니다."
          icon={FaBoxOpen}
        />
        {isMobile ? renderMobileMenu() : renderDesktopMenu()}
      </div>

      {showFilter && <ProductsFilter onFilter={handleFilter} />}

      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md overflow-hidden mt-6 py-4">
        {viewMode === "table" ? (
          <ProductsTable
            products={filteredProducts}
            onSort={handleSort}
            sortConfig={sortConfig}
            onSelectItems={handleSelectItems}
          />
        ) : (
          <ProductsGrid
            products={filteredProducts}
            onSelectItems={handleSelectItems}
          />
        )}
      </div>
    </div>
  );
};

export default Products;
