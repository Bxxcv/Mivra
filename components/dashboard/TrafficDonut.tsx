'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import DemoDataBadge from './DemoDataBadge';
import { useIsDark } from '@/lib/use-is-dark';

// Data contoh — TIDAK dari database. Ganti ke query analytics_events asli
// begitu Fase 6 (Dashboard Analitik) dibangun.
const demoData = [
  { name: 'Instagram', value: 48, color: '#F5810F' },
  { name: 'TikTok', value: 27, color: '#26714A' },
  { name: 'Langsung', value: 16, color: '#1E2A4A' },
  { name: 'Lainnya', value: 9, color: '#D8CFBD' },
];

export default function TrafficDonut() {
  const isDark = useIsDark();
  return (
    <div className="rounded-2xl border border-ink/8 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-[#1D1A16]">
      <div className="flex items-center justify-between">
        <p className="text-[13.5px] font-bold text-ink dark:text-cream">Sumber trafik</p>
        <DemoDataBadge />
      </div>
      <div className="mt-2 flex items-center gap-4">
        <div className="h-[140px] w-[140px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={demoData}
                dataKey="value"
                nameKey="name"
                innerRadius={42}
                outerRadius={62}
                paddingAngle={3}
                stroke="none"
              >
                {demoData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(23,20,15,0.08)',
                  background: isDark ? '#1D1A16' : '#FFFFFF',
                  color: isDark ? '#FBF8F2' : '#17140F',
                  fontSize: 12.5,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          {demoData.map((d) => (
            <div key={d.name} className="flex items-center justify-between text-[12px]">
              <span className="flex items-center gap-1.5 font-medium text-ink-600 dark:text-cream/70">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: d.color }} />
                {d.name}
              </span>
              <span className="font-bold text-ink dark:text-cream">{d.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
