import SectionCard from "../../../components/Shared/SectionCard";

const CoachDetailExperienceTab = ({ coach }) => {
  return (
    <SectionCard title="경력 사항">
      <div className="space-y-6">
        {coach.experience && coach.experience.length > 0 ? (
          coach.experience.map((exp, index) => (
            <div
              key={index}
              className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 relative group"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {exp.company}
                </h3>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {exp.period}
                </span>
              </div>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                {exp.position}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            등록된 경력 사항이 없습니다.
          </p>
        )}
      </div>
    </SectionCard>
  );
};

export default CoachDetailExperienceTab;
