"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ChartOptions,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { TransactionStats } from "@/types/TransactionStats";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement);

export const options = {
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "Chart.js Line Chart - Multi Axis",
    },
  },
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
    },
    y1: {
      type: "linear",
      display: true,
      position: "right",

      // grid line settings
      grid: {
        drawOnChartArea: false, // only want the grid lines for one axis to show up
      },
    },
  },
};

export function Chart2({ avgPricePerSquareMeter }: { avgPricePerSquareMeter: TransactionStats[] }): React.JSX.Element {
  const data = {
    // labels,
    datasets: [
      {
        type: "bar",
        label: 'מחיר למ"ר',
        data: avgPricePerSquareMeter.map(({ month, year, avgPricePerSquareMeter }) => ({
          x: `${month.toString().padStart(2, "0")}/${year}`,
          y: avgPricePerSquareMeter,
        })),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
      },
      {
        type: "line",
        label: "מס' דירות שנמכרו",
        data: avgPricePerSquareMeter.map(({ month, year, totalCount }) => ({
          x: `${month.toString().padStart(2, "0")}/${year}`,
          y: Number(totalCount),
        })),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y1",
      },
    ],
  };

  return <Chart type={"bar"} options={options as ChartOptions} data={data} />;
}
