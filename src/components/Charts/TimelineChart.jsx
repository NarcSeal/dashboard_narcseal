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
        borderColor: '#38bdf8',
        backgroundColor: 'rgba(56, 189, 248, 0.08)',
        fill: true,
        tension: 0.35,
        borderWidth: 2,
        pointBackgroundColor: '#38bdf8',
        pointBorderColor: '#0f172a',
        pointHoverRadius: 5,
      },
      {
        label: 'Positive Contraband Seizures',
        data: data.map((d) => d.positive),
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.05)',
        fill: true,
        tension: 0.35,
        borderWidth: 2,
        pointBackgroundColor: '#ef4444',
        pointBorderColor: '#0f172a',
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
          color: '#cbd5e1',
          boxWidth: 12,
          font: {
            size: 11,
            family: 'Inter',
          },
        },
      },
      tooltip: {
        backgroundColor: '#0f172a',
        titleColor: '#f8fafc',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(56, 189, 248, 0.3)',
        borderWidth: 1,
        padding: 10,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.04)',
        },
        ticks: {
          color: '#64748b',
          font: {
            size: 10,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: '#64748b',
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
