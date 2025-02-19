import {
  UserOutlined,
  CalendarOutlined,
  PieChartOutlined,
  SettingOutlined,
  DatabaseOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import React from "react";

const menuItems = [
  {
    key: "/club-dashboard",
    icon: <DashboardOutlined />,
    label: "대시보드",
    allowedGroups: ["admin"],
  },
  {
    key: "/club-members",
    icon: <UserOutlined />,
    label: "회원 관리",
    allowedGroups: ["admin", "staff", "user"],
    children: [
      {
        key: "/club-members/new-member", // 새 고객 추가
        label: "회원 등록",
        allowedGroups: ["admin", "staff"],
      },
      // {
      //   key: "/customer-management/customer-generator", // 가상 고객 추가
      //   label: "가상 고객 추가",
      //   allowedGroups: ["admin", "staff"],
      // },
      {
        key: "/club-members/list-member", // 고객 리스트
        label: "회원 목록",
        allowedGroups: ["admin", "staff", "user"],
      },
    ],
  },
  {
    key: "/club-coaches",
    icon: <UserOutlined />,
    label: "코치 관리",
    allowedGroups: ["admin", "staff", "user"],
    children: [
      {
        key: "/club-coaches/new-coach", // 새 고객 추가
        label: "코치 등록",
        allowedGroups: ["admin", "staff"],
      },
      // {
      //   key: "/customer-management/customer-generator", // 가상 고객 추가
      //   label: "가상 고객 추가",
      //   allowedGroups: ["admin", "staff"],
      // },
      {
        key: "/club-coaches/list-coach", // 고객 리스트
        label: "코치 목록",
        allowedGroups: ["admin", "staff", "user"],
      },
    ],
  },
  {
    key: "/club-classes",
    icon: <UserOutlined />,
    label: "수업 관리",
    allowedGroups: ["admin", "staff", "user"],
    children: [
      {
        key: "/club-classes/new-classes", // 새 수업 추가
        label: "수업 등록",
        allowedGroups: ["admin", "staff"],
      },
      // {
      //   key: "/customer-management/customer-generator", // 가상 고객 추가
      //   label: "가상 고객 추가",
      //   allowedGroups: ["admin", "staff"],
      // },
      {
        key: "/club-classes/list-classes", // 수업 리스트
        label: "수업 목록",
        allowedGroups: ["admin", "staff", "user"],
      },
    ],
  },

  {
    key: "/reservation-management",
    icon: <CalendarOutlined />,
    label: "예약 관리",
    allowedGroups: ["admin", "staff"],
    children: [
      {
        key: "/reservation-management/booking",
        label: "예약 접수/확인",
        allowedGroups: ["admin", "staff"],
      },
      {
        key: "/reservation-management/notifications",
        label: "예약 알림 관리",
        allowedGroups: ["admin"],
      },
      {
        key: "/reservation-management/calendar-view",
        label: "캘린더 뷰",
        allowedGroups: ["admin", "staff"],
      },
      {
        key: "/reservation-management/staff-schedule",
        label: "직원별 스케줄",
        allowedGroups: ["admin"],
      },
      {
        key: "/reservation-management/change-cancel",
        label: "예약 취소/변경 관리",
        allowedGroups: ["admin", "staff"],
      },
    ],
  },
  {
    key: "/statistics-management",
    icon: <PieChartOutlined />,
    label: "통계 관리",
    allowedGroups: ["admin"],
  },
  {
    key: "/club-manager",
    icon: <SettingOutlined />,
    label: "클럽 설정",
    allowedGroups: ["admin"],
  },
];

export default menuItems;
