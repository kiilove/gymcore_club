import React, { useState, useContext } from "react";
import { FaUser, FaBuilding, FaLock, FaBell, FaPalette } from "react-icons/fa";
import PageTitle from "../../components/Shared/PageTitle";
import SectionCard from "../../components/Shared/SectionCard";
import Button from "../../components/Shared/Button";
import { ThemeContext } from "../../context/ThemeContext";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const [profileForm, setProfileForm] = useState({
    name: "관리자",
    email: "admin@gymcore.com",
    phone: "010-1234-5678",
  });

  const [gymForm, setGymForm] = useState({
    gymName: "GymCore 피트니스",
    address: "서울시 강남구 테헤란로 123",
    phone: "02-123-4567",
    businessNumber: "123-45-67890",
    openingHours: "06:00 - 23:00",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    membershipExpiry: true,
    newPayments: true,
    systemUpdates: false,
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGymChange = (e) => {
    const { name, value } = e.target;
    setGymForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    console.log("프로필 업데이트:", profileForm);
    // 실제 구현에서는 API 호출 등을 통해 데이터를 업데이트
    alert("프로필이 업데이트되었습니다.");
  };

  const handleGymSubmit = (e) => {
    e.preventDefault();
    console.log("헬스장 정보 업데이트:", gymForm);
    // 실제 구현에서는 API 호출 등을 통해 데이터를 업데이트
    alert("헬스장 정보가 업데이트되었습니다.");
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }

    console.log("비밀번호 변경:", passwordForm);
    // 실제 구현에서는 API 호출 등을 통해 데이터를 업데이트

    // 폼 초기화
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    alert("비밀번호가 변경되었습니다.");
  };

  const handleNotificationSubmit = (e) => {
    e.preventDefault();
    console.log("알림 설정 업데이트:", notificationSettings);
    // 실제 구현에서는 API 호출 등을 통해 데이터를 업데이트
    alert("알림 설정이 업데이트되었습니다.");
  };

  const tabs = [
    { id: "profile", name: "내 프로필", icon: FaUser },
    { id: "gym", name: "헬스장 정보", icon: FaBuilding },
    { id: "password", name: "비밀번호 변경", icon: FaLock },
    { id: "notifications", name: "알림 설정", icon: FaBell },
    { id: "appearance", name: "테마 설정", icon: FaPalette },
  ];

  return (
    <div>
      <PageTitle title="설정" subtitle="계정 및 시스템 설정을 관리합니다." />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <SectionCard>
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full ${
                    activeTab === tab.id
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  <tab.icon className="mr-3 h-5 w-5" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </SectionCard>
        </div>

        <div className="md:col-span-3">
          {activeTab === "profile" && (
            <SectionCard title="내 프로필">
              <form onSubmit={handleProfileSubmit}>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      이름
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={profileForm.name}
                      onChange={handleProfileChange}
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
                      value={profileForm.email}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      연락처
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={profileForm.phone}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button type="submit" variant="primary">
                    저장
                  </Button>
                </div>
              </form>
            </SectionCard>
          )}

          {activeTab === "gym" && (
            <SectionCard title="헬스장 정보">
              <form onSubmit={handleGymSubmit}>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="gymName"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      헬스장 이름
                    </label>
                    <input
                      type="text"
                      id="gymName"
                      name="gymName"
                      value={gymForm.gymName}
                      onChange={handleGymChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      주소
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={gymForm.address}
                      onChange={handleGymChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="gymPhone"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      연락처
                    </label>
                    <input
                      type="tel"
                      id="gymPhone"
                      name="phone"
                      value={gymForm.phone}
                      onChange={handleGymChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="businessNumber"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      사업자 등록번호
                    </label>
                    <input
                      type="text"
                      id="businessNumber"
                      name="businessNumber"
                      value={gymForm.businessNumber}
                      onChange={handleGymChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="openingHours"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      영업 시간
                    </label>
                    <input
                      type="text"
                      id="openingHours"
                      name="openingHours"
                      value={gymForm.openingHours}
                      onChange={handleGymChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button type="submit" variant="primary">
                    저장
                  </Button>
                </div>
              </form>
            </SectionCard>
          )}

          {activeTab === "password" && (
            <SectionCard title="비밀번호 변경">
              <form onSubmit={handlePasswordSubmit}>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="currentPassword"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      현재 비밀번호
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      새 비밀번호
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      새 비밀번호 확인
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button type="submit" variant="primary">
                    비밀번호 변경
                  </Button>
                </div>
              </form>
            </SectionCard>
          )}

          {activeTab === "notifications" && (
            <SectionCard title="알림 설정">
              <form onSubmit={handleNotificationSubmit}>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="emailNotifications"
                      name="emailNotifications"
                      checked={notificationSettings.emailNotifications}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="emailNotifications"
                      className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                    >
                      이메일 알림 받기
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="smsNotifications"
                      name="smsNotifications"
                      checked={notificationSettings.smsNotifications}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="smsNotifications"
                      className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                    >
                      SMS 알림 받기
                    </label>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      알림 유형
                    </h3>

                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="membershipExpiry"
                          name="membershipExpiry"
                          checked={notificationSettings.membershipExpiry}
                          onChange={handleNotificationChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="membershipExpiry"
                          className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                        >
                          회원권 만료 알림
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="newPayments"
                          name="newPayments"
                          checked={notificationSettings.newPayments}
                          onChange={handleNotificationChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="newPayments"
                          className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                        >
                          새로운 결제 알림
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="systemUpdates"
                          name="systemUpdates"
                          checked={notificationSettings.systemUpdates}
                          onChange={handleNotificationChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="systemUpdates"
                          className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                        >
                          시스템 업데이트 알림
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button type="submit" variant="primary">
                    저장
                  </Button>
                </div>
              </form>
            </SectionCard>
          )}

          {activeTab === "appearance" && (
            <SectionCard title="테마 설정">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    테마 모드
                  </h3>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={toggleDarkMode}
                      className={`flex flex-col items-center p-4 rounded-lg border ${
                        !darkMode
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                          : "border-gray-300 dark:border-gray-700"
                      }`}
                    >
                      <div className="w-16 h-16 bg-white rounded-md shadow-md mb-2 flex items-center justify-center">
                        <div className="w-10 h-2 bg-gray-300 rounded"></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        라이트 모드
                      </span>
                    </button>

                    <button
                      onClick={toggleDarkMode}
                      className={`flex flex-col items-center p-4 rounded-lg border ${
                        darkMode
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                          : "border-gray-300 dark:border-gray-700"
                      }`}
                    >
                      <div className="w-16 h-16 bg-gray-800 rounded-md shadow-md mb-2 flex items-center justify-center">
                        <div className="w-10 h-2 bg-gray-600 rounded"></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        다크 모드
                      </span>
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    시스템 설정 사용
                  </h3>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="useSystemTheme"
                      checked={false}
                      onChange={() => {}}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="useSystemTheme"
                      className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                    >
                      시스템 테마 설정을 따르기
                    </label>
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    이 옵션을 선택하면 운영체제의 테마 설정에 따라 자동으로
                    라이트/다크 모드가 전환됩니다.
                  </p>
                </div>
              </div>
            </SectionCard>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
