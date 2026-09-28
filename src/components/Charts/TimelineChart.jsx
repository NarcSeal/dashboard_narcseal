import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Box } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const TimelineChart = ({ data = [] }) => {
  const chartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: 'Total Field Tests',
        data: data.map((d) => d.total),
        borderColor: '#343A24',
        backgroundColor: 'rgba(52, 58, 36, 0.08)',
        fill: true,
        tension: 0.35,
        borderWidth: 2,
        pointBackgroundColor: '#343A24',
        pointBorderColor: '#FAF9F4',
        pointHoverRadius: 5,
      },
      {
        label: 'Positive Contraband Seizures',
        data: data.map((d) => d.positive),
        borderColor: '#D94B4B',
        backgroundColor: 'rgba(217, 75, 75, 0.05)',
        fill: true,
        tension: 0.35,
        borderWidth: 2,
        pointBackgroundColor: '#D94B4B',
        pointBorderColor: '#FAF9F4',
        pointHoverRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          color: '#1F241A',
          boxWidth: 12,
          font: {
            size: 11,
            family: 'Inter',
          },
        },
      },
      tooltip: {
        backgroundColor: '#FAF9F4',
        titleColor: '#1F241A',
        bodyColor: '#68705C',
        borderColor: '#C8C4B5',
        borderWidth: 1,
        padding: 10,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(31, 36, 26, 0.05)',
        },
        ticks: {
          color: '#68705C',
          font: {
            size: 10,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(31, 36, 26, 0.05)',
        },
        ticks: {
          color: '#68705C',
          font: {
            size: 10,
          },
        },
      },
    },
  };

  return (
    <Box sx={{ width: '100%', height: 260 }}>
      <Line data={chartData} options={options} />
    </Box>
  );
};
