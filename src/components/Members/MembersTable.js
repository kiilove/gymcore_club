"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronUp, ChevronDown, MoreHorizontal } from "lucide-react";
import { formatDate, getMembershipStatus } from "../../utils/dateUtils";
import { calculateAge } from "../../utils/memberUtils";

const MembersTable = ({ members, onSort, sortConfig = {}, onSelectItems }) => {
  const navigate = useNavigate();
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // 모바일 감지
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // MembersTable.js에서 행 클릭 처리 개선
  // 1. handleRowClick 함수를 수정하여 확인 버튼이 포함된 UI로 변경
  const handleRowClick = (id, event) => {
    // 체크박스 클릭 시 이벤트 처리 방지
    if (
      event.target.type === "checkbox" ||
      event.target.closest("button") ||
      event.target.closest("input")
    ) {
      return;
    }

    if (isMobile) {
      // 모바일에서는 상세보기 버튼을 클릭했을 때만 이동
      return;
    }

    navigate(`/members/detail/${id}`);
    console.log(`/members/detail/${id}`);
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

  const handleHeaderCheckboxChange = (e) => {
    if (e.target.checked) {
      const allIds = members.map((member) => member.id);
      setSelectedMembers(allIds);
      if (onSelectItems) onSelectItems(allIds);
    } else {
      setSelectedMembers([]);
      if (onSelectItems) onSelectItems([]);
    }
  };

  const handleSortClick = (field) => {
    if (onSort) {
      onSort(field);
    }
  };

  const getSortIcon = (field) => {
    if (!sortConfig || sortConfig.sortBy !== field) {
      return <MoreHorizontal className="h-4 w-4 text-gray-400" />;
    }
    return sortConfig.sortOrder === "asc" ? (
      <ChevronUp className="h-4 w-4 text-blue-500" />
    ) : (
      <ChevronDown className="h-4 w-4 text-blue-500" />
    );
  };

  // 모바일 테이블 렌더링 함수에서 상세보기 버튼 추가
  const renderMobileTable = () => {
    return (
      <div className="space-y-4">
        {members.map((member) => {
          const membershipStatus = getMembershipStatus(member.endDate);
          // 나이 계산
          const age = member.birthdate ? calculateAge(member.birthdate) : null;

          return (
            <div
              key={member.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 relative"
              onClick={(e) => handleRowClick(member.id, e)}
            >
              <div
                className="absolute top-3 right-3"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  onChange={(e) => handleCheckboxChange(e, member.id)}
                  checked={selectedMembers.includes(member.id)}
                />
              </div>

              <div className="mb-3">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {member.gender}
                  {age !== null && `, ${age}세`}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">
                    연락처:
                  </span>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {member.phone}
                  </div>
                </div>

                <div>
                  <span className="text-gray-500 dark:text-gray-400">
                    회원권:
                  </span>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {member.membershipType}
                  </div>
                </div>

                <div>
                  <span className="text-gray-500 dark:text-gray-400">
                    시작일:
                  </span>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {formatDate(member.startDate)}
                  </div>
                </div>

                <div>
                  <span className="text-gray-500 dark:text-gray-400">
                    만료일:
                  </span>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {formatDate(member.endDate)}
                  </div>
                </div>
              </div>

              <div className="mt-3 flex justify-between items-center">
                <span
                  className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-md ${membershipStatus.className}`}
                >
                  {membershipStatus.text}
                </span>

                <button
                  onClick={() => navigate(`/members/detail/${member.id}`)}
                  className="ml-2 px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-md text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800/40"
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

  // 데스크톱 테이블
  const renderDesktopTable = () => {
    return (
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-3 py-3 text-left">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  onChange={handleHeaderCheckboxChange}
                  checked={
                    selectedMembers.length === members.length &&
                    members.length > 0
                  }
                />
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSortClick("name")}
              >
                <div className="flex items-center gap-1">
                  이름
                  {getSortIcon("name")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                연락처
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSortClick("membershipType")}
              >
                <div className="flex items-center gap-1">
                  회원권 종류
                  {getSortIcon("membershipType")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSortClick("startDate")}
              >
                <div className="flex items-center gap-1">
                  시작일
                  {getSortIcon("startDate")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSortClick("endDate")}
              >
                <div className="flex items-center gap-1">
                  만료일
                  {getSortIcon("endDate")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSortClick("status")}
              >
                <div className="flex items-center gap-1">
                  상태
                  {getSortIcon("status")}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {members.map((member) => {
              const membershipStatus = getMembershipStatus(member.endDate);
              // 나이 계산
              const age = member.birthdate
                ? calculateAge(member.birthdate)
                : null;

              return (
                // 데스크톱 테이블 row 클릭 이벤트 수정
                <tr
                  key={member.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 cursor-pointer"
                  onClick={(e) => handleRowClick(member.id, e)}
                >
                  <td
                    className="px-3 py-4 whitespace-nowrap"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      onChange={(e) => handleCheckboxChange(e, member.id)}
                      checked={selectedMembers.includes(member.id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {member.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {member.gender}
                      {age !== null && `, ${age}세`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {member.phone}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {member.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {member.membershipType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(member.startDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(member.endDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-md ${membershipStatus.className}`}
                    >
                      {membershipStatus.text}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return isMobile ? renderMobileTable() : renderDesktopTable();
};

export default MembersTable;
