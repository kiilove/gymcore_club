import SectionCard from "../../../components/Shared/SectionCard";

const ProductInfoTab = ({ product }) => {
  // 금액 포맷팅 함수
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <SectionCard title="기본 정보" className="lg:col-span-2">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {product.name}
            </h2>
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                product.status === "active"
                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
              }`}
            >
              {product.status === "active" ? "판매중" : "판매중지"}
            </span>
          </div>

          <div className="flex items-center">
            <span className="text-gray-600 dark:text-gray-400 w-24">
              카테고리
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {product.category}
            </span>
          </div>

          <div className="flex items-center">
            <span className="text-gray-600 dark:text-gray-400 w-24">가격</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {formatCurrency(product.price)}
            </span>
          </div>

          {product.duration && (
            <div className="flex items-center">
              <span className="text-gray-600 dark:text-gray-400 w-24">
                기간
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {product.duration}일
              </span>
            </div>
          )}

          <div className="pt-4">
            <span className="text-gray-600 dark:text-gray-400">설명</span>
            <p className="mt-1 text-gray-900 dark:text-white">
              {product.description}
            </p>
          </div>

          {product.isPopular && (
            <div className="mt-2">
              <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                인기 상품
              </span>
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard title="상품 특징">
        <ul className="space-y-2">
          {product.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 mr-2 text-xs">
                {index + 1}
              </span>
              <span className="text-gray-900 dark:text-white">{feature}</span>
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  );
};

export default ProductInfoTab;
