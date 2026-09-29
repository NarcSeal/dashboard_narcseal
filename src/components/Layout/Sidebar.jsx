import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Chip,
  Button,
} from '@mui/material';
import {
  LayoutDashboard,
  Users,
  FileSearch,
  Link as LinkIcon,
  FileDown,
  LogOut,
  Settings,
  Shield,
  MapPin,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const MAIN_ADMIN_NAV = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { label: 'Regional Admins', path: '/regional-admins', icon: Shield },
  { label: 'Regions', path: '/regions', icon: MapPin },
  { label: 'Officers', path: '/officers', icon: Users },
  { label: 'Evidence Records', path: '/evidence', icon: FileSearch },
  { label: 'Chain Verifier', path: '/chain-verifier', icon: LinkIcon },
  { label: 'Court Export', path: '/court-export', icon: FileDown },
];

const REGIONAL_ADMIN_NAV = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { label: 'My Officers', path: '/officers', icon: Users },
  { label: 'Test Records', path: '/evidence', icon: FileSearch },
  { label: 'Chain Verifier', path: '/chain-verifier', icon: LinkIcon },
  { label: 'Court Export', path: '/court-export', icon: FileDown },
];

export const Sidebar = ({ width = 240, mobileOpen, onMobileClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = user?.role === 'main_admin' ? MAIN_ADMIN_NAV : REGIONAL_ADMIN_NAV;

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: '#303722' }}>
      {/* ── NarcSeal Brand Header ── */}
      <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: '8px',
            bgcolor: 'transparent',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FAF9F4',
          }}
        >
          <Shield size={22} />
        </Box>
        <Box>
          <Typography
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 800,
              fontSize: '1.1rem',
              letterSpacing: '0.04em',
              lineHeight: 1.1,
              color: '#FAF9F4',
            }}
          >
            NARC<span style={{ color: '#D8D1B8' }}>SEAL</span>
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: '#D8D1B8',
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            COMMAND CENTER
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: '#252A1C' }} />

      {/* ── Navigation Links ── */}
      <List sx={{ px: 1.5, py: 2, flexGrow: 1 }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={NavLink}
                to={item.path}
                end={item.path === '/'}
                onClick={onMobileClose}
                sx={{
                  borderRadius: '6px',
                  py: 1,
                  px: 1.6,
                  color: '#FAF9F4',
                  transition: 'all 200ms ease',
                  borderLeft: 'none',
                  '& .MuiListItemText-primary': {
                    color: '#FAF9F4',
                  },
                  '&.active': {
                    bgcolor: '#E4DFC9',
                    color: '#252A1C',
                    fontWeight: 600,
                    borderLeft: 'none',
                    boxShadow: 'none',
                    '& .MuiListItemIcon-root': {
                      color: '#252A1C',
                    },
                    '& .MuiListItemText-primary': {
                      color: '#252A1C',
                      fontWeight: 600,
                    },
                  },
                  '&:hover:not(.active)': {
                    bgcolor: 'rgba(228, 223, 201, 0.1)',
                    color: '#FAF9F4',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
                  <Icon size={18} />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: 600 }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ borderColor: '#252A1C' }} />

      {/* ── System Status & Settings ── */}
      <Box sx={{ px: 2, py: 1.5 }}>
        {/* System Status */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 1.5,
            px: 1,
            py: 0.8,
            borderRadius: '6px',
            bgcolor: 'rgba(37, 43, 28, 0.6)', 
            border: 'none',
          }}
        >
          <Box
            className="live-indicator"
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: '#3F7A4D', 
            }}
          />
          <Typography variant="caption" sx={{ color: '#D8D2BC', fontWeight: 600, fontSize: '0.7rem', letterSpacing: '0.04em' }}>
            SECURE NODE ONLINE
          </Typography>
        </Box>

        {/* Settings */}
        <ListItemButton
          sx={{
            borderRadius: '6px',
            py: 0.8,
            px: 1,
            color: '#FAF9F4',
            mb: 0.5,
            '& .MuiListItemText-primary': {
              color: '#FAF9F4',
            },
            '&:hover': { bgcolor: 'rgba(216, 209, 184, 0.1)', color: '#FAF9F4' },
          }}
        >
          <ListItemIcon sx={{ minWidth: 32, color: 'inherit' }}>
            <Settings size={16} />
          </ListItemIcon>
          <ListItemText
            primary="Settings"
            primaryTypographyProps={{ fontSize: '0.82rem', fontWeight: 500 }}
          />
        </ListItemButton>
      </Box>

      <Divider sx={{ borderColor: '#252A1C' }} />

      {/* ── Officer Profile & Logout ── */}
      <Box sx={{ p: 2, bgcolor: '#252B1C' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
          <Box>
            <Typography variant="subtitle2" sx={{ color: '#FAF9F4', fontSize: '0.8rem', fontWeight: 600 }}>
              {user?.name || 'Aakanksha Sharma'}
            </Typography>
            <Typography variant="caption" sx={{ color: '#D8D2BC', display: 'block', fontSize: '0.7rem' }}>
              {user?.rank || 'Superintendent'} • {user?.badge_id || 'NCB-DL-082'}
            </Typography>
          </Box>
          <Chip
            label="ONLINE"
            size="small"
            sx={{
              height: 20,
              fontSize: '0.62rem',
              fontWeight: 700,
              bgcolor: 'rgba(63, 122, 77, 0.2)',
              color: '#3F7A4D',
              border: '1px solid #3F7A4D',
              letterSpacing: '0.04em',
              borderRadius: '4px',
            }}
          />
        </Box>

        <Button
          fullWidth
          variant="outlined"
          size="small"
          onClick={handleLogout}
          startIcon={<LogOut size={14} />}
          sx={{
            borderColor: 'rgba(216, 210, 188, 0.3)',
            color: '#D8D2BC',
            fontSize: '0.78rem',
            borderRadius: '6px',
            '&:hover': {
              bgcolor: 'rgba(216, 210, 188, 0.1)',
              borderColor: '#D8D2BC',
            },
          }}
        >
          Secure Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Desktop permanent drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: width,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: width,
            boxSizing: 'border-box',
            borderRight: '1px solid #252B1C',
            bgcolor: '#303722',
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>

      {/* Mobile temporary drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: width,
            boxSizing: 'border-box',
            bgcolor: '#343A24',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};
