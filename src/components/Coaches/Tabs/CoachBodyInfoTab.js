"use client";

import { FaWeight, FaRuler } from "react-icons/fa";

const CoachBodyInfoTab = ({ formData, updateFormData }) => {
  const handleBodyInfoChange = (field, value) => {
    updateFormData({
      bodyInfo: {
        ...formData.bodyInfo,
        [field]: value,
      },
    });
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 flex items-center">
          <FaWeight className="mr-2 text-blue-500" /> 신체 정보
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          코치의 신체 정보를 등록하세요. 이 정보는 회원들에게 코치의 전문성을
          보여주는 데 도움이 됩니다.
        </p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
              <FaRuler className="mr-2 text-blue-500" /> 키 (cm)
            </label>
            <input
              type="number"
              value={formData.bodyInfo.height}
              onChange={(e) => handleBodyInfoChange("height", e.target.value)}
              placeholder="키"
              min="0"
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
              <FaWeight className="mr-2 text-blue-500" /> 체중 (kg)
            </label>
            <input
              type="number"
              value={formData.bodyInfo.weight}
              onChange={(e) => handleBodyInfoChange("weight", e.target.value)}
              placeholder="체중"
              min="0"
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              체지방률 (%)
            </label>
            <input
              type="number"
              value={formData.bodyInfo.bodyFat}
              onChange={(e) => handleBodyInfoChange("bodyFat", e.target.value)}
              placeholder="체지방률"
              min="0"
              max="100"
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              근육량 (%)
            </label>
            <input
              type="number"
              value={formData.bodyInfo.musclePercentage}
              onChange={(e) =>
                handleBodyInfoChange("musclePercentage", e.target.value)
              }
              placeholder="근육량"
              min="0"
              max="100"
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachBodyInfoTab;
