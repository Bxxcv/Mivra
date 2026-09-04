'use client';

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import DemoDataBadge from './DemoDataBadge';

// Data contoh — bentuk kurva realistis biar enak diliat, TIDAK dari database.
// Ganti ke query analytics_events asli begitu Fase 6 (Dashboard Analitik) dibangun.
const demoData = [
  { day: 'Sen', kunjungan: 42 },
  { day: 'Sel', kunjungan: 58 },
  { day: 'Rab', kunjungan: 51 },
  { day: 'Kam', kunjungan: 73 },
  { day: 'Jum', kunjungan: 68 },
  { day: 'Sab', kunjungan: 91 },
  { day: 'Min', kunjungan: 84 },
];

export default function VisitChart() {
  return (
    <div className="rounded-2xl border border-ink/8 bg-white p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <p className="text-[13.5px] font-bold text-ink">Kunjungan 7 hari terakhir</p>
        <DemoDataBadge />
      </div>
      <div className="mt-3 h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={demoData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="visitFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F5810F" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#F5810F" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#17140F" strokeOpacity={0.06} />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 11, fill: '#6B6255' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis tick={{ fontSize: 11, fill: '#6B6255' }} axisLine={false} tickLine={false} width={28} />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: '1px solid rgba(23,20,15,0.08)',
                fontSize: 12.5,
                boxShadow: '0 8px 24px -8px rgba(23,20,15,0.15)',
              }}
            />
            <Area
              type="monotone"
              dataKey="kunjungan"
              stroke="#F5810F"
              strokeWidth={2.5}
              fill="url(#visitFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
