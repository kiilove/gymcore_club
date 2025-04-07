"use client";

import {
  FaPlus,
  FaTrash,
  FaGraduationCap,
  FaCertificate,
} from "react-icons/fa";

const CoachQualificationsTab = ({ formData, updateFormData }) => {
  const handleCertificationChange = (index, field, value) => {
    const newCertifications = [...formData.certifications];
    newCertifications[index] = {
      ...newCertifications[index],
      [field]: value,
    };
    updateFormData({ certifications: newCertifications });
  };

  const addCertification = () => {
    updateFormData({
      certifications: [
        ...formData.certifications,
        { name: "", issueDate: "", institution: "" },
      ],
    });
  };

  const removeCertification = (index) => {
    const newCertifications = [...formData.certifications];
    newCertifications.splice(index, 1);
    updateFormData({
      certifications: newCertifications.length
        ? newCertifications
        : [{ name: "", issueDate: "", institution: "" }],
    });
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 flex items-center">
          <FaCertificate className="mr-2 text-blue-500" /> 자격증 및 학위
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          코치의 자격증, 학위 및 교육 이수 내역을 등록하세요.
        </p>
      </div>

      <div className="space-y-6">
        {formData.certifications.map((cert, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50"
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-medium text-gray-900 dark:text-white flex items-center">
                <FaGraduationCap className="mr-2 text-blue-500" />
                {cert.name ? cert.name : `자격/학위 ${index + 1}`}
              </h4>
              <button
                type="button"
                onClick={() => removeCertification(index)}
                className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
              >
                <FaTrash />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-5">
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  자격/학위명
                </label>
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) =>
                    handleCertificationChange(index, "name", e.target.value)
                  }
                  placeholder="자격증 또는 학위명"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="md:col-span-3">
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  취득일
                </label>
                <input
                  type="date"
                  value={cert.issueDate}
                  onChange={(e) =>
                    handleCertificationChange(
                      index,
                      "issueDate",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="md:col-span-4">
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  발급기관/학교
                </label>
                <input
                  type="text"
                  value={cert.institution}
                  onChange={(e) =>
                    handleCertificationChange(
                      index,
                      "institution",
                      e.target.value
                    )
                  }
                  placeholder="발급기관 또는 학교명"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addCertification}
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800"
      >
        <FaPlus className="mr-2" /> 자격/학위 추가
      </button>
    </div>
  );
};

export default CoachQualificationsTab;
