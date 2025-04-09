"use client";

import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import SectionCard from "../../../components/Shared/SectionCard";
import Button from "../../../components/Shared/Button";
import { useToast } from "../../../hooks/use-toast";
import { useModal } from "../../../hooks/use-modal";
import { useBodyInfoManager } from "../../../hooks/useBodyInfoManager";
import BodyInfoLocked from "../../../components/Members/BodyInfo/BodyInfoLocked";
import BodyInfoForm from "../../../components/Members/BodyInfo/BodyInfoForm";
import BodyInfoHistory from "../../../components/Members/BodyInfo/BodyInfoHistory";
import BodyInfoSummary from "../../../components/Members/BodyInfo/BodyInfoSummary";
import BodyInfoChart from "../../../components/Members/BodyInfo/BodyInfoChart";

const MemberBodyInfoTab = ({ member, setMember }) => {
  const { toast } = useToast();
  const { showModal } = useModal();
  const [showForm, setShowForm] = useState(false);
  const [localBodyInfo, setLocalBodyInfo] = useState(null); // 로컬 상태 추가
  const [activeTab, setActiveTab] = useState("history"); // 'history' 또는 'chart'

  // 커스텀 훅 사용
  const {
    bodyInfoHistory,
    latestBodyInfo,
    isLoading,
    addBodyInfo,
    deleteBodyInfo,
    loadBodyInfoHistory,
  } = useBodyInfoManager(member?.id);

  // 신체정보가 있는지 확인 - 로컬 상태도 확인
  const hasBodyInfo =
    localBodyInfo ||
    latestBodyInfo ||
    (member.bodyInfo && Object.keys(member.bodyInfo).length > 0);

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    if (member?.id) {
      loadBodyInfoHistory();
    }
  }, [member?.id, loadBodyInfoHistory]);

  // 신체정보 등록 버튼 클릭 핸들러
  const handleUnlockBodyInfo = () => {
    setShowForm(true);
  };

  // 신체정보 추가 핸들러
  const handleAddBodyInfo = async (data, mode) => {
    try {
      // 로컬 상태 먼저 업데이트
      setLocalBodyInfo(data);

      const result = await addBodyInfo(data);

      // 회원 정보 업데이트 (최신 측정값을 기본 정보로 설정)
      const updatedMember = { ...member };
      if (!updatedMember.bodyInfo) {
        updatedMember.bodyInfo = {};
      }

      updatedMember.bodyInfo.height =
        data.height || updatedMember.bodyInfo.height;
      updatedMember.bodyInfo.weight = data.weight;
      updatedMember.bodyInfo.bodyFat =
        data.bodyFat || updatedMember.bodyInfo.bodyFat;
      updatedMember.bodyInfo.bmi = data.bmi || updatedMember.bodyInfo.bmi;

      setMember(updatedMember);
      setShowForm(false);

      // 데이터 다시 로드하여 최신 상태 반영
      await loadBodyInfoHistory();

      toast({
        title: "신체 정보 추가 완료",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "신체 정보 저장 실패",
        description: error.message,
        variant: "error",
      });
    }
  };

  // 신체정보 삭제 핸들러
  const handleDeleteBodyInfo = (id) => {
    showModal({
      title: "신체 정보 삭제",
      message: "선택한 신체 정보 기록을 삭제하시겠습니까?",
      confirmText: "삭제",
      cancelText: "취소",
      onConfirm: async () => {
        try {
          await deleteBodyInfo(id);

          // 데이터 다시 로드하여 최신 상태 반영
          await loadBodyInfoHistory();

          toast({
            title: "신체 정보 삭제 완료",
            variant: "success",
          });
        } catch (error) {
          toast({
            title: "신체 정보 삭제 실패",
            description: error.message,
            variant: "error",
          });
        }
      },
    });
  };

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <p>로딩 중...</p>
      </div>
    );
  }

  // 신체 정보가 없는 경우 잠긴 화면 표시
  if (!hasBodyInfo && !showForm) {
    return (
      <div className="space-y-6">
        <SectionCard title="신체 정보">
          <BodyInfoLocked onUnlock={handleUnlockBodyInfo} />
        </SectionCard>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SectionCard title="신체 정보">
        {hasBodyInfo && (
          <div className="mb-6">
            <BodyInfoSummary
              bodyInfo={localBodyInfo || latestBodyInfo || member.bodyInfo}
            />
          </div>
        )}

        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
              신체 정보 측정 기록
            </h3>
            <p className="text-xs text-blue-600 dark:text-blue-400">
              회원의 신체 변화를 기록하고 관리합니다.
            </p>
          </div>
          <Button
            variant={showForm ? "secondary" : "primary"}
            size="sm"
            onClick={() => setShowForm(!showForm)}
            className={`flex items-center gap-1 ${
              showForm ? "" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {showForm ? (
              <X className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            {showForm ? "취소" : "측정 추가"}
          </Button>
        </div>

        {showForm && (
          <BodyInfoForm
            onSubmit={handleAddBodyInfo}
            onCancel={() => setShowForm(false)}
            mode="detail"
          />
        )}

        {bodyInfoHistory && bodyInfoHistory.length > 0 && (
          <div>
            <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
              <nav className="flex space-x-8 -mb-px">
                <button
                  onClick={() => setActiveTab("history")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "history"
                      ? "border-blue-500 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  측정 기록
                </button>
                <button
                  onClick={() => setActiveTab("chart")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "chart"
                      ? "border-blue-500 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  차트 분석
                </button>
              </nav>
            </div>

            {activeTab === "history" ? (
              <BodyInfoHistory
                history={bodyInfoHistory}
                onDelete={handleDeleteBodyInfo}
              />
            ) : (
              <BodyInfoChart history={bodyInfoHistory} />
            )}
          </div>
        )}
      </SectionCard>
    </div>
  );
};

export default MemberBodyInfoTab;
