import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#F3F0E5', // CREAM
      paper: '#FAF9F4', // WARM WHITE
    },
    primary: {
      main: '#343A24', // PRIMARY DARK (Dark olive)
      light: '#8A8060', // KHAKI
      dark: '#252A1C', // SECONDARY DARK
      contrastText: '#FAF9F4', // WARM WHITE
    },
    secondary: {
      main: '#D8D1B8', // LIGHT KHAKI
      contrastText: '#1F241A', // PRIMARY TEXT
    },
    success: {
      main: '#3E7A4A', // SUCCESS
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#C68A22', // WARNING
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#D94B4B', // DANGER
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#3F6545', // ACCENT GREEN
      contrastText: '#FFFFFF',
    },
    text: {
      primary: '#1F241A', // PRIMARY TEXT
      secondary: '#68705C', // SECONDARY TEXT
      disabled: '#8A8060', // KHAKI
    },
    divider: '#C8C4B5', // BORDER
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h4: { // Page Title
      fontWeight: 700,
      fontSize: '1.75rem', // ~28px
      letterSpacing: '-0.02em',
      color: '#1F241A',
    },
    h5: { // Section Title
      fontWeight: 700,
      fontSize: '1.25rem', // 20px
      letterSpacing: '-0.01em',
      color: '#1F241A',
    },
    h6: { // Card Title
      fontWeight: 600,
      fontSize: '0.9375rem', // 15px
      color: '#1F241A',
    },
    subtitle1: { // Body
      fontSize: '0.875rem', // 14px
      fontWeight: 500,
      color: '#68705C',
    },
    subtitle2: {
      fontSize: '0.8125rem', // 13px
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      color: '#68705C',
    },
    body1: {
      fontSize: '0.875rem', // 14px
      fontWeight: 400,
      color: '#1F241A',
    },
    body2: {
      fontSize: '0.8125rem', // 13px
      color: '#68705C',
    },
    button: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#FAF9F4', // WARM WHITE
          border: '1px solid #D1CCBA', // BORDER
          borderRadius: 8,
          boxShadow: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#FAF9F4',
          border: '1px solid #D1CCBA',
          borderRadius: 8,
          boxShadow: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 6,
          boxShadow: 'none',
          padding: '6px 16px',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedPrimary: {
          backgroundColor: '#303722', // PRIMARY SIDEBAR OLIVE
          color: '#FAF9F4',
          '&:hover': {
            backgroundColor: '#4B5434', // MEDIUM OLIVE
          },
        },
        outlinedPrimary: {
          borderColor: '#D1CCBA',
          color: '#303722',
          backgroundColor: '#FAF9F4',
          '&:hover': {
            backgroundColor: '#F3F0E5',
            borderColor: '#898263',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #D6D0BE', // BORDERS
          padding: '12px 16px',
          fontSize: '0.8125rem', // 13px table text
          color: '#303722', // DARK OLIVE
          height: '52px', // ~48-55px
        },
        head: {
          backgroundColor: '#F0ECDD', // HEADER
          fontWeight: 700,
          color: '#303722', // DARK OLIVE
          fontSize: '0.75rem', // 12px header
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#F3F0E5 !important',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FAF9F4',
          border: '1px solid #C8C4B5',
          borderRadius: 8,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#343A24', // PRIMARY DARK for Sidebar
          borderRight: '1px solid #252A1C',
          color: '#FAF9F4',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#D1CCBA',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#898263',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#303722',
          },
        },
        input: {
          backgroundColor: '#FFFFFF',
          borderRadius: 6,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          backgroundColor: '#FAF9F4',
          borderRadius: 6,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          fontWeight: 600,
        },
      },
    },
  },
});
