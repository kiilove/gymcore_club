"use client";

import { getBMIStatus } from "../../../utils/memberUtils";
import Button from "../../Shared/Button";
import { Check } from "lucide-react";

const BodyInfoConfirmation = ({ bodyInfo, onClose }) => {
  const bmiStatus = bodyInfo?.bmi ? getBMIStatus(bodyInfo.bmi) : null;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-green-500 shadow-md">
      <div className="flex items-center justify-center mb-4">
        <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
          <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
        </div>
      </div>

      <h3 className="text-lg font-medium text-center text-gray-900 dark:text-white mb-4">
        신체 정보가 성공적으로 저장되었습니다
      </h3>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">측정일</p>
          <p className="font-medium text-gray-900 dark:text-white">
            {bodyInfo.date}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">작성자</p>
          <p className="font-medium text-gray-900 dark:text-white">
            {bodyInfo.writtenBy}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">키</p>
          <p className="font-medium text-gray-900 dark:text-white">
            {bodyInfo.height ? `${bodyInfo.height} cm` : "-"}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">체중</p>
          <p className="font-medium text-gray-900 dark:text-white">
            {bodyInfo.weight} kg
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">체지방률</p>
          <p className="font-medium text-gray-900 dark:text-white">
            {bodyInfo.bodyFat ? `${bodyInfo.bodyFat}%` : "-"}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">BMI</p>
          {bodyInfo.bmi ? (
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {bodyInfo.bmi}
              </p>
              <p className={`text-sm ${bmiStatus?.className}`}>
                {bmiStatus?.text}
              </p>
            </div>
          ) : (
            <p className="font-medium text-gray-900 dark:text-white">-</p>
          )}
        </div>
      </div>

      {bodyInfo.notes && (
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">메모</p>
          <p className="font-medium text-gray-900 dark:text-white">
            {bodyInfo.notes}
          </p>
        </div>
      )}

      <div className="flex justify-center">
        <Button
          variant="primary"
          onClick={onClose}
          className="bg-green-600 hover:bg-green-700 px-6"
        >
          확인
        </Button>
      </div>
    </div>
  );
};

export default BodyInfoConfirmation;
