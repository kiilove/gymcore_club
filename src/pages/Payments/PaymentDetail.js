"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Printer,
  Download,
  CreditCard,
  Clock,
  LinkIcon,
} from "lucide-react";
import PageTitle from "../../components/Shared/PageTitle";
import Button from "../../components/Shared/Button";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { useToast } from "../../hooks/use-toast";
import { useModal } from "../../hooks/use-modal";
import { FaFileInvoiceDollar } from "react-icons/fa";

// 탭 컴포넌트 임포트 - 같은 디렉토리의 DetailTabs 폴더에서 가져옴
import PaymentInfoTab from "./DetailTabs/PaymentInfoTab";
import PaymentHistoryTab from "./DetailTabs/PaymentHistoryTab";
import PaymentRelatedTab from "./DetailTabs/PaymentRelatedTab";

const PaymentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { showModal } = useModal();

  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("info");

  // 결제 정보 가져오기
  useEffect(() => {
    const fetchPayment = async () => {
      try {
        // 실제 API 호출로 대체 필요
        setTimeout(() => {
          // 임시 데이터
          const mockPayment = {
            id,
            paymentId: `PAY-${id}`,
            memberId: "M001",
            memberName: "김회원",
            productId: "P001",
            productName: "3개월 회원권",
            amount: 300000,
            paymentMethod: "신용카드",
            cardInfo: {
              cardCompany: "신한카드",
              cardNumber: "1234-56**-****-7890",
              installment: "일시불",
            },
            status: "완료",
            createdAt: new Date().toISOString(),
            completedAt: new Date().toISOString(),
            history: [
              {
                id: 1,
                type: "생성",
                status: "대기",
                timestamp: new Date(Date.now() - 3600000).toISOString(),
                description: "결제가 생성되었습니다.",
              },
              {
                id: 2,
                type: "처리",
                status: "진행중",
                timestamp: new Date(Date.now() - 1800000).toISOString(),
                description: "결제가 처리 중입니다.",
              },
              {
                id: 3,
                type: "완료",
                status: "완료",
                timestamp: new Date().toISOString(),
                description: "결제가 완료되었습니다.",
              },
            ],
            relatedPayments: [
              {
                id: "PAY-123",
                amount: 300000,
                status: "완료",
                createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
              },
              {
                id: "PAY-456",
                amount: 150000,
                status: "완료",
                createdAt: new Date(Date.now() - 86400000 * 60).toISOString(),
              },
            ],
          };

          setPayment(mockPayment);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("결제 정보를 가져오는 중 오류 발생:", error);
        toast({
          title: "오류 발생",
          description: "결제 정보를 가져오는 중 오류가 발생했습니다.",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchPayment();
  }, [id, toast]);

  // 결제 삭제 처리
  const handleDelete = () => {
    showModal({
      title: "결제 삭제",
      message: "이 결제 정보를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.",
      confirmText: "삭제",
      cancelText: "취소",
      confirmVariant: "danger",
      onConfirm: async () => {
        try {
          // 실제 API 호출로 대체 필요
          setTimeout(() => {
            toast({
              title: "삭제 완료",
              description: "결제 정보가 삭제되었습니다.",
              variant: "success",
            });
            navigate("/payments");
          }, 500);
        } catch (error) {
          console.error("결제 삭제 중 오류 발생:", error);
          toast({
            title: "오류 발생",
            description: "결제 삭제 중 오류가 발생했습니다.",
            variant: "destructive",
          });
        }
      },
    });
  };

  // 영수증 인쇄
  const handlePrint = () => {
    toast({
      title: "준비 중",
      description: "영수증 인쇄 기능은 준비 중입니다.",
      variant: "info",
    });
    // 실제 인쇄 기능 구현 필요
  };

  // 영수증 다운로드
  const handleDownload = () => {
    toast({
      title: "준비 중",
      description: "영수증 다운로드 기능은 준비 중입니다.",
      variant: "info",
    });
    // 실제 다운로드 기능 구현 필요
  };

  // 탭 네비게이션 렌더링
  const renderTabs = () => {
    const tabs = [
      { id: "info", label: "결제 정보", icon: CreditCard },
      { id: "history", label: "결제 내역", icon: Clock },
      { id: "related", label: "관련 정보", icon: LinkIcon },
    ];

    return (
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="flex space-x-8 overflow-x-auto" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-base whitespace-nowrap flex items-center ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
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

  // renderActiveTabContent 함수 추가
  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "info":
        return <PaymentInfoTab payment={payment} />;
      case "history":
        return <PaymentHistoryTab history={payment?.history} />;
      case "related":
        return <PaymentRelatedTab payment={payment} />;
      default:
        return <PaymentInfoTab payment={payment} />;
    }
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
      <div className="flex items-center mb-6">
        <div className="flex-1">
          <PageTitle
            title="결제 상세"
            subtitle={`결제 ID: ${payment?.paymentId}`}
            icon={FaFileInvoiceDollar}
          />
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="light"
            size="sm"
            className="flex flex-col items-center px-5 py-2 min-w-20"
            onClick={() => navigate("/payments")}
          >
            <ArrowLeft className="h-4 w-4 mb-1" />
            <span className="text-sm">목록</span>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="flex flex-col items-center px-5 py-2 min-w-20"
            onClick={handlePrint}
          >
            <Printer className="h-4 w-4 mb-1" />
            <span className="text-sm">인쇄</span>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="flex flex-col items-center px-5 py-2 min-w-20"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4 mb-1" />
            <span className="text-sm">다운로드</span>
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="flex flex-col items-center px-5 py-2 min-w-20"
            onClick={() => navigate(`/payments/edit/${id}`)}
          >
            <Edit className="h-4 w-4 mb-1" />
            <span className="text-sm">수정</span>
          </Button>
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
      </div>

      {/* 탭 네비게이션 */}
      {renderTabs()}
      {renderActiveTabContent()}
    </div>
  );
};

export default PaymentDetail;
