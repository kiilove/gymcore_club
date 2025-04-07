import { formatCurrency } from "../../utils/dateUtils";

const PaymentStats = ({ payments }) => {
  // 통계 계산
  const total = payments.length;
  const completed = payments.filter((p) => p.status === "completed").length;
  const pending = payments.filter((p) => p.status === "pending").length;
  const failed = payments.filter((p) => p.status === "failed").length;
  const refunded = payments.filter((p) => p.status === "refunded").length;

  const totalAmount = payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  const now = new Date();
  const thisMonth = payments
    .filter((p) => {
      const paymentDate = new Date(p.date);
      return (
        paymentDate.getMonth() === now.getMonth() &&
        paymentDate.getFullYear() === now.getFullYear() &&
        p.status === "completed"
      );
    })
    .reduce((sum, p) => sum + p.amount, 0);

  const lastMonth = payments
    .filter((p) => {
      const paymentDate = new Date(p.date);
      const lastMonthDate = new Date();
      lastMonthDate.setMonth(now.getMonth() - 1);
      return (
        paymentDate.getMonth() === lastMonthDate.getMonth() &&
        paymentDate.getFullYear() === lastMonthDate.getFullYear() &&
        p.status === "completed"
      );
    })
    .reduce((sum, p) => sum + p.amount, 0);

  const monthlyChange =
    lastMonth > 0 ? Math.round(((thisMonth - lastMonth) / lastMonth) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="text-sm text-gray-500">총 결제 건수</div>
        <div className="text-2xl font-bold mt-1">{total}건</div>
        <div className="mt-2 text-sm">
          <span className="text-green-600 font-medium">
            완료: {completed}건
          </span>
          <span className="text-yellow-600 font-medium ml-2">
            대기: {pending}건
          </span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="text-sm text-gray-500">총 결제 금액</div>
        <div className="text-2xl font-bold mt-1">
          {formatCurrency(totalAmount)}
        </div>
        <div className="mt-2 text-sm">
          <span className="text-gray-600">완료 결제 기준</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="text-sm text-gray-500">이번 달 매출</div>
        <div className="text-2xl font-bold mt-1">
          {formatCurrency(thisMonth)}
        </div>
        <div className="mt-2 text-sm">
          {lastMonth > 0 && (
            <span
              className={`font-medium ${
                monthlyChange >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {monthlyChange >= 0 ? "↑" : "↓"} 전월 대비{" "}
              {Math.abs(monthlyChange)}%
            </span>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="text-sm text-gray-500">결제 상태</div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-col items-center">
            <div className="text-green-600 font-bold">{completed}</div>
            <div className="text-xs text-gray-500">완료</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-yellow-600 font-bold">{pending}</div>
            <div className="text-xs text-gray-500">대기</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-red-600 font-bold">{failed}</div>
            <div className="text-xs text-gray-500">실패</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-gray-600 font-bold">{refunded}</div>
            <div className="text-xs text-gray-500">환불</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStats;
