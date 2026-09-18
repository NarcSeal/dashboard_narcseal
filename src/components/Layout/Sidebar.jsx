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
  IconButton,
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
  Wifi,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { label: 'Officers', path: '/officers', icon: Users },
  { label: 'Evidence Records', path: '/evidence', icon: FileSearch },
  { label: 'Chain Verifier', path: '/chain-verifier', icon: LinkIcon },
  { label: 'Court Export', path: '/court-export', icon: FileDown },
];

export const Sidebar = ({ width = 260, mobileOpen, onMobileClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: '#0D1117' }}>
      {/* ── NarcSeal Brand Header ── */}
      <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: '12px',
            bgcolor: 'rgba(6, 182, 212, 0.1)',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#06B6D4',
          }}
        >
          <Shield size={22} />
        </Box>
        <Box>
          <Typography
            sx={{
              fontFamily: '"Orbitron", sans-serif',
              fontWeight: 800,
              fontSize: '1.1rem',
              letterSpacing: '0.04em',
              lineHeight: 1.1,
              color: '#F9FAFB',
            }}
          >
            NARC<span style={{ color: '#06B6D4' }}>SEAL</span>
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: '#6B7280',
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

      <Divider sx={{ borderColor: '#374151' }} />

      {/* ── Navigation Links ── */}
      <List sx={{ px: 1.5, py: 2, flexGrow: 1 }}>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={NavLink}
                to={item.path}
                end={item.path === '/'}
                onClick={onMobileClose}
                sx={{
                  borderRadius: '12px',
                  py: 1.1,
                  px: 1.6,
                  color: '#9CA3AF',
                  transition: 'all 200ms ease',
                  borderLeft: '3px solid transparent',
                  '&.active': {
                    bgcolor: 'rgba(6, 182, 212, 0.12)',
                    color: '#F9FAFB',
                    fontWeight: 600,
                    borderLeft: '3px solid #06B6D4',
                    boxShadow: 'inset 0 0 20px rgba(6, 182, 212, 0.06)',
                    '& .MuiListItemIcon-root': {
                      color: '#06B6D4',
                    },
                  },
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.04)',
                    color: '#F9FAFB',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
                  <Icon size={18} />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: 500 }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ borderColor: '#374151' }} />

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
            borderRadius: '10px',
            bgcolor: 'rgba(34, 197, 94, 0.06)',
            border: '1px solid rgba(34, 197, 94, 0.15)',
          }}
        >
          <Box
            className="live-indicator"
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: '#22C55E',
              boxShadow: '0 0 8px rgba(34, 197, 94, 0.5)',
            }}
          />
          <Typography variant="caption" sx={{ color: '#4ADE80', fontWeight: 600, fontSize: '0.7rem', letterSpacing: '0.04em' }}>
            SECURE NODE ONLINE
          </Typography>
        </Box>

        {/* Settings */}
        <ListItemButton
          sx={{
            borderRadius: '10px',
            py: 0.8,
            px: 1,
            color: '#9CA3AF',
            mb: 0.5,
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.04)' },
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

      <Divider sx={{ borderColor: '#374151' }} />

      {/* ── Officer Profile & Logout ── */}
      <Box sx={{ p: 2, bgcolor: 'rgba(0, 0, 0, 0.2)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
          <Box>
            <Typography variant="subtitle2" sx={{ color: '#F9FAFB', fontSize: '0.8rem', fontWeight: 600 }}>
              {user?.name || 'Aakanksha Sharma'}
            </Typography>
            <Typography variant="caption" sx={{ color: '#6B7280', display: 'block', fontSize: '0.7rem' }}>
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
              bgcolor: 'rgba(34, 197, 94, 0.15)',
              color: '#4ADE80',
              letterSpacing: '0.04em',
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
            borderColor: 'rgba(239, 68, 68, 0.25)',
            color: '#F87171',
            fontSize: '0.78rem',
            borderRadius: '10px',
            '&:hover': {
              bgcolor: 'rgba(239, 68, 68, 0.08)',
              borderColor: '#EF4444',
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
            borderRight: '1px solid #374151',
            bgcolor: '#0D1117',
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
            bgcolor: '#0D1117',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};
