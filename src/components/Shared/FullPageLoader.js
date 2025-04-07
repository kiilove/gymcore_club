"use client";

import { useEffect } from "react";
import GymCoreLoader from "./GymCoreLoader";

const FullPageLoader = ({
  variant = "default",
  text = "로딩 중...",
  timeout = null,
}) => {
  useEffect(() => {
    // 로딩 중에는 스크롤 방지
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (timeout) {
      const timer = setTimeout(() => {
        document.body.style.overflow = "";
      }, timeout);

      return () => clearTimeout(timer);
    }
  }, [timeout]);

  return (
    <div className="fixed inset-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm flex items-center justify-center z-50">
      <GymCoreLoader size="lg" variant={variant} text={text} />
    </div>
  );
};

export default FullPageLoader;
