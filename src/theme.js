import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0A0E1A',
      paper: '#111827',
    },
    primary: {
      main: '#06B6D4',
      light: '#22D3EE',
      dark: '#0891B2',
      contrastText: '#0A0E1A',
    },
    secondary: {
      main: '#8B5CF6',
      light: '#A78BFA',
      dark: '#7C3AED',
    },
    success: {
      main: '#22C55E',
      light: '#4ADE80',
      dark: '#16A34A',
    },
    warning: {
      main: '#F59E0B',
      light: '#FBBF24',
      dark: '#D97706',
    },
    error: {
      main: '#EF4444',
      light: '#F87171',
      dark: '#DC2626',
    },
    text: {
      primary: '#F9FAFB',
      secondary: '#9CA3AF',
      disabled: '#4B5563',
    },
    divider: '#374151',
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: '0.925rem',
      letterSpacing: '0.01em',
    },
    subtitle2: {
      fontSize: '0.8rem',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    body2: {
      color: '#9CA3AF',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#111827',
          border: '1px solid #374151',
          borderRadius: 16,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#111827',
          border: '1px solid #374151',
          borderRadius: 16,
          boxShadow: '0 4px 24px -4px rgba(0, 0, 0, 0.4)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 12,
        },
        containedPrimary: {
          backgroundColor: '#06B6D4',
          color: '#0A0E1A',
          '&:hover': {
            backgroundColor: '#0891B2',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(55, 65, 81, 0.5)',
          padding: '12px 16px',
        },
        head: {
          backgroundColor: '#0D1117',
          fontWeight: 600,
          color: '#9CA3AF',
          fontSize: '0.75rem',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(6, 182, 212, 0.04) !important',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#111827',
          border: '1px solid #374151',
          borderRadius: 16,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#0D1117',
          borderColor: '#374151',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#374151',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#06B6D4',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#06B6D4',
          },
        },
        input: {
          backgroundColor: '#1F2937',
          borderRadius: 12,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          backgroundColor: '#1F2937',
          borderRadius: 12,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
  },
});
