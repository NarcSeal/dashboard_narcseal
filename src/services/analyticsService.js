import apiClient from './api';

export const analyticsService = {
  getStats: async () => {
    const res = await apiClient.get('/analytics/stats');
    return res.data;
  },

  getHeatmap: async () => {
    const res = await apiClient.get('/analytics/heatmap');
    return res.data;
  },

  getSubstanceBreakdown: async () => {
    const res = await apiClient.get('/analytics/substance-breakdown');
    return res.data;
  },

  getDailyTests: async () => {
    const res = await apiClient.get('/analytics/daily-tests');
    return res.data;
  },
};
