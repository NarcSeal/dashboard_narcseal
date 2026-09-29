import React from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ErrorIcon from '@mui/icons-material/Error';
import InboxIcon from '@mui/icons-material/Inbox';

export const StateHandler = ({ loading, error, empty, emptyMessage = 'No records found matching filters', onRetry, children }) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 8 }}>
        <CircularProgress size={36} color="primary" sx={{ mb: 2 }} />
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Fetching cryptographic ledger telemetry...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 6, px: 2, textAlign: 'center' }}>
        <ErrorIcon color="error" sx={{ fontSize: 44, mb: 1.5 }} />
        <Typography variant="h6" sx={{ color: 'text.primary', mb: 0.5 }}>
          Command Connection Warning
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 450, mb: 2 }}>
          {error}
        </Typography>
        {onRetry && (
          <Button startIcon={<RefreshIcon />} variant="outlined" size="small" onClick={onRetry} color="primary">
            Retry Sync
          </Button>
        )}
      </Box>
    );
  }

  if (empty) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 7 }}>
        <InboxIcon sx={{ fontSize: 42, color: 'text.secondary', mb: 1 }} />
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {emptyMessage}
        </Typography>
      </Box>
    );
  }

  return children;
};
