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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Button,
  Chip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FilterListIcon from '@mui/icons-material/FilterList';

import { StatusBadge } from '../components/Common/StatusBadge';
import { StateHandler } from '../components/Common/StateHandler';
import { EvidenceModal } from '../components/Evidence/EvidenceModal';
import { recordService } from '../services/recordService';

export const EvidenceRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [resultFilter, setResultFilter] = useState('ALL');
  const [substanceFilter, setSubstanceFilter] = useState('ALL');
  const [stationFilter, setStationFilter] = useState('ALL');
  const [selectedRecord, setSelectedRecord] = useState(null);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const data = await recordService.getRecords({
        search,
        result: resultFilter,
        substance: substanceFilter,
        station: stationFilter,
      });
      setRecords(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [search, resultFilter, substanceFilter, stationFilter]);

  const resetFilters = () => {
    setSearch('');
    setResultFilter('ALL');
    setSubstanceFilter('ALL');
    setStationFilter('ALL');
  };

  return (
    <Box>
      {/* Title */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#f8fafc' }}>
          Cryptographic Evidence Ledger
        </Typography>
        <Typography variant="caption" sx={{ color: '#94a3b8' }}>
          Tamper-evident narcotics seizure logs, optical spectrums, GPS fixes, and SHA-256 block receipts
        </Typography>
      </Box>

      {/* Filter Toolbar */}
      <Card sx={{ mb: 3, p: 2, bgcolor: '#0f172a' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search by ID, officer, substance..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#64748b' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ color: '#94a3b8' }}>Result</InputLabel>
              <Select
                value={resultFilter}
                label="Result"
                onChange={(e) => setResultFilter(e.target.value)}
              >
                <MenuItem value="ALL">All Results</MenuItem>
                <MenuItem value="POSITIVE">Positive Seizures</MenuItem>
                <MenuItem value="NEGATIVE">Negative Inspections</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} md={2.5}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ color: '#94a3b8' }}>Substance</InputLabel>
              <Select
                value={substanceFilter}
                label="Substance"
                onChange={(e) => setSubstanceFilter(e.target.value)}
              >
                <MenuItem value="ALL">All Substances</MenuItem>
                <MenuItem value="Heroin">Heroin</MenuItem>
                <MenuItem value="Cocaine">Cocaine</MenuItem>
                <MenuItem value="Methamphetamine">Methamphetamine</MenuItem>
                <MenuItem value="Cannabis">Cannabis / Charas</MenuItem>
                <MenuItem value="MDMA">MDMA</MenuItem>
                <MenuItem value="Opium">Opium</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} md={2.5}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ color: '#94a3b8' }}>Station</InputLabel>
              <Select
                value={stationFilter}
                label="Station"
                onChange={(e) => setStationFilter(e.target.value)}
              >
                <MenuItem value="ALL">All Zonal Units</MenuItem>
                <MenuItem value="Delhi Zonal Unit">Delhi Zonal Unit</MenuItem>
                <MenuItem value="Mumbai Zonal Unit">Mumbai Zonal Unit</MenuItem>
                <MenuItem value="Kolkata Zonal Unit">Kolkata Zonal Unit</MenuItem>
                <MenuItem value="Chennai Zonal Unit">Chennai Zonal Unit</MenuItem>
                <MenuItem value="Goa Sub-Zone">Goa Sub-Zone</MenuItem>
                <MenuItem value="Jodhpur Regional Unit">Jodhpur Regional Unit</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} md={1}>
            <Button
              fullWidth
              variant="outlined"
              size="small"
              onClick={resetFilters}
              sx={{ color: '#94a3b8', borderColor: 'rgba(255,255,255,0.15)', height: 40 }}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* Ledger Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Record ID</TableCell>
                <TableCell>Timestamp (IST)</TableCell>
                <TableCell>Substance / Result</TableCell>
                <TableCell>Confidence</TableCell>
                <TableCell>Weight</TableCell>
                <TableCell>Officer & Station</TableCell>
                <TableCell>Cryptographic Hash Link</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StateHandler
                loading={loading}
                empty={records.length === 0}
                emptyMessage="No evidence records found matching the applied filter criteria."
              >
                {records.map((rec) => (
                  <TableRow
                    key={rec.id}
                    hover
                    onClick={() => setSelectedRecord(rec)}
                    sx={{
                      cursor: 'pointer',
                      bgcolor: rec.tamper_flag ? 'rgba(239, 68, 68, 0.04)' : 'inherit',
                    }}
                  >
                    <TableCell sx={{ fontFamily: 'monospace', color: '#38bdf8', fontWeight: 700 }}>
                      {rec.id}
                    </TableCell>
                    <TableCell sx={{ color: '#cbd5e1', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                      {rec.timestamp}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#f8fafc' }}>
                          {rec.substance}
                        </Typography>
                        <StatusBadge status={rec.result} />
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', color: '#10b981', fontWeight: 600 }}>
                      {rec.confidence_score}%
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', color: '#f59e0b', fontWeight: 600 }}>
                      {rec.weight_grams} g
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: '#f8fafc', fontSize: '0.85rem' }}>
                        {rec.officer_name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#64748b' }}>
                        {rec.station}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="caption"
                        sx={{
                          fontFamily: 'monospace',
                          color: rec.tamper_flag ? '#ef4444' : '#64748b',
                          display: 'block',
                          maxWidth: 160,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {rec.sha256_hash}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<VisibilityIcon />}
                        sx={{ color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.3)', fontSize: '0.72rem' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRecord(rec);
                        }}
                      >
                        View Dossier
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </StateHandler>
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Deep Evidence Dossier Modal */}
      <EvidenceModal
        open={Boolean(selectedRecord)}
        record={selectedRecord}
        onClose={() => setSelectedRecord(null)}
      />
    </Box>
  );
};
