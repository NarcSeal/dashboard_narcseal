import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Divider,
  Button,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BadgeIcon from '@mui/icons-material/Badge';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GavelIcon from '@mui/icons-material/Gavel';
import { officerService } from '../services/officerService';
import { exportService } from '../services/exportService';
import { StateHandler } from '../components/Common/StateHandler';
import { StatusBadge } from '../components/Common/StatusBadge';

export const OfficerTests = () => {
  const { badge_id } = useParams();
  const navigate = useNavigate();
  const [officer, setOfficer] = useState(null);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exportingTestId, setExportingTestId] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [officerData, testsData] = await Promise.all([
        officerService.getOfficerById(badge_id),
        officerService.getOfficerTests(badge_id)
      ]);
      
      setOfficer(officerData);
      setTests(testsData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [badge_id]);

  const handleExportSingleTest = async (testId) => {
    try {
      setExportingTestId(testId);
      const blob = await exportService.exportCourtPackage([testId], "Single Record Export from Dossier");
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `NCB_SINGLE_EVIDENCE_${testId}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Export failed:', err);
      alert('Failed to export court package');
    } finally {
      setExportingTestId(null);
    }
  };

  const handleChainVerify = () => {
    navigate('/chain-verifier', { state: { officerId: officer?.id } });
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ color: 'text.secondary' }}>
          <ArrowBackIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary', display: 'flex', alignItems: 'center', gap: 1 }}>
            <BadgeIcon sx={{ color: '#8A8060' }} />
            {officer ? officer.name : 'Loading Officer...'}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Badge ID: {badge_id} • Individual Test Records Dossier
          </Typography>
        </Box>
      </Box>

      <StateHandler loading={loading} empty={!officer} emptyMessage="Officer not found.">
        
        {officer && (
          <Box sx={{ p: 2, bgcolor: '#F3F0E5', border: '1px solid #C8C4B5', borderRadius: 2, mb: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>Station Unit</Typography>
                <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>{officer.station}</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>Rank</Typography>
                <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>{officer.rank}</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>Lifetime Tests</Typography>
                <Typography variant="body1" sx={{ color: '#343A24', fontWeight: 700, fontFamily: 'monospace' }}>
                  {officer.total_tests} Tests
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>Positive Seizures</Typography>
                <Typography variant="body1" sx={{ color: '#D94B4B', fontWeight: 700, fontFamily: 'monospace' }}>
                  {officer.positive_count} Seizures
                </Typography>
              </Grid>
            </Grid>
          </Box>
        )}

        <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary', mb: 2 }}>
          Test Records History ({tests.length})
        </Typography>

        <Grid container spacing={3}>
          {tests.length === 0 ? (
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ color: 'text.secondary', fontStyle: 'italic', p: 2 }}>
                No test records found for this officer.
              </Typography>
            </Grid>
          ) : (
            tests.map((test) => (
              <Grid item xs={12} md={6} lg={4} xl={3} key={test.id}>
                <Card sx={{ bgcolor: '#FAF9F4', border: '1px solid #C8C4B5', boxShadow: 'none', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ p: '16px !important', flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="caption" sx={{ fontFamily: 'monospace', color: '#8A8060', fontWeight: 600 }}>
                        {test.id}
                      </Typography>
                      <StatusBadge status={test.result} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
                      {test.substance}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                        Weight: <span style={{ color: '#1F241A' }}>{test.weight}</span>
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                        Confidence: <span style={{ color: '#3E7A4A' }}>{test.confidence}%</span>
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>{test.date}</Typography>
                      <Typography variant="caption" sx={{ color: '#343A24', fontWeight: 700 }}>
                        Hash: {test.hash_status}
                      </Typography>
                    </Box>
                    
                    <Divider sx={{ borderColor: '#E8E4D9', mb: 2 }} />
                    
                    <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<VerifiedUserIcon sx={{ fontSize: 16 }} />}
                        onClick={handleChainVerify}
                        sx={{ flex: 1, borderColor: '#C8C4B5', color: '#343A24', fontSize: '0.75rem', fontWeight: 700 }}
                      >
                        Verify
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<GavelIcon sx={{ fontSize: 16 }} />}
                        onClick={() => handleExportSingleTest(test.id)}
                        disabled={exportingTestId === test.id}
                        sx={{ flex: 1, bgcolor: '#343A24', color: '#FAF9F4', fontSize: '0.75rem', fontWeight: 700, '&:hover': { bgcolor: '#1F241A' } }}
                      >
                        {exportingTestId === test.id ? '...' : 'Export'}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </StateHandler>
    </Box>
  );
};
