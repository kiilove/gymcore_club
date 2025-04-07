"use client";

import { useState } from "react";
import Button from "../Shared/Button";

const CoachesFilter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    name: "",
    status: "all",
    specialty: "all",
  });

  // 전문 분야 목록 (실제 구현에서는 API에서 가져오거나 props로 전달받을 수 있음)
  const specialties = ["all", "요가", "필라테스", "PT", "크로스핏", "수영"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    const resetFilters = {
      name: "",
      status: "all",
      specialty: "all",
    };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              검색
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={filters.name}
              onChange={handleChange}
              placeholder="이름 검색"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
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
              value={filters.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">모든 상태</option>
              <option value="active">재직중</option>
              <option value="inactive">퇴사</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="specialty"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              전문 분야
            </label>
            <select
              id="specialty"
              name="specialty"
              value={filters.specialty}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              {specialties.map((specialty, index) => (
                <option key={index} value={specialty}>
                  {specialty === "all" ? "모든 전문 분야" : specialty}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex justify-end space-x-3">
          <Button type="button" variant="secondary" onClick={handleReset}>
            초기화
          </Button>
          <Button type="submit" variant="primary">
            검색
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CoachesFilter;
