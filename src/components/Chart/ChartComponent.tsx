"use client";

import React, { useState } from "react";
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
  ChartData,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { TransactionStats } from "@/types/TransactionStats";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement);

/**
 * Custom chart component displaying various transaction statistics.
 */
export function TransactionChart({
  avgPricePerSquareMeter,
}: {
  avgPricePerSquareMeter: TransactionStats[];
}): React.JSX.Element {
  // Retrieve the current year
  const currentYear = new Date().getFullYear();

  // State for selected start and end years
  const [selectedStartYear, setSelectedStartYear] = useState<number>(currentYear - 1);
  const [selectedEndYear, setSelectedEndYear] = useState<number>(currentYear);

  // Event handlers for year input changes
  const handleStartYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const startYear = parseInt(event.target.value, 10);
    if (!isNaN(startYear)) {
      setSelectedStartYear(startYear);
    }
  };

  const handleEndYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const endYear = parseInt(event.target.value, 10);
    if (!isNaN(endYear)) {
      setSelectedEndYear(endYear);
    }
  };

	  // Filter data based on selected years
		const filteredData = avgPricePerSquareMeter.filter(({ year }) => {
			return selectedStartYear <= year && year <= selectedEndYear;
		});

  // Chart options
  const chartOptions = {
    responsive: true,
    barThickness: 30 / (selectedEndYear - selectedStartYear),
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Transaction Statistics Chart",
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
        position: "left",
				min: Math.min(...filteredData.map(item => item.avgPricePerSquareMeter)) - 1000
      },
      y2: {
        type: "linear",
        display: true,
        position: "right",
      },
    },
  };



  // Chart data
  const chartData = {
    datasets: [
      {
        type: "line",
        label: "מחיר",
        data: filteredData.map(({ month, year, dealAmount }) => ({
          x: `${month.toString().padStart(2, "0")}/${year}`,
          y: (dealAmount / 1000000).toFixed(2),
        })),
        borderColor: "rgb(0, 255, 255)",
        borderWidth: "1",
        backgroundColor: "rgba(0, 255, 255, 0.5)",
        pointStyle: false,
        yAxisID: "y",
      },
      {
        type: "line",
        label: 'מחיר למ"ר',
        data: filteredData.map(({ month, year, avgPricePerSquareMeter }) => ({
          x: `${month.toString().padStart(2, "0")}/${year}`,
          y: avgPricePerSquareMeter,
        })),
        borderColor: "rgb(255, 99, 132)",
        borderWidth: "2",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointStyle: false,
        yAxisID: "y1",
      },
      {
        type: "bar",
        label: "מס' דירות שנמכרו",
        data: filteredData.map(({ month, year, totalCount }) => ({
          x: Number(month.toString().padStart(2, "0")) / year,
          y: Number(totalCount),
        })),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y2",
      },
    ],
  };

  return (
    <div className="transaction-chart-container">
      <label>
        Start Year:
        <input
          type="number"
          min={currentYear - 5}
          max={currentYear - 1}
          value={selectedEndYear}
          onChange={handleEndYearChange}
        />
      </label>
      <label>
        End Year:
        <input
          type="number"
          min={currentYear - selectedEndYear}
          max={currentYear}
          value={selectedStartYear}
          onChange={handleStartYearChange}
        />
      </label>
      <Chart type="bar" options={chartOptions as ChartOptions} data={chartData as ChartData} height={100} />
    </div>
  );
}
