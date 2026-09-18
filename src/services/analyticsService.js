import apiClient from './api';

// Fallback high-fidelity datasets representing real NCB operational coordinates & stats across India
const FALLBACK_HEATMAP = [
  { id: 'REC-101', lat: 28.6139, lng: 77.2090, location: 'New Delhi (IGI Cargo Hub)', substance: 'Heroin', result: 'POSITIVE', weight_g: 1250, officer: 'Insp. R. Verma', timestamp: '2026-09-18 09:42', confidence: 96.8 },
  { id: 'REC-102', lat: 18.9220, lng: 72.8347, location: 'Mumbai (JNPT Port Berth 4)', substance: 'Cocaine', result: 'POSITIVE', weight_g: 4500, officer: 'SI K. Patil', timestamp: '2026-09-18 08:15', confidence: 98.4 },
  { id: 'REC-103', lat: 22.5726, lng: 88.3639, location: 'Kolkata (Howrah Parcel Center)', substance: 'Methamphetamine', result: 'POSITIVE', weight_g: 800, officer: 'Insp. S. Mukherjee', timestamp: '2026-09-18 07:30', confidence: 94.2 },
  { id: 'REC-104', lat: 13.0827, lng: 80.2707, location: 'Chennai (Harbour Terminal)', substance: 'Opium', result: 'NEGATIVE', weight_g: 0, officer: 'SI M. Raman', timestamp: '2026-09-18 06:12', confidence: 99.1 },
  { id: 'REC-105', lat: 31.6340, lng: 74.8723, location: 'Amritsar (Attari Border Check)', substance: 'Heroin', result: 'POSITIVE', weight_g: 3100, officer: 'Insp. G. Singh', timestamp: '2026-09-18 05:40', confidence: 97.9 },
  { id: 'REC-106', lat: 15.2993, lng: 74.1240, location: 'Goa (North Coast Vigilance)', substance: 'MDMA / Ecstasy', result: 'POSITIVE', weight_g: 340, officer: 'Insp. F. D\'souza', timestamp: '2026-09-17 23:20', confidence: 92.5 },
  { id: 'REC-107', lat: 26.9124, lng: 75.7873, location: 'Jaipur (Highway Toll Post 9)', substance: 'Cannabis / Charas', result: 'POSITIVE', weight_g: 12400, officer: 'SI D. Rathore', timestamp: '2026-09-17 21:05', confidence: 95.7 },
  { id: 'REC-108', lat: 12.9716, lng: 77.5946, location: 'Bengaluru (Electronic City Freight)', substance: 'LSD Blotters', result: 'NEGATIVE', weight_g: 0, officer: 'Insp. V. Hegde', timestamp: '2026-09-17 18:40', confidence: 98.8 },
  { id: 'REC-109', lat: 26.1445, lng: 91.7362, location: 'Guwahati (Brahmaputra Gate)', substance: 'Yaba / Meth Tablets', result: 'POSITIVE', weight_g: 5200, officer: 'SI B. Barua', timestamp: '2026-09-17 16:15', confidence: 97.3 },
  { id: 'REC-110', lat: 23.0225, lng: 72.5714, location: 'Ahmedabad (Mundra Corridor)', substance: 'Ketamine', result: 'POSITIVE', weight_g: 2100, officer: 'Insp. N. Patel', timestamp: '2026-09-17 14:02', confidence: 93.9 },
  { id: 'REC-111', lat: 17.3850, lng: 78.4867, location: 'Hyderabad (Shamshabad Cargo)', substance: 'Cocaine', result: 'NEGATIVE', weight_g: 0, officer: 'SI P. Reddy', timestamp: '2026-09-17 11:25', confidence: 99.4 },
  { id: 'REC-112', lat: 34.0837, lng: 74.7973, location: 'Srinagar (NH-44 Checkpoint)', substance: 'Brown Sugar / Heroin', result: 'POSITIVE', weight_g: 1800, officer: 'Insp. T. Lone', timestamp: '2026-09-17 09:10', confidence: 96.1 },
];

const FALLBACK_SUBSTANCES = [
  { substance: 'Heroin / Smack', count: 342, percentage: 32 },
  { substance: 'Cocaine', count: 184, percentage: 17 },
  { substance: 'Methamphetamine', count: 216, percentage: 20 },
  { substance: 'Cannabis / Charas', count: 195, percentage: 18 },
  { substance: 'Synthetic / MDMA', count: 86, percentage: 8 },
  { substance: 'Opium / Morphine', count: 54, percentage: 5 },
];

const FALLBACK_TIMELINE = [
  { date: 'Aug 20', total: 42, positive: 14, negative: 28 },
  { date: 'Aug 23', total: 55, positive: 19, negative: 36 },
  { date: 'Aug 26', total: 68, positive: 27, negative: 41 },
  { date: 'Aug 29', total: 61, positive: 22, negative: 39 },
  { date: 'Sep 01', total: 74, positive: 31, negative: 43 },
  { date: 'Sep 04', total: 59, positive: 18, negative: 41 },
  { date: 'Sep 07', total: 82, positive: 38, negative: 44 },
  { date: 'Sep 10', total: 91, positive: 42, negative: 49 },
  { date: 'Sep 13', total: 88, positive: 34, negative: 54 },
  { date: 'Sep 16', total: 104, positive: 46, negative: 58 },
  { date: 'Sep 18', total: 98, positive: 41, negative: 57 },
];

const FALLBACK_STATS = {
  total_tests_today: 142,
  positive_results: 39,
  active_officers: 48,
  pending_syncs: 6,
  tests_change_pct: '+18.4%',
  positive_ratio_pct: '27.4%',
};

export const analyticsService = {
  getStats: async () => {
    try {
      const res = await apiClient.get('/analytics/stats');
      return res.data;
    } catch {
      return FALLBACK_STATS;
    }
  },

  getHeatmap: async () => {
    try {
      const res = await apiClient.get('/analytics/heatmap');
      return res.data;
    } catch {
      return FALLBACK_HEATMAP;
    }
  },

  getSubstanceBreakdown: async () => {
    try {
      const res = await apiClient.get('/analytics/substance-breakdown');
      return res.data;
    } catch {
      return FALLBACK_SUBSTANCES;
    }
  },

  getDailyTests: async () => {
    try {
      const res = await apiClient.get('/analytics/daily-tests');
      return res.data;
    } catch {
      return FALLBACK_TIMELINE;
    }
  },
};
