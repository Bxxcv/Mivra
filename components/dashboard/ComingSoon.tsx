import { type LucideIcon } from 'lucide-react';

export default function ComingSoon({
  icon: Icon,
  title,
  desc,
  phase,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  phase: string;
}) {
  return (
    <div>
      <h1 className="font-display text-[22px] font-bold text-ink dark:text-cream">{title}</h1>
      <div className="mt-5 flex flex-col items-center overflow-hidden rounded-3xl border border-ink/8 bg-white px-6 py-14 text-center shadow-soft dark:border-white/10 dark:bg-[#1D1A16]">
        <div className="relative">
          <img
            src="/mascot/mascot-support.webp"
            alt=""
            className="h-20 w-20 object-contain"
          />
          <div className="absolute -bottom-1 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 text-ink shadow-soft">
            <Icon className="h-4 w-4" />
          </div>
        </div>
        <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-ink-500 dark:text-cream/50">{desc}</p>
        <p className="mt-3 rounded-full bg-cream-100 px-3 py-1 text-[11.5px] font-bold text-ink-400 dark:bg-white/10 dark:text-cream/50">
          Dijadwalkan: {phase}
        </p>
      </div>
    </div>
  );
}
