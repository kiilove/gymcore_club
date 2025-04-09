"use client";

import { useState } from "react";
import dayjs from "dayjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import Button from "../../Shared/Button";

// Chart.js 컴포넌트 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BodyInfoChart = ({ history }) => {
  const [chartType, setChartType] = useState("weight"); // 'weight', 'bodyFat', 'bmi', 'combined'

  if (!history || history.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500 dark:text-gray-400">
        차트를 표시할 데이터가 없습니다.
      </div>
    );
  }

  // 날짜 기준으로 정렬 (오래된 순)
  const sortedHistory = [...history].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  const labels = sortedHistory.map((record) =>
    dayjs(record.date).format("YYYY-MM-DD")
  );

  // 체중 차트 데이터
  const weightChartData = {
    labels,
    datasets: [
      {
        label: "체중 (kg)",
        data: sortedHistory.map((record) => record.weight),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
    ],
  };

  // 체지방률 차트 데이터
  const bodyFatChartData = {
    labels,
    datasets: [
      {
        label: "체지방률 (%)",
        data: sortedHistory.map((record) => record.bodyFat),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
    ],
  };

  // BMI 차트 데이터
  const bmiChartData = {
    labels,
    datasets: [
      {
        label: "BMI",
        data: sortedHistory.map((record) => record.bmi),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  // 통합 차트 데이터
  const combinedChartData = {
    labels,
    datasets: [
      {
        label: "체중 (kg)",
        data: sortedHistory.map((record) => record.weight),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        yAxisID: "y",
      },
      {
        label: "체지방률 (%)",
        data: sortedHistory.map((record) => record.bodyFat),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        yAxisID: "y1",
      },
      {
        label: "BMI",
        data: sortedHistory.map((record) => record.bmi),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        yAxisID: "y2",
      },
    ],
  };

  // 차트 옵션
  const singleChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text:
          chartType === "weight"
            ? "체중 변화 추이"
            : chartType === "bodyFat"
            ? "체지방률 변화 추이"
            : "BMI 변화 추이",
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  // 통합 차트 옵션
  const combinedChartOptions = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "신체 정보 통합 차트",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: "체중 (kg)",
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        title: {
          display: true,
          text: "체지방률 (%)",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      y2: {
        type: "linear",
        display: true,
        position: "right",
        title: {
          display: true,
          text: "BMI",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  // 체중 변화량 차트 데이터 (막대 그래프)
  const weightChangeData = {
    labels: labels.slice(1),
    datasets: [
      {
        label: "체중 변화량 (kg)",
        data: sortedHistory.slice(1).map((record, index) => {
          const prevWeight = sortedHistory[index].weight;
          return (record.weight - prevWeight).toFixed(1);
        }),
        backgroundColor: sortedHistory.slice(1).map((record, index) => {
          const prevWeight = sortedHistory[index].weight;
          const change = record.weight - prevWeight;
          return change < 0
            ? "rgba(75, 192, 192, 0.6)"
            : "rgba(255, 99, 132, 0.6)";
        }),
      },
    ],
  };

  const weightChangeOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "체중 변화량 (이전 측정 대비)",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // 현재 선택된 차트 타입에 따라 차트 렌더링
  const renderChart = () => {
    switch (chartType) {
      case "weight":
        return <Line options={singleChartOptions} data={weightChartData} />;
      case "bodyFat":
        return <Line options={singleChartOptions} data={bodyFatChartData} />;
      case "bmi":
        return <Line options={singleChartOptions} data={bmiChartData} />;
      case "combined":
        return <Line options={combinedChartOptions} data={combinedChartData} />;
      case "weightChange":
        return <Bar options={weightChangeOptions} data={weightChangeData} />;
      default:
        return <Line options={singleChartOptions} data={weightChartData} />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-center gap-2">
        <Button
          variant={chartType === "weight" ? "primary" : "secondary"}
          size="sm"
          onClick={() => setChartType("weight")}
        >
          체중
        </Button>
        <Button
          variant={chartType === "bodyFat" ? "primary" : "secondary"}
          size="sm"
          onClick={() => setChartType("bodyFat")}
        >
          체지방률
        </Button>
        <Button
          variant={chartType === "bmi" ? "primary" : "secondary"}
          size="sm"
          onClick={() => setChartType("bmi")}
        >
          BMI
        </Button>
        <Button
          variant={chartType === "combined" ? "primary" : "secondary"}
          size="sm"
          onClick={() => setChartType("combined")}
        >
          통합 차트
        </Button>
        <Button
          variant={chartType === "weightChange" ? "primary" : "secondary"}
          size="sm"
          onClick={() => setChartType("weightChange")}
        >
          체중 변화량
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
        <div className="h-80">{renderChart()}</div>
      </div>

      {chartType === "weight" && (
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md text-sm">
          <p className="font-medium mb-1">체중 변화 요약</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              초기 체중: {sortedHistory[0]?.weight} kg (
              {dayjs(sortedHistory[0]?.date).format("YYYY-MM-DD")})
            </li>
            <li>
              최근 체중: {sortedHistory[sortedHistory.length - 1]?.weight} kg (
              {dayjs(sortedHistory[sortedHistory.length - 1]?.date).format(
                "YYYY-MM-DD"
              )}
              )
            </li>
            <li>
              총 변화량:{" "}
              {(
                sortedHistory[sortedHistory.length - 1]?.weight -
                sortedHistory[0]?.weight
              ).toFixed(1)}{" "}
              kg
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default BodyInfoChart;
