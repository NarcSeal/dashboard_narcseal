import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import ShieldIcon from '@mui/icons-material/Shield';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const [username, setUsername] = useState('ncb.officer');
  const [password, setPassword] = useState('SecurePass@2026');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isExpired = new URLSearchParams(location.search).get('expired') === 'true';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please provide officer credentials and security token.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await login(username, password);
      navigate('/');
    } catch (err) {
      setError(err?.response?.data?.detail || 'Authentication failed: Invalid credentials or expired badge token.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#060913',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        backgroundImage: 'radial-gradient(circle at 50% 20%, rgba(56, 189, 248, 0.08) 0%, transparent 60%)',
      }}
    >
      <Card
        sx={{
          maxWidth: 440,
          width: '100%',
          bgcolor: '#0f172a',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          borderRadius: 3,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          {/* Emblem Header */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                bgcolor: 'rgba(56, 189, 248, 0.12)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#38bdf8',
                mx: 'auto',
                mb: 1.5,
              }}
            >
              <SecurityIcon sx={{ fontSize: 36 }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#f8fafc', letterSpacing: '0.03em' }}>
              NARC<span style={{ color: '#38bdf8' }}>SEAL</span>
            </Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block' }}>
              Narcotics Control Bureau of India
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.72rem' }}>
              Apex Command & Evidence Verification Gateway
            </Typography>
          </Box>

          {isExpired && (
            <Alert severity="warning" sx={{ mb: 2, fontSize: '0.8rem' }}>
              Your command session has expired. Please re-authenticate.
            </Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2, fontSize: '0.8rem' }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Officer Badge ID / Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              autoComplete="username"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: '#64748b' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Security Passkey / Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              autoComplete="current-password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon sx={{ color: '#64748b' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <ShieldIcon />}
              sx={{
                bgcolor: '#0284c7',
                py: 1.2,
                fontWeight: 700,
                letterSpacing: '0.04em',
                '&:hover': { bgcolor: '#0369a1' },
              }}
            >
              {loading ? 'Authenticating...' : 'Access Command Center'}
            </Button>
          </Box>

          <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid rgba(255, 255, 255, 0.06)', textAlign: 'center' }}>
            <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.72rem' }}>
              Restricted Government System • Indian Evidence Act Sec 65B Standard
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
