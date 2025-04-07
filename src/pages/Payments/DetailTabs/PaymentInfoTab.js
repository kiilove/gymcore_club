import { formatCurrency, formatDate } from "../../../utils/dateUtils";
import SectionCard from "../../../components/Shared/SectionCard";

const PaymentInfoTab = ({ payment }) => {
  if (!payment) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <SectionCard title="기본 정보">
        <div className="grid grid-cols-1 gap-3">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">결제 ID</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {payment.paymentId}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">상태</span>
            <span
              className={`font-medium ${
                payment.status === "완료" || payment.status === "completed"
                  ? "text-green-600 dark:text-green-400"
                  : payment.status === "대기" || payment.status === "pending"
                  ? "text-amber-600 dark:text-amber-400"
                  : payment.status === "실패" || payment.status === "failed"
                  ? "text-red-600 dark:text-red-400"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              {payment.status}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">금액</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {formatCurrency(payment.amount)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">결제 방법</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {payment.paymentMethod}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">결제 일시</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {formatDate(payment.createdAt, true)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">완료 일시</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {formatDate(payment.completedAt, true)}
            </span>
          </div>
        </div>
      </SectionCard>

      <div className="space-y-6">
        {payment.cardInfo && (
          <SectionCard title="결제 상세">
            <div className="grid grid-cols-1 gap-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">카드사</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {payment.cardInfo.cardCompany}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  카드 번호
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {payment.cardInfo.cardNumber}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">할부</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {payment.cardInfo.installment}
                </span>
              </div>
            </div>
          </SectionCard>
        )}

        <SectionCard title="구매 정보">
          <div className="grid grid-cols-1 gap-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">회원 ID</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {payment.memberId}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                회원 이름
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {payment.memberName}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">상품 ID</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {payment.productId}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                상품 이름
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {payment.productName}
              </span>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default PaymentInfoTab;
