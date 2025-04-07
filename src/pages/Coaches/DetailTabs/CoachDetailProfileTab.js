import SectionCard from "../../../components/Shared/SectionCard";
import { formatDate } from "../../../utils/dateUtils";

const CoachDetailProfileTab = ({ coach }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <SectionCard title="기본 정보">
        <div className="flex flex-col items-center mb-4">
          <img
            src={coach.profileImage || "https://via.placeholder.com/150"}
            alt={coach.name}
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {coach.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {coach.gender}, {coach.age}세
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">연락처</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {coach.phone}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">이메일</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {coach.email}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">입사일</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {formatDate(coach.hireDate)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">상태</span>
            <span
              className={`font-medium ${
                coach.status === "active" ? "text-green-600" : "text-red-600"
              }`}
            >
              {coach.status === "active" ? "재직중" : "퇴사"}
            </span>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="전문 분야">
        <div className="flex flex-wrap gap-2">
          {coach.specialty.map((spec, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            >
              {spec}
            </span>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="신체 정보">
        <div className="space-y-4">
          {coach.bodyInfo ? (
            <>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">키</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {coach.bodyInfo.height} cm
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">체중</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {coach.bodyInfo.weight} kg
                </span>
              </div>
              {coach.bodyInfo.bodyFat !== undefined &&
                coach.bodyInfo.bodyFat !== null && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      체지방률
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {coach.bodyInfo.bodyFat}%
                    </span>
                  </div>
                )}
              {coach.bodyInfo.musclePercentage !== undefined &&
                coach.bodyInfo.musclePercentage !== null && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      근육량
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {coach.bodyInfo.musclePercentage}%
                    </span>
                  </div>
                )}
            </>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              등록된 신체 정보가 없습니다.
            </p>
          )}
        </div>
      </SectionCard>
    </div>
  );
};

export default CoachDetailProfileTab;
