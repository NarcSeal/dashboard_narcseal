import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import SecurityIcon from '@mui/icons-material/Security';

export const ChainBlock = ({ block, isLast }) => {
  const isTampered = block.status === 'TAMPERED' || block.status === 'BROKEN_CHAIN';
  const borderColor = isTampered ? '#ef4444' : '#10b981';
  const statusColor = isTampered ? 'error' : 'success';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 780 }}>
      {/* Merkle Block Card */}
      <Card
        sx={{
          width: '100%',
          bgcolor: isTampered ? 'rgba(239, 68, 68, 0.05)' : '#0f172a',
          border: `1.5px solid ${borderColor}`,
          borderRadius: 2,
          position: 'relative',
          boxShadow: isTampered ? '0 0 15px rgba(239, 68, 68, 0.2)' : 'none',
        }}
      >
        {/* Top Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: isTampered ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.1)',
            px: 2,
            py: 1,
            borderBottom: `1px solid ${borderColor}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FingerprintIcon sx={{ color: borderColor, fontSize: 18 }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#f8fafc', fontFamily: 'monospace' }}>
              BLOCK #{block.block_index}
            </Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
              • {block.timestamp}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              icon={isTampered ? <CancelIcon /> : <CheckCircleIcon />}
              label={block.status}
              color={statusColor}
              size="small"
              sx={{ fontWeight: 700, fontFamily: 'monospace', fontSize: '0.72rem' }}
            />
          </Box>
        </Box>

        <CardContent sx={{ p: 2 }}>
          {isTampered && block.tamper_reason && (
            <Box sx={{ mb: 1.5, p: 1, bgcolor: 'rgba(239, 68, 68, 0.2)', borderRadius: 1 }}>
              <Typography variant="caption" sx={{ color: '#fca5a5', fontWeight: 700, display: 'block' }}>
                CRITICAL INTEGRITY FAILURE: {block.tamper_reason}
              </Typography>
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5, flexWrap: 'wrap', gap: 1 }}>
            <Box>
              <Typography variant="caption" sx={{ color: '#64748b' }}>RECORD IDENTIFIER</Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#f8fafc', fontFamily: 'monospace' }}>
                {block.record_id}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: '#64748b' }}>OFFICER SIGNATURE</Typography>
              <Typography variant="body2" sx={{ color: '#38bdf8', fontFamily: 'monospace' }}>
                {block.signature}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: '#64748b' }}>ANALYSIS RESULT</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, color: block.result === 'POSITIVE' ? '#ef4444' : '#10b981' }}>
                {block.substance} ({block.result})
              </Typography>
            </Box>
          </Box>

          {/* Hash Relationship Section */}
          <Box sx={{ bgcolor: '#080d1a', p: 1.5, borderRadius: 1.5, border: '1px solid rgba(255,255,255,0.06)' }}>
            <Box sx={{ mb: 1 }}>
              <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.7rem' }}>
                PREVIOUS BLOCK HASH (PARENT LINK):
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  fontFamily: 'monospace',
                  color: isTampered ? '#ef4444' : '#94a3b8',
                  wordBreak: 'break-all',
                  fontSize: '0.75rem',
                }}
              >
                {block.prev_hash}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" sx={{ color: isTampered ? '#ef4444' : '#38bdf8', fontSize: '0.7rem', fontWeight: 600 }}>
                CURRENT BLOCK MERKLE HASH:
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  fontFamily: 'monospace',
                  color: isTampered ? '#ef4444' : '#34d399',
                  fontWeight: 600,
                  wordBreak: 'break-all',
                  fontSize: '0.75rem',
                }}
              >
                {block.current_hash}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Downward connecting chain link indicator */}
      {!isLast && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 1 }}>
          <Box sx={{ width: '2px', height: '14px', bgcolor: isTampered ? '#ef4444' : '#38bdf8' }} />
          <ArrowDownwardIcon sx={{ color: isTampered ? '#ef4444' : '#38bdf8', fontSize: 18 }} />
          <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.65rem', fontFamily: 'monospace' }}>
            CRYPTOGRAPHIC CHAIN LINK
          </Typography>
          <Box sx={{ width: '2px', height: '14px', bgcolor: isTampered ? '#ef4444' : '#38bdf8' }} />
        </Box>
      )}
    </Box>
  );
};
