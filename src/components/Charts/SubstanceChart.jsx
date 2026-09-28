import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Box, Typography } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

export const SubstanceChart = ({ data = [] }) => {
  const chartData = {
    labels: data.map((d) => d.substance),
    datasets: [
      {
        data: data.map((d) => d.count),
        backgroundColor: [
          '#D94B4B', // Heroin (Red)
          '#343A24', // Cocaine (Primary Dark)
          '#8A8060', // Meth (Khaki)
          '#3E7A4A', // Cannabis (Success Green)
          '#C68A22', // Synthetic (Warning)
          '#C8C4B5', // Opium (Border color)
        ],
        borderColor: '#FAF9F4',
        borderWidth: 2,
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#1F241A',
          boxWidth: 12,
          padding: 14,
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
        callbacks: {
          label: function (context) {
            const val = context.raw || 0;
            const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
            const pct = Math.round((val / total) * 100);
            return ` ${context.label}: ${val} seizures (${pct}%)`;
          },
        },
      },
    },
    cutout: '68%',
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', height: 260 }}>
      <Doughnut data={chartData} options={options} />
      {/* Center Label */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '32%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#1F241A', fontFamily: 'var(--font-mono)' }}>
          {data.reduce((acc, curr) => acc + curr.count, 0)}
        </Typography>
        <Typography variant="caption" sx={{ color: '#68705C', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 600 }}>
          Seizures
        </Typography>
      </Box>
    </Box>
  );
};
