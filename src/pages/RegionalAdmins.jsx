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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem
} from '@mui/material';
import ShieldIcon from '@mui/icons-material/Shield';
import AddIcon from '@mui/icons-material/Add';
import { adminService } from '../services/adminService';
import { regionService } from '../services/regionService';
import { StateHandler } from '../components/Common/StateHandler';
import { StatusBadge } from '../components/Common/StatusBadge';

export const RegionalAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({ badge_id: '', full_name: '', username: '', password: '', region_id: '' });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [adminsData, regionsData] = await Promise.all([
        adminService.getRegionalAdmins(),
        regionService.getRegions()
      ]);
      setAdmins(adminsData);
      setRegions(regionsData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async () => {
    try {
      await adminService.createRegionalAdmin(formData);
      setOpenModal(false);
      setFormData({ badge_id: '', full_name: '', username: '', password: '', region_id: '' });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.detail || 'Error creating Regional Admin');
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary' }}>
            Regional Admins
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Manage regional administrators and their jurisdictions
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenModal(true)}
          sx={{ bgcolor: '#343A24', color: '#FAF9F4', fontWeight: 700, '&:hover': { bgcolor: '#1F241A' } }}
        >
          Add Regional Admin
        </Button>
      </Box>

      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Badge ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Assigned Region</TableCell>
                <TableCell align="center">Officers</TableCell>
                <TableCell align="center">Total Tests</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StateHandler loading={loading} empty={admins.length === 0} emptyMessage="No Regional Admins found.">
                {admins.map((admin) => (
                  <TableRow key={admin.id} hover>
                    <TableCell sx={{ fontFamily: 'monospace', color: '#343A24', fontWeight: 700 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ShieldIcon sx={{ fontSize: 16 }} />
                        {admin.badge_id}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>{admin.name}</TableCell>
                    <TableCell sx={{ color: 'text.secondary' }}>{admin.region}</TableCell>
                    <TableCell align="center" sx={{ fontFamily: 'monospace', fontWeight: 700 }}>{admin.officers}</TableCell>
                    <TableCell align="center" sx={{ fontFamily: 'monospace', fontWeight: 700 }}>{admin.total_tests}</TableCell>
                    <TableCell align="right">
                      <StatusBadge status={admin.status.toUpperCase()} />
                    </TableCell>
                  </TableRow>
                ))}
              </StateHandler>
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, bgcolor: '#FAF9F4', color: '#343A24' }}>Add Regional Admin</DialogTitle>
        <DialogContent sx={{ bgcolor: '#FAF9F4', pt: '20px !important' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Badge ID" fullWidth size="small" value={formData.badge_id} onChange={(e) => setFormData({ ...formData, badge_id: e.target.value })} />
            <TextField label="Full Name" fullWidth size="small" value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} />
            <TextField label="Username" fullWidth size="small" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
            <TextField label="Password" type="password" fullWidth size="small" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            <TextField select label="Region" fullWidth size="small" value={formData.region_id} onChange={(e) => setFormData({ ...formData, region_id: e.target.value })}>
              {regions.map((r) => (
                <MenuItem key={r.id} value={r.id}>{r.name} ({r.code})</MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions sx={{ bgcolor: '#FAF9F4', p: 2 }}>
          <Button onClick={() => setOpenModal(false)} sx={{ color: 'text.secondary' }}>Cancel</Button>
          <Button onClick={handleCreate} variant="contained" sx={{ bgcolor: '#343A24', color: '#FAF9F4', '&:hover': { bgcolor: '#1F241A' } }}>Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
