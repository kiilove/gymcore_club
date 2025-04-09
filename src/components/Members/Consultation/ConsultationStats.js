"use client";

import { useState, useEffect } from "react";
import dayjs from "dayjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

// Chart.js 컴포넌트 등록 - 추가 요소 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ConsultationStats = ({ consultations }) => {
  const [stats, setStats] = useState({
    byCategory: {
      labels: [],
      data: [],
    },
    byMonth: {
      labels: [],
      data: [],
    },
    trend: {
      labels: [],
      data: [],
    },
  });

  useEffect(() => {
    if (!consultations || consultations.length === 0) return;

    // 카테고리별 통계
    const categoryCount = {};
    consultations.forEach((consultation) => {
      const category = consultation.category || "일반상담";
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });

    const categoryLabels = Object.keys(categoryCount);
    const categoryData = categoryLabels.map(
      (category) => categoryCount[category]
    );

    // 월별 통계 (최근 6개월)
    const monthCount = {};
    const today = dayjs();
    const monthLabels = [];
    const monthDisplayLabels = [];

    // 최근 6개월 초기화
    for (let i = 5; i >= 0; i--) {
      const monthDate = today.subtract(i, "month");
      const month = monthDate.format("YYYY-MM");
      const displayMonth = monthDate.format("YY년 MM월");
      monthCount[month] = 0;
      monthLabels.push(month);
      monthDisplayLabels.push(displayMonth);
    }

    // 상담 기록 카운트
    consultations.forEach((consultation) => {
      if (consultation.date) {
        const month = dayjs(consultation.date).format("YYYY-MM");
        if (monthCount[month] !== undefined) {
          monthCount[month] += 1;
        }
      }
    });

    const monthData = monthLabels.map((month) => monthCount[month]);

    // 상담 추세 데이터 (최근 12개 상담)
    const recentConsultations = [...consultations]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(-12);

    const trendLabels = recentConsultations.map((c) =>
      dayjs(c.date).format("MM/DD")
    );

    // 누적 상담 횟수 계산
    const trendData = [];
    let cumulativeCount = 0;
    recentConsultations.forEach(() => {
      cumulativeCount += 1;
      trendData.push(cumulativeCount);
    });

    setStats({
      byCategory: {
        labels: categoryLabels,
        data: categoryData,
      },
      byMonth: {
        labels: monthDisplayLabels,
        data: monthData,
      },
      trend: {
        labels: trendLabels,
        data: trendData,
      },
    });
  }, [consultations]);

  if (!consultations || consultations.length === 0) {
    return null;
  }

  // 차트 색상
  const backgroundColors = [
    "rgba(54, 162, 235, 0.6)",
    "rgba(75, 192, 192, 0.6)",
    "rgba(255, 206, 86, 0.6)",
    "rgba(255, 99, 132, 0.6)",
    "rgba(153, 102, 255, 0.6)",
    "rgba(255, 159, 64, 0.6)",
  ];

  // 카테고리별 차트 옵션 및 데이터
  const categoryChartData = {
    labels: stats.byCategory.labels,
    datasets: [
      {
        label: "상담 횟수",
        data: stats.byCategory.data,
        backgroundColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };

  const categoryChartOptions = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  // 월별 차트 옵션 및 데이터
  const monthChartData = {
    labels: stats.byMonth.labels,
    datasets: [
      {
        label: "상담 횟수",
        data: stats.byMonth.data,
        backgroundColor: "rgba(79, 70, 229, 0.6)",
        borderColor: "rgba(79, 70, 229, 1)",
        borderWidth: 1,
      },
    ],
  };

  const monthChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  // 상담 추세 차트 데이터 및 옵션
  const trendChartData = {
    labels: stats.trend.labels,
    datasets: [
      {
        label: "누적 상담 횟수",
        data: stats.trend.data,
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const trendChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => `날짜: ${tooltipItems[0].label}`,
          label: (context) => `누적 상담 횟수: ${context.parsed.y}회`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  // 카테고리 파이 차트 데이터
  const categoryPieData = {
    labels: stats.byCategory.labels,
    datasets: [
      {
        data: stats.byCategory.data,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors.map((color) => color.replace("0.6", "1")),
        borderWidth: 1,
      },
    ],
  };

  const categoryPieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          boxWidth: 15,
          font: {
            size: 11,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value}회 (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="mt-6 mb-8">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        상담 통계
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* 카테고리별 통계 */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            상담 유형별 통계
          </h4>
          <div className="h-64">
            <Bar data={categoryChartData} options={categoryChartOptions} />
          </div>
        </div>

        {/* 월별 통계 */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            월별 상담 통계 (최근 6개월)
          </h4>
          <div className="h-64">
            <Bar data={monthChartData} options={monthChartOptions} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 상담 추세 차트 */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            상담 추세 (최근 12회)
          </h4>
          <div className="h-64">
            <Line data={trendChartData} options={trendChartOptions} />
          </div>
        </div>

        {/* 카테고리 파이 차트 */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            상담 유형 분포
          </h4>
          <div className="h-64 flex items-center justify-center">
            <Pie data={categoryPieData} options={categoryPieOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationStats;
