import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Badge,
  Chip,
  Tooltip,
  Avatar,
} from '@mui/material';
import {
  Menu,
  Bell,
  Wifi,
  Settings,
  Shield,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const PAGE_TITLES = {
  '/': 'COMMAND CENTER',
  '/officers': 'FIELD OFFICERS',
  '/evidence': 'EVIDENCE RECORDS',
  '/chain-verifier': 'CHAIN VERIFIER',
  '/court-export': 'COURT EXPORT',
};

export const Header = ({ onMobileToggle }) => {
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();

      // Format: 18 SEP 2026 · 14:32:07 IST
      const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      const day = String(now.getDate()).padStart(2, '0');
      const month = months[now.getMonth()];
      const year = now.getFullYear();
      setDateStr(`${day} ${month} ${year}`);

      setTimeStr(
        now.toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' IST'
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const pageTitle = PAGE_TITLES[location.pathname] || 'NARCSEAL';

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: '#F7F5EC', // WARM IVORY
        borderBottom: '1px solid #C8C4B5',
        boxShadow: 'none',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1.5, md: 3 }, minHeight: '66px !important' }}>
        {/* Left: Menu + Page Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMobileToggle}
            sx={{ mr: 0.5, display: { md: 'none' } }}
          >
            <Menu size={20} />
          </IconButton>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                color: '#1F241A', // PRIMARY TEXT
                fontSize: '0.9rem',
                letterSpacing: '0.06em',
              }}
            >
              {pageTitle}
            </Typography>
          </Box>
        </Box>

        {/* Right: Clock, Status, Notifications, Profile */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {/* Live Clock */}
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              gap: 0.8,
              bgcolor: '#F3F0E5', // CREAM
              border: '1px solid #C8C4B5',
              px: 1.5,
              py: 0.5,
              borderRadius: '6px',
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                color: '#68705C', // SECONDARY TEXT
                fontSize: '0.72rem',
                letterSpacing: '0.02em',
              }}
            >
              {dateStr}
            </Typography>
            <Box sx={{ width: 1, height: 14, bgcolor: '#C8C4B5' }} />
            <Typography
              variant="caption"
              sx={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                color: '#1F241A', // PRIMARY TEXT
                fontSize: '0.72rem',
              }}
            >
              {timeStr}
            </Typography>
          </Box>

          {/* Mesh Status */}
          <Tooltip title="Real-time Cryptographic Node Connected">
            <Chip
              icon={<Wifi size={13} style={{ color: '#FAF9F4' }} />}
              label="MESH LIVE"
              size="small"
              sx={{
                display: { xs: 'none', md: 'flex' },
                bgcolor: '#35633F', // DARK SUCCESS
                border: '1px solid #252B1C', 
                color: '#FAF9F4', 
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.03em',
                height: 28,
                borderRadius: '6px',
              }}
            />
          </Tooltip>

          {/* Notification Bell */}
          <Tooltip title="System Alerts">
            <IconButton sx={{ color: '#68705C' }}>
              <Badge
                badgeContent={3}
                sx={{
                  '& .MuiBadge-badge': {
                    bgcolor: '#D94B4B', // DANGER Red
                    color: '#FAF9F4',
                    fontSize: '0.65rem',
                    minWidth: 16,
                    height: 16,
                  },
                }}
              >
                <Bell size={18} />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Admin Identity */}
          <Box
            sx={{
              display: { xs: 'none', lg: 'flex' },
              alignItems: 'center',
              gap: 1,
              ml: 0.5,
              px: 1.2,
              py: 0.5,
              borderRadius: '6px',
              bgcolor: '#F3F0E5',
              border: '1px solid #C8C4B5',
            }}
          >
            <Typography variant="caption" sx={{ color: '#68705C', fontWeight: 600, fontSize: '0.72rem' }}>
              NCB-ADMIN
            </Typography>
            <Box sx={{ width: 1, height: 14, bgcolor: '#C8C4B5' }} />
            <Typography variant="caption" sx={{ color: '#1F241A', fontWeight: 600, fontSize: '0.72rem' }}>
              {user?.name?.split(' ')[0] || 'Aakanksha'}
            </Typography>
          </Box>

          {/* Settings */}
          <Tooltip title="Settings">
            <IconButton sx={{ color: '#68705C' }}>
              <Settings size={17} />
            </IconButton>
          </Tooltip>

          {/* Avatar */}
          <Avatar
            sx={{
              width: 30,
              height: 30,
              bgcolor: '#343A24', // PRIMARY DARK
              color: '#FAF9F4', // WARM WHITE
              fontSize: '0.75rem',
              fontWeight: 700,
              borderRadius: '6px',
            }}
          >
            {(user?.name?.[0] || 'A').toUpperCase()}
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
