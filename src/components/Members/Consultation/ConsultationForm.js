"use client";

import { useState } from "react";
import dayjs from "dayjs";
import Button from "../../Shared/Button";

const ConsultationForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    date: dayjs().format("YYYY-MM-DD"),
    note: "",
    category: "일반상담",
    writtenBy: "",
    followUpDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 필수 필드 검증
    if (!formData.note) {
      alert("상담 내용은 필수 입력 항목입니다.");
      return;
    }

    if (!formData.writtenBy) {
      alert("작성자는 필수 입력 항목입니다.");
      return;
    }

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mb-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        <div>
          <label
            htmlFor="date"
            className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1"
          >
            상담 일자
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1"
          >
            상담 유형
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="일반상담">일반상담</option>
            <option value="입회상담">입회상담</option>
            <option value="PT상담">PT상담</option>
            <option value="불만접수">불만접수</option>
            <option value="기타">기타</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="writtenBy"
            className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1"
          >
            작성자 *
          </label>
          <input
            type="text"
            id="writtenBy"
            name="writtenBy"
            value={formData.writtenBy}
            onChange={handleChange}
            placeholder="작성자 이름"
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="md:col-span-2">
          <label
            htmlFor="note"
            className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1"
          >
            상담 내용 *
          </label>
          <textarea
            id="note"
            name="note"
            value={formData.note}
            onChange={handleChange}
            placeholder="상담 내용을 입력하세요"
            rows="3"
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label
            htmlFor="followUpDate"
            className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1"
          >
            후속 조치 예정일
          </label>
          <input
            type="date"
            id="followUpDate"
            name="followUpDate"
            value={formData.followUpDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            취소
          </Button>
        )}
        <Button
          type="submit"
          variant="primary"
          className="bg-blue-600 hover:bg-blue-700"
        >
          상담 기록 저장
        </Button>
      </div>
    </form>
  );
};

export default ConsultationForm;
