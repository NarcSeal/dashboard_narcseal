import apiClient from './api';

const FALLBACK_OFFICERS = [
  {
    id: 'OFF-01',
    badge_id: 'NCB-DL-082',
    name: 'Insp. Rajesh Verma',
    rank: 'Inspector',
    station: 'Delhi Zonal Unit',
    total_tests: 342,
    positive_count: 88,
    last_active: '12 mins ago',
    status: 'ACTIVE',
    sync_status: 'SYNCED',
    device_model: 'NCB-Spec CipherPad v3',
  },
  {
    id: 'OFF-02',
    badge_id: 'NCB-MH-114',
    name: 'SI Kavita Patil',
    rank: 'Sub-Inspector',
    station: 'Mumbai Zonal Unit',
    total_tests: 418,
    positive_count: 124,
    last_active: '4 mins ago',
    status: 'ACTIVE',
    sync_status: 'SYNCED',
    device_model: 'NCB-Spec CipherPad v3',
  },
  {
    id: 'OFF-03',
    badge_id: 'NCB-PB-045',
    name: 'Insp. Gurpreet Singh',
    rank: 'Inspector',
    station: 'Amritsar Sub-Zone',
    total_tests: 520,
    positive_count: 198,
    last_active: '35 mins ago',
    status: 'ACTIVE',
    sync_status: 'PENDING (2)',
    device_model: 'NCB-Spec FieldPro v2',
  },
  {
    id: 'OFF-04',
    badge_id: 'NCB-WB-099',
    name: 'Insp. Sourav Mukherjee',
    rank: 'Inspector',
    station: 'Kolkata Zonal Unit',
    total_tests: 289,
    positive_count: 67,
    last_active: '1 hr ago',
    status: 'OFFLINE',
    sync_status: 'SYNCED',
    device_model: 'NCB-Spec CipherPad v3',
  },
  {
    id: 'OFF-05',
    badge_id: 'NCB-TN-073',
    name: 'SI Murali Raman',
    rank: 'Sub-Inspector',
    station: 'Chennai Zonal Unit',
    total_tests: 195,
    positive_count: 32,
    last_active: '3 hrs ago',
    status: 'ACTIVE',
    sync_status: 'SYNCED',
    device_model: 'NCB-Spec FieldPro v2',
  },
  {
    id: 'OFF-06',
    badge_id: 'NCB-GA-019',
    name: 'Insp. Francis D\'souza',
    rank: 'Inspector',
    station: 'Goa Sub-Zone',
    total_tests: 312,
    positive_count: 85,
    last_active: '22 mins ago',
    status: 'ACTIVE',
    sync_status: 'SYNCED',
    device_model: 'NCB-Spec CipherPad v3',
  },
  {
    id: 'OFF-07',
    badge_id: 'NCB-RJ-061',
    name: 'SI Devendra Rathore',
    rank: 'Sub-Inspector',
    station: 'Jodhpur Regional Unit',
    total_tests: 240,
    positive_count: 51,
    last_active: '5 hrs ago',
    status: 'OFFLINE',
    sync_status: 'PENDING (4)',
    device_model: 'NCB-Spec FieldPro v2',
  },
  {
    id: 'OFF-08',
    badge_id: 'NCB-AS-028',
    name: 'SI Bipul Barua',
    rank: 'Sub-Inspector',
    station: 'Guwahati Zonal Unit',
    total_tests: 378,
    positive_count: 142,
    last_active: '18 mins ago',
    status: 'ACTIVE',
    sync_status: 'SYNCED',
    device_model: 'NCB-Spec CipherPad v3',
  },
];

export const officerService = {
  getOfficers: async (query = '') => {
    try {
      const res = await apiClient.get('/officers', { params: { q: query } });
      return res.data;
    } catch {
      if (!query) return FALLBACK_OFFICERS;
      const lower = query.toLowerCase();
      return FALLBACK_OFFICERS.filter(
        (o) =>
          o.name.toLowerCase().includes(lower) ||
          o.badge_id.toLowerCase().includes(lower) ||
          o.station.toLowerCase().includes(lower) ||
          o.rank.toLowerCase().includes(lower)
      );
    }
  },

  getOfficerById: async (id) => {
    try {
      const res = await apiClient.get(`/officers/${id}`);
      return res.data;
    } catch {
      return FALLBACK_OFFICERS.find((o) => o.id === id || o.badge_id === id) || FALLBACK_OFFICERS[0];
    }
  },

  getOfficerTests: async (officerId) => {
    try {
      const res = await apiClient.get(`/officers/${officerId}/tests`);
      return res.data;
    } catch {
      return [
        { id: 'REC-901', substance: 'Heroin', result: 'POSITIVE', weight: '450g', date: '2026-09-18 09:12', confidence: 97.2, hash_status: 'VERIFIED' },
        { id: 'REC-902', substance: 'Opium', result: 'NEGATIVE', weight: '0g', date: '2026-09-18 07:44', confidence: 99.4, hash_status: 'VERIFIED' },
        { id: 'REC-903', substance: 'Methamphetamine', result: 'POSITIVE', weight: '1200g', date: '2026-09-17 18:20', confidence: 95.8, hash_status: 'VERIFIED' },
        { id: 'REC-904', substance: 'Cannabis', result: 'POSITIVE', weight: '6500g', date: '2026-09-17 14:05', confidence: 98.1, hash_status: 'VERIFIED' },
      ];
    }
  },
};
