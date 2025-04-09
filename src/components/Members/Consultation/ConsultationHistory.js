"use client";

import { Trash2, MessageCircle, Calendar, User } from "lucide-react";
import dayjs from "dayjs";

const ConsultationHistory = ({ consultations, onDelete }) => {
  if (!consultations || consultations.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500 dark:text-gray-400">
        상담 기록이 없습니다.
      </div>
    );
  }

  // 상담 유형에 따른 배지 색상 설정
  const getCategoryBadgeClass = (category) => {
    switch (category) {
      case "입회상담":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "PT상담":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "불만접수":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "기타":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-4">
      {consultations.map((consultation) => (
        <div
          key={consultation.id}
          className="border-l-4 border-blue-500 pl-4 py-3 pr-3 bg-white dark:bg-gray-800 rounded-r-lg shadow-sm relative group"
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {dayjs(consultation.date).format("YYYY-MM-DD")}
              </span>
              {consultation.category && (
                <span
                  className={`text-xs px-2 py-1 rounded-full ${getCategoryBadgeClass(
                    consultation.category
                  )}`}
                >
                  {consultation.category}
                </span>
              )}
            </div>
            <button
              onClick={() => onDelete(consultation.id)}
              className="text-gray-400 hover:text-red-600 dark:text-gray-500 dark:hover:text-red-400 invisible group-hover:visible"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-2 text-gray-900 dark:text-white whitespace-pre-line">
            {consultation.note}
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
            {consultation.writtenBy && (
              <span className="flex items-center">
                <User className="h-3 w-3 mr-1" />
                작성자: {consultation.writtenBy}
              </span>
            )}
            {consultation.followUpDate && (
              <span className="flex items-center">
                <MessageCircle className="h-3 w-3 mr-1" />
                후속 조치 예정일:{" "}
                {dayjs(consultation.followUpDate).format("YYYY-MM-DD")}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConsultationHistory;
