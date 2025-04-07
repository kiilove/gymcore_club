"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  Trash2,
  MoreVertical,
  Calendar,
  Award,
  Briefcase,
  User,
  Users,
} from "lucide-react";
import { FaUserTie } from "react-icons/fa";
import { coaches } from "../../datas/mockData";
import { useToast } from "../../hooks/use-toast";
import { useModal } from "../../hooks/use-modal";
import PageTitle from "../../components/Shared/PageTitle";
import Button from "../../components/Shared/Button";
import CoachDetailProfileTab from "./DetailTabs/CoachDetailProfileTab";
import CoachDetailScheduleTab from "./DetailTabs/CoachDetailScheduleTab";
import CoachDetailQualificationsTab from "./DetailTabs/CoachDetailQualificationsTab";
import CoachDetailExperienceTab from "./DetailTabs/CoachDetailExperienceTab";
import CoachDetailMembersTab from "./DetailTabs/CoachDetailMembersTab";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const CoachesDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coach, setCoach] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const { toast } = useToast();
  const { showModal } = useModal();

  // 모바일 감지
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    // 실제 구현에서는 API 호출 등을 통해 데이터를 가져옴
    const foundCoach = coaches.find((c) => c.id === Number.parseInt(id));

    if (foundCoach) {
      // 담당 회원 정보 추가 (실제 구현에서는 API에서 가져올 것)
      const mockAssignedMembers = [
        {
          id: 1,
          name: "김민수",
          phone: "010-1234-5678",
          membershipType: "1년 정기권",
          assignedDate: "2023-01-15",
        },
        {
          id: 2,
          name: "이지연",
          phone: "010-2345-6789",
          membershipType: "6개월 정기권",
          assignedDate: "2023-03-10",
        },
      ];

      setCoach({
        ...foundCoach,
        assignedMembers: mockAssignedMembers,
      });
    } else {
      // 코치를 찾을 수 없는 경우 목록 페이지로 리다이렉트
      navigate("/coaches");
    }

    setLoading(false);
  }, [id, navigate]);

  const handleDelete = () => {
    showModal({
      title: "코치 삭제",
      message: `${coach.name} 코치를 삭제하시겠습니까?`,
      confirmText: "삭제",
      cancelText: "취소",
      confirmVariant: "danger",
      onConfirm: () => {
        // 실제 구현에서는 API 호출 등을 통해 데이터를 삭제
        console.log("삭제할 코치 ID:", coach.id);

        toast({
          title: "삭제 완료",
          description: `${coach.name} 코치가 삭제되었습니다.`,
          variant: "success",
        });

        // 삭제 후 목록 페이지로 이동
        navigate("/coaches");
      },
    });
  };

  // 모바일 메뉴 렌더링
  const renderMobileMenu = () => {
    return (
      <div className="relative">
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md"
        >
          <MoreVertical className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>

        {showMobileMenu && (
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
            <div className="py-1" role="menu" aria-orientation="vertical">
              <Link
                to="/coaches"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                onClick={() => setShowMobileMenu(false)}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                목록으로
              </Link>

              <Link
                to={`/coaches/edit/${coach.id}`}
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                onClick={() => setShowMobileMenu(false)}
              >
                <Edit className="h-4 w-4 mr-2" />
                수정
              </Link>

              <button
                onClick={() => {
                  handleDelete();
                  setShowMobileMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                삭제
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // 데스크톱 메뉴 렌더링
  const renderDesktopMenu = () => {
    return (
      <div className="flex items-center gap-3">
        <Link to="/coaches">
          <Button
            variant="light"
            size="sm"
            className="flex flex-col items-center px-5 py-2 min-w-20"
          >
            <ArrowLeft className="h-4 w-4 mb-1" />
            <span className="text-sm">목록</span>
          </Button>
        </Link>
        <Link to={`/coaches/edit/${coach.id}`}>
          <Button
            variant="primary"
            size="sm"
            className="flex flex-col items-center px-5 py-2 min-w-20"
          >
            <Edit className="h-4 w-4 mb-1" />
            <span className="text-sm">수정</span>
          </Button>
        </Link>
        <Button
          variant="danger"
          size="sm"
          className="flex flex-col items-center px-5 py-2 min-w-20"
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4 mb-1" />
          <span className="text-sm">삭제</span>
        </Button>
      </div>
    );
  };

  // 탭 네비게이션 렌더링
  const renderTabs = () => {
    const tabs = [
      { id: "profile", label: "기본 정보", icon: User },
      { id: "schedule", label: "근무 일정", icon: Calendar },
      { id: "qualifications", label: "자격 및 학위", icon: Award },
      { id: "experience", label: "경력 사항", icon: Briefcase },
      { id: "members", label: "담당 회원", icon: Users },
    ];

    return (
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="flex space-x-8 overflow-x-auto" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      {/* 헤더 */}
      <div className="flex items-center mb-6">
        <div className="flex-1">
          <PageTitle
            title={`${coach.name} 코치 상세`}
            subtitle="코치의 상세 정보와 경력, 자격증을 확인할 수 있습니다."
            icon={FaUserTie}
          />
        </div>
        <div>{isMobile ? renderMobileMenu() : renderDesktopMenu()}</div>
      </div>

      {/* 탭 네비게이션 */}
      {renderTabs()}

      {/* 탭 컨텐츠 */}
      {activeTab === "profile" && <CoachDetailProfileTab coach={coach} />}
      {activeTab === "schedule" && <CoachDetailScheduleTab coach={coach} />}
      {activeTab === "qualifications" && (
        <CoachDetailQualificationsTab coach={coach} />
      )}
      {activeTab === "experience" && <CoachDetailExperienceTab coach={coach} />}
      {activeTab === "members" && <CoachDetailMembersTab coach={coach} />}
    </div>
  );
};

export default CoachesDetail;
