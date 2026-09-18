import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Box,
  Typography,
  Divider,
  Chip,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import VerifiedIcon from '@mui/icons-material/Verified';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import KeyIcon from '@mui/icons-material/Key';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import { StatusBadge } from '../Common/StatusBadge';

export const EvidenceModal = ({ open, record, onClose }) => {
  if (!record) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#0d1527',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          borderRadius: 2.5,
          color: '#f8fafc',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          pb: 1.5,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <VerifiedIcon sx={{ color: record.tamper_flag ? '#ef4444' : '#10b981', fontSize: 24 }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              NCB Forensic Evidence Dossier
            </Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8', fontFamily: 'monospace' }}>
              RECORD REF: {record.id}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} sx={{ color: '#94a3b8' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ mt: 2, pb: 1 }}>
        <Grid container spacing={3}>
          {/* Left Column: Evidence Image & Geolocation */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                width: '100%',
                height: 240,
                borderRadius: 2,
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                bgcolor: '#080d1a',
                position: 'relative',
              }}
            >
              <img
                src={record.image_url}
                alt={record.substance}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  bgcolor: 'rgba(0,0,0,0.7)',
                  px: 1,
                  py: 0.3,
                  borderRadius: 1,
                }}
              >
                <Typography variant="caption" sx={{ color: '#38bdf8', fontFamily: 'monospace' }}>
                  RAW OPTICAL CAPTURE
                </Typography>
              </Box>
            </Box>

            {/* Geolocation Card */}
            <Box
              sx={{
                mt: 2,
                p: 1.5,
                borderRadius: 1.5,
                bgcolor: '#111b30',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.8 }}>
                <GpsFixedIcon sx={{ color: '#38bdf8', fontSize: 18 }} />
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#f8fafc', textTransform: 'uppercase' }}>
                  GPS Telemetry Seal
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#94a3b8', fontSize: '0.82rem', mb: 0.5 }}>
                {record.location_name}
              </Typography>
              <Typography variant="caption" sx={{ color: '#38bdf8', fontFamily: 'monospace', display: 'block' }}>
                LAT: {record.gps_lat.toFixed(4)}° N | LNG: {record.gps_lng.toFixed(4)}° E
              </Typography>
            </Box>
          </Grid>

          {/* Right Column: Chemical & Cryptographic Details */}
          <Grid item xs={12} md={7}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
              <Box>
                <Typography variant="caption" sx={{ color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Sample Classified
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#f8fafc' }}>
                  {record.substance}
                </Typography>
              </Box>
              <StatusBadge status={record.result} />
            </Box>

            <Grid container spacing={1.5} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <Box sx={{ bgcolor: '#111b30', p: 1.2, borderRadius: 1.5 }}>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>
                    AI Confidence
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#10b981', fontWeight: 700, fontFamily: 'monospace' }}>
                    {record.confidence_score}%
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ bgcolor: '#111b30', p: 1.2, borderRadius: 1.5 }}>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>
                    Gross Net Weight
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#f59e0b', fontWeight: 700, fontFamily: 'monospace' }}>
                    {record.weight_grams} g
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            {/* Officer & Device Metadata */}
            <Box sx={{ bgcolor: '#111b30', p: 1.5, borderRadius: 1.5, mb: 2 }}>
              <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, display: 'block', mb: 0.8 }}>
                OFFICER & DEVICE CHAIN OF CUSTODY
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="caption" sx={{ color: '#64748b' }}>Investigating Officer:</Typography>
                <Typography variant="caption" sx={{ color: '#f8fafc', fontWeight: 600 }}>
                  {record.officer_name} ({record.officer_badge})
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="caption" sx={{ color: '#64748b' }}>Jurisdiction Station:</Typography>
                <Typography variant="caption" sx={{ color: '#f8fafc' }}>{record.station}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="caption" sx={{ color: '#64748b' }}>Hardware Token ID:</Typography>
                <Typography variant="caption" sx={{ color: '#38bdf8', fontFamily: 'monospace' }}>{record.device_id}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="caption" sx={{ color: '#64748b' }}>Acquisition Timestamp:</Typography>
                <Typography variant="caption" sx={{ color: '#f8fafc', fontFamily: 'monospace' }}>{record.timestamp}</Typography>
              </Box>
            </Box>

            {/* Cryptographic Hashes (NDPS 65B Standard) */}
            <Box sx={{ bgcolor: '#080d1a', p: 1.5, borderRadius: 1.5, border: '1px solid rgba(255,255,255,0.06)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <KeyIcon sx={{ color: '#f59e0b', fontSize: 16 }} />
                <Typography variant="caption" sx={{ color: '#f59e0b', fontWeight: 700 }}>
                  NDPS SEC 65B CRYPTOGRAPHIC CHECKSUM
                </Typography>
              </Box>
              <Box sx={{ mb: 1 }}>
                <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.68rem', display: 'block' }}>
                  SHA-256 EVIDENCE PAYLOAD HASH:
                </Typography>
                <Typography variant="caption" sx={{ color: '#34d399', fontFamily: 'monospace', fontSize: '0.72rem', wordBreak: 'break-all' }}>
                  {record.sha256_hash}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.68rem', display: 'block' }}>
                  PREVIOUS MERKLE LINK HASH:
                </Typography>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontFamily: 'monospace', fontSize: '0.72rem', wordBreak: 'break-all' }}>
                  {record.prev_block_hash}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2, borderTop: '1px solid rgba(255, 255, 255, 0.08)', justifyContent: 'space-between' }}>
        <Chip
          icon={<QrCode2Icon />}
          label={record.tamper_flag ? 'INTEGRITY COMPROMISED' : 'BLOCKCHAIN INTEGRITY SEALED'}
          color={record.tamper_flag ? 'error' : 'success'}
          size="small"
        />
        <Button onClick={onClose} variant="contained" color="primary" size="small">
          Close Dossier
        </Button>
      </DialogActions>
    </Dialog>
  );
};
