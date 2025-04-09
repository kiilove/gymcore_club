"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import SectionCard from "../../../components/Shared/SectionCard";
import Button from "../../../components/Shared/Button";
import { useToast } from "../../../hooks/use-toast";
import { useModal } from "../../../hooks/use-modal";
import { useConsultationManager } from "../../../hooks/useConsultationManager";
import ConsultationForm from "../../../components/Members/Consultation/ConsultationForm";
import ConsultationHistory from "../../../components/Members/Consultation/ConsultationHistory";
import ConsultationStats from "../../../components/Members/Consultation/ConsultationStats";

const MemberConsultationTab = ({ member }) => {
  const { toast } = useToast();
  const { showModal } = useModal();
  const [showConsultationForm, setShowConsultationForm] = useState(false);

  // 커스텀 훅 사용
  const { consultations, isLoading, addConsultation, deleteConsultation } =
    useConsultationManager(member?.id);

  // 상담 기록 추가 핸들러
  const handleAddConsultation = async (data) => {
    try {
      await addConsultation(data);
      setShowConsultationForm(false);
      toast({
        title: "상담 기록 추가 완료",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "상담 기록 추가 실패",
        description: error.message,
        variant: "error",
      });
    }
  };

  // 상담 기록 삭제 핸들러
  const handleDeleteConsultation = (id) => {
    showModal({
      title: "상담 기록 삭제",
      message: "선택한 상담 기록을 삭제하시겠습니까?",
      confirmText: "삭제",
      cancelText: "취소",
      onConfirm: async () => {
        try {
          await deleteConsultation(id);
          toast({
            title: "상담 기록 삭제 완료",
            variant: "success",
          });
        } catch (error) {
          toast({
            title: "상담 기록 삭제 실패",
            description: error.message,
            variant: "error",
          });
        }
      },
    });
  };

  if (isLoading) {
    return (
      <SectionCard title="상담 기록">
        <div className="text-center py-4">로딩 중...</div>
      </SectionCard>
    );
  }

  return (
    <div className="space-y-6">
      {/* 상담 통계 */}
      {consultations && consultations.length > 0 && (
        <SectionCard title="상담 통계">
          <ConsultationStats consultations={consultations} />
        </SectionCard>
      )}

      {/* 상담 기록 */}
      <SectionCard title="상담 기록">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              회원의 상담 내용을 기록하고 관리합니다. 상담 유형별로 분류하여
              효율적으로 관리할 수 있습니다.
            </p>
          </div>
          <Button
            variant={showConsultationForm ? "secondary" : "primary"}
            size="sm"
            onClick={() => setShowConsultationForm(!showConsultationForm)}
            className="flex items-center gap-1"
          >
            {showConsultationForm ? (
              <X className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            {showConsultationForm ? "취소" : "상담 추가"}
          </Button>
        </div>

        {showConsultationForm && (
          <ConsultationForm
            onSubmit={handleAddConsultation}
            onCancel={() => setShowConsultationForm(false)}
          />
        )}

        <ConsultationHistory
          consultations={consultations}
          onDelete={handleDeleteConsultation}
        />
      </SectionCard>
    </div>
  );
};

export default MemberConsultationTab;
