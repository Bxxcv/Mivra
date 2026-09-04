'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function TierDonut({ free, premium }: { free: number; premium: number }) {
  const data = [
    { name: 'Premium', value: premium, color: '#FF9C3A' },
    { name: 'Gratis', value: free, color: 'rgba(251,248,242,0.15)' },
  ];
  const total = free + premium;

  return (
    <div className="rounded-2xl bg-white/[0.04] p-5">
      <p className="text-[13px] font-bold text-cream">Distribusi tier</p>
      <div className="relative mt-3 h-[170px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" innerRadius={52} outerRadius={72} paddingAngle={3} stroke="none">
              {data.map((d) => (
                <Cell key={d.name} fill={d.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="font-display text-[20px] font-bold text-cream">
            {total > 0 ? Math.round((premium / total) * 100) : 0}%
          </p>
          <p className="text-[10px] font-medium text-cream/40">Premium</p>
        </div>
      </div>
    </div>
  );
}
