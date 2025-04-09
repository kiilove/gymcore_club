"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import Button from "../Shared/Button";
import MemberProfileFormTab from "./Tabs/MemberProfileFormTab";
import MemberBodyInfoTab from "../../pages/Members/DetailTabs/MemberBodyInfoTab";

const MembersStepperForm = ({
  member,
  onSubmit,
  isEditing = false,
  isSubmitting = false,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profileData, setProfileData] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(
    member || {
      // 기본값 설정
      name: "",
      gender: "남성",
      birthdate: "",
      phone: "",
      email: "",
      membershipType: "1개월 정기권",
      startDate: new Date().toISOString().split("T")[0],
      endDate: "",
      status: "active",
      height: "",
      weight: "",
      bodyFat: "",
      bmi: "",
    }
  );

  const steps = [
    { id: "profile", title: "기본 정보" },
    { id: "body", title: "신체 정보" },
  ];

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

  const validateProfileForm = () => {
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

  const handleNextStep = async () => {
    if (currentStep === 0) {
      // 프로필 정보 검증
      if (!validateProfileForm()) {
        return;
      }

      // 프로필 정보 저장
      const profileFormData = {
        name: formData.name,
        gender: formData.gender,
        birthdate: formData.birthdate || "",
        phone: formData.phone,
        email: formData.email,
        membershipType: formData.membershipType,
        startDate: formData.startDate,
        endDate: formData.endDate,
        status: formData.status,
      };

      try {
        // 프로필 정보 저장 및 ID 받아오기
        const savedProfile = await onSubmit(profileFormData, "profile");
        setProfileData(savedProfile);
        setCurrentStep(1);
      } catch (error) {
        console.error("프로필 정보 저장 실패:", error);
        // 에러 처리는 onSubmit 내에서 수행
        return;
      }
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  // 회원 정보 업데이트 함수 (MemberBodyInfoTab에서 사용)
  const updateMember = (updatedMember) => {
    if (profileData) {
      setProfileData({
        ...profileData,
        ...updatedMember,
      });
    }
  };

  // 완료 버튼 클릭 핸들러
  const handleComplete = () => {
    if (profileData) {
      // 회원 등록 완료 처리
      onSubmit(null, "complete", profileData.id);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      {/* 스텝퍼 헤더 */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  index <= currentStep
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                }`}
              >
                {index < currentStep ? (
                  <Check className="h-6 w-6" />
                ) : (
                  index + 1
                )}
              </div>
              <div className="ml-3">
                <p
                  className={`text-sm font-medium ${
                    index <= currentStep
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-4 ${
                    index < currentStep
                      ? "bg-blue-600"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 스텝 컨텐츠 */}
      <div className="mt-6">
        {currentStep === 0 && (
          <MemberProfileFormTab
            formData={formData}
            onChange={handleChange}
            errors={errors}
          />
        )}

        {currentStep === 1 && profileData && (
          <MemberBodyInfoTab member={profileData} setMember={updateMember} />
        )}
      </div>

      {/* 스텝 네비게이션 버튼 */}
      <div className="mt-8 flex justify-between">
        {currentStep > 0 ? (
          <Button
            type="button"
            variant="secondary"
            onClick={handlePrevStep}
            disabled={isSubmitting}
          >
            이전
          </Button>
        ) : (
          <div></div> // 빈 div로 공간 유지
        )}

        <div className="flex gap-2">
          {currentStep === 0 && (
            <Button
              type="button"
              variant="primary"
              onClick={handleNextStep}
              disabled={isSubmitting}
            >
              {isSubmitting ? "처리 중..." : "다음"}
            </Button>
          )}

          {currentStep === 1 && (
            <Button
              type="button"
              variant="primary"
              onClick={handleComplete}
              disabled={isSubmitting}
            >
              {isSubmitting ? "처리 중..." : "완료"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MembersStepperForm;
