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
  TextField
} from '@mui/material';
import MapPinIcon from '@mui/icons-material/LocationOn';
import AddIcon from '@mui/icons-material/Add';
import ShieldIcon from '@mui/icons-material/Shield';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { regionService } from '../services/regionService';
import { adminService } from '../services/adminService';
import { StateHandler } from '../components/Common/StateHandler';
import { StatusBadge } from '../components/Common/StatusBadge';
import { useNavigate } from 'react-router-dom';

export const Regions = () => {
  const navigate = useNavigate();
  const [regions, setRegions] = useState([]);
  const [allAdmins, setAllAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', code: '' });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [regionsData, adminsData] = await Promise.all([
        regionService.getRegions(),
        adminService.getRegionalAdmins()
      ]);
      setRegions(regionsData);
      setAllAdmins(adminsData);
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
      await regionService.createRegion(formData);
      setOpenModal(false);
      setFormData({ name: '', code: '' });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.detail || 'Error creating Region');
    }
  };



  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary' }}>
            Regions
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Manage geographical regions
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenModal(true)}
          sx={{ bgcolor: '#343A24', color: '#FAF9F4', fontWeight: 700, '&:hover': { bgcolor: '#1F241A' } }}
        >
          Add Region
        </Button>
      </Box>

      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Region Code</TableCell>
                <TableCell>Region Name</TableCell>
                <TableCell align="center">Regional Officers</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StateHandler loading={loading} empty={regions.length === 0} emptyMessage="No Regions found.">
                {regions.map((region) => {
                  const regionAdmins = allAdmins.filter(a => a.region_id === region.id);
                  return (
                    <TableRow 
                      key={region.id} 
                      hover 
                      onClick={() => navigate(`/regions/${region.id}`)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell sx={{ fontFamily: 'monospace', color: '#343A24', fontWeight: 700 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <MapPinIcon sx={{ fontSize: 16 }} />
                          {region.code}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>{region.name}</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700, fontFamily: 'monospace' }}>
                        {regionAdmins.length}
                      </TableCell>
                      <TableCell align="right">
                        <StatusBadge status={region.status} />
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          size="small"
                          endIcon={<ArrowForwardIosIcon sx={{ fontSize: 12 }} />}
                          sx={{ color: '#8A8060', fontSize: '0.75rem', fontWeight: 700 }}
                        >
                          Manage
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </StateHandler>
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, bgcolor: '#FAF9F4', color: '#343A24' }}>Add Region</DialogTitle>
        <DialogContent sx={{ bgcolor: '#FAF9F4', pt: '20px !important' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Region Name" fullWidth size="small" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            <TextField label="Region Code" fullWidth size="small" value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value })} />
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
