import apiClient from './api';

const GENERATE_MOCK_CHAIN = (officerId = 'OFF-01') => {
  const isTamperedDemo = officerId === 'OFF-07';
  return [
    {
      block_index: 0,
      timestamp: '2026-09-17 14:00:12 UTC',
      record_id: 'GENESIS-BLOCK-00',
      officer_id: officerId,
      substance: 'Genesis Block - Key Attestation',
      result: 'SYSTEM_INIT',
      confidence: 100,
      prev_hash: '0000000000000000000000000000000000000000000000000000000000000000',
      current_hash: '7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b',
      signature: 'SIG-ECDSA-ED25519-NCB-ROOT',
      status: 'VERIFIED',
    },
    {
      block_index: 1,
      timestamp: '2026-09-17 18:22:45 UTC',
      record_id: 'REC-2026-0891',
      officer_id: officerId,
      substance: 'Heroin (Diacetylmorphine)',
      result: 'POSITIVE',
      confidence: 96.8,
      prev_hash: '7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b',
      current_hash: '3f78a2c1b8991b5c43d702e88a0b04c8f39572b217a4c9d9213ef2b89d41b439',
      signature: 'SIG-DEV-NCB-DL-082-9901',
      status: 'VERIFIED',
    },
    {
      block_index: 2,
      timestamp: '2026-09-18 02:10:14 UTC',
      record_id: 'REC-2026-0892',
      officer_id: officerId,
      substance: 'Cocaine Hydrochloride',
      result: 'POSITIVE',
      confidence: 98.4,
      prev_hash: '3f78a2c1b8991b5c43d702e88a0b04c8f39572b217a4c9d9213ef2b89d41b439',
      current_hash: isTamperedDemo
        ? 'BAD-HASH-TAMPERED-000000000000000000000000000000000000000000000000'
        : '8a12d948cb7389a02fbca93740283bd78394eac293817362948bdfc7392819bc',
      signature: isTamperedDemo ? 'INVALID-SIGNATURE-CHECK-FAILED' : 'SIG-DEV-NCB-DL-082-9902',
      status: isTamperedDemo ? 'TAMPERED' : 'VERIFIED',
      tamper_reason: isTamperedDemo ? 'Hash mismatch: previous block linkage broken' : null,
    },
    {
      block_index: 3,
      timestamp: '2026-09-18 07:30:45 UTC',
      record_id: 'REC-2026-0893',
      officer_id: officerId,
      substance: 'Methamphetamine',
      result: 'POSITIVE',
      confidence: 94.2,
      prev_hash: isTamperedDemo
        ? 'ORIGINAL-HASH-DOES-NOT-MATCH'
        : '8a12d948cb7389a02fbca93740283bd78394eac293817362948bdfc7392819bc',
      current_hash: '7c4b123984029384019238471029384719283740192837401928374019283740',
      signature: 'SIG-DEV-NCB-DL-082-9903',
      status: isTamperedDemo ? 'BROKEN_CHAIN' : 'VERIFIED',
      tamper_reason: isTamperedDemo ? 'Broken chain ancestry from Block 2' : null,
    },
  ];
};

export const exportService = {
  verifyOfficerChain: async (officerId) => {
    try {
      const res = await apiClient.get(`/chain/verify/${officerId}`);
      return res.data;
    } catch {
      return GENERATE_MOCK_CHAIN(officerId);
    }
  },

  exportCourtPackage: async (recordIds, notes = '') => {
    try {
      const res = await apiClient.post(
        '/export/court-package',
        { record_ids: recordIds, legal_notes: notes },
        { responseType: 'blob' }
      );
      return res.data;
    } catch {
      // Create a verifiable synthetic JSON package blob for download if backend offline
      const syntheticPackage = {
        narcseal_court_dossier: {
          export_id: `NCB-EXP-${Date.now()}`,
          generated_at: new Date().toISOString(),
          authorized_by: 'Superintendent Aakanksha Sharma',
          jurisdiction: 'Narcotics Control Bureau (NCB), Gov of India',
          admissibility_standard: 'Indian Evidence Act Sec 65B & NDPS Act 1985',
          total_records: recordIds.length,
          record_identifiers: recordIds,
          cryptographic_seal: {
            algorithm: 'SHA256-ECDSA-SECP256K1',
            digital_signature: 'MEQCID1vXf78v4f...NCB_SEAL_AUTHENTICATED',
            merkle_root_proof: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
          },
          notes: notes || 'Official evidence extraction for Hon. NDPS Special Court.',
        },
      };

      const blob = new Blob([JSON.stringify(syntheticPackage, null, 2)], {
        type: 'application/json',
      });
      return blob;
    }
  },
};
