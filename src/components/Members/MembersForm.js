"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Shared/Button";
import { formatDateForInput } from "../../utils/dateUtils";
import MemberProfileFormTab from "./Tabs/MemberProfileFormTab";
import MemberBodyInfoFormTab from "./Tabs/MemberBodyInfoFormTab";

const MembersForm = ({ member, onSubmit, isEditing = false }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    // 프로필 정보
    name: "",
    gender: "남성",
    age: "",
    phone: "",
    email: "",
    membershipType: "1개월 정기권",
    startDate: formatDateForInput(new Date()),
    endDate: "",
    status: "active",

    // 신체 정보
    height: "",
    weight: "",
    bodyFat: "",
    bmi: "",
  });

  useEffect(() => {
    if (member) {
      setFormData({
        // 프로필 정보
        name: member.name || "",
        gender: member.gender || "남성",
        age: member.age || "",
        phone: member.phone || "",
        email: member.email || "",
        membershipType: member.membershipType || "1개월 정기권",
        startDate:
          formatDateForInput(member.startDate) ||
          formatDateForInput(new Date()),
        endDate: formatDateForInput(member.endDate) || "",
        status: member.status || "active",

        // 신체 정보
        height: member.bodyInfo?.height || "",
        weight: member.bodyInfo?.weight || "",
        bodyFat: member.bodyInfo?.bodyFat || "",
        bmi: member.bodyInfo?.bmi || "",
      });
    }
  }, [member]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newFormData = {
        ...prev,
        [name]: value,
      };

      // BMI 자동 계산 (키와 체중이 모두 있을 때)
      if (
        (name === "height" || name === "weight") &&
        newFormData.height &&
        newFormData.weight
      ) {
        const heightInMeters = Number(newFormData.height) / 100;
        const weightInKg = Number(newFormData.weight);
        if (heightInMeters > 0) {
          const bmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(
            1
          );
          newFormData.bmi = bmi;
        }
      }

      return newFormData;
    });

    // 에러 상태 초기화
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // 필수 필드 검증
    if (!formData.name.trim()) {
      newErrors.name = "이름을 입력해주세요.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "연락처를 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // 신체 정보 객체 구성
    const bodyInfo = {
      height: Number(formData.height) || 0,
      weight: Number(formData.weight) || 0,
      bodyFat: Number(formData.bodyFat) || 0,
      bmi: Number(formData.bmi) || 0,
      history: member?.bodyInfo?.history || [],
    };

    // 제출할 데이터 구성
    const submitData = {
      name: formData.name,
      gender: formData.gender,
      age: formData.age ? Number(formData.age) : "",
      phone: formData.phone,
      email: formData.email,
      membershipType: formData.membershipType,
      startDate: formData.startDate,
      endDate: formData.endDate,
      status: formData.status,
      bodyInfo: bodyInfo,
      consultations: member?.consultations || [],
      payments: member?.payments || [],
    };

    onSubmit(submitData);
  };

  // 탭 네비게이션 렌더링
  const renderTabs = () => {
    return (
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="flex space-x-8">
          <button
            type="button"
            onClick={() => setActiveTab("profile")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "profile"
                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            기본 정보
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("body")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "body"
                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            신체 정보
          </button>
        </nav>
      </div>
    );
  };

  // 활성화된 탭에 따라 컴포넌트 렌더링
  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <MemberProfileFormTab
            formData={formData}
            onChange={handleChange}
            errors={errors}
          />
        );
      case "body":
        return (
          <MemberBodyInfoFormTab formData={formData} onChange={handleChange} />
        );
      default:
        return (
          <MemberProfileFormTab
            formData={formData}
            onChange={handleChange}
            errors={errors}
          />
        );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
    >
      {renderTabs()}
      {renderActiveTabContent()}

      <div className="mt-6 flex justify-end space-x-3">
        <Button
          type="button"
          variant="secondary"
          onClick={() => navigate("/members")}
        >
          취소
        </Button>
        <Button type="submit" variant="primary">
          {isEditing ? "수정" : "등록"}
        </Button>
      </div>
    </form>
  );
};

export default MembersForm;
