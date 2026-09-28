import apiClient from './api';

export const authService = {
  login: async (username, password) => {
    // The backend uses a Pydantic model for login, so send standard JSON
    const response = await apiClient.post('/auth/login', { username, password });
    
    const { access_token, officer_name, badge_id, role } = response.data;
    if (access_token) {
      localStorage.setItem('narcseal_token', access_token);
      
      const user = {
        name: officer_name,
        badge_id: badge_id,
        role: role,
        username: username
      };
      localStorage.setItem('narcseal_user', JSON.stringify(user));
      
      return { success: true, user, token: access_token };
    }
    throw new Error('Login failed');
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
