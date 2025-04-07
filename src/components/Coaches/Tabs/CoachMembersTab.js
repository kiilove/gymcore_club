"use client";

import { useState } from "react";
import { FaSearch, FaUserPlus, FaUserMinus } from "react-icons/fa";
import { members } from "../../../datas/mockData";

const CoachMembersTab = ({ formData, updateFormData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [assignedMembers, setAssignedMembers] = useState(
    formData.assignedMembers || []
  );

  // 회원 검색 기능
  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm)
  );

  // 회원 할당 여부 확인
  const isMemberAssigned = (memberId) => {
    return assignedMembers.some((m) => m.id === memberId);
  };

  // 회원 할당/해제
  const toggleMemberAssignment = (member) => {
    let updatedMembers;

    if (isMemberAssigned(member.id)) {
      // 이미 할당된 회원이면 제거
      updatedMembers = assignedMembers.filter((m) => m.id !== member.id);
    } else {
      // 할당되지 않은 회원이면 추가
      updatedMembers = [
        ...assignedMembers,
        {
          id: member.id,
          name: member.name,
          phone: member.phone,
          membershipType: member.membershipType,
          assignedDate: new Date().toISOString().split("T")[0],
        },
      ];
    }

    setAssignedMembers(updatedMembers);
    updateFormData({ assignedMembers: updatedMembers });
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          담당 회원 관리
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          코치가 담당하는 회원을 관리합니다. 회원을 검색하여 할당하거나 해제할
          수 있습니다.
        </p>
      </div>

      {/* 검색 영역 */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="회원 이름 또는 연락처로 검색"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* 담당 회원 목록 */}
      <div className="mb-8">
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3 flex items-center">
          <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-md text-xs mr-2">
            {assignedMembers.length}
          </span>
          담당 회원 목록
        </h4>

        {assignedMembers.length > 0 ? (
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-md">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {assignedMembers.map((member) => (
                <li
                  key={member.id}
                  className="px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {member.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {member.phone} | {member.membershipType}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      할당일: {member.assignedDate}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleMemberAssignment(member)}
                    className="ml-2 p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                  >
                    <FaUserMinus className="h-5 w-5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 dark:bg-gray-800/50 rounded-md border border-dashed border-gray-300 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">
              담당 회원이 없습니다.
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              아래에서 회원을 검색하여 할당하세요.
            </p>
          </div>
        )}
      </div>

      {/* 회원 검색 결과 */}
      {searchTerm && (
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
            검색 결과
          </h4>

          {filteredMembers.length > 0 ? (
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-md">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredMembers.map((member) => (
                  <li
                    key={member.id}
                    className="px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {member.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {member.phone} | {member.membershipType}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleMemberAssignment(member)}
                      className={`ml-2 p-1 ${
                        isMemberAssigned(member.id)
                          ? "text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                          : "text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                      }`}
                    >
                      {isMemberAssigned(member.id) ? (
                        <FaUserMinus className="h-5 w-5" />
                      ) : (
                        <FaUserPlus className="h-5 w-5" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 dark:bg-gray-800/50 rounded-md border border-dashed border-gray-300 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400">
                검색 결과가 없습니다.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CoachMembersTab;
