'use client';

import { useTransition } from 'react';
import { applyTheme } from '@/app/(dashboard)/tema/actions';

export default function ApplyThemeButton({
  themeId,
  isActive,
  userId,
}: {
  themeId: string;
  isActive: boolean;
  userId: string;
}) {
  const [isPending, startTransition] = useTransition();

  if (isActive) {
    return (
      <span className="text-[11px] font-bold text-amber-500">Aktif</span>
    );
  }

  return (
    <button
      disabled={isPending}
      onClick={() => startTransition(() => applyTheme(userId, themeId))}
      className="rounded-lg bg-ink px-2.5 py-1 text-[11px] font-semibold text-cream transition-opacity hover:opacity-80 disabled:opacity-40 dark:bg-cream dark:text-ink"
    >
      {isPending ? '...' : 'Pakai'}
    </button>
  );
}
