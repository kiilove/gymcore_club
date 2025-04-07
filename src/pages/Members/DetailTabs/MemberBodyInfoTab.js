import React, { useState } from "react";
import { Trash2, Plus, X } from "lucide-react";
import SectionCard from "../../../components/Shared/SectionCard";
import Button from "../../../components/Shared/Button";
import { formatDate, formatDateForInput } from "../../../utils/dateUtils";
import { getBMIStatus } from "../../../utils/memberUtils";
import { useToast } from "../../../hooks/use-toast";
import { useModal } from "../../../hooks/use-modal";

const MemberBodyInfoTab = ({ member, setMember }) => {
  const { toast } = useToast();
  const { showModal } = useModal();
  const bmiStatus = getBMIStatus(member.bodyInfo.bmi);

  const [newBodyRecord, setNewBodyRecord] = useState({
    date: formatDateForInput(new Date()),
    weight: "",
    bodyFat: "",
  });

  const [showBodyForm, setShowBodyForm] = useState(false);

  const handleBodyRecordChange = (e) => {
    const { name, value } = e.target;
    setNewBodyRecord((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addBodyRecord = () => {
    if (!newBodyRecord.weight || !newBodyRecord.bodyFat) {
      toast({
        title: "입력 오류",
        description: "체중과 체지방률을 모두 입력해주세요.",
        variant: "error",
      });
      return;
    }

    // 실제 구현에서는 API 호출 등을 통해 데이터를 저장
    const updatedMember = { ...member };
    updatedMember.bodyInfo.history.unshift({
      date: newBodyRecord.date,
      weight: Number.parseFloat(newBodyRecord.weight),
      bodyFat: Number.parseFloat(newBodyRecord.bodyFat),
    });

    setMember(updatedMember);
    setNewBodyRecord({
      date: formatDateForInput(new Date()),
      weight: "",
      bodyFat: "",
    });
    setShowBodyForm(false);

    toast({
      title: "신체 정보 추가 완료",
      variant: "success",
    });
  };

  const deleteBodyRecord = (index) => {
    showModal({
      title: "신체 정보 삭제",
      message: "선택한 신체 정보 기록을 삭제하시겠습니까?",
      confirmText: "삭제",
      cancelText: "취소",
      onConfirm: () => {
        // 실제 구현에서는 API 호출 등을 통해 데이터를 삭제
        const updatedMember = { ...member };
        updatedMember.bodyInfo.history.splice(index, 1);
        setMember(updatedMember);

        toast({
          title: "신체 정보 삭제 완료",
          variant: "success",
        });
      },
    });
  };

  return (
    <div className="space-y-6">
      <SectionCard title="신체 정보">
        <div className="space-y-4">
          <div className="flex items-center">
            <span className="text-gray-600 dark:text-gray-400 w-20">키</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {member.bodyInfo.height} cm
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600 dark:text-gray-400 w-20">체중</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {member.bodyInfo.weight} kg
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600 dark:text-gray-400 w-20">BMI</span>
            <span className={`font-medium ${bmiStatus.className}`}>
              {member.bodyInfo.bmi} ({bmiStatus.text})
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600 dark:text-gray-400 w-20">
              체지방률
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {member.bodyInfo.bodyFat}%
            </span>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="신체 변화 기록">
        <div className="flex justify-between items-center mb-4">
          <div></div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowBodyForm(!showBodyForm)}
            className="flex items-center gap-1"
          >
            {showBodyForm ? (
              <X className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            {showBodyForm ? "취소" : "기록 추가"}
          </Button>
        </div>

        {showBodyForm && (
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              <div>
                <label
                  htmlFor="body-date"
                  className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1"
                >
                  날짜
                </label>
                <input
                  type="date"
                  id="body-date"
                  name="date"
                  value={newBodyRecord.date}
                  onChange={handleBodyRecordChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="body-weight"
                  className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1"
                >
                  체중 (kg)
                </label>
                <input
                  type="number"
                  id="body-weight"
                  name="weight"
                  value={newBodyRecord.weight}
                  onChange={handleBodyRecordChange}
                  placeholder="체중"
                  min="0"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="body-fat"
                  className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1"
                >
                  체지방률 (%)
                </label>
                <input
                  type="number"
                  id="body-fat"
                  name="bodyFat"
                  value={newBodyRecord.bodyFat}
                  onChange={handleBodyRecordChange}
                  placeholder="체지방률"
                  min="0"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button variant="primary" size="sm" onClick={addBodyRecord}>
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
                  체중 (kg)
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  체지방률 (%)
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
              {member.bodyInfo.history.map((record, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {formatDate(record.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {record.weight}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {record.bodyFat}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => deleteBodyRecord(index)}
                      className="text-gray-400 hover:text-red-600 dark:text-gray-500 dark:hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {member.bodyInfo.history.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    신체 변화 기록이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
};

export default MemberBodyInfoTab;
