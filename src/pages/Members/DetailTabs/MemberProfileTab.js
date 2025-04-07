import React from "react";
import SectionCard from "../../../components/Shared/SectionCard";
import { formatDate } from "../../../utils/dateUtils";

const MemberProfileTab = ({ member }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <SectionCard title="기본 정보">
        <div className="space-y-4">
          <div className="flex items-center">
            <span className="text-gray-600 dark:text-gray-400 w-20">이름</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {member.name}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600 dark:text-gray-400 w-20">성별</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {member.gender}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600 dark:text-gray-400 w-20">나이</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {member.age}세
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600 dark:text-gray-400 w-20">
              연락처
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {member.phone}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600 dark:text-gray-400 w-20">
              이메일
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {member.email}
            </span>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="회원권 정보">
        <div className="space-y-4">
          <div className="flex items-center">
            <span className="text-gray-600 dark:text-gray-400 w-20">
              회원권 종류
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {member.membershipType}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600 dark:text-gray-400 w-20">
              시작일
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {formatDate(member.startDate)}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600 dark:text-gray-400 w-20">
              만료일
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {formatDate(member.endDate)}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600 dark:text-gray-400 w-20">상태</span>
            <span
              className={`font-medium ${
                member.status === "active" ? "text-green-600" : "text-red-600"
              }`}
            >
              {member.status === "active" ? "활성" : "만료"}
            </span>
          </div>
        </div>
      </SectionCard>
    </div>
  );
};

export default MemberProfileTab;
