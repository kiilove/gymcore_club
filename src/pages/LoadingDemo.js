"use client";

import { useState } from "react";
import PageTitle from "../components/Shared/PageTitle";
import SectionCard from "../components/Shared/SectionCard";
import Button from "../components/Shared/Button";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import GymCoreLoader from "../components/Shared/GymCoreLoader";
import LoadingAnimation from "../components/Shared/LoadingAnimation";
import { Loader } from "lucide-react";

const LoadingDemo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLoader, setSelectedLoader] = useState("gymcore");
  const [selectedSize, setSelectedSize] = useState("md");
  const [selectedVariant, setSelectedVariant] = useState("default");

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const renderSelectedLoader = () => {
    switch (selectedLoader) {
      case "spinner":
        return <LoadingSpinner size={selectedSize} />;
      case "gymcore":
        return <GymCoreLoader size={selectedSize} variant={selectedVariant} />;
      case "pulse":
        return (
          <LoadingAnimation
            type="pulse"
            size={selectedSize}
            variant={selectedVariant}
          />
        );
      case "heartbeat":
        return (
          <LoadingAnimation
            type="heartbeat"
            size={selectedSize}
            variant={selectedVariant}
          />
        );
      case "weight":
        return (
          <LoadingAnimation
            type="weight"
            size={selectedSize}
            variant={selectedVariant}
          />
        );
      case "timer":
        return (
          <LoadingAnimation
            type="timer"
            size={selectedSize}
            variant={selectedVariant}
          />
        );
      case "gymcore-logo":
        return (
          <LoadingAnimation
            type="gymcore"
            size={selectedSize}
            variant={selectedVariant}
          />
        );
      default:
        return <GymCoreLoader size={selectedSize} variant={selectedVariant} />;
    }
  };

  return (
    <div>
      <PageTitle
        title="로딩 애니메이션"
        subtitle="GymCore 전용 로딩 애니메이션 데모"
        icon={Loader}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <SectionCard title="설정">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                로딩 애니메이션 유형
              </label>
              <select
                value={selectedLoader}
                onChange={(e) => setSelectedLoader(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="spinner">기본 스피너</option>
                <option value="gymcore">GymCore 로더</option>
                <option value="pulse">펄스 애니메이션</option>
                <option value="heartbeat">심박수 애니메이션</option>
                <option value="weight">웨이트 애니메이션</option>
                <option value="timer">타이머 애니메이션</option>
                <option value="gymcore-logo">GymCore 로고</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                크기
              </label>
              <div className="flex space-x-2">
                {["sm", "md", "lg", "xl"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 rounded-md ${
                      selectedSize === size
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                        : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {size.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                색상 변형
              </label>
              <div className="flex flex-wrap gap-2">
                {["default", "success", "warning", "danger"].map((variant) => (
                  <button
                    key={variant}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-3 py-1 rounded-md ${
                      selectedVariant === variant
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                        : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Button
                onClick={simulateLoading}
                variant="primary"
                className="w-full"
              >
                로딩 시뮬레이션 (3초)
              </Button>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="미리보기" className="lg:col-span-2">
          <div className="flex items-center justify-center h-64">
            {isLoading ? (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                {renderSelectedLoader()}
              </div>
            ) : (
              renderSelectedLoader()
            )}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="모든 로딩 애니메이션">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium mb-4">기본 스피너</h3>
            <LoadingSpinner />
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium mb-4">GymCore 로더</h3>
            <GymCoreLoader />
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium mb-4">펄스 애니메이션</h3>
            <LoadingAnimation type="pulse" />
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium mb-4">심박수 애니메이션</h3>
            <LoadingAnimation type="heartbeat" />
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium mb-4">웨이트 애니메이션</h3>
            <LoadingAnimation type="weight" />
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium mb-4">타이머 애니메이션</h3>
            <LoadingAnimation type="timer" />
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium mb-4">GymCore 로고</h3>
            <LoadingAnimation type="gymcore" />
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium mb-4">성공 변형</h3>
            <LoadingAnimation type="weight" variant="success" />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="사용 방법" className="mt-6">
        <div className="prose dark:prose-invert max-w-none">
          <h3>기본 사용법</h3>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto">
            {`import { LoadingSpinner } from '../components/Shared/LoadingSpinner';

// 기본 스피너
<LoadingSpinner />

// 크기 조절
<LoadingSpinner size="sm" />
<LoadingSpinner size="md" />
<LoadingSpinner size="lg" />
<LoadingSpinner size="xl" />

// 텍스트 변경
<LoadingSpinner text="데이터 로딩 중..." />
<LoadingSpinner text={false} /> // 텍스트 없음`}
          </pre>

          <h3 className="mt-6">GymCore 로더</h3>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto">
            {`import { GymCoreLoader } from '../components/Shared/GymCoreLoader';

// 기본 로더
<GymCoreLoader />

// 색상 변형
<GymCoreLoader variant="default" />
<GymCoreLoader variant="success" />
<GymCoreLoader variant="warning" />
<GymCoreLoader variant="danger" />`}
          </pre>

          <h3 className="mt-6">다양한 애니메이션</h3>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto">
            {`import { LoadingAnimation } from '../components/Shared/LoadingAnimation';

// 애니메이션 유형
<LoadingAnimation type="pulse" />
<LoadingAnimation type="heartbeat" />
<LoadingAnimation type="weight" />
<LoadingAnimation type="timer" />
<LoadingAnimation type="gymcore" />`}
          </pre>

          <h3 className="mt-6">전체 화면 로딩</h3>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto">
            {`{isLoading && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <GymCoreLoader size="lg" />
  </div>
)}`}
          </pre>
        </div>
      </SectionCard>
    </div>
  );
};

export default LoadingDemo;
