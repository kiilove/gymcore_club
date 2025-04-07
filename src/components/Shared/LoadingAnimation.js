"use client";

import { useState, useEffect } from "react";
import { Dumbbell, Activity, Zap, Timer } from "lucide-react";

const LoadingAnimation = ({
  type = "pulse",
  size = "md",
  text = "로딩 중...",
  variant = "default",
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev + 1) % 3);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const sizeClasses = {
    sm: { container: "h-16", icon: "h-6 w-6", text: "text-xs" },
    md: { container: "h-24", icon: "h-8 w-8", text: "text-sm" },
    lg: { container: "h-32", icon: "h-10 w-10", text: "text-base" },
    xl: { container: "h-40", icon: "h-12 w-12", text: "text-lg" },
  };

  const variants = {
    default: {
      primary: "text-blue-600 dark:text-blue-400",
      secondary: "text-blue-400 dark:text-blue-600",
      bg: "bg-blue-100 dark:bg-blue-900/30",
    },
    success: {
      primary: "text-green-600 dark:text-green-400",
      secondary: "text-green-400 dark:text-green-600",
      bg: "bg-green-100 dark:bg-green-900/30",
    },
    warning: {
      primary: "text-yellow-600 dark:text-yellow-400",
      secondary: "text-yellow-400 dark:text-yellow-600",
      bg: "bg-yellow-100 dark:bg-yellow-900/30",
    },
    danger: {
      primary: "text-red-600 dark:text-red-400",
      secondary: "text-red-400 dark:text-red-600",
      bg: "bg-red-100 dark:bg-red-900/30",
    },
  };

  const currentVariant = variants[variant];

  const renderLoadingDots = () => {
    return (
      <div className="flex items-center justify-center space-x-1 mt-2">
        <div
          className={`h-2 w-2 rounded-full ${
            count === 0
              ? currentVariant.primary
              : "bg-gray-300 dark:bg-gray-600"
          }`}
        ></div>
        <div
          className={`h-2 w-2 rounded-full ${
            count === 1
              ? currentVariant.primary
              : "bg-gray-300 dark:bg-gray-600"
          }`}
        ></div>
        <div
          className={`h-2 w-2 rounded-full ${
            count === 2
              ? currentVariant.primary
              : "bg-gray-300 dark:bg-gray-600"
          }`}
        ></div>
      </div>
    );
  };

  const renderPulseAnimation = () => {
    return (
      <div
        className={`flex items-center justify-center ${sizeClasses[size].container}`}
      >
        <div className={`relative ${sizeClasses[size].icon}`}>
          <Dumbbell className={`${currentVariant.primary} animate-pulse`} />
        </div>
      </div>
    );
  };

  const renderHeartbeatAnimation = () => {
    return (
      <div
        className={`flex items-center justify-center ${sizeClasses[size].container}`}
      >
        <div className="relative">
          <Activity
            className={`${sizeClasses[size].icon} ${currentVariant.primary}`}
          />
          <svg
            className="absolute inset-0"
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
          >
            <path
              d="M10,50 Q25,10 50,50 T90,50"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className={currentVariant.secondary}
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                values="0,0; -100,0; 0,0"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>
      </div>
    );
  };

  const renderWeightAnimation = () => {
    return (
      <div
        className={`flex items-center justify-center ${sizeClasses[size].container}`}
      >
        <div className="relative">
          <div
            className={`flex items-center justify-center ${currentVariant.bg} rounded-full p-4`}
          >
            <Dumbbell
              className={`${sizeClasses[size].icon} ${currentVariant.primary} animate-bounce`}
            />
          </div>
          <div className="absolute -top-1 -right-1">
            <Zap
              className={`h-5 w-5 ${currentVariant.secondary} animate-pulse`}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderTimerAnimation = () => {
    return (
      <div
        className={`flex items-center justify-center ${sizeClasses[size].container}`}
      >
        <div className="relative">
          <div
            className={`flex items-center justify-center ${currentVariant.bg} rounded-full p-4`}
          >
            <Timer
              className={`${sizeClasses[size].icon} ${currentVariant.primary}`}
            />
          </div>
          <svg
            className="absolute inset-0"
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeDasharray="283"
              strokeDashoffset="283"
              className={currentVariant.secondary}
            >
              <animate
                attributeName="stroke-dashoffset"
                values="283;0;283"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>
      </div>
    );
  };

  const renderGymCoreAnimation = () => {
    return (
      <div
        className={`flex items-center justify-center ${sizeClasses[size].container}`}
      >
        <div className="relative">
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-2">
              <Dumbbell
                className={`${sizeClasses[size].icon} ${currentVariant.primary} animate-bounce`}
              />
              <div className={`font-bold text-xl ${currentVariant.primary}`}>
                GYM
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Activity
                className={`${sizeClasses[size].icon} ${currentVariant.secondary} animate-pulse`}
              />
              <div className={`font-bold text-xl ${currentVariant.secondary}`}>
                CORE
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAnimation = () => {
    switch (type) {
      case "pulse":
        return renderPulseAnimation();
      case "heartbeat":
        return renderHeartbeatAnimation();
      case "weight":
        return renderWeightAnimation();
      case "timer":
        return renderTimerAnimation();
      case "gymcore":
        return renderGymCoreAnimation();
      default:
        return renderPulseAnimation();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {renderAnimation()}
      {text && (
        <div
          className={`mt-4 ${sizeClasses[size].text} font-medium ${currentVariant.primary}`}
        >
          {text}
          {renderLoadingDots()}
        </div>
      )}
    </div>
  );
};

export default LoadingAnimation;
