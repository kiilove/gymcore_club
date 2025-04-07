"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Grid, List, Trash2, Plus, Filter, MoreVertical } from "lucide-react";
import PageTitle from "../../components/Shared/PageTitle";
import Button from "../../components/Shared/Button";
import MembersFilter from "../../components/Members/MembersFilter";
import MembersTable from "../../components/Members/MembersTable";
import MembersGrid from "../../components/Members/MembersGrid";
import { members } from "../../datas/mockData";
import { filterMembers, sortMembers } from "../../utils/memberUtils";
import { useToast } from "../../hooks/use-toast";
import { useModal } from "../../hooks/use-modal";
import { FaUsers } from "react-icons/fa";

const Members = () => {
  const [filteredMembers, setFilteredMembers] = useState([]);
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
    let result = filterMembers(members, filters);
    result = sortMembers(result, sortConfig.sortBy, sortConfig.sortOrder);
    setFilteredMembers(result);
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
    setSelectedMembers(items);
  };

  const handleDeleteSelected = () => {
    if (selectedMembers.length === 0) return;

    showModal({
      title: "회원 삭제",
      message: `선택한 ${selectedMembers.length}명의 회원을 삭제하시겠습니까?`,
      confirmText: "삭제",
      cancelText: "취소",
      onConfirm: () => {
        // 실제 구현에서는 API 호출 등을 통해 데이터를 삭제
        console.log("삭제할 회원 ID:", selectedMembers);

        // 삭제 후 목록 업데이트 (실제 구현에서는 API 응답 후 처리)
        const updatedMembers = filteredMembers.filter(
          (member) => !selectedMembers.includes(member.id)
        );
        setFilteredMembers(updatedMembers);
        setSelectedMembers([]);

        toast({
          title: "삭제 완료",
          description: `${selectedMembers.length}명의 회원이 삭제되었습니다.`,
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

              {selectedMembers.length > 0 && (
                <button
                  onClick={() => {
                    handleDeleteSelected();
                    setShowMobileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
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
        {viewMode === "table" ? (
          <MembersTable
            members={filteredMembers}
            onSort={handleSort}
            sortConfig={sortConfig}
            onSelectItems={handleSelectItems}
          />
        ) : (
          <div>
            <MembersGrid
              members={filteredMembers}
              onSelectItems={handleSelectItems}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Members;
