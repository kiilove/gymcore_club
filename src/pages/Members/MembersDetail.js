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
import { useFirestore } from "../../hooks/useFirestore";
import { useToast } from "../../hooks/use-toast";
import { useModal } from "../../hooks/use-modal";
import { FaUsers } from "react-icons/fa";

// 탭 컴포넌트들
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
  const [activeTab, setActiveTab] = useState("profile");
  const [hasFetched, setHasFetched] = useState(false);

  const { toast } = useToast();
  const { showModal } = useModal();
  const {
    getDocument,
    error,
    isLoading: firestoreLoading,
  } = useFirestore("members");

  // 실시간 구독 대신 단일 문서 조회로 변경
  useEffect(() => {
    if (!id) return;

    const fetchMemberData = async () => {
      try {
        console.log(`MembersDetail: ${id} 문서 조회 시작`);
        const memberData = await getDocument(id);
        if (memberData) {
          setMember(memberData);
          console.log(`MembersDetail: ${id} 문서 조회 성공`);
        } else {
          console.warn(`MembersDetail: ${id} 문서가 존재하지 않습니다`);
        }
        setHasFetched(true);
        setLoading(false);
      } catch (err) {
        console.error(`MembersDetail: ${id} 문서 조회 실패`, err);
        setHasFetched(true);
        setLoading(false);
      }
    };

    fetchMemberData();
  }, [id, getDocument]);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    if (error) {
      toast({
        title: "회원 정보 불러오기 실패",
        description: error,
        variant: "error",
      });
    }
  }, [error, toast]);

  useEffect(() => {
    if (hasFetched && !member) {
      console.warn(
        "hasFetched true, but member is null. 정보를 가져오지 못했습니다."
      );
    }
  }, [hasFetched, member]);

  const handleDelete = () => {
    showModal({
      title: "회원 삭제",
      message: `${member.name} 회원을 삭제하시겠습니까?`,
      confirmText: "삭제",
      cancelText: "취소",
      onConfirm: () => {
        toast({
          title: "삭제 완료",
          description: `${member.name} 회원이 삭제되었습니다.`,
          variant: "success",
        });
        navigate("/members");
      },
    });
  };

  const renderMobileMenu = () => (
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
              to={`/members/edit/${member?.id}`}
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

  const renderDesktopMenu = () => (
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
      <Link to={`/members/edit/${member?.id}`}>
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

  if (!member) {
    return (
      <div className="text-center py-10">회원 정보를 가져오지 못했습니다.</div>
    );
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
