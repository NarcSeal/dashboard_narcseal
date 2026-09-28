import apiClient from './api';

export const officerService = {
  getOfficers: async (filters = {}) => {
    const params = {};
    if (filters.search) params.q = filters.search;
    
    const res = await apiClient.get('/officers/', { params });
    return res.data;
  },

  getOfficerById: async (id) => {
    const res = await apiClient.get(`/officers/${id}`);
    return res.data;
  },

  getOfficerTests: async (officerId) => {
    const res = await apiClient.get(`/officers/${officerId}/tests`);
    return res.data;
  },

  createOfficer: async (officerData) => {
    const res = await apiClient.post('/officers/', officerData);
    return res.data;
  },
};
