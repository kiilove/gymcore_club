"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Calendar, Phone, Mail, Award, Briefcase } from "lucide-react";
import { formatDate } from "../../utils/dateUtils";

const CoachesGrid = ({ coaches, onSelectItems }) => {
  const navigate = useNavigate();
  const [selectedCoaches, setSelectedCoaches] = useState([]);

  // handleCardClick 함수
  const handleCardClick = (id, event) => {
    // 체크박스 클릭 시 이벤트 처리 방지
    if (
      event.target.type === "checkbox" ||
      event.target.closest("button") ||
      event.target.closest("input")
    ) {
      return;
    }

    // 모바일에서는 상세보기 버튼을 클릭했을 때만 이동하도록 처리
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      return;
    }

    navigate(`/coaches/detail/${id}`);
  };

  const handleCheckboxChange = (e, id) => {
    e.stopPropagation(); // 이벤트 버블링 방지

    if (e.target.checked) {
      setSelectedCoaches([...selectedCoaches, id]);
    } else {
      setSelectedCoaches(selectedCoaches.filter((coachId) => coachId !== id));
    }

    if (onSelectItems) {
      onSelectItems(
        e.target.checked
          ? [...selectedCoaches, id]
          : selectedCoaches.filter((coachId) => coachId !== id)
      );
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {coaches.map((coach) => (
        <div
          key={coach.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer overflow-hidden border border-gray-200 dark:border-gray-700"
          onClick={(e) => handleCardClick(coach.id, e)}
        >
          <div className="p-4 relative">
            <div
              className="absolute top-4 left-4"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                onChange={(e) => handleCheckboxChange(e, coach.id)}
                checked={selectedCoaches.includes(coach.id)}
              />
            </div>

            <div className="flex justify-center mb-4 mt-2">
              {coach.profileImage ? (
                <img
                  src={coach.profileImage || "/placeholder.svg"}
                  alt={coach.name}
                  className="h-20 w-20 rounded-full object-cover"
                />
              ) : (
                <div className="h-20 w-20 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <User className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                </div>
              )}
            </div>

            <div className="text-center mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {coach.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {coach.gender}, {coach.age}세
              </p>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                <span className="text-gray-700 dark:text-gray-300">
                  {coach.phone}
                </span>
              </div>

              <div className="flex items-center">
                <Mail className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                <span className="text-gray-700 dark:text-gray-300 truncate">
                  {coach.email}
                </span>
              </div>

              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                <span className="text-gray-700 dark:text-gray-300">
                  입사일: {formatDate(coach.hireDate)}
                </span>
              </div>

              <div className="flex items-center">
                <Award className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                <div className="flex flex-wrap gap-1">
                  {coach.specialty.slice(0, 2).map((spec, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    >
                      {spec}
                    </span>
                  ))}
                  {coach.specialty.length > 2 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      +{coach.specialty.length - 2}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center">
                <Briefcase className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                <span className="text-gray-700 dark:text-gray-300">
                  경력: {coach.experience.length}건
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 p-3 flex justify-between items-center bg-gray-50 dark:bg-gray-700">
            <span
              className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-md ${
                coach.status === "active"
                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
              }`}
            >
              {coach.status === "active" ? "재직중" : "퇴사"}
            </span>

            {/* 모바일에서는 명시적인 버튼 제공 */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/coaches/detail/${coach.id}`);
              }}
              className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-md text-xs font-medium hover:bg-blue-200 dark:hover:bg-blue-800/40"
            >
              상세보기
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoachesGrid;
