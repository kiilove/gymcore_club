"use client";

import { useEffect } from "react";
import { formatDateForInput } from "../../../utils/dateUtils";

const MemberProfileFormTab = ({ formData, onChange, errors }) => {
  const calculateEndDate = (startDate, membershipType) => {
    if (!startDate) return "";

    const start = new Date(startDate);
    const end = new Date(start);

    switch (membershipType) {
      case "1개월 정기권":
        end.setMonth(start.getMonth() + 1);
        break;
      case "3개월 정기권":
        end.setMonth(start.getMonth() + 3);
        break;
      case "6개월 정기권":
        end.setMonth(start.getMonth() + 6);
        break;
      case "1년 정기권":
        end.setFullYear(start.getFullYear() + 1);
        break;
      default:
        break;
    }

    return formatDateForInput(end);
  };

  useEffect(() => {
    if (formData.startDate && formData.membershipType) {
      const endDate = calculateEndDate(
        formData.startDate,
        formData.membershipType
      );
      onChange({ target: { name: "endDate", value: endDate } });
    }
  }, [formData.startDate, formData.membershipType, onChange]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          이름 *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={onChange}
          required
          className={`w-full px-3 py-2 border ${
            errors.name
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-600"
          } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="gender"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          성별
        </label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="남성">남성</option>
          <option value="여성">여성</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="age"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          나이
        </label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={onChange}
          min="1"
          max="120"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          연락처 *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={onChange}
          required
          placeholder="010-0000-0000"
          className={`w-full px-3 py-2 border ${
            errors.phone
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-600"
          } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white`}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          이메일
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="membershipType"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          회원권 종류 *
        </label>
        <select
          id="membershipType"
          name="membershipType"
          value={formData.membershipType}
          onChange={onChange}
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="1개월 정기권">1개월 정기권</option>
          <option value="3개월 정기권">3개월 정기권</option>
          <option value="6개월 정기권">6개월 정기권</option>
          <option value="1년 정기권">1년 정기권</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="startDate"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          시작일 *
        </label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={formData.startDate}
          onChange={onChange}
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="endDate"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          만료일
        </label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={formData.endDate}
          readOnly
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-100 dark:bg-gray-600 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          상태
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="active">활성</option>
          <option value="expired">만료</option>
        </select>
      </div>
    </div>
  );
};

export default MemberProfileFormTab;
