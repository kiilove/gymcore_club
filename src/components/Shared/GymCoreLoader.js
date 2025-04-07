"use client";

import { useState, useEffect } from "react";
import { Dumbbell, Activity } from "lucide-react";

const GymCoreLoader = ({
  size = "md",
  text = "로딩 중...",
  variant = "default",
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const sizeClasses = {
    sm: { container: "h-16 w-16", icon: "h-4 w-4", text: "text-xs" },
    md: { container: "h-24 w-24", icon: "h-6 w-6", text: "text-sm" },
    lg: { container: "h-32 w-32", icon: "h-8 w-8", text: "text-base" },
    xl: { container: "h-40 w-40", icon: "h-10 w-10", text: "text-lg" },
  };

  const variants = {
    default: {
      primary: "bg-blue-600 dark:bg-blue-500",
      secondary: "bg-blue-400 dark:bg-blue-700",
      text: "text-blue-600 dark:text-blue-400",
    },
    success: {
      primary: "bg-green-600 dark:bg-green-500",
      secondary: "bg-green-400 dark:bg-green-700",
      text: "text-green-600 dark:text-green-400",
    },
    warning: {
      primary: "bg-yellow-600 dark:bg-yellow-500",
      secondary: "bg-yellow-400 dark:bg-yellow-700",
      text: "text-yellow-600 dark:text-yellow-400",
    },
    danger: {
      primary: "bg-red-600 dark:bg-red-500",
      secondary: "bg-red-400 dark:bg-red-700",
      text: "text-red-600 dark:text-red-400",
    },
  };

  const currentVariant = variants[variant];

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`relative ${sizeClasses[size].container}`}>
        {/* 원형 프로그레스 바 */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* 배경 원 */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-gray-200 dark:text-gray-700"
          />

          {/* 프로그레스 원 */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray="283"
            strokeDashoffset={283 - (283 * progress) / 100}
            strokeLinecap="round"
            className={currentVariant.primary}
            transform="rotate(-90 50 50)"
          />
        </svg>

        {/* 중앙 아이콘 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`relative ${sizeClasses[size].icon} animate-pulse`}>
            <Dumbbell className={`absolute ${currentVariant.text}`} />
            <Activity
              className={`absolute opacity-0 animate-ping ${currentVariant.text}`}
            />
          </div>
        </div>

        {/* 작은 원형 장식들 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className={`h-3 w-3 rounded-full ${currentVariant.secondary} animate-ping`}
          ></div>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
          <div
            className={`h-3 w-3 rounded-full ${currentVariant.secondary} animate-ping animation-delay-300`}
          ></div>
        </div>
        <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className={`h-3 w-3 rounded-full ${currentVariant.secondary} animate-ping animation-delay-600`}
          ></div>
        </div>
        <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2">
          <div
            className={`h-3 w-3 rounded-full ${currentVariant.secondary} animate-ping animation-delay-900`}
          ></div>
        </div>
      </div>

      {text && (
        <div
          className={`mt-4 ${sizeClasses[size].text} font-medium ${currentVariant.text}`}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default GymCoreLoader;
