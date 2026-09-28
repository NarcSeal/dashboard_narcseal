import apiClient from './api';

export const regionService = {
  getRegions: async () => {
    const response = await apiClient.get('/regions/');
    return response.data;
  },

  createRegion: async (regionData) => {
    const response = await apiClient.post('/regions/', regionData);
    return response.data;
  }
};
