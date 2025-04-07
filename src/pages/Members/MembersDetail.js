"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  Trash2,
  MoreVertical,
  User,
  Activity,
  CreditCard,
  MessageSquare,
} from "lucide-react";
import PageTitle from "../../components/Shared/PageTitle";
import Button from "../../components/Shared/Button";
import { members } from "../../datas/mockData";
import { useToast } from "../../hooks/use-toast";
import { useModal } from "../../hooks/use-modal";
import { FaUsers } from "react-icons/fa";

// 탭 컴포넌트 가져오기
import MemberProfileTab from "./DetailTabs/MemberProfileTab";
import MemberBodyInfoTab from "./DetailTabs/MemberBodyInfoTab";
import MemberConsultationTab from "./DetailTabs/MemberConsultationTab";
import MemberPaymentTab from "./DetailTabs/MemberPaymentTab";

const MembersDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("profile"); // 활성화된 탭 상태 추가

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
    const foundMember = members.find((m) => m.id === Number.parseInt(id));

    if (foundMember) {
      setMember(foundMember);
    } else {
      // 회원을 찾을 수 없는 경우 목록 페이지로 리다이렉트
      navigate("/members");
    }

    setLoading(false);
  }, [id, navigate]);

  const handleDelete = () => {
    showModal({
      title: "회원 삭제",
      message: `${member.name} 회원을 삭제하시겠습니까?`,
      confirmText: "삭제",
      cancelText: "취소",
      onConfirm: () => {
        // 실제 구현에서는 API 호출 등을 통해 데이터를 삭제
        console.log("삭제할 회원 ID:", member.id);

        toast({
          title: "삭제 완료",
          description: `${member.name} 회원이 삭제되었습니다.`,
          variant: "success",
        });

        // 삭제 후 목록 페이지로 이동
        navigate("/members");
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
                to="/members"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                onClick={() => setShowMobileMenu(false)}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                목록으로
              </Link>

              <Link
                to={`/members/edit/${member.id}`}
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
        <Link to="/members">
          <Button
            variant="light"
            size="sm"
            className="flex flex-col items-center px-5 py-2 min-w-20"
          >
            <ArrowLeft className="h-4 w-4 mb-1" />
            <span className="text-sm">목록</span>
          </Button>
        </Link>
        <Link to={`/members/edit/${member.id}`}>
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
      { id: "profile", label: "프로필", icon: User },
      { id: "body", label: "신체 정보", icon: Activity },
      { id: "payment", label: "결제 내역", icon: CreditCard },
      { id: "consultation", label: "상담 기록", icon: MessageSquare },
    ];

    return (
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-base whitespace-nowrap flex items-center ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <tab.icon className="h-5 w-5 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    );
  };

  // 활성화된 탭에 따라 컴포넌트 렌더링
  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <MemberProfileTab member={member} />;
      case "body":
        return <MemberBodyInfoTab member={member} setMember={setMember} />;
      case "payment":
        return <MemberPaymentTab member={member} setMember={setMember} />;
      case "consultation":
        return <MemberConsultationTab member={member} setMember={setMember} />;
      default:
        return <MemberProfileTab member={member} />;
    }
  };

  if (loading) {
    return <div className="text-center py-10">로딩 중...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          <PageTitle
            title={`${member.name} 회원 상세`}
            subtitle="회원의 상세 정보와 신체 변화, 결제 내역, 상담 기록을 확인할 수 있습니다."
            icon={FaUsers}
          />
        </div>
        <div>{isMobile ? renderMobileMenu() : renderDesktopMenu()}</div>
      </div>

      {renderTabs()}
      {renderActiveTabContent()}
    </div>
  );
};

export default MembersDetail;
