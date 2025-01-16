import React, { createContext } from "react";
import { useMediaQuery } from "react-responsive";

// DeviceContext 생성
const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
  // 모바일 화면 기준 너비 설정 (768px 이하일 경우 모바일로 간주)
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  // 태블릿 화면 기준 너비 설정 (769px ~ 1024px)
  const isTablet = useMediaQuery({
    query: "(min-width: 769px) and (max-width: 1024px)",
  });

  // PC 화면 기준 너비 설정 (1025px 이상)
  const isPC = useMediaQuery({ query: "(min-width: 1025px)" });

  return (
    <DeviceContext.Provider value={{ isMobile, isTablet, isPC }}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevice = () => React.useContext(DeviceContext);
