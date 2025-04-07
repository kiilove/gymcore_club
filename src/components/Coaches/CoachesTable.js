"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronUp, ChevronDown, MoreHorizontal } from "lucide-react";
import { formatDate } from "../../utils/dateUtils";

const CoachesTable = ({ coaches, onSelectItems, onSort, sortConfig = {} }) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCoaches, setSelectedCoaches] = useState([]);

  // 모바일 감지
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // 행 클릭 처리 개선
  const handleRowClick = (id, event) => {
    // 버튼이나 링크 클릭 시 이벤트 처리 방지
    if (
      event.target.closest("button") ||
      event.target.closest("a") ||
      event.target.tagName.toLowerCase() === "a" ||
      event.target.tagName.toLowerCase() === "button" ||
      event.target.type === "checkbox"
    ) {
      return;
    }

    // 모바일에서는 상세보기 버튼을 클릭했을 때만 이동하도록 처리
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

  const handleHeaderCheckboxChange = (e) => {
    if (e.target.checked) {
      const allIds = coaches.map((coach) => coach.id);
      setSelectedCoaches(allIds);
      if (onSelectItems) onSelectItems(allIds);
    } else {
      setSelectedCoaches([]);
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

  // 모바일 테이블 렌더링
  const renderMobileTable = () => {
    return (
      <div className="space-y-4">
        {coaches.map((coach) => (
          <div
            key={coach.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 relative"
            onClick={(e) => handleRowClick(coach.id, e)}
          >
            <div
              className="absolute top-3 right-3"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                onChange={(e) => handleCheckboxChange(e, coach.id)}
                checked={selectedCoaches.includes(coach.id)}
              />
            </div>

            <div className="flex items-center mb-3">
              <div className="flex-shrink-0 h-12 w-12 mr-3">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src={coach.profileImage || "https://via.placeholder.com/100"}
                  alt={coach.name}
                />
              </div>
              <div>
                <div className="text-lg font-medium text-gray-900 dark:text-white">
                  {coach.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {coach.gender}, {coach.age}세
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 text-sm mb-3">
              <div>
                <span className="text-gray-500 dark:text-gray-400">
                  연락처:
                </span>
                <div className="font-medium text-gray-900 dark:text-white">
                  {coach.phone}
                </div>
              </div>

              <div>
                <span className="text-gray-500 dark:text-gray-400">
                  전문 분야:
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {coach.specialty.map((spec, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-gray-500 dark:text-gray-400">
                  입사일:
                </span>
                <div className="font-medium text-gray-900 dark:text-white">
                  {formatDate(coach.hireDate)}
                </div>
              </div>
            </div>

            <div className="mt-3 flex justify-between items-center">
              <span
                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-md ${
                  coach.status === "active"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                }`}
              >
                {coach.status === "active" ? "재직중" : "퇴사"}
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/coaches/detail/${coach.id}`);
                }}
                className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-md text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800/40"
              >
                상세보기
              </button>
            </div>
          </div>
        ))}
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
                    selectedCoaches.length === coaches.length &&
                    coaches.length > 0
                  }
                />
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSortClick("name")}
              >
                <div className="flex items-center gap-1">
                  코치
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
                onClick={() => handleSortClick("specialty")}
              >
                <div className="flex items-center gap-1">
                  전문 분야
                  {getSortIcon("specialty")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSortClick("hireDate")}
              >
                <div className="flex items-center gap-1">
                  입사일
                  {getSortIcon("hireDate")}
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
            {coaches.map((coach) => (
              <tr
                key={coach.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 cursor-pointer"
                onClick={(e) => handleRowClick(coach.id, e)}
              >
                <td
                  className="px-3 py-4 whitespace-nowrap"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    onChange={(e) => handleCheckboxChange(e, coach.id)}
                    checked={selectedCoaches.includes(coach.id)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={
                          coach.profileImage ||
                          "https://via.placeholder.com/100" ||
                          "/placeholder.svg"
                        }
                        alt={coach.name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {coach.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {coach.gender}, {coach.age}세
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {coach.phone}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {coach.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {coach.specialty.map((spec, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(coach.hireDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      coach.status === "active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {coach.status === "active" ? "재직중" : "퇴사"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return isMobile ? renderMobileTable() : renderDesktopTable();
};

export default CoachesTable;
