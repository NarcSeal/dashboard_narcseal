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
          bgcolor: '#FFFFFF', // WHITE MODAL SURFACE
          border: '1px solid #D1CCBA',
          borderRadius: 2.5,
          color: '#1F241A', // PRIMARY TEXT
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
          <VerifiedIcon sx={{ color: record.tamper_flag ? '#D94B4B' : '#3F7A4D', fontSize: 24 }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2, color: 'text.primary' }}>
              NCB Forensic Evidence Dossier
            </Typography>
            <Typography variant="caption" sx={{ color: '#8A8060', fontFamily: 'monospace', fontWeight: 600 }}>
              RECORD REF: {record.id}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} sx={{ color: 'text.secondary' }}>
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
                border: '1px solid #D1CCBA',
                bgcolor: '#1A1D16', // VERY DARK OLIVE (replacing Navy)
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
                  bgcolor: 'rgba(250, 249, 244, 0.85)', // Semi-transparent warm white
                  px: 1,
                  py: 0.3,
                  borderRadius: 1,
                  border: '1px solid #D1CCBA',
                }}
              >
                <Typography variant="caption" sx={{ color: '#343A24', fontFamily: 'monospace', fontWeight: 700 }}>
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
                bgcolor: '#F3F0E5',
                border: '1px solid #D1CCBA',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.8 }}>
                <GpsFixedIcon sx={{ color: '#343A24', fontSize: 18 }} />
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#1F241A', textTransform: 'uppercase' }}>
                  GPS Telemetry Seal
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.82rem', mb: 0.5, fontWeight: 600 }}>
                {record.location_name}
              </Typography>
              <Typography variant="caption" sx={{ color: '#8A8060', fontFamily: 'monospace', display: 'block', fontWeight: 600 }}>
                LAT: {record.gps_lat.toFixed(4)}° N | LNG: {record.gps_lng.toFixed(4)}° E
              </Typography>
            </Box>
          </Grid>

          {/* Right Column: Chemical & Cryptographic Details */}
          <Grid item xs={12} md={7}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                  Sample Classified
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary' }}>
                  {record.substance}
                </Typography>
              </Box>
              <StatusBadge status={record.result} />
            </Box>

            <Grid container spacing={1.5} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <Box sx={{ bgcolor: '#F3F0E5', border: '1px solid #D1CCBA', p: 1.2, borderRadius: 1.5 }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                    AI Confidence
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#3F7A4D', fontWeight: 700, fontFamily: 'monospace' }}>
                    {record.confidence_score}%
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ bgcolor: '#F3F0E5', border: '1px solid #C8C4B5', p: 1.2, borderRadius: 1.5 }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                    Gross Net Weight
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#C68A22', fontWeight: 700, fontFamily: 'monospace' }}>
                    {record.weight_grams} g
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            {/* Officer & Device Metadata */}
            <Box sx={{ bgcolor: '#F3F0E5', border: '1px solid #D1CCBA', p: 1.5, borderRadius: 1.5, mb: 2 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, display: 'block', mb: 0.8 }}>
                OFFICER & DEVICE CHAIN OF CUSTODY
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>Investigating Officer:</Typography>
                <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 600 }}>
                  {record.officer_name} ({record.officer_badge})
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>Jurisdiction Station:</Typography>
                <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 600 }}>{record.station}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>Hardware Token ID:</Typography>
                <Typography variant="caption" sx={{ color: '#343A24', fontFamily: 'monospace', fontWeight: 600 }}>{record.device_id}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>Acquisition Timestamp:</Typography>
                <Typography variant="caption" sx={{ color: 'text.primary', fontFamily: 'monospace', fontWeight: 600 }}>{record.timestamp}</Typography>
              </Box>
            </Box>

            {/* Cryptographic Hashes (NDPS 65B Standard) */}
            <Box sx={{ bgcolor: '#FAF9F4', p: 1.5, borderRadius: 1.5, border: '1px solid #D1CCBA' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <KeyIcon sx={{ color: '#343A24', fontSize: 16 }} />
                <Typography variant="caption" sx={{ color: '#343A24', fontWeight: 700 }}>
                  NDPS SEC 65B CRYPTOGRAPHIC CHECKSUM
                </Typography>
              </Box>
              <Box sx={{ mb: 1 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.68rem', display: 'block', fontWeight: 600 }}>
                  SHA-256 EVIDENCE PAYLOAD HASH:
                </Typography>
                <Typography variant="caption" sx={{ color: '#3F7A4D', fontFamily: 'monospace', fontSize: '0.72rem', wordBreak: 'break-all', fontWeight: 600 }}>
                  {record.sha256_hash}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.68rem', display: 'block', fontWeight: 600 }}>
                  PREVIOUS MERKLE LINK HASH:
                </Typography>
                <Typography variant="caption" sx={{ color: '#8A8060', fontFamily: 'monospace', fontSize: '0.72rem', wordBreak: 'break-all', fontWeight: 600 }}>
                  {record.prev_block_hash}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2, borderTop: '1px solid #C8C4B5', justifyContent: 'space-between' }}>
        <Chip
          icon={<QrCode2Icon />}
          label={record.tamper_flag ? 'INTEGRITY COMPROMISED' : 'BLOCKCHAIN INTEGRITY SEALED'}
          sx={{
            bgcolor: record.tamper_flag ? 'rgba(217, 75, 75, 0.1)' : 'rgba(63, 122, 77, 0.1)',
            color: record.tamper_flag ? '#D94B4B' : '#3F7A4D',
            border: `1px solid ${record.tamper_flag ? '#D94B4B' : '#3F7A4D'}`,
            fontWeight: 700,
          }}
          size="small"
        />
        <Button onClick={onClose} variant="contained" sx={{ bgcolor: '#303722', color: '#FAF9F4', '&:hover': { bgcolor: '#1A1D16' } }} size="small">
          Close Dossier
        </Button>
      </DialogActions>
    </Dialog>
  );
};
