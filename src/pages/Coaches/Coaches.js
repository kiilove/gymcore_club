"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Grid, List, Trash2, Plus, Filter, MoreVertical } from "lucide-react";
import PageTitle from "../../components/Shared/PageTitle";
import Button from "../../components/Shared/Button";
import CoachesFilter from "../../components/Coaches/CoachesFilter";
import CoachesTable from "../../components/Coaches/CoachesTable";
import CoachesGrid from "../../components/Coaches/CoachesGrid";
import { coaches } from "../../datas/mockData";
import { filterCoaches, sortCoaches } from "../../utils/coachUtils";
import { useToast } from "../../hooks/use-toast";
import { useModal } from "../../hooks/use-modal";
import { FaUserTie } from "react-icons/fa";

const Coaches = () => {
  const [filteredCoaches, setFilteredCoaches] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    status: "",
    specialty: "",
  });
  const [sortConfig, setSortConfig] = useState({
    sortBy: "name",
    sortOrder: "asc",
  });
  const [viewMode, setViewMode] = useState("table");
  const [selectedCoaches, setSelectedCoaches] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const mobileMenuRef = useRef(null);

  const { toast } = useToast();
  const { showModal } = useModal();

  // 모바일 감지 및 화면 크기 변경 감지
  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      // 모바일에서는 자동으로 그리드 뷰로 설정
      if (mobile && viewMode !== "grid") {
        setViewMode("grid");
      }
    };

    // 초기 로드 시 체크
    checkIsMobile();

    // 화면 크기 변경 시 체크
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

  useEffect(() => {
    let result = filterCoaches(coaches, filters);
    result = sortCoaches(result, sortConfig.sortBy, sortConfig.sortOrder);
    setFilteredCoaches(result);
  }, [filters, sortConfig]);

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
    setSelectedCoaches(items);
  };

  const handleDeleteSelected = () => {
    if (selectedCoaches.length === 0) return;

    showModal({
      title: "코치 삭제",
      message: `선택한 ${selectedCoaches.length}명의 코치를 삭제하시겠습니까?`,
      confirmText: "삭제",
      cancelText: "취소",
      confirmVariant: "danger",
      onConfirm: () => {
        // 실제 구현에서는 API 호출 등을 통해 데이터를 삭제
        console.log("삭제할 코치 ID:", selectedCoaches);

        // 삭제 후 목록 업데이트 (실제 구현에서는 API 응답 후 처리)
        const updatedCoaches = filteredCoaches.filter(
          (coach) => !selectedCoaches.includes(coach.id)
        );
        setFilteredCoaches(updatedCoaches);
        setSelectedCoaches([]);

        toast({
          title: "삭제 완료",
          description: `${selectedCoaches.length}명의 코치가 삭제되었습니다.`,
          variant: "success",
        });
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

              {selectedCoaches.length > 0 && (
                <button
                  onClick={() => {
                    handleDeleteSelected();
                    setShowMobileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {selectedCoaches.length}명 삭제
                </button>
              )}

              <Link
                to="/coaches/add"
                className="block px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                onClick={() => setShowMobileMenu(false)}
              >
                <Plus className="h-4 w-4 mr-2" />
                코치 등록
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
        {selectedCoaches.length > 0 && (
          <Button
            variant="danger"
            size="sm"
            onClick={handleDeleteSelected}
            className="flex items-center gap-1"
          >
            <Trash2 className="h-4 w-4" />
            {selectedCoaches.length}명 삭제
          </Button>
        )}
        <Link to="/coaches/add">
          <Button
            variant="primary"
            size="sm"
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            코치 등록
          </Button>
        </Link>
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <PageTitle
          title="코치 관리"
          subtitle="코치 목록을 조회하고 관리할 수 있습니다."
          icon={FaUserTie}
        />
        {isMobile ? renderMobileMenu() : renderDesktopMenu()}
      </div>

      <div className="w-full">
        {showFilter && <CoachesFilter onFilter={handleFilter} />}

        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md overflow-hidden mt-6 py-4">
          {viewMode === "table" ? (
            <CoachesTable
              coaches={filteredCoaches}
              onSort={handleSort}
              sortConfig={sortConfig}
              onSelectItems={handleSelectItems}
            />
          ) : (
            <CoachesGrid
              coaches={filteredCoaches}
              onSelectItems={handleSelectItems}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Coaches;
