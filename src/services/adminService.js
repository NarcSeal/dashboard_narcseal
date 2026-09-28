import apiClient from './api';

export const adminService = {
  getRegionalAdmins: async () => {
    const response = await apiClient.get('/admin/regional-admins');
    return response.data;
  },

  createRegionalAdmin: async (adminData) => {
    const response = await apiClient.post('/admin/regional-admins', adminData);
    return response.data;
  }
};
