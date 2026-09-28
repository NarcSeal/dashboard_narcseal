import apiClient from './api';

export const exportService = {
  verifyOfficerChain: async (officerId) => {
    const res = await apiClient.get(`/chain/verify/${officerId}`);
    return res.data;
  },

  exportCourtPackage: async (recordIds, notes = '') => {
    // We expect a JSON response from the backend and will blob it in the browser
    const res = await apiClient.post(
      '/export/court-package',
      { record_ids: recordIds, legal_notes: notes }
    );
    
    // Create blob for download
    const blob = new Blob([JSON.stringify(res.data, null, 2)], {
      type: 'application/json',
    });
    return blob;
  },
};
