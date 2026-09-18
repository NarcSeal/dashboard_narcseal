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
          '#ef4444', // Heroin (Red)
          '#38bdf8', // Cocaine (Sky blue)
          '#a855f7', // Meth (Purple)
          '#10b981', // Cannabis (Emerald)
          '#f59e0b', // Synthetic (Amber)
          '#64748b', // Opium (Slate)
        ],
        borderColor: '#0f172a',
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
          color: '#cbd5e1',
          boxWidth: 12,
          padding: 14,
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
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#f8fafc', fontFamily: 'var(--font-mono)' }}>
          {data.reduce((acc, curr) => acc + curr.count, 0)}
        </Typography>
        <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.7rem', textTransform: 'uppercase' }}>
          Seizures
        </Typography>
      </Box>
    </Box>
  );
};
