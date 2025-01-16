import { Layout, Menu } from "antd";
import { Header as AntHeader, Content } from "antd/es/layout/layout";
import React from "react";
import Header from "../../layout/Header";
import Sider from "antd/es/layout/Sider";
import menuItems from "../../components/menus/menuItem";
import { useNavigate } from "react-router-dom";

const ClubHome = ({ children }) => {
  const navigate = useNavigate();
  return (
    <Layout>
      <AntHeader className=" p-0 bg-cyan-500">
        <div className="flex w-full h-full">
          <div
            className="flex justify-center items-center"
            style={{ width: 180 }}
          >
            <p className="text-white font-bold text-xl">짐코어</p>
          </div>
        </div>
      </AntHeader>
      <Layout>
        <Sider className="bg-cyan-200">
          <Menu
            theme="light"
            mode="vertical"
            items={menuItems}
            onClick={({ key }) => navigate(key)}
            style={{ fontSize: "14px", fontWeight: 500 }}
          />
        </Sider>
        <Content
          className="p-6 flex justify-center items-start"
          style={{ alignItems: "center", alignContent: "center" }}
        >
          <div
            className="flex w-full items-center flex-col"
            style={{ maxWidth: "1200px" }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ClubHome;
