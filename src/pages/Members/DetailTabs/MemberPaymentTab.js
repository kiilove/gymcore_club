"use client";

import { useState } from "react";
import SectionCard from "../../../components/Shared/SectionCard";
import { formatDate, formatDateForInput } from "../../../utils/dateUtils";
import { useToast } from "../../../hooks/use-toast";
import { useModal } from "../../../hooks/use-modal";
import Button from "../../../components/Shared/Button";
import { Plus, X, Trash2, Check, AlertCircle } from "lucide-react";

const MemberPaymentTab = ({ member, setMember }) => {
  const { toast } = useToast();
  const { showModal } = useModal();

  // 결제 내역이 없는 경우를 대비해 빈 배열로 초기화
  const payments = member.payments || [];

  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [newPayment, setNewPayment] = useState({
    date: formatDateForInput(new Date()),
    amount: "",
    method: "카드",
    description: "",
    status: "완료",
  });

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setNewPayment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addPayment = () => {
    if (!newPayment.amount || !newPayment.description) {
      toast({
        title: "입력 오류",
        description: "금액과 결제 내용을 모두 입력해주세요.",
        variant: "error",
      });
      return;
    }

    // 실제 구현에서는 API 호출 등을 통해 데이터를 저장
    const updatedMember = { ...member };

    // payments 배열이 없으면 생성
    if (!updatedMember.payments) {
      updatedMember.payments = [];
    }

    updatedMember.payments.unshift({
      id: Date.now(), // 임시 ID 생성
      date: newPayment.date,
      amount: Number.parseFloat(newPayment.amount),
      method: newPayment.method,
      description: newPayment.description,
      status: newPayment.status,
    });

    setMember(updatedMember);
    setNewPayment({
      date: formatDateForInput(new Date()),
      amount: "",
      method: "카드",
      description: "",
      status: "완료",
    });
    setShowPaymentForm(false);

    toast({
      title: "결제 내역 추가 완료",
      variant: "success",
    });
  };

  const deletePayment = (index) => {
    showModal({
      title: "결제 내역 삭제",
      message: "선택한 결제 내역을 삭제하시겠습니까?",
      confirmText: "삭제",
      cancelText: "취소",
      onConfirm: () => {
        // 실제 구현에서는 API 호출 등을 통해 데이터를 삭제
        const updatedMember = { ...member };
        updatedMember.payments.splice(index, 1);
        setMember(updatedMember);

        toast({
          title: "결제 내역 삭제 완료",
          variant: "success",
        });
      },
    });
  };

  // 결제 상태에 따른 스타일 및 아이콘 반환
  const getStatusStyle = (status) => {
    switch (status) {
      case "완료":
        return {
          className:
            "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300",
          icon: <Check className="h-4 w-4 mr-1" />,
        };
      case "대기":
        return {
          className:
            "text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300",
          icon: <AlertCircle className="h-4 w-4 mr-1" />,
        };
      case "취소":
        return {
          className:
            "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300",
          icon: <X className="h-4 w-4 mr-1" />,
        };
      default:
        return {
          className:
            "text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300",
          icon: null,
        };
    }
  };

  // 금액 포맷팅 함수
  const formatAmount = (amount) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(amount);
  };

  return (
    <SectionCard title="결제 내역">
      <div className="flex justify-between items-center mb-4">
        <div></div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setShowPaymentForm(!showPaymentForm)}
          className="flex items-center gap-1"
        >
          {showPaymentForm ? (
            <X className="h-4 w-4" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
          {showPaymentForm ? "취소" : "결제 추가"}
        </Button>
      </div>

      {showPaymentForm && (
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <div>
              <label
                htmlFor="payment-date"
                className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1"
              >
                결제 일자
              </label>
              <input
                type="date"
                id="payment-date"
                name="date"
                value={newPayment.date}
                onChange={handlePaymentChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label
                htmlFor="payment-amount"
                className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1"
              >
                결제 금액 (원)
              </label>
              <input
                type="number"
                id="payment-amount"
                name="amount"
                value={newPayment.amount}
                onChange={handlePaymentChange}
                placeholder="금액"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label
                htmlFor="payment-method"
                className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1"
              >
                결제 방법
              </label>
              <select
                id="payment-method"
                name="method"
                value={newPayment.method}
                onChange={handlePaymentChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="카드">카드</option>
                <option value="현금">현금</option>
                <option value="계좌이체">계좌이체</option>
                <option value="기타">기타</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="payment-status"
                className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1"
              >
                결제 상태
              </label>
              <select
                id="payment-status"
                name="status"
                value={newPayment.status}
                onChange={handlePaymentChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="완료">완료</option>
                <option value="대기">대기</option>
                <option value="취소">취소</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="payment-description"
                className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1"
              >
                결제 내용
              </label>
              <input
                type="text"
                id="payment-description"
                name="description"
                value={newPayment.description}
                onChange={handlePaymentChange}
                placeholder="결제 내용을 입력하세요"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="primary" size="sm" onClick={addPayment}>
              추가
            </Button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                날짜
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                내용
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                금액
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                결제 방법
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                상태
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                삭제
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {payments && payments.length > 0 ? (
              payments.map((payment, index) => {
                const statusStyle = getStatusStyle(payment.status);
                return (
                  <tr key={payment.id || index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {formatDate(payment.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {payment.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {formatAmount(payment.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {payment.method}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyle.className}`}
                      >
                        {statusStyle.icon}
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => deletePayment(index)}
                        className="text-gray-400 hover:text-red-600 dark:text-gray-500 dark:hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  결제 내역이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
};

export default MemberPaymentTab;
