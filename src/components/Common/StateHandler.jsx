import React from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ErrorIcon from '@mui/icons-material/Error';
import InboxIcon from '@mui/icons-material/Inbox';

export const StateHandler = ({ loading, error, empty, emptyMessage = 'No records found matching filters', onRetry, children }) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 8 }}>
        <CircularProgress size={36} sx={{ color: '#38bdf8', mb: 2 }} />
        <Typography variant="body2" sx={{ color: '#94a3b8' }}>
          Fetching cryptographic ledger telemetry...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 6, px: 2, textAlign: 'center' }}>
        <ErrorIcon sx={{ fontSize: 44, color: '#ef4444', mb: 1.5 }} />
        <Typography variant="h6" sx={{ color: '#f8fafc', mb: 0.5 }}>
          Command Connection Warning
        </Typography>
        <Typography variant="body2" sx={{ color: '#94a3b8', maxWidth: 450, mb: 2 }}>
          {error}
        </Typography>
        {onRetry && (
          <Button startIcon={<RefreshIcon />} variant="outlined" size="small" onClick={onRetry} sx={{ color: '#38bdf8', borderColor: '#38bdf8' }}>
            Retry Sync
          </Button>
        )}
      </Box>
    );
  }

  if (empty) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 7 }}>
        <InboxIcon sx={{ fontSize: 42, color: '#475569', mb: 1 }} />
        <Typography variant="body2" sx={{ color: '#94a3b8' }}>
          {emptyMessage}
        </Typography>
      </Box>
    );
  }

  return children;
};
