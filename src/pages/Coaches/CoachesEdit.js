"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageTitle from "../../components/Shared/PageTitle";
import CoachesForm from "../../components/Coaches/CoachesForm";
import { coaches } from "../../datas/mockData";
import { useToast } from "../../hooks/use-toast";
import { useModal } from "../../hooks/use-modal";
import LoadingOverlay from "../../components/Shared/LoadingOverlay";

const CoachesEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { showModal } = useModal();
  const [coach, setCoach] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // 실제 구현에서는 API 호출 등을 통해 데이터를 가져옴
    const fetchCoach = async () => {
      try {
        // 실제 API 호출 대신 목업 데이터 사용
        const foundCoach = coaches.find((c) => c.id === Number.parseInt(id));

        if (foundCoach) {
          setCoach(foundCoach);
        } else {
          // 코치를 찾을 수 없는 경우 목록 페이지로 리다이렉트
          toast({
            title: "코치를 찾을 수 없음",
            description: "요청하신 코치 정보를 찾을 수 없습니다.",
            variant: "error",
          });
          navigate("/coaches");
        }
      } catch (error) {
        console.error("코치 정보 조회 오류:", error);
        toast({
          title: "데이터 로딩 실패",
          description: "코치 정보를 불러오는 중 오류가 발생했습니다.",
          variant: "error",
        });
        navigate("/coaches");
      } finally {
        setLoading(false);
      }
    };

    fetchCoach();
  }, [id, navigate, toast]);

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
      title: "코치 정보 수정",
      message: `${formData.name} 코치의 정보를 수정하시겠습니까?`,
      confirmText: "수정",
      cancelText: "취소",
      onConfirm: async () => {
        try {
          setIsSubmitting(true);

          // 실제 구현에서는 API 호출 등을 통해 데이터를 업데이트
          // 예: const response = await api.put(`/coaches/${id}`, formData);
          console.log("코치 수정 데이터:", formData);

          // 파일 업로드 처리 (실제 구현 시)
          if (formData.profileImageFile) {
            // 파일 업로드 로직
            console.log("프로필 이미지 업로드:", formData.profileImageFile);
          }

          // 성공 메시지 표시
          toast({
            title: "수정 완료",
            description: `${formData.name} 코치 정보가 수정되었습니다.`,
            variant: "success",
          });

          // 수정 후 코치 목록 페이지로 이동
          navigate("/coaches");
        } catch (error) {
          console.error("코치 수정 오류:", error);
          toast({
            title: "수정 실패",
            description:
              "코치 정보 수정 중 오류가 발생했습니다. 다시 시도해주세요.",
            variant: "error",
          });
        } finally {
          setIsSubmitting(false);
        }
      },
    });
  };

  if (loading) {
    return <div className="text-center py-10">로딩 중...</div>;
  }

  return (
    <div>
      <PageTitle
        title="코치 수정"
        subtitle={`${coach.name} 코치의 정보를 수정합니다.`}
      />

      <LoadingOverlay isLoading={isSubmitting} text="수정 중...">
        <CoachesForm coach={coach} onSubmit={handleSubmit} isEditing={true} />
      </LoadingOverlay>
    </div>
  );
};

export default CoachesEdit;
