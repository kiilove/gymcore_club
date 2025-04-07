"use client";

import { useState } from "react";
import PageTitle from "../components/Shared/PageTitle";
import SectionCard from "../components/Shared/SectionCard";
import Button from "../components/Shared/Button";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import GymCoreLoader from "../components/Shared/GymCoreLoader";
import LoadingAnimation from "../components/Shared/LoadingAnimation";
import LoadingOverlay from "../components/Shared/LoadingOverlay";
import FullPageLoader from "../components/Shared/FullPageLoader";
import { useLoading } from "../components/Shared/withLoading";
import { Loader } from "lucide-react";

const LoadingExamples = () => {
  const [showFullPageLoader, setShowFullPageLoader] = useState(false);
  const [sectionLoading, setSectionLoading] = useState(false);
  const { isLoading, startLoading, stopLoading, withLoading } = useLoading();

  const handleFullPageLoading = () => {
    setShowFullPageLoader(true);
    setTimeout(() => {
      setShowFullPageLoader(false);
    }, 3000);
  };

  const handleSectionLoading = () => {
    setSectionLoading(true);
    setTimeout(() => {
      setSectionLoading(false);
    }, 3000);
  };

  const handleHookLoading = async () => {
    await withLoading(async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      console.log("작업 완료!");
    });
  };

  return (
    <div>
      <PageTitle
        title="로딩 예제"
        subtitle="GymCore 로딩 애니메이션 사용 예제"
        icon={Loader}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <SectionCard title="전체 페이지 로딩">
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              전체 페이지에 로딩 오버레이를 표시합니다. 사용자가 페이지와
              상호작용하는 것을 방지합니다.
            </p>
            <Button onClick={handleFullPageLoading} variant="primary">
              전체 페이지 로딩 표시 (3초)
            </Button>
          </div>
        </SectionCard>

        <SectionCard title="섹션 로딩">
          <LoadingOverlay isLoading={sectionLoading}>
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                특정 섹션에만 로딩 오버레이를 표시합니다. 다른 부분은 계속
                사용할 수 있습니다.
              </p>
              <Button onClick={handleSectionLoading} variant="primary">
                섹션 로딩 표시 (3초)
              </Button>
            </div>
          </LoadingOverlay>
        </SectionCard>
      </div>

      <SectionCard title="로딩 훅 사용">
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            useLoading 훅을 사용하여 로딩 상태를 관리합니다. 비동기 작업을
            수행할 때 유용합니다.
          </p>
          <Button
            onClick={handleHookLoading}
            variant="primary"
            disabled={isLoading}
          >
            {isLoading ? "로딩 중..." : "로딩 훅 테스트 (3초)"}
          </Button>

          {isLoading && (
            <div className="flex justify-center mt-4">
              <GymCoreLoader size="md" />
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard title="다양한 로딩 상황" className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">버튼 내 로딩</h3>
            <Button
              variant="primary"
              className="w-full flex items-center justify-center gap-2"
            >
              <LoadingSpinner size="sm" text={false} />
              로딩 중...
            </Button>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">폼 제출 중</h3>
            <div className="space-y-4">
              <div className="flex justify-center">
                <LoadingAnimation type="pulse" size="sm" text="제출 중..." />
              </div>
              <Button variant="primary" className="w-full" disabled>
                제출
              </Button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">데이터 로딩 중</h3>
            <div className="h-32 flex items-center justify-center">
              <LoadingAnimation type="gymcore" size="sm" />
            </div>
          </div>
        </div>
      </SectionCard>

      {showFullPageLoader && (
        <FullPageLoader text="데이터를 불러오는 중입니다..." />
      )}
    </div>
  );
};

export default LoadingExamples;
