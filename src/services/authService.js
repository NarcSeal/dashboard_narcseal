import apiClient from './api';

// Realistic fallback data for resilient command-center operation if FastAPI is offline
const FALLBACK_USER = {
  id: 'NCB-OFF-9042',
  badge_id: 'NCB-DL-082',
  name: 'Aakanksha Sharma',
  rank: 'Superintendent',
  station: 'NCB Headquarter, New Delhi',
  role: 'commander',
  email: 'aakanksha.hq@ncb.gov.in',
};

export const authService = {
  login: async (username, password) => {
    try {
      const response = await apiClient.post('/auth/login', { username, password });
      const { access_token, user } = response.data;
      if (access_token) {
        localStorage.setItem('narcseal_token', access_token);
        localStorage.setItem('narcseal_user', JSON.stringify(user || FALLBACK_USER));
      }
      return { success: true, user: user || FALLBACK_USER, token: access_token };
    } catch (error) {
      // In dev/demo scenario if backend is unreachable with network error, provide graceful admin access
      if (!error.response && (username === 'admin' || username.startsWith('ncb') || username.length >= 3)) {
        const dummyToken = 'demo-jwt-token-narcseal-' + Date.now();
        const user = {
          ...FALLBACK_USER,
          name: username.toUpperCase() === 'ADMIN' ? 'Aakanksha Sharma (Admin)' : username,
        };
        localStorage.setItem('narcseal_token', dummyToken);
        localStorage.setItem('narcseal_user', JSON.stringify(user));
        return { success: true, user, token: dummyToken, isDemo: true };
      }
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('narcseal_token');
    localStorage.removeItem('narcseal_user');
  },

  getCurrentUser: () => {
    const userJson = localStorage.getItem('narcseal_user');
    if (!userJson) return null;
    try {
      return JSON.parse(userJson);
    } catch {
      return null;
    }
  },

  isAuthenticated: () => {
    return Boolean(localStorage.getItem('narcseal_token'));
  },
};
