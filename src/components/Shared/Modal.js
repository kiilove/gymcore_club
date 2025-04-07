"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import Button from "./Button";

const Modal = ({ modal, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl z-10 w-full max-w-md mx-4 overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {modal.title}
          </h3>
          <button
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-gray-700 dark:text-gray-300">{modal.message}</p>
        </div>
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 flex justify-end space-x-2">
          {modal.cancelText && (
            <Button variant="secondary" onClick={onClose}>
              {modal.cancelText}
            </Button>
          )}
          {modal.confirmText && (
            <Button
              variant={modal.confirmVariant || "primary"}
              onClick={() => {
                if (modal.onConfirm) modal.onConfirm();
                onClose();
              }}
            >
              {modal.confirmText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
