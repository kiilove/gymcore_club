// CategoryList.js
import React from "react";
import { List } from "antd";

const CategoryList = ({ categories, currentCategory, onSelect }) => {
  return (
    <List
      itemLayout="horizontal"
      size="small"
      dataSource={categories}
      renderItem={(item) => (
        <List.Item
          className="hover:cursor-pointer"
          onClick={() => onSelect(item)}
        >
          <div
            className={
              item === currentCategory
                ? "flex w-full h-full px-2 bg-blue-800 text-white hover:bg-blue-300 hover:text-white rounded-lg items-center"
                : "flex w-full h-full px-2 hover:bg-blue-500 hover:text-white rounded-lg items-center"
            }
            style={{ height: "40px" }}
          >
            <p className="px-2">{item}</p>
          </div>
        </List.Item>
      )}
    />
  );
};

export default CategoryList;
