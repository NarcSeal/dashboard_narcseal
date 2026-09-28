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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import BadgeIcon from '@mui/icons-material/Badge';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import SyncIcon from '@mui/icons-material/Sync';
import GavelIcon from '@mui/icons-material/Gavel';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import DownloadIcon from '@mui/icons-material/Download';
import { useNavigate } from 'react-router-dom';

import { StatusBadge } from '../components/Common/StatusBadge';
import { StateHandler } from '../components/Common/StateHandler';
import { officerService } from '../services/officerService';
import { useAuth } from '../context/AuthContext';

export const Officers = () => {
  const { user } = useAuth();
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({ badge_id: '', full_name: '', username: '', password: '', rank: 'INSPECTOR', station_code: '' });
  const navigate = useNavigate();

  const fetchOfficers = async () => {
    try {
      setLoading(true);
      const data = await officerService.getOfficers({ search });
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

  const handleCreateOfficer = async () => {
    try {
      await officerService.createOfficer(formData);
      setOpenModal(false);
      setFormData({ badge_id: '', full_name: '', username: '', password: '', rank: 'INSPECTOR', station_code: '' });
      fetchOfficers();
    } catch (err) {
      alert(err.response?.data?.detail || 'Error creating Officer');
    }
  };


  return (
    <Box>
      {/* Header & Search */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary' }}>
            Field Officer Registry
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Authorized narcotics inspection personnel & deployment status
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            size="small"
            placeholder="Search by badge, name, station or rank..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 320 }}
          />
          {user?.role === 'regional_admin' && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenModal(true)}
              sx={{ bgcolor: '#343A24', color: '#FAF9F4', fontWeight: 700, '&:hover': { bgcolor: '#1F241A' } }}
            >
              Add Officer
            </Button>
          )}
        </Box>
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
                    onClick={() => navigate(`/officers/${officer.badge_id}`)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell sx={{ fontFamily: 'monospace', color: '#343A24', fontWeight: 700 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <BadgeIcon sx={{ fontSize: 16 }} />
                        {officer.badge_id}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>
                      {officer.name}
                    </TableCell>
                    <TableCell sx={{ color: 'text.secondary' }}>{officer.rank}</TableCell>
                    <TableCell sx={{ color: 'text.secondary' }}>{officer.station}</TableCell>
                    <TableCell align="center" sx={{ fontFamily: 'monospace', fontWeight: 700, color: 'text.primary' }}>
                      {officer.total_tests}
                    </TableCell>
                    <TableCell align="center" sx={{ fontFamily: 'monospace', color: '#D94B4B', fontWeight: 700 }}>
                      {officer.positive_count}
                    </TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                      {officer.last_active}
                    </TableCell>
                    <TableCell align="center">
                      <StatusBadge status={officer.sync_status} />
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        size="small"
                        endIcon={<ArrowForwardIosIcon sx={{ fontSize: 12 }} />}
                        sx={{ color: '#8A8060', fontSize: '0.75rem', fontWeight: 700 }}
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


      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, bgcolor: '#FAF9F4', color: '#343A24' }}>Add Field Officer</DialogTitle>
        <DialogContent sx={{ bgcolor: '#FAF9F4', pt: '20px !important' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Badge ID" fullWidth size="small" value={formData.badge_id} onChange={(e) => setFormData({ ...formData, badge_id: e.target.value })} />
            <TextField label="Full Name" fullWidth size="small" value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} />
            <TextField label="Username" fullWidth size="small" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
            <TextField label="Password" type="password" fullWidth size="small" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            <TextField label="Rank" fullWidth size="small" value={formData.rank} onChange={(e) => setFormData({ ...formData, rank: e.target.value })} />
            <TextField label="Station Code" fullWidth size="small" value={formData.station_code} onChange={(e) => setFormData({ ...formData, station_code: e.target.value })} />
          </Box>
        </DialogContent>
        <DialogActions sx={{ bgcolor: '#FAF9F4', p: 2 }}>
          <Button onClick={() => setOpenModal(false)} sx={{ color: 'text.secondary' }}>Cancel</Button>
          <Button onClick={handleCreateOfficer} variant="contained" sx={{ bgcolor: '#343A24', color: '#FAF9F4', '&:hover': { bgcolor: '#1F241A' } }}>Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
