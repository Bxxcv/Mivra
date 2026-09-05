'use client';

import { useTransition } from 'react';
import { adminSetUserTier } from '@/app/(admin)/admin/actions';
import type { Tier } from '@/lib/limits';

export default function TierToggleButton({ userId, tier }: { userId: string; tier: Tier }) {
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
      className={`rounded-full px-3 py-1.5 text-[10.5px] font-bold transition-colors disabled:opacity-50 ${
        tier === 'premium'
          ? 'bg-amber-400 text-ink'
          : 'bg-ink/5 text-ink-500 hover:bg-ink/10 dark:bg-white/[0.06] dark:text-cream/60 dark:hover:bg-white/10'
      }`}
    >
      {isPending ? '…' : tier === 'premium' ? 'Premium — jadikan Gratis' : 'Gratis — jadikan Premium'}
    </button>
  );
}
