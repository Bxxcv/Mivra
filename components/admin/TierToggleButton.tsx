'use client';

import { useTransition } from 'react';
import { adminSetUserTier } from '@/app/(admin)/admin/actions';
import type { Tier } from '@/lib/limits';

export default function TierToggleButton({ userId, tier }: { userId: string;tier: Tier }) {
  const [isPending, startTransition] = useTransition();
  const nextTier: Tier = tier === 'premium' ? 'free' : 'premium';
  
  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await adminSetUserTier(userId, nextTier);
        })
      }
      className={`rounded-full px-3 py-1.5 text-[11px] font-bold transition-colors disabled:opacity-50 ${
        tier === 'premium' ? 'bg-amber-400 text-ink' : 'bg-white/10 text-cream/70 hover:bg-white/15'
      }`}
    >
      {isPending ? '…' : tier === 'premium' ? 'Premium — jadikan Gratis' : 'Gratis — jadikan Premium'}
    </button>
  );
}