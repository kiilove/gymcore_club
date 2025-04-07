import {
  FaUsers,
  FaUserTie,
  FaMoneyBillWave,
  FaCalendarAlt,
} from "react-icons/fa";

const DashboardSummary = ({ stats }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const summaryItems = [
    {
      title: "총 회원 수",
      value: stats.totalMembers,
      icon: FaUsers,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      textColor: "text-blue-500",
    },
    {
      title: "활성 회원",
      value: stats.activeMembers,
      icon: FaCalendarAlt,
      color: "bg-gradient-to-br from-green-500 to-green-600",
      textColor: "text-green-500",
    },
    {
      title: "총 코치 수",
      value: stats.totalCoaches,
      icon: FaUserTie,
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      textColor: "text-purple-500",
    },
    {
      title: "이번 달 매출",
      value: formatCurrency(stats.revenueThisMonth),
      icon: FaMoneyBillWave,
      color: "bg-gradient-to-br from-yellow-500 to-yellow-600",
      textColor: "text-yellow-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {summaryItems.map((item, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex items-center transform hover:-translate-y-1"
        >
          <div className={`${item.color} p-4 rounded-full`}>
            <item.icon className="text-white text-xl" />
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {item.title}
            </h3>
            <p
              className={`text-2xl font-bold ${item.textColor} dark:text-white`}
            >
              {item.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardSummary;
