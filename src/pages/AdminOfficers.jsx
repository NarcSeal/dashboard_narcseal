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
  TextField,
  InputAdornment,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShieldIcon from '@mui/icons-material/Shield';
import BadgeIcon from '@mui/icons-material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import { adminService } from '../services/adminService';
import { officerService } from '../services/officerService';
import { StateHandler } from '../components/Common/StateHandler';
import { StatusBadge } from '../components/Common/StatusBadge';

export const AdminOfficers = () => {
  const { admin_id } = useParams();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [allAdmins, allOfficers] = await Promise.all([
        adminService.getRegionalAdmins(),
        officerService.getOfficers({})
      ]);
      
      const currentAdmin = allAdmins.find(a => a.id.toString() === admin_id);
      setAdmin(currentAdmin);
      
      if (currentAdmin) {
        const adminRegionId = currentAdmin.region_id;
        const assignedOfficers = allOfficers.filter(o => o.region_id === adminRegionId);
        setOfficers(assignedOfficers);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [admin_id]);

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ color: 'text.secondary' }}>
          <ArrowBackIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary', display: 'flex', alignItems: 'center', gap: 1 }}>
            <ShieldIcon sx={{ color: '#8A8060' }} />
            {admin ? `${admin.name}'s Division` : 'Loading Admin...'}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Regional Admin: {admin?.badge_id || '--'} • Subordinate Field Officers
          </Typography>
        </Box>
      </Box>

      <StateHandler loading={loading} empty={!admin} emptyMessage="Regional Admin not found.">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>
            Field Officers under Administration ({officers.length})
          </Typography>
          <TextField
            size="small"
            placeholder="Search by badge, name, or rank..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 280 }}
          />
        </Box>

        <Grid container spacing={3}>
          {officers.filter(o => 
            o.name.toLowerCase().includes(search.toLowerCase()) || 
            o.badge_id.toLowerCase().includes(search.toLowerCase()) ||
            o.rank.toLowerCase().includes(search.toLowerCase())
          ).length === 0 ? (
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ color: 'text.secondary', fontStyle: 'italic', p: 2 }}>
                No field officers found matching your search.
              </Typography>
            </Grid>
          ) : (
            officers.filter(o => 
              o.name.toLowerCase().includes(search.toLowerCase()) || 
              o.badge_id.toLowerCase().includes(search.toLowerCase()) ||
              o.rank.toLowerCase().includes(search.toLowerCase())
            ).map((officer) => (
              <Grid item xs={12} md={6} lg={4} key={officer.id}>
                <Card 
                  onClick={() => navigate(`/officers/${officer.badge_id}`)}
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
                          {officer.name}
                        </Typography>
                        <Typography variant="caption" sx={{ fontFamily: 'monospace', color: '#8A8060', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                          <BadgeIcon sx={{ fontSize: 14 }} /> {officer.badge_id}
                        </Typography>
                      </Box>
                      <StatusBadge status={officer.status.toUpperCase()} />
                    </Box>
                    <Divider sx={{ my: 1.5, borderColor: '#E8E4D9' }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>Rank</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 700, color: '#1F241A' }}>{officer.rank}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>Total Tests Processed</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 700, color: '#3E7A4A' }}>{officer.total_tests}</Typography>
                      </Box>
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
