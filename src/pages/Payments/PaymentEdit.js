"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageTitle from "../../components/Shared/PageTitle";
import Button from "../../components/Shared/Button";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { useToast } from "../../hooks/use-toast";
import { useModal } from "../../hooks/use-modal";
import PaymentsForm from "../../components/Payments/PaymentsForm";
import { FaFileInvoiceDollar } from "react-icons/fa";

const PaymentEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { showModal } = useModal();

  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);

  // 결제 정보 가져오기
  useEffect(() => {
    const fetchPayment = async () => {
      try {
        // 실제 API 호출로 대체 필요
        setTimeout(() => {
          // 임시 데이터
          const mockPayment = {
            id,
            paymentId: `PAY-${id}`,
            memberId: "M001",
            memberName: "김회원",
            productId: "P001",
            productName: "3개월 회원권",
            amount: 300000,
            paymentMethod: "신용카드",
            cardInfo: {
              cardCompany: "신한카드",
              cardNumber: "1234-56**-****-7890",
              installment: "일시불",
            },
            status: "완료",
            createdAt: new Date().toISOString(),
            completedAt: new Date().toISOString(),
          };

          setPayment(mockPayment);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("결제 정보를 가져오는 중 오류 발생:", error);
        toast({
          title: "오류 발생",
          description: "결제 정보를 가져오는 중 오류가 발생했습니다.",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchPayment();
  }, [id, toast]);

  const handleSubmit = async (formData) => {
    // 폼 유효성 검사
    if (!formData.memberId || !formData.productId || !formData.amount) {
      toast({
        title: "필수 정보 누락",
        description: "회원 ID, 상품 ID, 결제 금액은 필수 입력 항목입니다.",
        variant: "error",
      });
      return;
    }

    // 제출 전 확인 모달
    showModal({
      title: "결제 수정",
      message: "결제 정보를 수정하시겠습니까?",
      confirmText: "수정",
      cancelText: "취소",
      onConfirm: async () => {
        try {
          // 실제 API 호출로 대체 필요
          console.log("결제 수정 데이터:", formData);

          setTimeout(() => {
            toast({
              title: "수정 완료",
              description: "결제 정보가 성공적으로 수정되었습니다.",
              variant: "success",
            });
            navigate(`/payments/detail/${id}`);
          }, 1000);
        } catch (error) {
          console.error("결제 수정 중 오류 발생:", error);
          toast({
            title: "수정 실패",
            description: "결제 수정 중 오류가 발생했습니다.",
            variant: "destructive",
          });
        }
      },
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <PageTitle
          title="결제 수정"
          subtitle={`결제 ID: ${payment?.paymentId}`}
          icon={FaFileInvoiceDollar}
        />
        <Button
          variant="secondary"
          size="sm"
          onClick={() => navigate(`/payments/detail/${id}`)}
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> 상세로 돌아가기
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <PaymentsForm
          payment={payment}
          onSubmit={handleSubmit}
          isEditing={true}
        />
      </div>
    </div>
  );
};

export default PaymentEdit;
