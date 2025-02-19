// FilterPanel.js
import React from "react";
import { Input, Button, Space, Checkbox } from "antd";
const { Search } = Input;

const FilterPanel = ({ originalClasses, filterState, onFilterChange }) => {
  const { activeChargeType, activeTitleFilter, nestedSearch } = filterState;
  const chargeTypes = Array.from(
    new Set(originalClasses.map((item) => item.chargeType))
  );
  const titles = Array.from(new Set(originalClasses.map((item) => item.title)));

  return (
    <div
      style={{
        padding: "16px",
        backgroundColor: "#fafafa",
        borderRadius: "8px",
        marginBottom: "16px",
      }}
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <div>
          <span style={{ marginRight: 8, fontWeight: "bold" }}>차감방식:</span>
          <Space wrap>
            {chargeTypes.map((ct) => (
              <Button
                key={ct}
                type={activeChargeType.includes(ct) ? "primary" : "default"}
                onClick={() => onFilterChange({ type: "charge", value: ct })}
              >
                {ct}
              </Button>
            ))}
          </Space>
        </div>

        <div>
          <Space wrap>
            {titles.map((t) => (
              <Button
                key={t}
                type={activeTitleFilter.includes(t) ? "primary" : "default"}
                onClick={() => onFilterChange({ type: "title", value: t })}
              >
                {t}
              </Button>
            ))}
          </Space>
        </div>

        <div>
          <Space align="center">
            <Search
              placeholder="텍스트 검색..."
              onSearch={(value) => onFilterChange({ type: "search", value })}
              enterButton="검색"
              style={{ width: 300 }}
            />
            <Checkbox
              checked={nestedSearch}
              onChange={(e) =>
                onFilterChange({ type: "nested", value: e.target.checked })
              }
            >
              결과내검색
            </Checkbox>
          </Space>
        </div>
      </Space>
    </div>
  );
};

export default FilterPanel;
