"use client";

import { useState } from "react";
import { Trash2, Plus, X } from "lucide-react";
import SectionCard from "../../../components/Shared/SectionCard";
import Button from "../../../components/Shared/Button";
import { formatDate, formatDateForInput } from "../../../utils/dateUtils";
import { useToast } from "../../../hooks/use-toast";
import { useModal } from "../../../hooks/use-modal";

const MemberConsultationTab = ({ member, setMember }) => {
  const { toast } = useToast();
  const { showModal } = useModal();

  const [newConsultation, setNewConsultation] = useState({
    date: formatDateForInput(new Date()),
    note: "",
  });

  const [showConsultationForm, setShowConsultationForm] = useState(false);

  const handleConsultationChange = (e) => {
    const { name, value } = e.target;
    setNewConsultation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addConsultation = () => {
    if (!newConsultation.note) {
      toast({
        title: "입력 오류",
        description: "상담 내용을 입력해주세요.",
        variant: "error",
      });
      return;
    }

    // 실제 구현에서는 API 호출 등을 통해 데이터를 저장
    const updatedMember = { ...member };
    updatedMember.consultations.unshift({
      date: newConsultation.date,
      note: newConsultation.note,
    });

    setMember(updatedMember);
    setNewConsultation({
      date: formatDateForInput(new Date()),
      note: "",
    });
    setShowConsultationForm(false);

    toast({
      title: "상담 기록 추가 완료",
      variant: "success",
    });
  };

  const deleteConsultation = (index) => {
    showModal({
      title: "상담 기록 삭제",
      message: "선택한 상담 기록을 삭제하시겠습니까?",
      confirmText: "삭제",
      cancelText: "취소",
      onConfirm: () => {
        // 실제 구현에서는 API 호출 등을 통해 데이터를 삭제
        const updatedMember = { ...member };
        updatedMember.consultations.splice(index, 1);
        setMember(updatedMember);

        toast({
          title: "상담 기록 삭제 완료",
          variant: "success",
        });
      },
    });
  };

  return (
    <SectionCard title="상담 기록">
      <div className="flex justify-between items-center mb-4">
        <div></div>
        <Button
          variant="primary"
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
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mb-4">
          <div className="grid grid-cols-1 gap-3 mb-3">
            <div>
              <label
                htmlFor="consultation-date"
                className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1"
              >
                상담 일자
              </label>
              <input
                type="date"
                id="consultation-date"
                name="date"
                value={newConsultation.date}
                onChange={handleConsultationChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label
                htmlFor="consultation-note"
                className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1"
              >
                상담 내용
              </label>
              <textarea
                id="consultation-note"
                name="note"
                value={newConsultation.note}
                onChange={handleConsultationChange}
                rows="3"
                placeholder="상담 내용을 입력하세요"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              ></textarea>
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="primary" size="sm" onClick={addConsultation}>
              추가
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {member.consultations.map((consultation, index) => (
          <div
            key={index}
            className="border-l-4 border-blue-500 pl-4 py-2 relative group"
          >
            <div className="flex justify-between items-start">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(consultation.date)}
              </div>
              <button
                onClick={() => deleteConsultation(index)}
                className="text-gray-400 hover:text-red-600 dark:text-gray-500 dark:hover:text-red-400 invisible group-hover:visible absolute top-2 right-2"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-1 text-gray-900 dark:text-white">
              {consultation.note}
            </div>
          </div>
        ))}
        {member.consultations.length === 0 && (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400">
            상담 기록이 없습니다.
          </div>
        )}
      </div>
    </SectionCard>
  );
};

export default MemberConsultationTab;
