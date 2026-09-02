/**
 * Satu sumber kebenaran untuk semua batasan tier Gratis vs Premium.
 * Dipakai di UI (tampilkan sisa kuota) DAN di server/DB (enforcement asli).
 * Lihat docs/PRD.md §5-7 untuk definisi lengkap & alasan tiap batasan.
 *
 * PENTING: angka di sini HARUS sinkron dengan constraint/trigger di
 * supabase/migrations/0001_init.sql. Kalau ubah salah satu, ubah keduanya.
 */

export type Tier = 'free' | 'premium';

export const TIER_LIMITS = {
  free: {
    maxProducts: 5,
    maxLinks: 10,
    maxThemes: 5,
    hasSearchAndCategory: false,
    hasGallery: false,
    hasAdvancedAnalytics: false,
    hasOrderRecap: false,
    hasAI: false,
    hasCustomDomain: false,
    hasCoupon: false,
    hasMultiAdmin: false,
    showsMivraBadge: true,
    transactionFeePct: 5, // biaya transaksi checkout, placeholder — lihat ROADMAP Fase 8
  },
  premium: {
    maxProducts: 500,
    maxLinks: Infinity,
    maxThemes: Infinity,
    hasSearchAndCategory: true,
    hasGallery: true,
    hasAdvancedAnalytics: true,
    hasOrderRecap: true,
    hasAI: true,
    hasCustomDomain: true,
    hasCoupon: true,
    hasMultiAdmin: true,
    showsMivraBadge: false,
    transactionFeePct: 0,
  },
} as const satisfies Record<Tier, Record<string, number | boolean>>;

export function getLimits(tier: Tier) {
  return TIER_LIMITS[tier];
}

export function canAddProduct(tier: Tier, currentCount: number): boolean {
  return currentCount < TIER_LIMITS[tier].maxProducts;
}

export function canAddLink(tier: Tier, currentCount: number): boolean {
  return currentCount < TIER_LIMITS[tier].maxLinks;
}
