import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import CategoryList from "./CategoryList";
import FilterPanel from "./FilterPanel";
import ClassCardList from "./ClassCardList";
import { useFilterClasses } from "./useFilterClasses";

const FormClasses = ({ classesData, onAdd, onUpdate, onDelete }) => {
  const [currentGroupTitle, setCurrentGroupTitle] = useState(undefined);

  // 필터 상태 객체로 관리
  const [filterState, setFilterState] = useState({
    activeChargeType: [],
    activeTitleFilter: [],
    appliedSearchText: "",
    nestedSearch: false,
  });

  // 카테고리 리스트
  const categories = classesData ? Object.keys(classesData) : [];

  // 선택된 카테고리의 원본 클래스 목록
  const originalClasses =
    currentGroupTitle && classesData[currentGroupTitle]
      ? classesData[currentGroupTitle].classes
      : [];

  // 필터된 클래스 목록 (커스텀 훅 사용)
  const filteredClasses = useFilterClasses(originalClasses, filterState);

  // 활성화 토글: onSave 대신 onUpdate 콜백을 호출하여 isActive 업데이트
  const handleToggle = (parentTitle, parentId, childrenId) => {
    const category = classesData[parentTitle];
    if (category) {
      const targetClass = category.classes.find(
        (item) => item.id === childrenId
      );
      if (targetClass) {
        const newActiveValue = !targetClass.isActive;
        targetClass.isActive = newActiveValue; // 로컬 데이터 업데이트
        // onUpdate 콜백 호출 (id와 변경된 값 객체 전달)
        if (onUpdate) onUpdate(childrenId, { isActive: newActiveValue });
      }
    }
  };

  const handleFilterChange = ({ type, value }) => {
    setFilterState((prev) => {
      switch (type) {
        case "charge":
          return {
            ...prev,
            activeChargeType: prev.activeChargeType.includes(value)
              ? prev.activeChargeType.filter((v) => v !== value)
              : [...prev.activeChargeType, value],
          };
        case "title":
          return {
            ...prev,
            activeTitleFilter: prev.activeTitleFilter.includes(value)
              ? prev.activeTitleFilter.filter((v) => v !== value)
              : [...prev.activeTitleFilter, value],
          };
        case "search":
          return { ...prev, appliedSearchText: value };
        case "nested":
          return { ...prev, nestedSearch: value };
        default:
          return prev;
      }
    });
  };

  // 카테고리 선택 시 필터 초기화
  const handleCategorySelect = (category) => {
    setCurrentGroupTitle(category);
    setFilterState({
      activeChargeType: [],
      activeTitleFilter: [],
      appliedSearchText: "",
      nestedSearch: false,
    });
  };

  return (
    <Row>
      <Col span={4} className="p-2">
        <CategoryList
          categories={categories}
          currentCategory={currentGroupTitle}
          onSelect={handleCategorySelect}
        />
      </Col>
      <Col span={18} className="p-4">
        {currentGroupTitle ? (
          <>
            <FilterPanel
              originalClasses={originalClasses}
              filterState={filterState}
              onFilterChange={handleFilterChange}
            />
            <ClassCardList
              classes={filteredClasses}
              parentTitle={currentGroupTitle}
              parentId={classesData[currentGroupTitle].id}
              onToggle={handleToggle}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          </>
        ) : (
          <p>카테고리를 선택해주세요.</p>
        )}
      </Col>
    </Row>
  );
};

export default FormClasses;
