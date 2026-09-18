import React from 'react';
import { Chip } from '@mui/material';
import {
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
} from 'lucide-react';

const STATUS_CONFIG = {
  POSITIVE: { color: '#EF4444', bg: 'rgba(239, 68, 68, 0.12)', border: 'rgba(239, 68, 68, 0.3)', label: 'POSITIVE' },
  NEGATIVE: { color: '#22C55E', bg: 'rgba(34, 197, 94, 0.12)', border: 'rgba(34, 197, 94, 0.3)', label: 'NEGATIVE' },
  INCONCLUSIVE: { color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.3)', label: 'INCONCLUSIVE' },
  VERIFIED: { color: '#22C55E', bg: 'rgba(34, 197, 94, 0.12)', border: 'rgba(34, 197, 94, 0.3)', label: 'VERIFIED', Icon: ShieldCheck },
  PENDING: { color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.3)', label: 'PENDING', Icon: AlertTriangle },
  TAMPERED: { color: '#EF4444', bg: 'rgba(239, 68, 68, 0.12)', border: 'rgba(239, 68, 68, 0.3)', label: 'TAMPERED', Icon: ShieldAlert },
  ACTIVE: { color: '#22C55E', bg: 'rgba(34, 197, 94, 0.12)', border: 'rgba(34, 197, 94, 0.3)', label: 'ACTIVE' },
  OFFLINE: { color: '#6B7280', bg: 'rgba(107, 114, 128, 0.12)', border: 'rgba(107, 114, 128, 0.3)', label: 'OFFLINE' },
  SYNCED: { color: '#06B6D4', bg: 'rgba(6, 182, 212, 0.12)', border: 'rgba(6, 182, 212, 0.3)', label: 'SYNCED' },
};

export const StatusBadge = ({ status }) => {
  // Normalize status string
  const key = (status || '').toUpperCase().replace(/[^A-Z]/g, '');
  const matchedKey = Object.keys(STATUS_CONFIG).find((k) => key.includes(k));
  const config = STATUS_CONFIG[matchedKey] || {
    color: '#9CA3AF',
    bg: 'rgba(156, 163, 175, 0.12)',
    border: 'rgba(156, 163, 175, 0.3)',
    label: status || 'UNKNOWN',
  };

  return (
    <Chip
      label={config.label}
      size="small"
      icon={config.Icon ? <config.Icon size={13} style={{ color: config.color }} /> : undefined}
      sx={{
        bgcolor: config.bg,
        color: config.color,
        border: `1px solid ${config.border}`,
        fontWeight: 700,
        fontSize: '0.68rem',
        letterSpacing: '0.04em',
        height: 24,
        '& .MuiChip-icon': {
          ml: '6px',
        },
      }}
    />
  );
};
