import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import SecurityIcon from '@mui/icons-material/Security';

export const ChainBlock = ({ block, isLast }) => {
  const isTampered = block.status === 'TAMPERED' || block.status === 'BROKEN_CHAIN';
  const borderColor = isTampered ? '#D94B4B' : '#3E7A4A';
  const statusColor = isTampered ? 'error' : 'success';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 780 }}>
      {/* Merkle Block Card */}
      <Card
        sx={{
          width: '100%',
          bgcolor: isTampered ? 'rgba(217, 75, 75, 0.05)' : '#FAF9F4',
          border: `1.5px solid ${borderColor}`,
          borderRadius: 2,
          position: 'relative',
          boxShadow: 'none',
        }}
      >
        {/* Top Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: isTampered ? 'rgba(217, 75, 75, 0.1)' : 'rgba(62, 122, 74, 0.1)',
            px: 2,
            py: 1,
            borderBottom: `1px solid ${borderColor}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FingerprintIcon sx={{ color: borderColor, fontSize: 18 }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary', fontFamily: 'monospace' }}>
              BLOCK #{block.block_index}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
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
            <Box sx={{ mb: 1.5, p: 1, bgcolor: 'rgba(217, 75, 75, 0.1)', border: '1px solid #D94B4B', borderRadius: 1 }}>
              <Typography variant="caption" sx={{ color: '#D94B4B', fontWeight: 700, display: 'block' }}>
                CRITICAL INTEGRITY FAILURE: {block.tamper_reason}
              </Typography>
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5, flexWrap: 'wrap', gap: 1 }}>
            <Box>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>RECORD IDENTIFIER</Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary', fontFamily: 'monospace' }}>
                {block.record_id}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>OFFICER SIGNATURE</Typography>
              <Typography variant="body2" sx={{ color: '#343A24', fontFamily: 'monospace', fontWeight: 600 }}>
                {block.signature}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>ANALYSIS RESULT</Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, color: block.result === 'POSITIVE' ? '#D94B4B' : '#3E7A4A' }}>
                {block.substance} ({block.result})
              </Typography>
            </Box>
          </Box>

          {/* Hash Relationship Section */}
          <Box sx={{ bgcolor: '#F3F0E5', p: 1.5, borderRadius: 1.5, border: '1px solid #C8C4B5' }}>
            <Box sx={{ mb: 1 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem', fontWeight: 600 }}>
                PREVIOUS BLOCK HASH (PARENT LINK):
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  fontFamily: 'monospace',
                  color: isTampered ? '#D94B4B' : '#8A8060',
                  fontWeight: 600,
                  wordBreak: 'break-all',
                  fontSize: '0.75rem',
                }}
              >
                {block.prev_hash}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" sx={{ color: isTampered ? '#D94B4B' : '#343A24', fontSize: '0.7rem', fontWeight: 700 }}>
                CURRENT BLOCK MERKLE HASH:
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  fontFamily: 'monospace',
                  color: isTampered ? '#D94B4B' : '#3E7A4A',
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
          <Box sx={{ width: '2px', height: '14px', bgcolor: isTampered ? '#D94B4B' : '#C8C4B5' }} />
          <ArrowDownwardIcon sx={{ color: isTampered ? '#D94B4B' : '#C8C4B5', fontSize: 18 }} />
          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.65rem', fontFamily: 'monospace', fontWeight: 600 }}>
            CRYPTOGRAPHIC CHAIN LINK
          </Typography>
          <Box sx={{ width: '2px', height: '14px', bgcolor: isTampered ? '#D94B4B' : '#C8C4B5' }} />
        </Box>
      )}
    </Box>
  );
};
