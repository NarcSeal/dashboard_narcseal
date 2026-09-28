import apiClient from './api';

export const recordService = {
  getRecords: async (filters = {}) => {
    const params = {};
    if (filters.result && filters.result !== 'ALL') params.result = filters.result;
    if (filters.substance && filters.substance !== 'ALL') params.substance = filters.substance;
    if (filters.station && filters.station !== 'ALL') params.station = filters.station;
    if (filters.search) params.search = filters.search;
    
    const res = await apiClient.get('/records', { params });
    return res.data;
  },

  getRecordById: async (id) => {
    const res = await apiClient.get(`/records/${id}`);
    return res.data;
  },
};
