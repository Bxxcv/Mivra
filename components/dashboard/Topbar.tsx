import { Bell } from 'lucide-react';
import type { Tier } from '@/lib/limits';
import ThemeToggle from './ThemeToggle';

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
    <header className="flex items-center justify-between border-b border-ink/8 bg-cream px-5 py-3.5 dark:border-white/10 dark:bg-[#1A1712] sm:px-6 sm:py-4">
      <div className="flex items-center gap-3">
        <img src="/mascot/mascot-main.webp" alt="" className="hidden h-9 w-9 object-contain sm:block" />
        <div>
          <p className="font-display text-[15px] font-bold leading-tight text-ink dark:text-cream sm:text-[17px]">
            Selamat {greeting}, {displayName} 👋
          </p>
          <p className="hidden text-[12px] text-ink-400 dark:text-cream/40 sm:block">
            Begini kabar halamanmu hari ini.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-2.5">
        <span
          className={`rounded-full px-3 py-1.5 text-[11px] font-bold ${
            tier === 'premium'
              ? 'bg-amber-400 text-ink'
              : 'border border-ink/10 text-ink-500 dark:border-white/15 dark:text-cream/60'
          }`}
        >
          {tier === 'premium' ? '✦ Premium' : 'Gratis'}
        </span>
        <ThemeToggle />
        <button className="relative flex h-9 w-9 items-center justify-center rounded-full text-ink-400 hover:bg-ink/5 hover:text-ink dark:text-cream/50 dark:hover:bg-white/10 dark:hover:text-cream">
          <Bell className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
