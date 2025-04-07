"use client";

import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageTitle from "../../components/Shared/PageTitle";
import Button from "../../components/Shared/Button";
import { useToast } from "../../hooks/use-toast";
import { useModal } from "../../hooks/use-modal";
import PaymentsForm from "../../components/Payments/PaymentsForm";
import { FaFileInvoiceDollar } from "react-icons/fa";

const PaymentAdd = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { showModal } = useModal();

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
      title: "결제 등록",
      message: "새로운 결제를 등록하시겠습니까?",
      confirmText: "등록",
      cancelText: "취소",
      onConfirm: async () => {
        try {
          // 실제 API 호출로 대체 필요
          console.log("결제 등록 데이터:", formData);

          setTimeout(() => {
            toast({
              title: "등록 완료",
              description: "결제가 성공적으로 등록되었습니다.",
              variant: "success",
            });
            navigate("/payments");
          }, 1000);
        } catch (error) {
          console.error("결제 등록 중 오류 발생:", error);
          toast({
            title: "등록 실패",
            description: "결제 등록 중 오류가 발생했습니다.",
            variant: "destructive",
          });
        }
      },
    });
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <PageTitle
          title="결제 등록"
          subtitle="새로운 결제를 등록합니다."
          icon={FaFileInvoiceDollar}
        />
        <Button
          variant="secondary"
          size="sm"
          onClick={() => navigate("/payments")}
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> 목록으로
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <PaymentsForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default PaymentAdd;
