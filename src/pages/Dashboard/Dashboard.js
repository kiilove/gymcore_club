import PageTitle from "../../components/Shared/PageTitle";
import SectionCard from "../../components/Shared/SectionCard";
import DashboardSummary from "../../components/Dashboard/DashboardSummary";
import RevenueChart from "../../components/Dashboard/RevenueChart";
import AttendanceChart from "../../components/Dashboard/AttendanceChart";
import PopularProducts from "../../components/Dashboard/PopularProducts";
import ExpiringMemberships from "../../components/Dashboard/ExpiringMemberships";
import RecentPayments from "../../components/Dashboard/RecentPayments";
import { dashboardStats } from "../../datas/mockData";
import { FaChartBar } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div>
      <PageTitle
        title="대시보드"
        subtitle="GymCore 클럽의 주요 지표와 통계를 확인하세요."
        icon={FaChartBar}
      />

      <DashboardSummary stats={dashboardStats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <SectionCard title="월별 매출" variant="gradient">
          <RevenueChart data={dashboardStats.revenueByMonth} />
        </SectionCard>

        <SectionCard title="일별 방문자 수" variant="gradient">
          <AttendanceChart data={dashboardStats.memberAttendance} />
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <SectionCard title="인기 상품" variant="accent">
          <PopularProducts products={dashboardStats.popularProducts} />
        </SectionCard>

        <SectionCard title="곧 만료되는 회원권" variant="warning">
          <ExpiringMemberships
            memberships={dashboardStats.membershipExpiringSoon}
          />
        </SectionCard>

        <SectionCard title="최근 결제 내역" variant="success">
          <RecentPayments payments={dashboardStats.recentPayments} />
        </SectionCard>
      </div>
    </div>
  );
};

export default Dashboard;
