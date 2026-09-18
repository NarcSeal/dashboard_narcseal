import React from 'react';
import { Box, Skeleton } from '@mui/material';

/**
 * Forensic scanner-style skeleton loader
 * Replaces generic spinners with cybersecurity-themed loading placeholders
 */

export const SkeletonCard = ({ height = 120 }) => (
  <Box
    className="skeleton-scanner"
    sx={{
      height,
      borderRadius: '16px',
      border: '1px solid #374151',
      bgcolor: '#111827',
    }}
  />
);

export const SkeletonTable = ({ rows = 5, cols = 6 }) => (
  <Box sx={{ borderRadius: '16px', border: '1px solid #374151', bgcolor: '#111827', overflow: 'hidden' }}>
    {/* Header */}
    <Box sx={{ display: 'flex', gap: 2, p: 2, bgcolor: '#0D1117', borderBottom: '1px solid #374151' }}>
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton
          key={i}
          variant="rounded"
          sx={{ bgcolor: '#1F2937', borderRadius: '6px', flex: 1, height: 14 }}
        />
      ))}
    </Box>
    {/* Rows */}
    {Array.from({ length: rows }).map((_, row) => (
      <Box
        key={row}
        sx={{
          display: 'flex',
          gap: 2,
          p: 2,
          borderBottom: row < rows - 1 ? '1px solid rgba(55, 65, 81, 0.4)' : 'none',
        }}
      >
        {Array.from({ length: cols }).map((_, col) => (
          <Skeleton
            key={col}
            variant="rounded"
            sx={{
              bgcolor: '#1F2937',
              borderRadius: '6px',
              flex: col === 0 ? 0.7 : 1,
              height: 12,
              opacity: 0.6 + Math.random() * 0.4,
            }}
          />
        ))}
      </Box>
    ))}
  </Box>
);

export const SkeletonChart = ({ height = 260 }) => (
  <Box
    className="skeleton-scanner"
    sx={{
      height,
      borderRadius: '16px',
      border: '1px solid #374151',
      bgcolor: '#111827',
      display: 'flex',
      alignItems: 'flex-end',
      p: 3,
      gap: 1,
    }}
  >
    {Array.from({ length: 12 }).map((_, i) => (
      <Box
        key={i}
        sx={{
          flex: 1,
          height: `${20 + Math.random() * 60}%`,
          bgcolor: 'rgba(6, 182, 212, 0.08)',
          borderRadius: '4px 4px 0 0',
          border: '1px solid rgba(6, 182, 212, 0.1)',
        }}
      />
    ))}
  </Box>
);

export const SkeletonStatCards = () => (
  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2.5 }}>
    {Array.from({ length: 4 }).map((_, i) => (
      <SkeletonCard key={i} height={130} />
    ))}
  </Box>
);
