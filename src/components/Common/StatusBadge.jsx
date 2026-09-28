import React from 'react';
import { Chip } from '@mui/material';
import {
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
} from 'lucide-react';

const STATUS_CONFIG = {
  POSITIVE: { color: '#D94B4B', bg: 'rgba(217, 75, 75, 0.12)', border: 'rgba(217, 75, 75, 0.3)', label: 'POSITIVE' },
  NEGATIVE: { color: '#3F7A4D', bg: 'rgba(63, 122, 77, 0.12)', border: 'rgba(63, 122, 77, 0.3)', label: 'NEGATIVE' },
  INCONCLUSIVE: { color: '#C78B21', bg: 'rgba(199, 139, 33, 0.12)', border: 'rgba(199, 139, 33, 0.3)', label: 'INCONCLUSIVE' },
  VERIFIED: { color: '#3F7A4D', bg: 'rgba(63, 122, 77, 0.12)', border: 'rgba(63, 122, 77, 0.3)', label: 'VERIFIED', Icon: ShieldCheck },
  PENDING: { color: '#C78B21', bg: 'rgba(199, 139, 33, 0.12)', border: 'rgba(199, 139, 33, 0.3)', label: 'PENDING', Icon: AlertTriangle },
  TAMPERED: { color: '#D94B4B', bg: 'rgba(217, 75, 75, 0.12)', border: 'rgba(217, 75, 75, 0.3)', label: 'TAMPERED', Icon: ShieldAlert },
  ACTIVE: { color: '#3F7A4D', bg: 'rgba(63, 122, 77, 0.12)', border: 'rgba(63, 122, 77, 0.3)', label: 'ACTIVE' },
  OFFLINE: { color: '#85877A', bg: 'rgba(133, 135, 122, 0.12)', border: 'rgba(133, 135, 122, 0.3)', label: 'OFFLINE' },
  SYNCED: { color: '#303722', bg: 'rgba(48, 55, 34, 0.12)', border: 'rgba(48, 55, 34, 0.3)', label: 'SYNCED' },
};

export const StatusBadge = ({ status }) => {
  // Normalize status string
  const key = (status || '').toUpperCase().replace(/[^A-Z]/g, '');
  const matchedKey = Object.keys(STATUS_CONFIG).find((k) => key.includes(k));
  const config = STATUS_CONFIG[matchedKey] || {
    color: '#85877A',
    bg: 'rgba(133, 135, 122, 0.12)',
    border: 'rgba(133, 135, 122, 0.3)',
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
