"use client";

import { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaMoon, FaSun, FaChevronRight } from "react-icons/fa";
import routes from "../../routes/routes";
import { ThemeContext } from "../../context/ThemeContext";
import MiniMusicPlayer from "../Music/MiniMusicPlayer";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [scrolled, setScrolled] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 사이드바에 표시할 라우트만 필터링
  const sidebarRoutes = routes.filter((route) => route.showInSidebar);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* 모바일 사이드바 오버레이 */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden backdrop-blur-sm"
          onClick={closeSidebar}
        ></div>
      )}

      {/* 사이드바 */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white dark:bg-gray-800 shadow-xl transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "translate-x-0 rounded-r-3xl" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b dark:border-gray-700">
          <div className="flex items-center">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
              GymCore
            </span>
          </div>
          <button
            onClick={closeSidebar}
            className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white focus:outline-none"
          >
            <FaTimes size={20} />
          </button>
        </div>
        <nav className="mt-5 px-4">
          <div className="space-y-2">
            {sidebarRoutes.map((route) => {
              const isActive = location.pathname === route.path;
              return (
                <Link
                  key={route.path}
                  to={route.path}
                  className={`flex items-center px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 group ${
                    isActive
                      ? "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 dark:from-blue-900 dark:to-blue-800/50 dark:text-blue-200"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                  onClick={closeSidebar}
                >
                  <route.icon
                    className={`mr-3 h-5 w-5 transition-transform duration-200 ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  />
                  <span className="flex-1">{route.name}</span>
                  {isActive && (
                    <FaChevronRight className="h-4 w-4 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* 헤더 */}
        <header
          className={`flex items-center justify-between h-16 px-6 bg-white dark:bg-gray-800 border-b dark:border-gray-700 transition-all duration-300 ${
            scrolled ? "sticky top-0 z-10 shadow-md" : ""
          }`}
        >
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white lg:hidden focus:outline-none"
            >
              <FaBars size={20} />
            </button>
          </div>
          <div className="flex items-center">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none"
            >
              {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>
            <div className="ml-4 relative">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-600">
                  <img
                    className="h-full w-full object-cover"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="User avatar"
                  />
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  관리자
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* 페이지 콘텐츠 */}
        <main className="flex-1 overflow-y-auto p-6 pb-24">{children}</main>

        {/* 미니 음악 플레이어 - z-index 값을 높게 설정 */}
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <MiniMusicPlayer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
