import { Bell } from 'lucide-react';
import type { Tier } from '@/lib/limits';

export default function Topbar({
  displayName,
  tier,
}: {
  displayName: string;
  tier: Tier;
}) {
  const hour = new Date().getHours();
  const greeting = hour < 11 ? 'pagi' : hour < 15 ? 'siang' : hour < 19 ? 'sore' : 'malam';

  return (
    <header className="flex items-center justify-between border-b border-ink/8 bg-cream px-6 py-4">
      <div className="flex items-center gap-3">
        <img src="/mascot/mascot-main.webp" alt="" className="h-9 w-9 object-contain" />
        <div>
          <p className="font-display text-[17px] font-bold leading-tight text-ink">
            Selamat {greeting}, {displayName} 👋
          </p>
          <p className="text-[12px] text-ink-400">Begini kabar halamanmu hari ini.</p>
        </div>
      </div>
      <div className="flex items-center gap-2.5">
        <span
          className={`rounded-full px-3 py-1.5 text-[11px] font-bold ${
            tier === 'premium' ? 'bg-amber-400 text-ink' : 'border border-ink/10 text-ink-500'
          }`}
        >
          {tier === 'premium' ? '✦ Premium' : 'Gratis'}
        </span>
        <button className="relative flex h-9 w-9 items-center justify-center rounded-full text-ink-400 hover:bg-ink/5 hover:text-ink">
          <Bell className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
