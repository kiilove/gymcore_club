"use client";

const CoachWorkScheduleTab = ({ formData, updateFormData }) => {
  const daysOfWeek = [
    { id: "monday", label: "월요일" },
    { id: "tuesday", label: "화요일" },
    { id: "wednesday", label: "수요일" },
    { id: "thursday", label: "목요일" },
    { id: "friday", label: "금요일" },
    { id: "saturday", label: "토요일" },
    { id: "sunday", label: "일요일" },
  ];

  const handleWorkingDayChange = (day, isWorking) => {
    const updatedSchedule = {
      ...formData.workSchedule,
      [day]: {
        ...formData.workSchedule[day],
        isWorking,
      },
    };
    updateFormData({ workSchedule: updatedSchedule });
  };

  const handleTimeChange = (day, field, value) => {
    const updatedSchedule = {
      ...formData.workSchedule,
      [day]: {
        ...formData.workSchedule[day],
        [field]: value,
      },
    };
    updateFormData({ workSchedule: updatedSchedule });
  };

  const applyToAll = (template) => {
    const templateDay = formData.workSchedule[template];
    const updatedSchedule = { ...formData.workSchedule };

    daysOfWeek.forEach((day) => {
      if (day.id !== template) {
        updatedSchedule[day.id] = { ...templateDay };
      }
    });

    updateFormData({ workSchedule: updatedSchedule });
  };

  const clearAll = () => {
    const updatedSchedule = { ...formData.workSchedule };

    daysOfWeek.forEach((day) => {
      updatedSchedule[day.id] = {
        isWorking: false,
        startTime: "",
        endTime: "",
      };
    });

    updateFormData({ workSchedule: updatedSchedule });
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          근무 일정
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          코치의 근무 요일과 시간을 설정하세요. 근무하지 않는 날은 체크를
          해제하세요.
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <button
            type="button"
            onClick={() => applyToAll("monday")}
            className="px-3 py-1.5 text-xs bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-800/40"
          >
            월요일 일정을 모두에게 적용
          </button>
          <button
            type="button"
            onClick={() => applyToAll("tuesday")}
            className="px-3 py-1.5 text-xs bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-800/40"
          >
            화요일 일정을 모두에게 적용
          </button>
          <button
            type="button"
            onClick={clearAll}
            className="px-3 py-1.5 text-xs bg-red-100 text-red-700 rounded-md hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-800/40"
          >
            모든 일정 초기화
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {daysOfWeek.map((day) => (
          <div
            key={day.id}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`working-${day.id}`}
                  checked={formData.workSchedule[day.id].isWorking}
                  onChange={(e) =>
                    handleWorkingDayChange(day.id, e.target.checked)
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor={`working-${day.id}`}
                  className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {day.label} 근무
                </label>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {formData.workSchedule[day.id].isWorking ? "근무일" : "휴무일"}
              </div>
            </div>

            {formData.workSchedule[day.id].isWorking && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={`start-${day.id}`}
                    className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1"
                  >
                    시작 시간
                  </label>
                  <input
                    type="time"
                    id={`start-${day.id}`}
                    value={formData.workSchedule[day.id].startTime}
                    onChange={(e) =>
                      handleTimeChange(day.id, "startTime", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor={`end-${day.id}`}
                    className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1"
                  >
                    종료 시간
                  </label>
                  <input
                    type="time"
                    id={`end-${day.id}`}
                    value={formData.workSchedule[day.id].endTime}
                    onChange={(e) =>
                      handleTimeChange(day.id, "endTime", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoachWorkScheduleTab;
