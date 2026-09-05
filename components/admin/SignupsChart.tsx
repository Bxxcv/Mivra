'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useIsDark } from '@/lib/use-is-dark';

export default function SignupsChart({ data }: { data: { day: string; jumlah: number }[] }) {
  const isDark = useIsDark();
  const tickColor = isDark ? 'rgba(251,248,242,0.4)' : 'rgba(23,20,15,0.45)';
  const gridColor = isDark ? '#FFFFFF' : '#17140F';

  return (
    <div className="rounded-2xl bg-ink/5 p-5 dark:bg-white/[0.04]">
      <p className="text-[13px] font-bold text-ink dark:text-cream">Pendaftaran 7 hari terakhir</p>
      <div className="mt-3 h-[170px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: -24, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke={gridColor} strokeOpacity={0.08} />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: tickColor }} axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fontSize: 11, fill: tickColor }}
              axisLine={false}
              tickLine={false}
              width={24}
              allowDecimals={false}
            />
            <Tooltip
              cursor={{ fill: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(23,20,15,0.04)' }}
              contentStyle={{
                background: isDark ? '#17140F' : '#FFFFFF',
                border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(23,20,15,0.08)',
                borderRadius: 12,
                fontSize: 12.5,
                color: isDark ? '#FBF8F2' : '#17140F',
              }}
            />
            <Bar dataKey="jumlah" fill="#FF9C3A" radius={[6, 6, 0, 0]} maxBarSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
