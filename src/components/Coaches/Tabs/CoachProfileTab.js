"use client";

import { useState, useRef } from "react";
import { FaUpload, FaTrash } from "react-icons/fa";

const CoachProfileTab = ({ formData, updateFormData }) => {
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(
    formData.profileImage || null
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleSpecialtyChange = (index, value) => {
    const newSpecialty = [...formData.specialty];
    newSpecialty[index] = value;
    updateFormData({ specialty: newSpecialty });
  };

  const addSpecialty = () => {
    updateFormData({ specialty: [...formData.specialty, ""] });
  };

  const removeSpecialty = (index) => {
    const newSpecialty = [...formData.specialty];
    newSpecialty.splice(index, 1);
    updateFormData({ specialty: newSpecialty.length ? newSpecialty : [""] });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 파일 크기 제한 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("파일 크기는 5MB 이하여야 합니다.");
      return;
    }

    // 이미지 파일 타입 확인
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    // 미리보기 생성
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target.result);
    };
    reader.readAsDataURL(file);

    // 폼 데이터 업데이트
    updateFormData({
      profileImageFile: file,
      profileImage: URL.createObjectURL(file), // 임시 URL 생성
    });
  };

  const removeImage = () => {
    setPreviewImage(null);
    updateFormData({
      profileImageFile: null,
      profileImage: "",
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 프로필 이미지 업로드 섹션 */}
        <div className="md:col-span-1 flex flex-col items-center">
          <div className="mb-4 text-center">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              프로필 이미지
            </p>
            <div className="w-40 h-40 mx-auto relative">
              {previewImage ? (
                <div className="relative group">
                  <img
                    src={previewImage || "/placeholder.svg"}
                    alt="프로필 미리보기"
                    className="w-40 h-40 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute bottom-0 right-0 bg-gray-700 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              ) : (
                <div className="w-40 h-40 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-400 dark:text-gray-500 text-4xl">
                    ?
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="mt-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
              id="profile-image-upload"
            />
            <label
              htmlFor="profile-image-upload"
              className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
            >
              <FaUpload className="mr-2 h-4 w-4" />
              이미지 업로드
            </label>
          </div>
        </div>

        {/* 기본 정보 입력 섹션 */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
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
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
              required
              placeholder="010-0000-0000"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
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
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="hireDate"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              입사일 *
            </label>
            <input
              type="date"
              id="hireDate"
              name="hireDate"
              value={formData.hireDate}
              onChange={handleChange}
              required
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
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="active">재직중</option>
              <option value="inactive">퇴사</option>
            </select>
          </div>
        </div>
      </div>

      {/* 전문 분야 섹션 */}
      <div className="mt-8">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          전문 분야 *
        </label>
        <div className="space-y-3">
          {formData.specialty.map((spec, index) => (
            <div key={index} className="flex items-center">
              <input
                type="text"
                value={spec}
                onChange={(e) => handleSpecialtyChange(index, e.target.value)}
                required
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="예: 웨이트 트레이닝, 요가, 필라테스 등"
              />
              <button
                type="button"
                onClick={() => removeSpecialty(index)}
                disabled={formData.specialty.length === 1}
                className="ml-2 p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 disabled:opacity-50"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addSpecialty}
          className="mt-3 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-800/40"
        >
          + 전문 분야 추가
        </button>
      </div>
    </div>
  );
};

export default CoachProfileTab;
