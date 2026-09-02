import { ArrowUpRight, Eye, MousePointerClick, DollarSign } from 'lucide-react';
import BrowserFrame from './BrowserFrame';

const bars = [38, 52, 46, 64, 58, 72, 90, 68, 80, 96, 74, 88];

const topLinks = [
  { label: 'Belanja paket skincare-ku', clicks: 1240, pct: 92 },
  { label: 'Tonton video terbaruku', clicks: 860, pct: 68 },
  { label: 'Booking konsultasi 1:1', clicks: 410, pct: 34 },
];

export default function AnalyticsMockup() {
  return (
    <BrowserFrame url="mivra.id/dashboard/analitik">
      <div className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-display text-[17px] font-bold text-ink">Ringkasan analitik</p>
          <span className="rounded-full bg-cream-100 px-3 py-1.5 text-[11.5px] font-semibold text-ink-500">
            30 hari terakhir
          </span>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {[
            { icon: Eye, label: 'Tampilan halaman', value: '48,2K', delta: '+12,4%' },
            { icon: MousePointerClick, label: 'Klik link', value: '9.840', delta: '+8,1%' },
            { icon: DollarSign, label: 'Omset', value: 'Rp 285Jt', delta: '+21,6%' },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-ink/8 bg-cream-100 p-4">
              <div className="flex items-center justify-between">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-amber-600">
                  <s.icon className="h-3.5 w-3.5" />
                </div>
                <span className="flex items-center gap-0.5 text-[10.5px] font-bold text-forest-600">
                  <ArrowUpRight className="h-3 w-3" /> {s.delta}
                </span>
              </div>
              <p className="mt-2.5 font-display text-[17px] font-bold text-ink">{s.value}</p>
              <p className="text-[11px] text-ink-400">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-5">
          <div className="rounded-2xl border border-ink/8 p-4 sm:col-span-3">
            <p className="text-[12px] font-semibold text-ink-500">Tren omset</p>
            <div className="mt-4 flex h-28 items-end gap-1.5">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-t-md ${i === bars.length - 2 ? 'bg-amber-500' : 'bg-amber-200'}`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-ink/8 p-4 sm:col-span-2">
            <p className="text-[12px] font-semibold text-ink-500">Link berperforma terbaik</p>
            <div className="mt-4 flex flex-col gap-3.5">
              {topLinks.map((l) => (
                <div key={l.label}>
                  <div className="flex items-center justify-between text-[11.5px]">
                    <span className="font-medium text-ink truncate pr-2">{l.label}</span>
                    <span className="shrink-0 font-bold text-ink-400">{l.clicks}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-cream-100">
                    <div className="h-full rounded-full bg-forest-500" style={{ width: `${l.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}
