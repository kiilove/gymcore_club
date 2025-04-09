"use client";

import { useState } from "react";
import dayjs from "dayjs";
import Button from "../../Shared/Button";

const BodyInfoForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    date: dayjs().format("YYYY-MM-DD"),
    height: "",
    weight: "",
    bodyFat: "",
    notes: "",
    writtenBy: "",
    writtenAt: dayjs().format("YYYY-MM-DD"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 필수 필드 검증
    if (!formData.weight) {
      alert("체중은 필수 입력 항목입니다.");
      return;
    }

    if (!formData.writtenBy) {
      alert("작성자는 필수 입력 항목입니다.");
      return;
    }

    // 숫자 필드 변환
    const processedData = {
      ...formData,
      height: formData.height ? Number(formData.height) : null,
      weight: Number(formData.weight),
      bodyFat: formData.bodyFat ? Number(formData.bodyFat) : null,
    };

    // BMI 계산 추가
    if (processedData.height && processedData.weight) {
      const heightInMeters = processedData.height / 100;
      const bmi = processedData.weight / (heightInMeters * heightInMeters);
      processedData.bmi = Number.parseFloat(bmi.toFixed(1));
    }

    onSubmit(processedData);
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
            측정일
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
            htmlFor="height"
            className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1"
          >
            키 (cm)
          </label>
          <input
            type="number"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleChange}
            placeholder="키를 입력하세요"
            step="0.1"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label
            htmlFor="weight"
            className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1"
          >
            체중 (kg) *
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="체중을 입력하세요"
            step="0.1"
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label
            htmlFor="bodyFat"
            className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1"
          >
            체지방률 (%)
          </label>
          <input
            type="number"
            id="bodyFat"
            name="bodyFat"
            value={formData.bodyFat}
            onChange={handleChange}
            placeholder="체지방률을 입력하세요"
            step="0.1"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
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
        <div>
          <label
            htmlFor="writtenAt"
            className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1"
          >
            작성일자
          </label>
          <input
            type="date"
            id="writtenAt"
            name="writtenAt"
            value={formData.writtenAt}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="md:col-span-3">
          <label
            htmlFor="notes"
            className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1"
          >
            메모
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="측정에 대한 메모를 입력하세요"
            rows="2"
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
          className="bg-green-600 hover:bg-green-700"
        >
          측정완료
        </Button>
      </div>
    </form>
  );
};

export default BodyInfoForm;
