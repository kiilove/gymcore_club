"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "../../Shared/Button";
import { useToast } from "../../../hooks/use-toast";
import { calculateBMI } from "../../../utils/memberUtils";
import BodyInfoForm from "../BodyInfo/BodyInfoForm";
import BodyInfoHistory from "../BodyInfo/BodyInfoHistory";
import BodyInfoLocked from "../BodyInfo/BodyInfoLocked";

const MemberBodyInfoFormTab = ({ formData, onChange, isEditing = false }) => {
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  // 신체정보가 있는지 확인
  const hasBodyInfo =
    formData.height ||
    formData.weight ||
    formData.bodyFat ||
    (formData.bodyInfoHistory && formData.bodyInfoHistory.length > 0);

  // 신체정보 등록 버튼 클릭 핸들러
  const handleUnlockBodyInfo = () => {
    setShowForm(true);
  };

  // 신체정보 추가 핸들러
  const handleAddBodyInfo = (data) => {
    try {
      // BMI 계산
      let bmi = null;
      if (data.height && data.weight) {
        bmi = calculateBMI(Number(data.weight), Number(data.height));
      }

      // 신체정보 업데이트
      onChange({
        target: {
          name: "height",
          value: data.height || "",
        },
      });

      onChange({
        target: {
          name: "weight",
          value: data.weight || "",
        },
      });

      onChange({
        target: {
          name: "bodyFat",
          value: data.bodyFat || "",
        },
      });

      onChange({
        target: {
          name: "bmi",
          value: bmi ? bmi.toString() : "",
        },
      });

      // 추가 필드 저장 (회원 등록 시 필요한 정보)
      onChange({
        target: {
          name: "date",
          value: data.date,
        },
      });

      onChange({
        target: {
          name: "notes",
          value: data.notes || "",
        },
      });

      onChange({
        target: {
          name: "writtenAt",
          value: data.writtenAt,
        },
      });

      onChange({
        target: {
          name: "writtenBy",
          value: data.writtenBy,
        },
      });

      // 히스토리에 추가 (Edit 페이지에서만 사용)
      if (isEditing && formData.bodyInfoHistory) {
        const newBodyInfo = {
          date: data.date,
          height: data.height ? Number(data.height) : null,
          weight: Number(data.weight),
          bodyFat: data.bodyFat ? Number(data.bodyFat) : null,
          bmi: bmi,
          notes: data.notes || "",
          writtenAt: data.writtenAt,
          writtenBy: data.writtenBy,
        };

        const newHistory = [...(formData.bodyInfoHistory || []), newBodyInfo];
        onChange({
          target: {
            name: "bodyInfoHistory",
            value: newHistory,
          },
        });
      }

      setShowForm(false);

      toast({
        title: "신체 정보 저장 완료",
        description: "신체 정보가 성공적으로 저장되었습니다.",
        variant: "success",
      });
    } catch (error) {
      console.error("신체 정보 저장 실패:", error);
      toast({
        title: "신체 정보 저장 실패",
        description: "신체 정보를 저장하는데 실패했습니다.",
        variant: "error",
      });
    }
  };

  // 신체정보가 없고 폼이 표시되지 않은 경우 잠긴 화면 표시
  if (!hasBodyInfo && !showForm) {
    return (
      <div className="space-y-8">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
            신체 정보 측정 기록
          </h3>
          <p className="text-xs text-blue-600 dark:text-blue-400 mb-4">
            회원의 신체 변화를 기록하고 관리합니다.
          </p>
          <BodyInfoLocked onUnlock={handleUnlockBodyInfo} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
        <div className="mb-4">
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
            신체 정보 측정 기록
          </h3>
          <p className="text-xs text-blue-600 dark:text-blue-400 mb-4">
            회원의 신체 변화를 기록하고 관리합니다.
          </p>
        </div>

        {/* 신체정보 입력 폼 */}
        {showForm ? (
          <BodyInfoForm
            onSubmit={handleAddBodyInfo}
            onCancel={() => setShowForm(false)}
          />
        ) : (
          <div className="flex justify-end mb-4">
            <Button
              variant="outline"
              onClick={() => setShowForm(true)}
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              신체정보 추가
            </Button>
          </div>
        )}

        {/* 신체정보 히스토리 */}
        <BodyInfoHistory
          history={formData.bodyInfoHistory || []}
          onDelete={() => {}} // 편집 모드에서는 삭제 기능 비활성화
        />
      </div>
    </div>
  );
};

export default MemberBodyInfoFormTab;
