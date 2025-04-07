"use client";

import { useState, useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

const Toast = ({ toast, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(), 300); // 애니메이션 후 제거
    }, toast.duration || 3000);

    return () => clearTimeout(timer);
  }, [toast, onClose]);

  const variants = {
    success: {
      icon: CheckCircle,
      bgClass: "bg-green-50 dark:bg-green-900/20 border-green-500",
      iconClass: "text-green-500",
    },
    error: {
      icon: AlertCircle,
      bgClass: "bg-red-50 dark:bg-red-900/20 border-red-500",
      iconClass: "text-red-500",
    },
    info: {
      icon: Info,
      bgClass: "bg-blue-50 dark:bg-blue-900/20 border-blue-500",
      iconClass: "text-blue-500",
    },
  };

  const variant = variants[toast.variant || "info"];
  const Icon = variant.icon;

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 w-auto max-w-sm transform transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
    >
      <div className={`rounded-lg shadow-lg border-l-4 p-4 ${variant.bgClass}`}>
        <div className="flex items-start">
          <div className={`flex-shrink-0 ${variant.iconClass}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="ml-3 flex-1 pt-0.5">
            {toast.title && (
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {toast.title}
              </p>
            )}
            {toast.description && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {toast.description}
              </p>
            )}
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={() => {
                setIsVisible(false);
                setTimeout(() => onClose(), 300);
              }}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast;
