"use client";

import { FaPlus, FaTrash, FaBriefcase, FaBuilding } from "react-icons/fa";

const CoachExperienceTab = ({ formData, updateFormData }) => {
  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...formData.experience];
    newExperience[index] = {
      ...newExperience[index],
      [field]: value,
    };
    updateFormData({ experience: newExperience });
  };

  const addExperience = () => {
    updateFormData({
      experience: [
        ...formData.experience,
        { period: "", company: "", position: "" },
      ],
    });
  };

  const removeExperience = (index) => {
    const newExperience = [...formData.experience];
    newExperience.splice(index, 1);
    updateFormData({
      experience: newExperience.length
        ? newExperience
        : [{ period: "", company: "", position: "" }],
    });
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 flex items-center">
          <FaBriefcase className="mr-2 text-blue-500" /> 경력 사항
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          코치의 이전 근무 경력을 등록하세요. 최신 경력부터 입력하는 것을
          권장합니다.
        </p>
      </div>

      <div className="space-y-6">
        {formData.experience.map((exp, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50"
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-medium text-gray-900 dark:text-white flex items-center">
                <FaBuilding className="mr-2 text-blue-500" />
                {exp.company ? exp.company : `경력 ${index + 1}`}
              </h4>
              <button
                type="button"
                onClick={() => removeExperience(index)}
                className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
              >
                <FaTrash />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-3">
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  근무 기간
                </label>
                <input
                  type="text"
                  value={exp.period}
                  onChange={(e) =>
                    handleExperienceChange(index, "period", e.target.value)
                  }
                  placeholder="예: 2018-2022"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="md:col-span-5">
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  회사/기관명
                </label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) =>
                    handleExperienceChange(index, "company", e.target.value)
                  }
                  placeholder="회사 또는 기관명"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="md:col-span-4">
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  직위/역할
                </label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) =>
                    handleExperienceChange(index, "position", e.target.value)
                  }
                  placeholder="직위 또는 역할"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addExperience}
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800"
      >
        <FaPlus className="mr-2" /> 경력 추가
      </button>
    </div>
  );
};

export default CoachExperienceTab;
