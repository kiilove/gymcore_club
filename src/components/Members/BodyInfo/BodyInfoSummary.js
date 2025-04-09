"use client";

import { getBMIStatus } from "../../../utils/memberUtils";

const BodyInfoSummary = ({ bodyInfo }) => {
  const bmiStatus = bodyInfo?.bmi ? getBMIStatus(bodyInfo.bmi) : null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
          키
        </h4>
        <p className="text-xl font-semibold text-gray-900 dark:text-white">
          {bodyInfo?.height ? `${bodyInfo.height} cm` : "-"}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
          체중
        </h4>
        <p className="text-xl font-semibold text-gray-900 dark:text-white">
          {bodyInfo?.weight ? `${bodyInfo.weight} kg` : "-"}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
          체지방률
        </h4>
        <p className="text-xl font-semibold text-gray-900 dark:text-white">
          {bodyInfo?.bodyFat ? `${bodyInfo.bodyFat}%` : "-"}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
          BMI
        </h4>
        {bodyInfo?.bmi ? (
          <div>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              {bodyInfo.bmi}
            </p>
            <p className={`text-sm ${bmiStatus?.className}`}>
              {bmiStatus?.text}
            </p>
          </div>
        ) : (
          <p className="text-xl font-semibold text-gray-900 dark:text-white">
            -
          </p>
        )}
      </div>
    </div>
  );
};

export default BodyInfoSummary;
