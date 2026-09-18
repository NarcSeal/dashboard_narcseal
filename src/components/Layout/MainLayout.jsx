import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const MainLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = 260;

  const handleMobileToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#0A0E1A' }}>
      <Sidebar
        width={drawerWidth}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Header onMobileToggle={handleMobileToggle} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3 },
            bgcolor: '#0A0E1A',
            overflowY: 'auto',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
