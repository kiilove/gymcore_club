"use client";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Trash2,
  Plus,
  Filter,
  MoreVertical,
  Download,
  Printer,
} from "lucide-react";
import PageTitle from "../../components/Shared/PageTitle";
import Button from "../../components/Shared/Button";
import PaymentsTable from "../../components/Payments/PaymentsTable";
import PaymentsFilter from "../../components/Payments/PaymentsFilter";
import { useToast } from "../../hooks/use-toast";
import { useModal } from "../../hooks/use-modal";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { formatCurrency } from "../../utils/dateUtils";
import { filterPayments, sortPayments } from "../../utils/paymentUtils";
import { FaFileInvoiceDollar } from "react-icons/fa";

const Payments = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { showModal } = useModal();
  const mobileMenuRef = useRef(null);

  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [selectedPayments, setSelectedPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    failed: 0,
    refunded: 0,
    totalAmount: 0,
    thisMonth: 0,
    lastMonth: 0,
  });

  const [filters, setFilters] = useState({
    status: "all",
    paymentMethod: "all",
    dateRange: "all",
    search: "",
    startDate: "",
    endDate: "",
    minAmount: "",
    maxAmount: "",
  });

  const [sortConfig, setSortConfig] = useState({
    sortBy: "date",
    sortOrder: "desc",
  });

  // 모바일 감지 및 화면 크기 변경 감지
  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    // 초기 로드 시 체크
    checkIsMobile();

    // 화면 크기 변경 시 체크
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // 모바일 메뉴 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 결제 데이터 가져오기
  useEffect(() => {
    const fetchPayments = async () => {
      setIsLoading(true);
      try {
        // 실제 API 호출로 대체 필요
        setTimeout(() => {
          // 임시 데이터
          const mockPayments = [
            {
              id: 1,
              paymentId: "PAY-001",
              memberId: "M001",
              memberName: "김회원",
              productId: "P001",
              productName: "3개월 회원권",
              amount: 300000,
              paymentMethod: "card",
              status: "completed",
              date: new Date().toISOString(),
              cardInfo: {
                cardCompany: "신한카드",
                cardNumber: "1234-56**-****-7890",
                installment: "일시불",
              },
            },
            {
              id: 2,
              paymentId: "PAY-002",
              memberId: "M002",
              memberName: "이회원",
              productId: "P002",
              productName: "PT 10회",
              amount: 500000,
              paymentMethod: "cash",
              status: "completed",
              date: new Date(Date.now() - 86400000).toISOString(),
            },
            {
              id: 3,
              paymentId: "PAY-003",
              memberId: "M003",
              memberName: "박회원",
              productId: "P003",
              productName: "1개월 회원권",
              amount: 100000,
              paymentMethod: "transfer",
              status: "pending",
              date: new Date(Date.now() - 86400000 * 2).toISOString(),
            },
            {
              id: 4,
              paymentId: "PAY-004",
              memberId: "M004",
              memberName: "최회원",
              productId: "P004",
              productName: "PT 5회",
              amount: 250000,
              paymentMethod: "card",
              status: "failed",
              date: new Date(Date.now() - 86400000 * 3).toISOString(),
              cardInfo: {
                cardCompany: "KB국민카드",
                cardNumber: "9876-54**-****-3210",
                installment: "일시불",
              },
            },
            {
              id: 5,
              paymentId: "PAY-005",
              memberId: "M001",
              memberName: "김회원",
              productId: "P005",
              productName: "PT 1회",
              amount: 50000,
              paymentMethod: "card",
              status: "refunded",
              date: new Date(Date.now() - 86400000 * 5).toISOString(),
              cardInfo: {
                cardCompany: "신한카드",
                cardNumber: "1234-56**-****-7890",
                installment: "일시불",
              },
            },
          ];

          setPayments(mockPayments);

          // 필터링 및 정렬 적용
          let filtered = filterPayments(mockPayments, filters);
          filtered = sortPayments(
            filtered,
            sortConfig.sortBy,
            sortConfig.sortOrder
          );
          setFilteredPayments(filtered);

          // 통계 계산
          const total = mockPayments.length;
          const completed = mockPayments.filter(
            (p) => p.status === "completed"
          ).length;
          const pending = mockPayments.filter(
            (p) => p.status === "pending"
          ).length;
          const failed = mockPayments.filter(
            (p) => p.status === "failed"
          ).length;
          const refunded = mockPayments.filter(
            (p) => p.status === "refunded"
          ).length;

          const totalAmount = mockPayments.reduce(
            (sum, p) => sum + p.amount,
            0
          );

          const now = new Date();
          const thisMonth = mockPayments
            .filter((p) => {
              const paymentDate = new Date(p.date);
              return (
                paymentDate.getMonth() === now.getMonth() &&
                paymentDate.getFullYear() === now.getFullYear() &&
                p.status === "completed"
              );
            })
            .reduce((sum, p) => sum + p.amount, 0);

          const lastMonth = mockPayments
            .filter((p) => {
              const paymentDate = new Date(p.date);
              const lastMonthDate = new Date();
              lastMonthDate.setMonth(now.getMonth() - 1);
              return (
                paymentDate.getMonth() === lastMonthDate.getMonth() &&
                paymentDate.getFullYear() === lastMonthDate.getFullYear() &&
                p.status === "completed"
              );
            })
            .reduce((sum, p) => sum + p.amount, 0);

          setStats({
            total,
            completed,
            pending,
            failed,
            refunded,
            totalAmount,
            thisMonth,
            lastMonth,
          });

          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error("결제 데이터를 가져오는 중 오류 발생:", error);
        toast({
          title: "오류 발생",
          description: "결제 데이터를 가져오는 중 오류가 발생했습니다.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, [toast]);

  // 필터 및 정렬 변경 시 데이터 업데이트
  useEffect(() => {
    if (!payments.length) return;

    let filtered = filterPayments(payments, filters);
    filtered = sortPayments(filtered, sortConfig.sortBy, sortConfig.sortOrder);
    setFilteredPayments(filtered);
  }, [payments, filters, sortConfig]);

  // 필터 변경 처리
  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // 결제 추가 페이지로 이동
  const handleAddPayment = () => {
    navigate("/payments/add");
  };

  // 결제 상세 페이지로 이동
  const handleViewPayment = (paymentId) => {
    navigate(`/payments/detail/${paymentId}`);
  };

  // 결제 삭제 처리
  const handleDeletePayment = (paymentId) => {
    showModal({
      title: "결제 삭제",
      message: "이 결제 정보를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.",
      confirmText: "삭제",
      cancelText: "취소",
      confirmVariant: "danger",
      onConfirm: () => {
        // 실제 API 호출로 대체 필요
        const updatedPayments = payments.filter((p) => p.id !== paymentId);
        setPayments(updatedPayments);
        toast({
          title: "삭제 완료",
          description: "결제 정보가 삭제되었습니다.",
          variant: "success",
        });
      },
    });
  };

  // 결제 상태 변경 처리
  const handleStatusChange = (paymentId, newStatus) => {
    // 실제 API 호출로 대체 필요
    const updatedPayments = payments.map((p) => {
      if (p.id === paymentId) {
        return { ...p, status: newStatus };
      }
      return p;
    });

    setPayments(updatedPayments);
    toast({
      title: "상태 변경",
      description: `결제 상태가 ${newStatus}(으)로 변경되었습니다.`,
      variant: "success",
    });
  };

  // 선택된 결제 처리
  const handleSelectPayment = (paymentId, isSelected) => {
    if (isSelected) {
      setSelectedPayments((prev) => [...prev, paymentId]);
    } else {
      setSelectedPayments((prev) => prev.filter((id) => id !== paymentId));
    }
  };

  // 모든 결제 선택/해제
  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedPayments(filteredPayments.map((p) => p.id));
    } else {
      setSelectedPayments([]);
    }
  };

  // 선택된 결제 삭제
  const handleDeleteSelected = () => {
    if (selectedPayments.length === 0) {
      toast({
        title: "선택 필요",
        description: "삭제할 결제를 선택해주세요.",
        variant: "warning",
      });
      return;
    }

    showModal({
      title: "결제 일괄 삭제",
      message: `선택한 ${selectedPayments.length}개의 결제 정보를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`,
      confirmText: "삭제",
      cancelText: "취소",
      confirmVariant: "danger",
      onConfirm: () => {
        // 실제 API 호출로 대체 필요
        const updatedPayments = payments.filter(
          (p) => !selectedPayments.includes(p.id)
        );
        setPayments(updatedPayments);
        setSelectedPayments([]);
        toast({
          title: "삭제 완료",
          description: `${selectedPayments.length}개의 결제 정보가 삭제되었습니다.`,
          variant: "success",
        });
      },
    });
  };

  // 엑셀 다운로드
  const handleExportExcel = () => {
    toast({
      title: "준비 중",
      description: "엑셀 다운로드 기능은 준비 중입니다.",
      variant: "info",
    });
  };

  // 영수증 일괄 인쇄
  const handleBatchPrint = () => {
    if (selectedPayments.length === 0) {
      toast({
        title: "선택 필요",
        description: "인쇄할 결제를 선택해주세요.",
        variant: "warning",
      });
      return;
    }

    toast({
      title: "준비 중",
      description: "영수증 일괄 인쇄 기능은 준비 중입니다.",
      variant: "info",
    });
  };

  // 정렬 처리
  const handleSort = (sortBy) => {
    setSortConfig((prevConfig) => ({
      sortBy,
      sortOrder:
        prevConfig.sortBy === sortBy && prevConfig.sortOrder === "asc"
          ? "desc"
          : "asc",
    }));
  };

  // 모바일 메뉴 렌더링
  const renderMobileMenu = () => {
    return (
      <div className="relative" ref={mobileMenuRef}>
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md"
        >
          <MoreVertical className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>

        {showMobileMenu && (
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
            <div className="py-1" role="menu" aria-orientation="vertical">
              <button
                onClick={() => {
                  setShowFilter(!showFilter);
                  setShowMobileMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
              >
                <Filter className="h-4 w-4 mr-2" />
                필터
              </button>

              <button
                onClick={() => {
                  handleExportExcel();
                  setShowMobileMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                엑셀 다운로드
              </button>

              {selectedPayments.length > 0 && (
                <>
                  <button
                    onClick={() => {
                      handleBatchPrint();
                      setShowMobileMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    영수증 인쇄
                  </button>
                  <button
                    onClick={() => {
                      handleDeleteSelected();
                      setShowMobileMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    {selectedPayments.length}개 삭제
                  </button>
                </>
              )}

              <button
                onClick={() => {
                  handleAddPayment();
                  setShowMobileMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                결제 추가
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
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setShowFilter(!showFilter)}
          className="flex items-center gap-1"
        >
          <Filter className="h-4 w-4" />
          필터
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleExportExcel}
          className="flex items-center gap-1"
        >
          <Download className="h-4 w-4" />
          엑셀 다운로드
        </Button>
        {selectedPayments.length > 0 && (
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleBatchPrint}
              className="flex items-center gap-1"
            >
              <Printer className="h-4 w-4" />
              영수증 인쇄
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleDeleteSelected}
              className="flex items-center gap-1"
            >
              <Trash2 className="h-4 w-4" />
              {selectedPayments.length}개 삭제
            </Button>
          </>
        )}
        <Button
          variant="primary"
          size="sm"
          onClick={handleAddPayment}
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" />
          결제 추가
        </Button>
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <PageTitle
          title="결제 관리"
          subtitle="회원 결제 내역을 관리하세요"
          icon={FaFileInvoiceDollar}
        />
        {isMobile ? renderMobileMenu() : renderDesktopMenu()}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            총 결제 건수
          </div>
          <div className="text-2xl font-bold mt-1 text-gray-800 dark:text-white">
            {stats.total}건
          </div>
          <div className="mt-2 text-sm">
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              완료: {stats.completed}건
            </span>
            <span className="text-amber-600 dark:text-amber-400 font-medium ml-2">
              대기: {stats.pending}건
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            총 결제 금액
          </div>
          <div className="text-2xl font-bold mt-1 text-gray-800 dark:text-white">
            {formatCurrency(stats.totalAmount)}
          </div>
          <div className="mt-2 text-sm">
            <span className="text-gray-600 dark:text-gray-300">
              완료 결제 기준
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            이번 달 매출
          </div>
          <div className="text-2xl font-bold mt-1 text-gray-800 dark:text-white">
            {formatCurrency(stats.thisMonth)}
          </div>
          <div className="mt-2 text-sm">
            {stats.lastMonth > 0 && (
              <span
                className={`font-medium ${
                  stats.thisMonth >= stats.lastMonth
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-rose-600 dark:text-rose-400"
                }`}
              >
                {stats.thisMonth >= stats.lastMonth ? "↑" : "↓"} 전월 대비{" "}
                {Math.abs(
                  Math.round(
                    ((stats.thisMonth - stats.lastMonth) / stats.lastMonth) *
                      100
                  )
                )}
                %
              </span>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            결제 상태
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex flex-col items-center">
              <div className="text-emerald-600 dark:text-emerald-400 font-bold">
                {stats.completed}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                완료
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-amber-600 dark:text-amber-400 font-bold">
                {stats.pending}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                대기
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-rose-600 dark:text-rose-400 font-bold">
                {stats.failed}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                실패
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-gray-600 dark:text-gray-400 font-bold">
                {stats.refunded}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                환불
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        {showFilter && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-6">
            <PaymentsFilter
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>
        )}

        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md overflow-hidden mt-6 py-4">
          <div className="mb-4 flex justify-between items-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {selectedPayments.length > 0 ? (
                <span>{selectedPayments.length}개 항목 선택됨</span>
              ) : (
                <span>항목을 선택하여 일괄 작업을 수행할 수 있습니다.</span>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <PaymentsTable
              payments={filteredPayments}
              selectedPayments={selectedPayments}
              onSelectPayment={handleSelectPayment}
              onSelectAll={handleSelectAll}
              onView={handleViewPayment}
              onDelete={handleDeletePayment}
              onStatusChange={handleStatusChange}
              onSort={handleSort}
              sortConfig={sortConfig}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Payments;
