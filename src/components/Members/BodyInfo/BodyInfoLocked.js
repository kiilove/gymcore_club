"use client";

import { Lock } from "lucide-react";
import Button from "../../Shared/Button";

const BodyInfoLocked = ({ onUnlock }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
      <div className="flex justify-center mb-4">
        <div className="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <Lock className="h-8 w-8 text-gray-500 dark:text-gray-400" />
        </div>
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
        신체 정보가 없습니다
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        회원의 신체 정보를 등록하면 BMI, 체지방률 등의 정보를 관리할 수
        있습니다.
      </p>
      <Button variant="primary" onClick={onUnlock}>
        신체정보 등록하기
      </Button>
    </div>
  );
};

export default BodyInfoLocked;
