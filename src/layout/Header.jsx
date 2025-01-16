import React, { useState } from "react";
import { Layout, Menu, Button, Drawer, Avatar, Popconfirm } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import menuItems from "../components/menus/menuItem";
import { useDevice } from "../contexts/DeviceContext";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const userGroup = sessionStorage.getItem("userGroup");
  return (
    <div className="flex w-full justify-center items-center">
      <Menu
        theme="light"
        mode="horizontal"
        items={menuItems}
        onClick={({ key }) => navigate(key)}
        style={{ fontSize: "14px", fontWeight: 500, width: "800px" }}
      />
    </div>
  );
};

export default Header;
