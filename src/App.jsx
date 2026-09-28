import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { appTheme } from './theme';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';
import { MainLayout } from './components/Layout/MainLayout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Officers } from './pages/Officers';
import { EvidenceRecords } from './pages/EvidenceRecords';
import { ChainVerifier } from './pages/ChainVerifier';
import { CourtExport } from './pages/CourtExport';
import { RegionalAdmins } from './pages/RegionalAdmins';
import { Regions } from './pages/Regions';
import { RegionDetails } from './pages/RegionDetails';
import { AdminOfficers } from './pages/AdminOfficers';
import { OfficerTests } from './pages/OfficerTests';

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <AuthProvider>
        <Routes>
          {/* Public Authentication Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Command Center Console Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/officers" element={<Officers />} />
              <Route path="/evidence" element={<EvidenceRecords />} />
              <Route path="/chain-verifier" element={<ChainVerifier />} />
              <Route path="/court-export" element={<CourtExport />} />
              <Route path="/officers/:badge_id" element={<OfficerTests />} />

              <Route element={<ProtectedRoute allowedRoles={['main_admin']} />}>
                <Route path="/regional-admins" element={<RegionalAdmins />} />
                <Route path="/regions" element={<Regions />} />
                <Route path="/regions/:id" element={<RegionDetails />} />
                <Route path="/regional-admins/:admin_id/officers" element={<AdminOfficers />} />
              </Route>
            </Route>
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
