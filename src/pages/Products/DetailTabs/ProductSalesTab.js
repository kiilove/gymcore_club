import SectionCard from "../../../components/Shared/SectionCard";

const ProductSalesTab = ({ salesData }) => {
  // 금액 포맷팅 함수
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <SectionCard title="판매 통계">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">
              총 판매 건수
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {salesData.length}건
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">
              총 판매 금액
            </span>
            <span className="font-medium text-blue-600 dark:text-blue-400">
              {formatCurrency(
                salesData.reduce((sum, sale) => sum + sale.amount, 0)
              )}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">
              평균 판매 금액
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {formatCurrency(
                salesData.length > 0
                  ? salesData.reduce((sum, sale) => sum + sale.amount, 0) /
                      salesData.length
                  : 0
              )}
            </span>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="최근 판매 내역">
        {salesData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    회원명
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    결제일
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    금액
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {salesData.slice(0, 5).map((sale) => (
                  <tr key={sale.id}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {sale.memberName}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(sale.paymentDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {formatCurrency(sale.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400">
            판매 내역이 없습니다.
          </div>
        )}
      </SectionCard>
    </div>
  );
};

export default ProductSalesTab;
