import { Link } from "react-router-dom";
import SectionCard from "../../../components/Shared/SectionCard";

const ProductRelatedTab = ({ product, products }) => {
  // 금액 포맷팅 함수
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // 같은 카테고리의 다른 상품들 표시
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <SectionCard title="관련 상품">
      {relatedProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {relatedProducts.map((relatedProduct) => (
            <div
              key={relatedProduct.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {relatedProduct.name}
                  </h3>
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full ${
                      relatedProduct.status === "active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {relatedProduct.status === "active" ? "판매중" : "판매중지"}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                  {relatedProduct.description}
                </p>
                <div className="mt-2 font-bold text-blue-600 dark:text-blue-400">
                  {formatCurrency(relatedProduct.price)}
                </div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-700/50">
                <Link
                  to={`/products/detail/${relatedProduct.id}`}
                  className="w-full block text-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  상세보기
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
          관련 상품이 없습니다.
        </div>
      )}
    </SectionCard>
  );
};

export default ProductRelatedTab;
