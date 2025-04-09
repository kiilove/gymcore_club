"use client";

import { useState } from "react";
import { Trash2, BarChart2, Table } from "lucide-react";
import dayjs from "dayjs";
import { getBMIStatus } from "../../../utils/memberUtils";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Button from "../../Shared/Button";

// Chart.js 컴포넌트 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BodyInfoHistory = ({ history, onDelete }) => {
  const [viewMode, setViewMode] = useState("table"); // 'table' 또는 'chart'

  if (!history || history.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500 dark:text-gray-400">
        신체 측정 기록이 없습니다.
      </div>
    );
  }

  // 날짜 기준으로 정렬 (오래된 순)
  const sortedHistory = [...history].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // 차트 데이터 준비
  const chartData = {
    labels: sortedHistory.map((record) =>
      dayjs(record.date).format("YYYY-MM-DD")
    ),
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

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "신체 정보 변화 추이",
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            return `날짜: ${tooltipItems[0].label}`;
          },
          label: (context) => {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y;
            }
            return label;
          },
        },
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

  // 테이블 뷰 렌더링
  const renderTableView = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              측정일
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              키 (cm)
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              체중 (kg)
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              체지방률 (%)
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              BMI
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              작성자
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              메모
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              삭제
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {history.map((record) => {
            const bmiStatus = record.bmi ? getBMIStatus(record.bmi) : null;

            return (
              <tr
                key={record.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {dayjs(record.date).format("YYYY-MM-DD")}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {record.height || "-"}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {record.weight}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {record.bodyFat || "-"}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  {record.bmi ? (
                    <span className={bmiStatus?.className}>
                      {record.bmi} ({bmiStatus?.text})
                    </span>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {record.writtenBy || "-"}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-300">
                  <div className="max-w-xs truncate" title={record.notes}>
                    {record.notes || "-"}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-center">
                  <button
                    onClick={() => onDelete(record.id)}
                    className="text-gray-400 hover:text-red-600 dark:text-gray-500 dark:hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  // 차트 뷰 렌더링
  const renderChartView = () => (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
      <div className="h-80">
        <Line options={chartOptions} data={chartData} />
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex justify-end mb-4">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <Button
            type="button"
            variant={viewMode === "table" ? "primary" : "secondary"}
            className="rounded-r-none"
            onClick={() => setViewMode("table")}
          >
            <Table className="h-4 w-4 mr-2" />
            테이블
          </Button>
          <Button
            type="button"
            variant={viewMode === "chart" ? "primary" : "secondary"}
            className="rounded-l-none"
            onClick={() => setViewMode("chart")}
          >
            <BarChart2 className="h-4 w-4 mr-2" />
            차트
          </Button>
        </div>
      </div>

      {viewMode === "table" ? renderTableView() : renderChartView()}
    </div>
  );
};

export default BodyInfoHistory;
