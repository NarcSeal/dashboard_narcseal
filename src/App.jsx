import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { darkTheme } from './theme';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';
import { MainLayout } from './components/Layout/MainLayout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Officers } from './pages/Officers';
import { EvidenceRecords } from './pages/EvidenceRecords';
import { ChainVerifier } from './pages/ChainVerifier';
import { CourtExport } from './pages/CourtExport';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
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
