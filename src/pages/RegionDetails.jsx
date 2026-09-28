import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  IconButton,
  Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import ShieldIcon from '@mui/icons-material/Shield';
import MapPinIcon from '@mui/icons-material/LocationOn';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SecurityIcon from '@mui/icons-material/Security';
import BadgeIcon from '@mui/icons-material/Badge';
import { regionService } from '../services/regionService';
import { adminService } from '../services/adminService';
import { officerService } from '../services/officerService';
import { StateHandler } from '../components/Common/StateHandler';
import { StatusBadge } from '../components/Common/StatusBadge';

export const RegionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [region, setRegion] = useState(null);
  const [admins, setAdmins] = useState([]);
  const [regionOfficers, setRegionOfficers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAdminModal, setOpenAdminModal] = useState(false);
  const [adminFormData, setAdminFormData] = useState({ badge_id: '', full_name: '', username: '', password: '', region_id: id });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [regionsData, allAdmins, allOfficers] = await Promise.all([
        regionService.getRegions(),
        adminService.getRegionalAdmins(),
        officerService.getOfficers({})
      ]);
      const currentRegion = regionsData.find(r => r.id.toString() === id);
      setRegion(currentRegion);
      
      const regionAdmins = allAdmins.filter(a => a.region_id.toString() === id);
      setAdmins(regionAdmins);

      const officersInRegion = allOfficers.filter(o => o.region_id?.toString() === id);
      setRegionOfficers(officersInRegion);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleCreateAdmin = async () => {
    try {
      await adminService.createRegionalAdmin({ ...adminFormData, region_id: parseInt(id) });
      setOpenAdminModal(false);
      setAdminFormData({ badge_id: '', full_name: '', username: '', password: '', region_id: id });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.detail || 'Error creating Regional Officer');
    }
  };

  const totalOfficers = admins.reduce((acc, admin) => acc + admin.officers, 0);

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
        <IconButton onClick={() => navigate('/regions')} sx={{ color: 'text.secondary' }}>
          <ArrowBackIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary', display: 'flex', alignItems: 'center', gap: 1 }}>
            <MapPinIcon sx={{ color: '#8A8060' }} />
            {region ? region.name : 'Loading Region...'}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Region Code: {region?.code || '--'} • Extensive regional administration overview
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenAdminModal(true)}
          sx={{ bgcolor: '#343A24', color: '#FAF9F4', fontWeight: 700, '&:hover': { bgcolor: '#1F241A' } }}
        >
          Add Regional Officer
        </Button>
      </Box>

      <StateHandler loading={loading} empty={!region} emptyMessage="Region not found.">
        {/* Region Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ bgcolor: '#FAF9F4', border: '1px solid #C8C4B5', boxShadow: 'none', height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 700 }}>
                    Total Regional Admins
                  </Typography>
                  <SecurityIcon sx={{ color: '#343A24' }} />
                </Box>
                <Typography variant="h4" sx={{ color: 'text.primary', fontWeight: 800 }}>
                  {admins.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ bgcolor: '#FAF9F4', border: '1px solid #C8C4B5', boxShadow: 'none', height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 700 }}>
                    Total Field Officers
                  </Typography>
                  <PeopleAltIcon sx={{ color: '#3E7A4A' }} />
                </Box>
                <Typography variant="h4" sx={{ color: 'text.primary', fontWeight: 800 }}>
                  {totalOfficers}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ bgcolor: '#FAF9F4', border: '1px solid #C8C4B5', boxShadow: 'none', height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 700 }}>
                    Region Status
                  </Typography>
                  <StatusBadge status={region?.status || 'ACTIVE'} />
                </Box>
                <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 700 }}>
                  Operational
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Admins List */}
        <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary', mb: 2 }}>
          Assigned Regional Officers
        </Typography>

        <Grid container spacing={3}>
          {admins.length === 0 ? (
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ color: 'text.secondary', fontStyle: 'italic', p: 2 }}>
                No regional officers assigned to this region yet. Click the button above to add one.
              </Typography>
            </Grid>
          ) : (
            admins.map((admin) => (
              <Grid item xs={12} md={6} lg={4} key={admin.id}>
                <Card 
                  onClick={() => navigate(`/regional-admins/${admin.id}/officers`)}
                  sx={{ 
                    bgcolor: '#FAF9F4', 
                    border: '1px solid #C8C4B5', 
                    boxShadow: 'none', 
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: '#8A8060',
                      bgcolor: '#F3F0E5'
                    }
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                          {admin.name}
                        </Typography>
                        <Typography variant="caption" sx={{ fontFamily: 'monospace', color: '#8A8060', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                          <ShieldIcon sx={{ fontSize: 14 }} /> {admin.badge_id}
                        </Typography>
                      </Box>
                      <StatusBadge status={admin.status.toUpperCase()} />
                    </Box>
                    <Divider sx={{ my: 1.5, borderColor: '#E8E4D9' }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>Subordinate Officers</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 700, color: '#1F241A' }}>{admin.officers}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>Total Tests Processed</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 700, color: '#3E7A4A' }}>{admin.total_tests}</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </StateHandler>

      <Dialog open={openAdminModal} onClose={() => setOpenAdminModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, bgcolor: '#FAF9F4', color: '#343A24' }}>Add Regional Officer for {region?.name}</DialogTitle>
        <DialogContent sx={{ bgcolor: '#FAF9F4', pt: '20px !important' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Badge ID" fullWidth size="small" value={adminFormData.badge_id} onChange={(e) => setAdminFormData({ ...adminFormData, badge_id: e.target.value })} />
            <TextField label="Full Name" fullWidth size="small" value={adminFormData.full_name} onChange={(e) => setAdminFormData({ ...adminFormData, full_name: e.target.value })} />
            <TextField label="Username" fullWidth size="small" value={adminFormData.username} onChange={(e) => setAdminFormData({ ...adminFormData, username: e.target.value })} />
            <TextField label="Password" type="password" fullWidth size="small" value={adminFormData.password} onChange={(e) => setAdminFormData({ ...adminFormData, password: e.target.value })} />
          </Box>
        </DialogContent>
        <DialogActions sx={{ bgcolor: '#FAF9F4', p: 2 }}>
          <Button onClick={() => setOpenAdminModal(false)} sx={{ color: 'text.secondary' }}>Cancel</Button>
          <Button onClick={handleCreateAdmin} variant="contained" sx={{ bgcolor: '#343A24', color: '#FAF9F4', '&:hover': { bgcolor: '#1F241A' } }}>Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
