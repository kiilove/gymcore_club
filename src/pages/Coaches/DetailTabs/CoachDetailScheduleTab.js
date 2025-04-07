import SectionCard from "../../../components/Shared/SectionCard";

const CoachDetailScheduleTab = ({ coach }) => {
  return (
    <SectionCard title="근무 일정">
      <div className="space-y-4">
        {coach.workSchedule ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(coach.workSchedule).map(([day, schedule]) => {
              const dayNames = {
                monday: "월요일",
                tuesday: "화요일",
                wednesday: "수요일",
                thursday: "목요일",
                friday: "금요일",
                saturday: "토요일",
                sunday: "일요일",
              };

              return (
                <div
                  key={day}
                  className={`p-4 rounded-lg border ${
                    schedule.isWorking
                      ? "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/10"
                      : "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-900/10"
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {dayNames[day]}
                    </h3>
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full ${
                        schedule.isWorking
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {schedule.isWorking ? "근무일" : "휴무일"}
                    </span>
                  </div>

                  {schedule.isWorking && (
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      근무 시간: {schedule.startTime} - {schedule.endTime}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            등록된 근무 일정이 없습니다.
          </p>
        )}
      </div>
    </SectionCard>
  );
};

export default CoachDetailScheduleTab;
