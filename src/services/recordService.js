import apiClient from './api';

const FALLBACK_RECORDS = [
  {
    id: 'REC-2026-0891',
    timestamp: '2026-09-18 09:42:18 IST',
    officer_name: 'Insp. Rajesh Verma',
    officer_badge: 'NCB-DL-082',
    station: 'Delhi Zonal Unit',
    substance: 'Heroin (Diacetylmorphine)',
    result: 'POSITIVE',
    weight_grams: 1250,
    confidence_score: 96.8,
    gps_lat: 28.6139,
    gps_lng: 77.2090,
    location_name: 'IGI Cargo Terminal, New Delhi',
    sample_type: 'Brown Granular Powder',
    device_id: 'NS-CIPHER-082-A',
    image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
    sha256_hash: '3f78a2c1b8991b5c43d702e88a0b04c8f39572b217a4c9d9213ef2b89d41b439',
    prev_block_hash: '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
    merkle_root: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    tamper_flag: false,
    court_admissible: true,
  },
  {
    id: 'REC-2026-0892',
    timestamp: '2026-09-18 08:15:02 IST',
    officer_name: 'SI Kavita Patil',
    officer_badge: 'NCB-MH-114',
    station: 'Mumbai Zonal Unit',
    substance: 'Cocaine Hydrochloride',
    result: 'POSITIVE',
    weight_grams: 4500,
    confidence_score: 98.4,
    gps_lat: 18.9220,
    gps_lng: 72.8347,
    location_name: 'JNPT Port Container Berth 4, Navi Mumbai',
    sample_type: 'White Compact Brick',
    device_id: 'NS-CIPHER-114-C',
    image_url: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=600&auto=format&fit=crop&q=80',
    sha256_hash: '8a12d948cb7389a02fbca93740283bd78394eac293817362948bdfc7392819bc',
    prev_block_hash: '3f78a2c1b8991b5c43d702e88a0b04c8f39572b217a4c9d9213ef2b89d41b439',
    merkle_root: 'c512a839b02847c0192847192847102938471928374910293847102938471029',
    tamper_flag: false,
    court_admissible: true,
  },
  {
    id: 'REC-2026-0893',
    timestamp: '2026-09-18 07:30:45 IST',
    officer_name: 'Insp. Sourav Mukherjee',
    officer_badge: 'NCB-WB-099',
    station: 'Kolkata Zonal Unit',
    substance: 'Methamphetamine',
    result: 'POSITIVE',
    weight_grams: 800,
    confidence_score: 94.2,
    gps_lat: 22.5726,
    gps_lng: 88.3639,
    location_name: 'Howrah Railway Parcel Center, Kolkata',
    sample_type: 'Crystalline Shards',
    device_id: 'NS-CIPHER-099-B',
    image_url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&auto=format&fit=crop&q=80',
    sha256_hash: '7c4b123984029384019238471029384719283740192837401928374019283740',
    prev_block_hash: '8a12d948cb7389a02fbca93740283bd78394eac293817362948bdfc7392819bc',
    merkle_root: 'f002938401928374019283740192837401928374019283740192837401928374',
    tamper_flag: false,
    court_admissible: true,
  },
  {
    id: 'REC-2026-0894',
    timestamp: '2026-09-18 06:12:30 IST',
    officer_name: 'SI Murali Raman',
    officer_badge: 'NCB-TN-073',
    station: 'Chennai Zonal Unit',
    substance: 'Opium Alkaloids (Negative)',
    result: 'NEGATIVE',
    weight_grams: 0,
    confidence_score: 99.1,
    gps_lat: 13.0827,
    gps_lng: 80.2707,
    location_name: 'Chennai Port Customs Gate 2',
    sample_type: 'Organic Plant Extract',
    device_id: 'NS-FIELD-073-A',
    image_url: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&auto=format&fit=crop&q=80',
    sha256_hash: '2e98741029384710293847102938471029384710293847102938471029384710',
    prev_block_hash: '7c4b123984029384019238471029384719283740192837401928374019283740',
    merkle_root: '9182374019283740192837401928374019283740192837401928374019283740',
    tamper_flag: false,
    court_admissible: true,
  },
  {
    id: 'REC-2026-0895',
    timestamp: '2026-09-17 23:20:10 IST',
    officer_name: 'Insp. Francis D\'souza',
    officer_badge: 'NCB-GA-019',
    station: 'Goa Sub-Zone',
    substance: 'MDMA (Ecstasy Tablets)',
    result: 'POSITIVE',
    weight_grams: 340,
    confidence_score: 92.5,
    gps_lat: 15.2993,
    gps_lng: 74.1240,
    location_name: 'Anjuna Coastal Checkpoint, Goa',
    sample_type: 'Pressed Colored Tablets',
    device_id: 'NS-CIPHER-019-D',
    image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
    sha256_hash: '5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e',
    prev_block_hash: '2e98741029384710293847102938471029384710293847102938471029384710',
    merkle_root: '3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b',
    tamper_flag: false,
    court_admissible: true,
  },
  {
    id: 'REC-2026-0896',
    timestamp: '2026-09-17 21:05:40 IST',
    officer_name: 'SI Devendra Rathore',
    officer_badge: 'NCB-RJ-061',
    station: 'Jodhpur Regional Unit',
    substance: 'Cannabis / Charas Resin',
    result: 'POSITIVE',
    weight_grams: 12400,
    confidence_score: 95.7,
    gps_lat: 26.9124,
    gps_lng: 75.7873,
    location_name: 'Jaipur Bypass Toll Plaza',
    sample_type: 'Dark Brown Resin Slab',
    device_id: 'NS-FIELD-061-B',
    image_url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&auto=format&fit=crop&q=80',
    sha256_hash: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    prev_block_hash: '5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e',
    merkle_root: '8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d',
    tamper_flag: true, // Example tampered block demonstration
    court_admissible: false,
  },
];

export const recordService = {
  getRecords: async (filters = {}) => {
    try {
      const res = await apiClient.get('/records', { params: filters });
      return res.data;
    } catch {
      let filtered = [...FALLBACK_RECORDS];
      if (filters.result && filters.result !== 'ALL') {
        filtered = filtered.filter((r) => r.result === filters.result);
      }
      if (filters.substance && filters.substance !== 'ALL') {
        filtered = filtered.filter((r) => r.substance.toLowerCase().includes(filters.substance.toLowerCase()));
      }
      if (filters.station && filters.station !== 'ALL') {
        filtered = filtered.filter((r) => r.station === filters.station);
      }
      if (filters.search) {
        const query = filters.search.toLowerCase();
        filtered = filtered.filter(
          (r) =>
            r.id.toLowerCase().includes(query) ||
            r.officer_name.toLowerCase().includes(query) ||
            r.substance.toLowerCase().includes(query) ||
            r.station.toLowerCase().includes(query)
        );
      }
      return filtered;
    }
  },

  getRecordById: async (id) => {
    try {
      const res = await apiClient.get(`/records/${id}`);
      return res.data;
    } catch {
      return FALLBACK_RECORDS.find((r) => r.id === id) || FALLBACK_RECORDS[0];
    }
  },
};
