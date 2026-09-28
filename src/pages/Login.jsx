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
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
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
        bgcolor: '#F3F0E5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        backgroundImage: 'radial-gradient(circle at 50% 20%, rgba(52, 58, 36, 0.08) 0%, transparent 60%)',
      }}
    >
      <Card
        sx={{
          maxWidth: 440,
          width: '100%',
          bgcolor: '#FAF9F4',
          border: '1px solid #C8C4B5',
          borderRadius: 2,
          boxShadow: '0 10px 15px -3px rgba(31, 36, 26, 0.1)',
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
                bgcolor: '#F3F0E5',
                border: '1px solid #C8C4B5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#343A24',
                mx: 'auto',
                mb: 1.5,
              }}
            >
              <SecurityIcon sx={{ fontSize: 36 }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary', letterSpacing: '0.03em' }}>
              NARC<span style={{ color: '#343A24' }}>SEAL</span>
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', fontWeight: 600 }}>
              Narcotics Control Bureau of India
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.72rem' }}>
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
                bgcolor: '#343A24',
                color: '#FAF9F4',
                py: 1.2,
                fontWeight: 700,
                letterSpacing: '0.04em',
                '&:hover': { bgcolor: '#1F241A' },
              }}
            >
              {loading ? 'Authenticating...' : 'Access Command Center'}
            </Button>
          </Box>

          <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #C8C4B5', textAlign: 'center' }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.72rem', fontWeight: 600 }}>
              Restricted Government System • Indian Evidence Act Sec 65B Standard
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
