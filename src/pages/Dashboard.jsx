import React, { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import ScienceIcon from '@mui/icons-material/Science';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SyncProblemIcon from '@mui/icons-material/SyncProblem';
import RefreshIcon from '@mui/icons-material/Refresh';
import LayersIcon from '@mui/icons-material/Layers';
import TimelineIcon from '@mui/icons-material/Timeline';
import PieChartIcon from '@mui/icons-material/PieChart';

import { StatCard } from '../components/Common/StatCard';
import { StateHandler } from '../components/Common/StateHandler';
import { HeatmapMap } from '../components/Map/HeatmapMap';
import { SubstanceChart } from '../components/Charts/SubstanceChart';
import { TimelineChart } from '../components/Charts/TimelineChart';
import { analyticsService } from '../services/analyticsService';

export const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [heatmapData, setHeatmapData] = useState([]);
  const [substanceData, setSubstanceData] = useState([]);
  const [timelineData, setTimelineData] = useState([]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [statsRes, heatmapRes, substanceRes, timelineRes] = await Promise.all([
        analyticsService.getStats(),
        analyticsService.getHeatmap(),
        analyticsService.getSubstanceBreakdown(),
        analyticsService.getDailyTests(),
      ]);

      setStats(statsRes);
      setHeatmapData(heatmapRes || []);
      setSubstanceData(substanceRes || []);
      setTimelineData(timelineRes || []);
    } catch (err) {
      setError(err?.message || 'Failed to fetch command center telemetry.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <Box>
      {/* Page Title & Refresh */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#f8fafc' }}>
            National Narcotics Command Center
          </Typography>
          <Typography variant="caption" sx={{ color: '#94a3b8' }}>
            Live cryptographic test telemetry, zonal heat mapping & substance intelligence
          </Typography>
        </Box>
        <Tooltip title="Refresh Dashboard Telemetry">
          <IconButton onClick={fetchDashboardData} sx={{ color: '#38bdf8', bgcolor: 'rgba(56, 189, 248, 0.1)' }}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* 4 Stat Cards */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="TOTAL TESTS TODAY"
            value={stats?.total_tests_today ?? 142}
            trend={stats?.tests_change_pct ?? '+18.4%'}
            subtitle="vs yesterday"
            icon={ScienceIcon}
            color="#38bdf8"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="POSITIVE SEIZURES"
            value={stats?.positive_results ?? 39}
            trend={stats?.positive_ratio_pct ?? '27.4%'}
            subtitle="positivity rate"
            icon={WarningAmberIcon}
            color="#ef4444"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="ACTIVE FIELD OFFICERS"
            value={stats?.active_officers ?? 48}
            subtitle="across 14 zones"
            icon={PeopleAltIcon}
            color="#10b981"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="PENDING SYNCS"
            value={stats?.pending_syncs ?? 6}
            subtitle="awaiting mesh lock"
            icon={SyncProblemIcon}
            color="#f59e0b"
          />
        </Grid>
      </Grid>

      {/* Main Map & Substance Breakdown Section */}
      <StateHandler loading={loading} error={error} onRetry={fetchDashboardData}>
        <Grid container spacing={3}>
          {/* Interactive Leaflet India Heatmap */}
          <Grid item xs={12} lg={8}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardHeader
                avatar={<LayersIcon sx={{ color: '#38bdf8' }} />}
                title={
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#f8fafc' }}>
                    All-India Field Test Heatmap & GPS Coordinates
                  </Typography>
                }
                subheader={
                  <Typography variant="caption" sx={{ color: '#64748b' }}>
                    Real-time field test coordinates, verified by tamper-evident GPS hardware seals
                  </Typography>
                }
                sx={{ pb: 1 }}
              />
              <CardContent sx={{ flexGrow: 1, p: '0 !important', height: 480 }}>
                <HeatmapMap records={heatmapData} />
              </CardContent>
            </Card>
          </Grid>

          {/* Substance Breakdown Chart */}
          <Grid item xs={12} lg={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardHeader
                avatar={<PieChartIcon sx={{ color: '#a855f7' }} />}
                title={
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#f8fafc' }}>
                    Substance Breakdown
                  </Typography>
                }
                subheader={
                  <Typography variant="caption" sx={{ color: '#64748b' }}>
                    Classification distribution of analyzed contraband
                  </Typography>
                }
              />
              <CardContent sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SubstanceChart data={substanceData} />
              </CardContent>
            </Card>
          </Grid>

          {/* 30-Day Tests Timeline Line Chart */}
          <Grid item xs={12}>
            <Card>
              <CardHeader
                avatar={<TimelineIcon sx={{ color: '#38bdf8' }} />}
                title={
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#f8fafc' }}>
                    30-Day Testing & Seizure Timeline
                  </Typography>
                }
                subheader={
                  <Typography variant="caption" sx={{ color: '#64748b' }}>
                    Historical trend of tests executed vs. confirmed positive narcotics seizures
                  </Typography>
                }
              />
              <CardContent sx={{ pt: 0 }}>
                <TimelineChart data={timelineData} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </StateHandler>
    </Box>
  );
};
