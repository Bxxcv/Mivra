import { createClient } from '@/lib/supabase/server';
import { getLimits, type Tier } from '@/lib/limits';
import { Link2, ShoppingBag, Eye } from 'lucide-react';

export default async function RingkasanPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select('tier, username')
    .eq('id', user!.id)
    .single();

  const tier: Tier = (profile?.tier as Tier) ?? 'free';
  const limits = getLimits(tier);

  const { count: linkCount } = await supabase
    .from('links')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user!.id);

  const { count: productCount } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user!.id);

  const stats = [
    {
      icon: Link2,
      label: 'Link aktif',
      value: `${linkCount ?? 0} / ${limits.maxLinks === Infinity ? '∞' : limits.maxLinks}`,
    },
    {
      icon: ShoppingBag,
      label: 'Produk',
      value: `${productCount ?? 0} / ${limits.maxProducts}`,
    },
    { icon: Eye, label: 'Kunjungan (30 hari)', value: '0' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-[22px] font-bold text-ink">Ringkasan</h1>
        <a
          href={`/${profile?.username}`}
          target="_blank"
          className="rounded-full border border-ink/10 bg-white px-4 py-2 text-[13px] font-semibold text-ink"
        >
          Lihat halaman publik ↗
        </a>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-2xl border border-ink/8 bg-white p-5 shadow-soft">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Icon className="h-4.5 w-4.5" />
            </div>
            <p className="mt-3 font-display text-[22px] font-bold text-ink">{value}</p>
            <p className="text-[12.5px] text-ink-400">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-dashed border-ink/15 bg-white p-6 text-center">
        <p className="text-[13.5px] text-ink-400">
          Rekap order &amp; omset akan muncul di sini setelah fitur Katalog &amp; Checkout
          selesai dibangun (Fase 4-5).
        </p>
      </div>
    </div>
  );
}
