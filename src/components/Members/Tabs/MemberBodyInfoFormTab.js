"use client";

const MemberBodyInfoFormTab = ({ formData, onChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label
          htmlFor="height"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          키 (cm)
        </label>
        <input
          type="number"
          id="height"
          name="height"
          value={formData.height || ""}
          onChange={onChange}
          min="0"
          step="0.1"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="weight"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          체중 (kg)
        </label>
        <input
          type="number"
          id="weight"
          name="weight"
          value={formData.weight || ""}
          onChange={onChange}
          min="0"
          step="0.1"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="bodyFat"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          체지방률 (%)
        </label>
        <input
          type="number"
          id="bodyFat"
          name="bodyFat"
          value={formData.bodyFat || ""}
          onChange={onChange}
          min="0"
          step="0.1"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="bmi"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          BMI (자동 계산)
        </label>
        <input
          type="number"
          id="bmi"
          name="bmi"
          value={formData.bmi || ""}
          readOnly
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-100 dark:bg-gray-600 dark:text-white"
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          키와 체중을 입력하면 자동으로 계산됩니다.
        </p>
      </div>
    </div>
  );
};

export default MemberBodyInfoFormTab;
