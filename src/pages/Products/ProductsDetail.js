"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  Trash2,
  MoreVertical,
  Tag,
  BarChart3,
  ShoppingCart,
  Users,
} from "lucide-react";
import PageTitle from "../../components/Shared/PageTitle";
import Button from "../../components/Shared/Button";
import { products, payments } from "../../datas/mockData";
import { useToast } from "../../hooks/use-toast";
import { useModal } from "../../hooks/use-modal";
import { FaBoxOpen } from "react-icons/fa";

// 탭 컴포넌트 가져오기
import ProductInfoTab from "./DetailTabs/ProductInfoTab";
import ProductSalesTab from "./DetailTabs/ProductSalesTab";
import ProductRelatedTab from "./DetailTabs/ProductRelatedTab";
import ProductCustomersTab from "./DetailTabs/ProductCustomersTab";

const ProductsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("info");
  const [salesData, setSalesData] = useState([]);

  const { toast } = useToast();
  const { showModal } = useModal();

  // 모바일 감지
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    // 실제 구현에서는 API 호출 등을 통해 데이터를 가져옴
    const foundProduct = products.find((p) => p.id === Number.parseInt(id));

    if (foundProduct) {
      setProduct(foundProduct);

      // 해당 상품의 판매 데이터 가져오기 (실제로는 API 호출)
      const productSales = payments.filter(
        (payment) => payment.productName === foundProduct.name
      );
      setSalesData(productSales);
    } else {
      // 상품을 찾을 수 없는 경우 목록 페이지로 리다이렉트
      navigate("/products");
    }

    setLoading(false);
  }, [id, navigate]);

  const handleDelete = () => {
    showModal({
      title: "상품 삭제",
      message: `${product.name} 상품을 삭제하시겠습니까?`,
      confirmText: "삭제",
      cancelText: "취소",
      onConfirm: () => {
        // 실제 구현에서는 API 호출 등을 통해 데이터를 삭제
        console.log("삭제할 상품 ID:", product.id);

        toast({
          title: "삭제 완료",
          description: `${product.name} 상품이 삭제되었습니다.`,
          variant: "success",
        });

        // 삭제 후 목록 페이지로 이동
        navigate("/products");
      },
    });
  };

  const handleStatusChange = (newStatus) => {
    showModal({
      title: "상품 상태 변경",
      message: `${product.name} 상품을 ${
        newStatus === "active" ? "판매중" : "판매중지"
      }로 변경하시겠습니까?`,
      confirmText: "변경",
      cancelText: "취소",
      onConfirm: () => {
        // 실제 구현에서는 API 호출 등을 통해 데이터를 업데이트
        setProduct({
          ...product,
          status: newStatus,
        });

        toast({
          title: "상태 변경 완료",
          description: `${product.name} 상품이 ${
            newStatus === "active" ? "판매중" : "판매중지"
          }으로 변경되었습니다.`,
          variant: "success",
        });
      },
    });
  };

  // 모바일 메뉴 렌더링
  const renderMobileMenu = () => {
    return (
      <div className="relative">
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md"
        >
          <MoreVertical className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>

        {showMobileMenu && (
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
            <div className="py-1" role="menu" aria-orientation="vertical">
              <Link
                to="/products"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                onClick={() => setShowMobileMenu(false)}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                목록으로
              </Link>

              <Link
                to={`/products/edit/${product.id}`}
                className="block px-4 py-2 text-sm text-indigo-600 dark:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                onClick={() => setShowMobileMenu(false)}
              >
                <Edit className="h-4 w-4 mr-2" />
                수정
              </Link>

              <button
                onClick={() => {
                  handleDelete();
                  setShowMobileMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                삭제
              </button>

              {product?.status === "active" ? (
                <button
                  onClick={() => {
                    handleStatusChange("inactive");
                    setShowMobileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-amber-600 dark:text-amber-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                >
                  <Tag className="h-4 w-4 mr-2" />
                  판매중지
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleStatusChange("active");
                    setShowMobileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-emerald-600 dark:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                >
                  <Tag className="h-4 w-4 mr-2" />
                  판매시작
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  // 데스크톱 메뉴 렌더링
  const renderDesktopMenu = () => {
    return (
      <div className="flex items-center gap-3">
        <Link to="/products">
          <Button
            variant="light"
            size="sm"
            className="flex flex-col items-center px-5 py-2 min-w-20"
          >
            <ArrowLeft className="h-4 w-4 mb-1" />
            <span className="text-sm">목록</span>
          </Button>
        </Link>
        <Link to={`/products/edit/${product.id}`}>
          <Button
            variant="primary"
            size="sm"
            className="flex flex-col items-center px-5 py-2 min-w-20"
          >
            <Edit className="h-4 w-4 mb-1" />
            <span className="text-sm">수정</span>
          </Button>
        </Link>
        {product?.status === "active" ? (
          <Button
            variant="warning"
            size="sm"
            className="flex flex-col items-center px-5 py-2 min-w-20"
            onClick={() => handleStatusChange("inactive")}
          >
            <Tag className="h-4 w-4 mb-1" />
            <span className="text-sm">판매중지</span>
          </Button>
        ) : (
          <Button
            variant="success"
            size="sm"
            className="flex flex-col items-center px-5 py-2 min-w-20"
            onClick={() => handleStatusChange("active")}
          >
            <Tag className="h-4 w-4 mb-1" />
            <span className="text-sm">판매시작</span>
          </Button>
        )}
        <Button
          variant="danger"
          size="sm"
          className="flex flex-col items-center px-5 py-2 min-w-20"
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4 mb-1" />
          <span className="text-sm">삭제</span>
        </Button>
      </div>
    );
  };

  // 탭 네비게이션 렌더링
  const renderTabs = () => {
    const tabs = [
      { id: "info", label: "상품 정보", icon: Tag },
      { id: "sales", label: "판매 현황", icon: BarChart3 },
      { id: "related", label: "관련 상품", icon: ShoppingCart },
      { id: "customers", label: "구매 회원", icon: Users },
    ];

    return (
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="flex space-x-8 overflow-x-auto" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-base whitespace-nowrap flex items-center ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <tab.icon className="h-5 w-5 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    );
  };

  // 활성화된 탭에 따라 컴포넌트 렌더링
  const renderActiveTabContent = () => {
    if (!product) return null;

    switch (activeTab) {
      case "info":
        return <ProductInfoTab product={product} />;
      case "sales":
        return <ProductSalesTab salesData={salesData} />;
      case "related":
        return <ProductRelatedTab product={product} products={products} />;
      case "customers":
        return <ProductCustomersTab salesData={salesData} />;
      default:
        return null;
    }
  };

  if (loading) {
    return <div className="text-center py-10">로딩 중...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          <PageTitle
            title={`${product.name} 상세`}
            subtitle="상품의 상세 정보와 판매 현황을 확인할 수 있습니다."
            icon={FaBoxOpen}
          />
        </div>
        <div>{isMobile ? renderMobileMenu() : renderDesktopMenu()}</div>
      </div>

      {renderTabs()}
      {renderActiveTabContent()}
    </div>
  );
};

export default ProductsDetail;
