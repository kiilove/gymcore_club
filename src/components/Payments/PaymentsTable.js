"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronUp, ChevronDown, MoreHorizontal } from "lucide-react";
import { formatCurrency, formatDate } from "../../utils/dateUtils";
import LoadingSpinner from "../Shared/LoadingSpinner";

const PaymentsTable = ({
  payments = [],
  selectedPayments = [],
  onSelectPayment,
  onSelectAll,
  isLoading,
  onView,
  onDelete,
  onStatusChange,
  onSort,
  sortConfig = {},
}) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  // 모바일 감지
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
        <p className="text-xl font-medium">결제 내역이 없습니다.</p>
        <p className="text-sm">새로운 결제를 추가하거나 필터를 조정해보세요.</p>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            완료
          </span>
        );
      case "pending":
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
            대기중
          </span>
        );
      case "failed":
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            실패
          </span>
        );
      case "refunded":
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400">
            환불됨
          </span>
        );
      default:
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400">
            {status}
          </span>
        );
    }
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case "card":
        return <span className="text-blue-500">💳</span>;
      case "cash":
        return <span className="text-green-500">💵</span>;
      case "transfer":
        return <span className="text-purple-500">🏦</span>;
      case "mobile":
        return <span className="text-orange-500">📱</span>;
      default:
        return <span className="text-gray-500">❓</span>;
    }
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

    onView(id);
  };

  const handleCheckboxChange = (e, id) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    onSelectPayment(id, e.target.checked);
  };

  const handleHeaderCheckboxChange = (e) => {
    onSelectAll(e.target.checked);
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
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 relative"
            onClick={(e) => handleRowClick(payment.id, e)}
          >
            <div
              className="absolute top-3 right-3"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                onChange={(e) => handleCheckboxChange(e, payment.id)}
                checked={selectedPayments.includes(payment.id)}
              />
            </div>

            <div className="mb-3">
              <div className="text-lg font-medium text-gray-900 dark:text-white">
                {payment.paymentId || `#${payment.id}`}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {payment.memberName} - {payment.productName}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm mb-3">
              <div>
                <span className="text-gray-500 dark:text-gray-400">금액:</span>
                <div className="font-medium text-gray-900 dark:text-white">
                  {formatCurrency(payment.amount)}
                </div>
              </div>

              <div>
                <span className="text-gray-500 dark:text-gray-400">
                  결제 방법:
                </span>
                <div className="font-medium text-gray-900 dark:text-white flex items-center gap-1">
                  {getPaymentMethodIcon(payment.paymentMethod)}
                  <span>
                    {payment.paymentMethod === "card"
                      ? "카드"
                      : payment.paymentMethod === "cash"
                      ? "현금"
                      : payment.paymentMethod === "transfer"
                      ? "계좌이체"
                      : payment.paymentMethod === "mobile"
                      ? "모바일결제"
                      : payment.paymentMethod}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-gray-500 dark:text-gray-400">
                  결제일:
                </span>
                <div className="font-medium text-gray-900 dark:text-white">
                  {formatDate(payment.date)}
                </div>
              </div>

              <div>
                <span className="text-gray-500 dark:text-gray-400">상태:</span>
                <div>{getStatusBadge(payment.status)}</div>
              </div>
            </div>

            <div className="mt-3 flex justify-end">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onView(payment.id);
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
                    payments &&
                    selectedPayments &&
                    payments.length > 0 &&
                    selectedPayments.length === payments.length
                  }
                />
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSortClick("paymentId")}
              >
                <div className="flex items-center gap-1">
                  결제 ID
                  {getSortIcon("paymentId")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSortClick("memberName")}
              >
                <div className="flex items-center gap-1">
                  회원
                  {getSortIcon("memberName")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSortClick("productName")}
              >
                <div className="flex items-center gap-1">
                  상품
                  {getSortIcon("productName")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSortClick("amount")}
              >
                <div className="flex items-center gap-1">
                  금액
                  {getSortIcon("amount")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSortClick("paymentMethod")}
              >
                <div className="flex items-center gap-1">
                  결제 방법
                  {getSortIcon("paymentMethod")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSortClick("date")}
              >
                <div className="flex items-center gap-1">
                  결제 일자
                  {getSortIcon("date")}
                </div>
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
            {payments.map((payment) => (
              <tr
                key={payment.id}
                className={`${
                  selectedPayments.includes(payment.id)
                    ? "bg-blue-50 dark:bg-blue-900/20"
                    : ""
                } hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors duration-150`}
                onClick={(e) => handleRowClick(payment.id, e)}
              >
                <td
                  className="px-3 py-4 whitespace-nowrap"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    onChange={(e) => handleCheckboxChange(e, payment.id)}
                    checked={selectedPayments.includes(payment.id)}
                  />
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {payment.paymentId || `#${payment.id}`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {payment.memberName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {payment.productName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {formatCurrency(payment.amount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    {getPaymentMethodIcon(payment.paymentMethod)}
                    <span>
                      {payment.paymentMethod === "card"
                        ? "카드"
                        : payment.paymentMethod === "cash"
                        ? "현금"
                        : payment.paymentMethod === "transfer"
                        ? "계좌이체"
                        : payment.paymentMethod === "mobile"
                        ? "모바일결제"
                        : payment.paymentMethod}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(payment.date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(payment.status)}
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

export default PaymentsTable;
