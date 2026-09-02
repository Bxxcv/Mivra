import {
  LayoutGrid,
  ShoppingBag,
  Users,
  BarChart3,
  Wallet,
  Settings,
  Search,
  Bell,
} from 'lucide-react';
import BrowserFrame from './BrowserFrame';

const nav = [
  { icon: LayoutGrid, active: true },
  { icon: ShoppingBag, active: false },
  { icon: Users, active: false },
  { icon: BarChart3, active: false },
  { icon: Wallet, active: false },
  { icon: Settings, active: false },
];

const orders = [
  { id: '#3021', name: 'Aria Morgan', product: 'Paket Skincare', amount: 'Rp 178.000', status: 'Lunas' },
  { id: '#3020', name: 'Devon Kim', product: 'Paket Preset', amount: 'Rp 75.000', status: 'Lunas' },
  { id: '#3019', name: 'Priya Shah', product: 'Sesi Coaching', amount: 'Rp 370.000', status: 'Menunggu' },
  { id: '#3018', name: 'Marco Diaz', product: 'Hoodie Nyaman', amount: 'Rp 148.000', status: 'Dikirim' },
];

const statusColor: Record<string, string> = {
  Lunas: 'bg-forest-50 text-forest-600',
  Menunggu: 'bg-amber-50 text-amber-600',
  Dikirim: 'bg-navy-500/10 text-navy-500',
};

export default function DashboardMockup() {
  return (
    <BrowserFrame url="mivra.id/dashboard">
      <div className="flex">
        <div className="flex w-14 flex-col items-center gap-3 border-r border-ink/8 bg-cream-100 py-5">
          {nav.map(({ icon: Icon, active }, i) => (
            <div
              key={i}
              className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                active ? 'bg-ink text-amber-400' : 'text-ink-400'
              }`}
            >
              <Icon className="h-4.5 w-4.5" />
            </div>
          ))}
        </div>

        <div className="flex-1 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-display text-[17px] font-bold text-ink">Selamat pagi, Luna</p>
              <p className="text-[12px] text-ink-400">Ini yang terjadi hari ini</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/10 text-ink-400">
                <Search className="h-3.5 w-3.5" />
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/10 text-ink-400">
                <Bell className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              { label: 'Omset hari ini', value: 'Rp 2.450.000' },
              { label: 'Pesanan baru', value: '18' },
              { label: 'Saldo wallet', value: 'Rp 12.850.000' },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-ink/8 bg-cream-100 p-4">
                <p className="text-[11px] font-medium text-ink-400">{s.label}</p>
                <p className="mt-1 font-display text-[18px] font-bold text-ink">{s.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-ink/8">
            <div className="grid grid-cols-4 bg-cream-100 px-4 py-2.5 text-[11px] font-bold uppercase tracking-wide text-ink-400">
              <span>Pesanan</span>
              <span>Pelanggan</span>
              <span>Produk</span>
              <span className="text-right">Status</span>
            </div>
            {orders.map((o, i) => (
              <div
                key={o.id}
                className={`grid grid-cols-4 items-center px-4 py-3 text-[12.5px] ${
                  i !== orders.length - 1 ? 'border-b border-ink/6' : ''
                }`}
              >
                <span className="font-medium text-ink-400">{o.id}</span>
                <span className="font-semibold text-ink">{o.name}</span>
                <span className="text-ink-500">{o.product}</span>
                <span className="text-right">
                  <span className={`rounded-full px-2.5 py-1 text-[10.5px] font-bold ${statusColor[o.status]}`}>
                    {o.status}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}
