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
      <h1 className="font-display text-[22px] font-bold text-ink">{title}</h1>
      <div className="mt-5 flex flex-col items-center rounded-2xl border border-dashed border-ink/15 bg-white px-6 py-16 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
          <Icon className="h-5.5 w-5.5" />
        </div>
        <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-ink-500">{desc}</p>
        <p className="mt-3 text-[12px] font-semibold text-ink-400">Dijadwalkan: {phase} — lihat docs/ROADMAP.md</p>
      </div>
    </div>
  );
}
