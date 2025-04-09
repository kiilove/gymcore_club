"use client";

import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid, List, Trash2, Plus, Filter, MoreVertical } from "lucide-react";
import PageTitle from "../../components/Shared/PageTitle";
import Button from "../../components/Shared/Button";
import MembersFilter from "../../components/Members/MembersFilter";
import MembersTable from "../../components/Members/MembersTable";
import MembersGrid from "../../components/Members/MembersGrid";
import { filterMembers, sortMembers } from "../../utils/memberUtils";
import { useToast } from "../../hooks/use-toast";
import { useModal } from "../../hooks/use-modal";
import { FaUsers } from "react-icons/fa";

// Firebase 관련 커스텀 훅 (개선된 useFirestore 사용)
import { useFirestore } from "../../hooks/useFirestore";
import { useBatchOperations } from "../../hooks/useBatchOperations";

const Members = () => {
  const [filters, setFilters] = useState({
    name: "",
    status: "",
    membershipType: "",
  });
  const [sortConfig, setSortConfig] = useState({
    sortBy: "name",
    sortOrder: "asc",
  });
  const [viewMode, setViewMode] = useState("table");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const mobileMenuRef = useRef(null);
  // 필터링 및 정렬된 회원 목록 상태
  const [filteredMembers, setFilteredMembers] = useState([]);

  const { toast } = useToast();
  const { showModal } = useModal();
  const navigate = useNavigate();

  // Firebase hooks
  const {
    documents: firebaseMembers,
    error,
    isLoading,
    subscribeToCollection,
    deleteDocument,
  } = useFirestore("members");

  const { batchDeleteDocuments, isLoading: isBatchLoading } =
    useBatchOperations();

  // 모바일 화면 감지 및 화면 크기 변경 처리
  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile && viewMode !== "grid") {
        setViewMode("grid");
      }
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, [viewMode]);

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

  // Firestore 실시간 구독 설정 (개선된 subscribeToCollection 사용)
  useEffect(() => {
    const conditions = [];
    if (filters.name) {
      conditions.push(["name", ">=", filters.name]);
      conditions.push(["name", "<=", filters.name + "\uf8ff"]);
    }
    if (filters.status) {
      conditions.push(["status", "==", filters.status]);
    }
    if (filters.membershipType) {
      conditions.push(["membershipType", "==", filters.membershipType]);
    }

    const orderByField = [sortConfig.sortBy, sortConfig.sortOrder];
    const unsubscribe = subscribeToCollection(conditions, orderByField);

    return () => unsubscribe();
  }, [filters, sortConfig, subscribeToCollection]);

  // 필터링 및 정렬 적용: Firestore에서 받은 데이터를 기반으로 필터 및 정렬 처리
  useEffect(() => {
    if (!firebaseMembers) return;
    let result = [...firebaseMembers];
    if (filters.name || filters.status || filters.membershipType) {
      result = filterMembers(result, filters);
    }
    result = sortMembers(result, sortConfig.sortBy, sortConfig.sortOrder);
    setFilteredMembers(result);
  }, [firebaseMembers, filters, sortConfig]);

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSort = (sortBy) => {
    setSortConfig((prevConfig) => ({
      sortBy,
      sortOrder:
        prevConfig.sortBy === sortBy && prevConfig.sortOrder === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const handleSelectItems = (items) => {
    setSelectedMembers(items);
  };

  const handleDeleteSelected = () => {
    if (selectedMembers.length === 0) return;

    showModal({
      title: "회원 삭제",
      message: `선택한 ${selectedMembers.length}명의 회원을 삭제하시겠습니까?`,
      confirmText: "삭제",
      cancelText: "취소",
      onConfirm: async () => {
        try {
          await batchDeleteDocuments("members", selectedMembers);
          setSelectedMembers([]);
          toast({
            title: "삭제 완료",
            description: `${selectedMembers.length}명의 회원이 삭제되었습니다.`,
            variant: "success",
          });
        } catch (error) {
          toast({
            title: "삭제 실패",
            description: error.message,
            variant: "error",
          });
        }
      },
    });
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
                  setViewMode(viewMode === "table" ? "grid" : "table");
                  setShowMobileMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
              >
                {viewMode === "table" ? (
                  <>
                    <Grid className="h-4 w-4 mr-2" />
                    그리드 보기
                  </>
                ) : (
                  <>
                    <List className="h-4 w-4 mr-2" />
                    테이블 보기
                  </>
                )}
              </button>

              {selectedMembers.length > 0 && (
                <button
                  onClick={() => {
                    handleDeleteSelected();
                    setShowMobileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                  disabled={isBatchLoading}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {selectedMembers.length}명 삭제
                </button>
              )}

              <Link
                to="/members/add"
                className="block px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                onClick={() => setShowMobileMenu(false)}
              >
                <Plus className="h-4 w-4 mr-2" />
                회원 등록
              </Link>
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
        <div className="flex items-center bg-white dark:bg-gray-800 rounded-md shadow p-1">
          <button
            className={`p-1.5 rounded flex items-center justify-center ${
              viewMode === "table"
                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                : "text-gray-500 dark:text-gray-400"
            }`}
            onClick={() => setViewMode("table")}
            aria-label="테이블 보기"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            className={`p-1.5 rounded flex items-center justify-center ${
              viewMode === "grid"
                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                : "text-gray-500 dark:text-gray-400"
            }`}
            onClick={() => setViewMode("grid")}
            aria-label="그리드 보기"
          >
            <Grid className="h-4 w-4" />
          </button>
        </div>
        {selectedMembers.length > 0 && (
          <Button
            variant="danger"
            size="sm"
            onClick={handleDeleteSelected}
            className="flex items-center gap-1"
            disabled={isBatchLoading}
          >
            <Trash2 className="h-4 w-4" />
            {selectedMembers.length}명 삭제
          </Button>
        )}
        <Link to="/members/add">
          <Button
            variant="primary"
            size="sm"
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            회원 등록
          </Button>
        </Link>
      </div>
    );
  };

  // 필터/정렬 결과가 적용된 회원 목록을 렌더링 데이터로 사용
  const membersToDisplay = firebaseMembers ? filteredMembers : [];

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle
          title="회원 관리"
          subtitle="회원 목록을 조회하고 관리할 수 있습니다."
          icon={FaUsers}
        />
        {isMobile ? renderMobileMenu() : renderDesktopMenu()}
      </div>

      {showFilter && <MembersFilter onFilter={handleFilter} />}

      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md overflow-hidden mt-6 py-4">
        {isLoading ? (
          <div className="text-center py-10">데이터를 불러오는 중...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">
            오류가 발생했습니다: {error}
          </div>
        ) : viewMode === "table" ? (
          <MembersTable
            members={membersToDisplay}
            onSort={handleSort}
            sortConfig={sortConfig}
            onSelectItems={handleSelectItems}
          />
        ) : (
          <MembersGrid
            members={membersToDisplay}
            onSelectItems={handleSelectItems}
          />
        )}
      </div>
    </div>
  );
};

export default Members;
