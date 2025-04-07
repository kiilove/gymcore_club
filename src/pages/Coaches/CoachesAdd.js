"use client";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PageTitle from "../../components/Shared/PageTitle";
import CoachesForm from "../../components/Coaches/CoachesForm";
import { useToast } from "../../hooks/use-toast";
import { useModal } from "../../hooks/use-modal";
import LoadingOverlay from "../../components/Shared/LoadingOverlay";

const CoachesAdd = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { showModal } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData) => {
    // 폼 유효성 검사
    if (!formData.name || !formData.phone || !formData.hireDate) {
      toast({
        title: "필수 정보 누락",
        description: "이름, 연락처, 입사일은 필수 입력 항목입니다.",
        variant: "error",
      });
      return;
    }

    // 제출 전 확인 모달
    showModal({
      title: "코치 등록",
      message: "새로운 코치를 등록하시겠습니까?",
      confirmText: "등록",
      cancelText: "취소",
      onConfirm: async () => {
        try {
          setIsSubmitting(true);

          // 실제 구현에서는 API 호출 등을 통해 데이터를 저장
          // 예: const response = await api.post('/coaches', formData);
          console.log("코치 등록 데이터:", formData);

          // 파일 업로드 처리 (실제 구현 시)
          if (formData.profileImageFile) {
            // 파일 업로드 로직
            console.log("프로필 이미지 업로드:", formData.profileImageFile);
          }

          // 성공 메시지 표시
          toast({
            title: "등록 완료",
            description: `${formData.name} 코치가 등록되었습니다.`,
            variant: "success",
          });

          // 등록 후 코치 목록 페이지로 이동
          navigate("/coaches");
        } catch (error) {
          console.error("코치 등록 오류:", error);
          toast({
            title: "등록 실패",
            description: "코치 등록 중 오류가 발생했습니다. 다시 시도해주세요.",
            variant: "error",
          });
        } finally {
          setIsSubmitting(false);
        }
      },
    });
  };

  return (
    <div>
      <PageTitle title="코치 등록" subtitle="새로운 코치 정보를 등록합니다." />

      <LoadingOverlay isLoading={isSubmitting} text="등록 중...">
        <CoachesForm onSubmit={handleSubmit} />
      </LoadingOverlay>
    </div>
  );
};

export default CoachesAdd;
