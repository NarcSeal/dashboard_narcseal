import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Button,
  Chip,
  Alert,
} from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import LinkIcon from '@mui/icons-material/Link';
import RefreshIcon from '@mui/icons-material/Refresh';

import { ChainBlock } from '../components/Evidence/ChainBlock';
import { StateHandler } from '../components/Common/StateHandler';
import { exportService } from '../services/exportService';
import { officerService } from '../services/officerService';

export const ChainVerifier = () => {
  const [officers, setOfficers] = useState([]);
  const [selectedOfficerId, setSelectedOfficerId] = useState('OFF-01');
  const [chain, setChain] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch officer list for selector
  useEffect(() => {
    const loadOfficers = async () => {
      const data = await officerService.getOfficers();
      setOfficers(data);
    };
    loadOfficers();
  }, []);

  // Fetch Merkle hash chain for selected officer
  const verifyChain = async (officerId) => {
    try {
      setLoading(true);
      const blocks = await exportService.verifyOfficerChain(officerId);
      setChain(blocks);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedOfficerId) {
      verifyChain(selectedOfficerId);
    }
  }, [selectedOfficerId]);

  const hasTampering = chain.some(
    (b) => b.status === 'TAMPERED' || b.status === 'BROKEN_CHAIN'
  );

  return (
    <Box>
      {/* Title */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#f8fafc' }}>
          Cryptographic Merkle Hash Chain Verifier
        </Typography>
        <Typography variant="caption" sx={{ color: '#94a3b8' }}>
          Validate chronological block ancestry, SHA-256 forward links, and hardware private key attestation
        </Typography>
      </Box>

      {/* Control & Summary Card */}
      <Card sx={{ mb: 4, bgcolor: '#0f172a', border: '1px solid rgba(255,255,255,0.08)' }}>
        <CardContent sx={{ p: 2.5 }}>
          <Grid container spacing={2} alignItems="center" justifyContent="space-between">
            <Grid item xs={12} md={5}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ color: '#94a3b8' }}>Select Officer Ledger Chain</InputLabel>
                <Select
                  value={selectedOfficerId}
                  label="Select Officer Ledger Chain"
                  onChange={(e) => setSelectedOfficerId(e.target.value)}
                >
                  {officers.map((off) => (
                    <MenuItem key={off.id} value={off.id}>
                      {off.name} ({off.badge_id}) — {off.station}
                      {off.id === 'OFF-07' ? ' [Simulated Tamper Alert]' : ''}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={7} sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'flex-start', md: 'flex-end' }, gap: 1.5 }}>
              <Chip
                icon={hasTampering ? <WarningAmberIcon /> : <VerifiedUserIcon />}
                label={
                  hasTampering
                    ? 'CHAIN INTEGRITY COMPROMISED (TAMPER DETECTED)'
                    : 'CRYPTOGRAPHIC CHAIN VALIDATED (100% UNBROKEN)'
                }
                color={hasTampering ? 'error' : 'success'}
                sx={{ fontWeight: 700, fontFamily: 'monospace', py: 2 }}
              />

              <Button
                variant="outlined"
                size="small"
                startIcon={<RefreshIcon />}
                onClick={() => verifyChain(selectedOfficerId)}
                sx={{ color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.3)' }}
              >
                Re-Verify
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Tamper Alert Notice */}
      {hasTampering && (
        <Alert severity="error" sx={{ mb: 3, border: '1px solid #ef4444' }}>
          <strong>TAMPER ALERT FLAGGED:</strong> The cryptographic link between Block #1 and Block #2 has been invalidated.
          The calculated parent hash does not match the block header signature. Evidence admissibility in Court is suspended for the affected blocks.
        </Alert>
      )}

      {/* Chain Visualization */}
      <StateHandler loading={loading} empty={chain.length === 0}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2 }}>
          {chain.map((block, index) => (
            <ChainBlock
              key={block.block_index}
              block={block}
              isLast={index === chain.length - 1}
            />
          ))}
        </Box>
      </StateHandler>
    </Box>
  );
};
