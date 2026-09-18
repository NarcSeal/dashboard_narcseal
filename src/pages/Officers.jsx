import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  Drawer,
  IconButton,
  Divider,
  Grid,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BadgeIcon from '@mui/icons-material/Badge';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import SyncIcon from '@mui/icons-material/Sync';

import { StatusBadge } from '../components/Common/StatusBadge';
import { StateHandler } from '../components/Common/StateHandler';
import { officerService } from '../services/officerService';

export const Officers = () => {
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedOfficer, setSelectedOfficer] = useState(null);
  const [officerTests, setOfficerTests] = useState([]);
  const [testsLoading, setTestsLoading] = useState(false);

  const fetchOfficers = async () => {
    try {
      setLoading(true);
      const data = await officerService.getOfficers(search);
      setOfficers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOfficers();
  }, [search]);

  const handleSelectOfficer = async (officer) => {
    setSelectedOfficer(officer);
    try {
      setTestsLoading(true);
      const tests = await officerService.getOfficerTests(officer.id);
      setOfficerTests(tests);
    } catch (err) {
      console.error(err);
    } finally {
      setTestsLoading(false);
    }
  };

  return (
    <Box>
      {/* Header & Search */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#f8fafc' }}>
            Field Officer Registry
          </Typography>
          <Typography variant="caption" sx={{ color: '#94a3b8' }}>
            Authorized narcotics inspection personnel & deployment status
          </Typography>
        </Box>

        <TextField
          size="small"
          placeholder="Search by badge, name, station or rank..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#64748b' }} />
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 320 }}
        />
      </Box>

      {/* Officers Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Officer Badge ID</TableCell>
                <TableCell>Officer Name</TableCell>
                <TableCell>Rank</TableCell>
                <TableCell>Zonal Station</TableCell>
                <TableCell align="center">Total Tests</TableCell>
                <TableCell align="center">Positives</TableCell>
                <TableCell>Last Active</TableCell>
                <TableCell align="center">Device / Sync</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StateHandler
                loading={loading}
                empty={officers.length === 0}
                emptyMessage="No field officers found matching search query."
              >
                {officers.map((officer) => (
                  <TableRow
                    key={officer.id}
                    hover
                    onClick={() => handleSelectOfficer(officer)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell sx={{ fontFamily: 'monospace', color: '#38bdf8', fontWeight: 600 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <BadgeIcon sx={{ fontSize: 16 }} />
                        {officer.badge_id}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#f8fafc' }}>
                      {officer.name}
                    </TableCell>
                    <TableCell sx={{ color: '#94a3b8' }}>{officer.rank}</TableCell>
                    <TableCell sx={{ color: '#cbd5e1' }}>{officer.station}</TableCell>
                    <TableCell align="center" sx={{ fontFamily: 'monospace', fontWeight: 700 }}>
                      {officer.total_tests}
                    </TableCell>
                    <TableCell align="center" sx={{ fontFamily: 'monospace', color: '#ef4444', fontWeight: 700 }}>
                      {officer.positive_count}
                    </TableCell>
                    <TableCell sx={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                      {officer.last_active}
                    </TableCell>
                    <TableCell align="center">
                      <StatusBadge status={officer.sync_status} />
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        size="small"
                        endIcon={<ArrowForwardIosIcon sx={{ fontSize: 12 }} />}
                        sx={{ color: '#38bdf8', fontSize: '0.75rem' }}
                      >
                        Records
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </StateHandler>
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Officer Drilldown Drawer */}
      <Drawer
        anchor="right"
        open={Boolean(selectedOfficer)}
        onClose={() => setSelectedOfficer(null)}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 460 },
            bgcolor: '#0d1527',
            borderLeft: '1px solid rgba(56, 189, 248, 0.25)',
            p: 3,
          },
        }}
      >
        {selectedOfficer && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#f8fafc' }}>
                Officer Dossier
              </Typography>
              <IconButton onClick={() => setSelectedOfficer(null)} sx={{ color: '#94a3b8' }}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Box sx={{ p: 2, bgcolor: '#111b30', borderRadius: 2, mb: 3 }}>
              <Typography variant="h6" sx={{ color: '#f8fafc', fontWeight: 700 }}>
                {selectedOfficer.name}
              </Typography>
              <Typography variant="caption" sx={{ color: '#38bdf8', fontFamily: 'monospace', display: 'block', mb: 1 }}>
                BADGE: {selectedOfficer.badge_id} • {selectedOfficer.rank}
              </Typography>

              <Divider sx={{ my: 1.5, borderColor: 'rgba(255,255,255,0.06)' }} />

              <Grid container spacing={1.5}>
                <Grid item xs={6}>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>Station Unit</Typography>
                  <Typography variant="body2" sx={{ color: '#f8fafc', fontWeight: 600 }}>{selectedOfficer.station}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>Device Model</Typography>
                  <Typography variant="body2" sx={{ color: '#f8fafc', fontWeight: 600 }}>{selectedOfficer.device_model}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>Lifetime Tests</Typography>
                  <Typography variant="body2" sx={{ color: '#38bdf8', fontWeight: 700, fontFamily: 'monospace' }}>
                    {selectedOfficer.total_tests} Tests
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>Positive Seizures</Typography>
                  <Typography variant="body2" sx={{ color: '#ef4444', fontWeight: 700, fontFamily: 'monospace' }}>
                    {selectedOfficer.positive_count} Seizures
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: '#cbd5e1' }}>
              Recent Test Records by {selectedOfficer.name.split(' ')[1] || 'Officer'}
            </Typography>

            <StateHandler loading={testsLoading} empty={officerTests.length === 0}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {officerTests.map((test) => (
                  <Card key={test.id} sx={{ bgcolor: '#111b30', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <CardContent sx={{ p: '14px !important' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.8 }}>
                        <Typography variant="caption" sx={{ fontFamily: 'monospace', color: '#38bdf8' }}>
                          {test.id}
                        </Typography>
                        <StatusBadge status={test.result} />
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#f8fafc' }}>
                        {test.substance}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                        <Typography variant="caption" sx={{ color: '#64748b' }}>
                          Weight: <span style={{ color: '#f8fafc' }}>{test.weight}</span>
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#64748b' }}>
                          Confidence: <span style={{ color: '#10b981' }}>{test.confidence}%</span>
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                        <Typography variant="caption" sx={{ color: '#64748b' }}>{test.date}</Typography>
                        <Typography variant="caption" sx={{ color: '#34d399', fontWeight: 600 }}>
                          Hash: {test.hash_status}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </StateHandler>
          </Box>
        )}
      </Drawer>
    </Box>
  );
};
