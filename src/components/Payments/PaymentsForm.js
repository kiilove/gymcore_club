"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Shared/Button";

const PaymentsForm = ({ payment, onSubmit, isEditing = false }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    memberId: "",
    memberName: "",
    productId: "",
    productName: "",
    amount: "",
    paymentMethod: "신용카드",
    cardInfo: {
      cardCompany: "",
      cardNumber: "",
      installment: "일시불",
    },
    status: "대기",
  });

  // 결제 정보가 제공되면 폼 데이터 초기화
  useEffect(() => {
    if (payment) {
      setFormData({
        memberId: payment.memberId || "",
        memberName: payment.memberName || "",
        productId: payment.productId || "",
        productName: payment.productName || "",
        amount: payment.amount || "",
        paymentMethod: payment.paymentMethod || "신용카드",
        cardInfo: {
          cardCompany: payment.cardInfo?.cardCompany || "",
          cardNumber: payment.cardInfo?.cardNumber || "",
          installment: payment.cardInfo?.installment || "일시불",
        },
        status: payment.status || "대기",
      });
    }
  }, [payment]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("결제 처리 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 회원 정보 */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            회원 정보
          </h3>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="memberId"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                회원 ID
              </label>
              <input
                type="text"
                name="memberId"
                id="memberId"
                value={formData.memberId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="memberName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                회원 이름
              </label>
              <input
                type="text"
                name="memberName"
                id="memberName"
                value={formData.memberName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
          </div>
        </div>

        {/* 상품 정보 */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            상품 정보
          </h3>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="productId"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                상품 ID
              </label>
              <input
                type="text"
                name="productId"
                id="productId"
                value={formData.productId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="productName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                상품 이름
              </label>
              <input
                type="text"
                name="productName"
                id="productName"
                value={formData.productName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* 결제 정보 */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          결제 정보
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              결제 금액
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 dark:text-gray-400 sm:text-sm">
                  ₩
                </span>
              </div>
              <input
                type="number"
                name="amount"
                id="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="0"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="paymentMethod"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              결제 방법
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="신용카드">신용카드</option>
              <option value="현금">현금</option>
              <option value="계좌이체">계좌이체</option>
              <option value="간편결제">간편결제</option>
            </select>
          </div>
          {isEditing && (
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                결제 상태
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                required
              >
                <option value="대기">대기</option>
                <option value="완료">완료</option>
                <option value="실패">실패</option>
                <option value="환불">환불</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* 카드 정보 (결제 방법이 신용카드일 때만 표시) */}
      {formData.paymentMethod === "신용카드" && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            카드 정보
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label
                htmlFor="cardInfo.cardCompany"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                카드사
              </label>
              <select
                id="cardInfo.cardCompany"
                name="cardInfo.cardCompany"
                value={formData.cardInfo.cardCompany}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                required
              >
                <option value="">선택하세요</option>
                <option value="신한카드">신한카드</option>
                <option value="삼성카드">삼성카드</option>
                <option value="현대카드">현대카드</option>
                <option value="KB국민카드">KB국민카드</option>
                <option value="롯데카드">롯데카드</option>
                <option value="BC카드">BC카드</option>
                <option value="하나카드">하나카드</option>
                <option value="NH농협카드">NH농협카드</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="cardInfo.cardNumber"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                카드 번호
              </label>
              <input
                type="text"
                id="cardInfo.cardNumber"
                name="cardInfo.cardNumber"
                value={formData.cardInfo.cardNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="1234-5678-9012-3456"
                required
              />
            </div>
            <div>
              <label
                htmlFor="cardInfo.installment"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                할부
              </label>
              <select
                id="cardInfo.installment"
                name="cardInfo.installment"
                value={formData.cardInfo.installment}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                required
              >
                <option value="일시불">일시불</option>
                <option value="2개월">2개월</option>
                <option value="3개월">3개월</option>
                <option value="4개월">4개월</option>
                <option value="5개월">5개월</option>
                <option value="6개월">6개월</option>
                <option value="12개월">12개월</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-end space-x-3">
        <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
          취소
        </Button>
        <Button
          type="submit"
          variant="primary"
          loading={loading}
          disabled={loading}
        >
          {isEditing ? "결제 정보 수정" : "결제 추가"}
        </Button>
      </div>
    </form>
  );
};

export default PaymentsForm;
