"use client";

import { useState, useEffect } from "react";
import FullPageLoader from "./FullPageLoader";

// HOC (Higher Order Component)로 로딩 상태를 관리하는 함수
export const withLoading = (WrappedComponent, loadingProps = {}) => {
  return (props) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, loadingProps.timeout || 1500);

      return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
      return <FullPageLoader {...loadingProps} />;
    }

    return <WrappedComponent {...props} />;
  };
};

// 로딩 상태를 관리하는 훅
export const useLoading = (initialState = false) => {
  const [isLoading, setIsLoading] = useState(initialState);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  const withLoading = async (callback) => {
    try {
      startLoading();
      const result = await callback();
      return result;
    } finally {
      stopLoading();
    }
  };

  return { isLoading, startLoading, stopLoading, withLoading };
};
