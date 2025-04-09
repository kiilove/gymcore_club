"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Calendar, Phone, Mail } from "lucide-react";
import { formatDate, getMembershipStatus } from "../../utils/dateUtils";
import { calculateAge } from "../../utils/memberUtils";

const MembersGrid = ({ members, onSelectItems }) => {
  const navigate = useNavigate();
  const [selectedMembers, setSelectedMembers] = useState([]);

  // handleCardClick 함수 수정
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

    navigate(`/members/detail/${id}`);
  };

  const handleCheckboxChange = (e, id) => {
    e.stopPropagation(); // 이벤트 버블링 방지

    if (e.target.checked) {
      setSelectedMembers([...selectedMembers, id]);
    } else {
      setSelectedMembers(selectedMembers.filter((memberId) => memberId !== id));
    }

    if (onSelectItems) {
      onSelectItems(
        e.target.checked
          ? [...selectedMembers, id]
          : selectedMembers.filter((memberId) => memberId !== id)
      );
    }
  };

  // 카드 클릭과 UI 수정
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {members.map((member) => {
        const membershipStatus = getMembershipStatus(member.endDate);
        // 나이 계산
        const age = member.birthdate ? calculateAge(member.birthdate) : null;

        return (
          <div
            key={member.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer overflow-hidden border border-gray-200 dark:border-gray-700"
            onClick={(e) => handleCardClick(member.id, e)}
          >
            <div className="p-4 relative">
              <div
                className="absolute top-4 left-4"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  onChange={(e) => handleCheckboxChange(e, member.id)}
                  checked={selectedMembers.includes(member.id)}
                />
              </div>

              <div className="flex justify-center mb-4 mt-2">
                <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <User className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>

              <div className="text-center mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {member.gender}
                  {age !== null && `, ${age}세`}
                </p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {member.phone}
                  </span>
                </div>

                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300 truncate">
                    {member.email}
                  </span>
                </div>

                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {formatDate(member.startDate)} ~{" "}
                    {formatDate(member.endDate)}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 p-3 flex justify-between items-center bg-gray-50 dark:bg-gray-700">
              <span
                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-md ${membershipStatus.className}`}
              >
                {membershipStatus.text}
              </span>

              {/* 모바일에서는 명시적인 버튼 제공 */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/members/detail/${member.id}`);
                }}
                className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-md text-xs font-medium hover:bg-blue-200 dark:hover:bg-blue-800/40"
              >
                상세보기
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MembersGrid;
