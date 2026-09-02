import { Bell, Search } from 'lucide-react';
import type { Tier } from '@/lib/limits';

export default function Topbar({
  displayName,
  tier,
}: {
  displayName: string;
  tier: Tier;
}) {
  const hour = new Date().getHours();
  const greeting = hour < 11 ? 'Selamat pagi' : hour < 15 ? 'Selamat siang' : hour < 19 ? 'Selamat sore' : 'Selamat malam';

  return (
    <header className="flex items-center justify-between border-b border-ink/8 bg-white px-6 py-4">
      <div>
        <p className="font-display text-[17px] font-bold text-ink">
          {greeting}, {displayName}
        </p>
        <p className="text-[12px] text-ink-400">Ini yang terjadi di halamanmu hari ini.</p>
      </div>
      <div className="flex items-center gap-2">
        <span
          className={`rounded-full px-3 py-1.5 text-[11px] font-bold ${
            tier === 'premium' ? 'bg-amber-400 text-ink' : 'bg-ink/5 text-ink-500'
          }`}
        >
          {tier === 'premium' ? 'Premium' : 'Gratis'}
        </span>
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-ink-400">
          <Search className="h-4 w-4" />
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-ink-400">
          <Bell className="h-4 w-4" />
        </div>
      </div>
    </header>
  );
}
