"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Shared/Button";
import { formatDateForInput } from "../../utils/dateUtils";
import CoachProfileTab from "./Tabs/CoachProfileTab";
import CoachWorkScheduleTab from "./Tabs/CoachWorkScheduleTab";
import CoachQualificationsTab from "./Tabs/CoachQualificationsTab";
import CoachExperienceTab from "./Tabs/CoachExperienceTab";
import CoachBodyInfoTab from "./Tabs/CoachBodyInfoTab";
import CoachMembersTab from "./Tabs/CoachMembersTab";

const CoachesForm = ({ coach, onSubmit, isEditing = false }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    name: "",
    gender: "남성",
    age: "",
    phone: "",
    email: "",
    specialty: [""],
    hireDate: formatDateForInput(new Date()),
    status: "active",
    experience: [{ period: "", company: "", position: "" }],
    certifications: [{ name: "", issueDate: "", institution: "" }],
    profileImage: "",
    profileImageFile: null, // 실제 파일 객체 저장
    bodyInfo: {
      height: "",
      weight: "",
      bodyFat: "",
      musclePercentage: "",
    },
    workSchedule: {
      monday: { isWorking: true, startTime: "09:00", endTime: "18:00" },
      tuesday: { isWorking: true, startTime: "09:00", endTime: "18:00" },
      wednesday: { isWorking: true, startTime: "09:00", endTime: "18:00" },
      thursday: { isWorking: true, startTime: "09:00", endTime: "18:00" },
      friday: { isWorking: true, startTime: "09:00", endTime: "18:00" },
      saturday: { isWorking: false, startTime: "09:00", endTime: "13:00" },
      sunday: { isWorking: false, startTime: "", endTime: "" },
    },
    assignedMembers: [],
  });

  useEffect(() => {
    if (coach) {
      setFormData({
        name: coach.name || "",
        gender: coach.gender || "남성",
        age: coach.age || "",
        phone: coach.phone || "",
        email: coach.email || "",
        specialty: coach.specialty || [""],
        hireDate:
          formatDateForInput(coach.hireDate) || formatDateForInput(new Date()),
        status: coach.status || "active",
        experience: coach.experience || [
          { period: "", company: "", position: "" },
        ],
        certifications: coach.certifications || [
          { name: "", issueDate: "", institution: "" },
        ],
        profileImage: coach.profileImage || "",
        profileImageFile: null,
        bodyInfo: coach.bodyInfo || {
          height: "",
          weight: "",
          bodyFat: "",
          musclePercentage: "",
        },
        workSchedule: coach.workSchedule || {
          monday: { isWorking: true, startTime: "09:00", endTime: "18:00" },
          tuesday: { isWorking: true, startTime: "09:00", endTime: "18:00" },
          wednesday: { isWorking: true, startTime: "09:00", endTime: "18:00" },
          thursday: { isWorking: true, startTime: "09:00", endTime: "18:00" },
          friday: { isWorking: true, startTime: "09:00", endTime: "18:00" },
          saturday: { isWorking: false, startTime: "09:00", endTime: "13:00" },
          sunday: { isWorking: false, startTime: "", endTime: "" },
        },
        assignedMembers: coach.assignedMembers || [],
      });
    }
  }, [coach]);

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const tabs = [
    { id: "profile", label: "기본 정보" },
    { id: "schedule", label: "근무 일정" },
    { id: "qualifications", label: "자격 및 학위" },
    { id: "experience", label: "경력 사항" },
    { id: "bodyInfo", label: "신체 정보" },
    { id: "members", label: "담당 회원" },
  ];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
    >
      {/* 탭 네비게이션 */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="flex space-x-8 overflow-x-auto" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* 탭 컨텐츠 */}
      <div className="mb-6">
        {activeTab === "profile" && (
          <CoachProfileTab
            formData={formData}
            updateFormData={updateFormData}
          />
        )}
        {activeTab === "schedule" && (
          <CoachWorkScheduleTab
            formData={formData}
            updateFormData={updateFormData}
          />
        )}
        {activeTab === "qualifications" && (
          <CoachQualificationsTab
            formData={formData}
            updateFormData={updateFormData}
          />
        )}
        {activeTab === "experience" && (
          <CoachExperienceTab
            formData={formData}
            updateFormData={updateFormData}
          />
        )}
        {activeTab === "bodyInfo" && (
          <CoachBodyInfoTab
            formData={formData}
            updateFormData={updateFormData}
          />
        )}
        {activeTab === "members" && (
          <CoachMembersTab
            formData={formData}
            updateFormData={updateFormData}
          />
        )}
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <Button
          type="button"
          variant="secondary"
          onClick={() => navigate("/coaches")}
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

export default CoachesForm;
