import SectionCard from "../../../components/Shared/SectionCard";
import { formatDate } from "../../../utils/dateUtils";

const CoachDetailQualificationsTab = ({ coach }) => {
  return (
    <SectionCard title="자격 및 학위">
      <div className="space-y-6">
        {coach.certifications && coach.certifications.length > 0 ? (
          coach.certifications.map((cert, index) => (
            <div
              key={index}
              className="border-l-4 border-blue-500 pl-4 py-2 relative group"
            >
              <div className="flex justify-between items-start">
                <div className="font-medium text-gray-900 dark:text-white">
                  {cert.name}
                </div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                취득일: {formatDate(cert.issueDate)}
              </div>
              {cert.institution && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  발급기관: {cert.institution}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            등록된 자격증이 없습니다.
          </p>
        )}
      </div>
    </SectionCard>
  );
};

export default CoachDetailQualificationsTab;
