'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function SignupsChart({ data }: { data: { day: string; jumlah: number }[] }) {
  return (
    <div className="rounded-2xl bg-white/[0.04] p-5">
      <p className="text-[13px] font-bold text-cream">Pendaftaran 7 hari terakhir</p>
      <div className="mt-3 h-[170px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: -24, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#FFFFFF" strokeOpacity={0.06} />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'rgba(251,248,242,0.4)' }} axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fontSize: 11, fill: 'rgba(251,248,242,0.4)' }}
              axisLine={false}
              tickLine={false}
              width={24}
              allowDecimals={false}
            />
            <Tooltip
              cursor={{ fill: 'rgba(255,255,255,0.04)' }}
              contentStyle={{
                background: '#17140F',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12,
                fontSize: 12.5,
                color: '#FBF8F2',
              }}
            />
            <Bar dataKey="jumlah" fill="#FF9C3A" radius={[6, 6, 0, 0]} maxBarSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
