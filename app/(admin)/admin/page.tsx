import { createAdminClient } from '@/lib/supabase/server';
import TierToggleButton from '@/components/admin/TierToggleButton';
import type { Tier } from '@/lib/limits';
import { Users2, Link2, ShoppingBag } from 'lucide-react';

export default async function AdminPage() {
  const admin = createAdminClient();

  const { data: profiles } = await admin
    .from('profiles')
    .select('id, username, display_name, tier, created_at')
    .order('created_at', { ascending: false });

  const { data: linkCounts } = await admin.from('links').select('user_id');
  const { data: productCounts } = await admin.from('products').select('user_id');

  const linkCountMap = new Map<string, number>();
  (linkCounts ?? []).forEach((l) => linkCountMap.set(l.user_id, (linkCountMap.get(l.user_id) ?? 0) + 1));
  const productCountMap = new Map<string, number>();
  (productCounts ?? []).forEach((p) => productCountMap.set(p.user_id, (productCountMap.get(p.user_id) ?? 0) + 1));

  const total = profiles?.length ?? 0;
  const premiumCount = profiles?.filter((p) => p.tier === 'premium').length ?? 0;

  return (
    <div>
      <h1 className="font-display text-[20px] font-bold text-cream">Semua User</h1>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2 text-cream/50">
            <Users2 className="h-4 w-4" /> <span className="text-[11px] font-semibold">Total user</span>
          </div>
          <p className="mt-1.5 font-display text-[20px] font-bold text-cream">{total}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-[11px] font-semibold text-cream/50">Premium</p>
          <p className="mt-1.5 font-display text-[20px] font-bold text-amber-400">{premiumCount}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-[11px] font-semibold text-cream/50">Gratis</p>
          <p className="mt-1.5 font-display text-[20px] font-bold text-cream">{total - premiumCount}</p>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
        <div className="grid grid-cols-6 gap-2 bg-white/5 px-4 py-2.5 text-[11px] font-bold uppercase tracking-wide text-cream/40">
          <span className="col-span-2">User</span>
          <span>Tier</span>
          <span>Link</span>
          <span>Produk</span>
          <span className="text-right">Aksi</span>
        </div>
        {(profiles ?? []).map((p) => (
          <div
            key={p.id}
            className="grid grid-cols-6 items-center gap-2 border-t border-white/5 px-4 py-3 text-[13px]"
          >
            <div className="col-span-2">
              <p className="font-semibold text-cream">@{p.username}</p>
              <p className="text-[11px] text-cream/40">{p.display_name || '—'}</p>
            </div>
            <span
              className={`w-fit rounded-full px-2.5 py-1 text-[10.5px] font-bold ${
                p.tier === 'premium' ? 'bg-amber-400/20 text-amber-400' : 'bg-white/10 text-cream/60'
              }`}
            >
              {p.tier === 'premium' ? 'Premium' : 'Gratis'}
            </span>
            <span className="flex items-center gap-1 text-cream/60">
              <Link2 className="h-3 w-3" /> {linkCountMap.get(p.id) ?? 0}
            </span>
            <span className="flex items-center gap-1 text-cream/60">
              <ShoppingBag className="h-3 w-3" /> {productCountMap.get(p.id) ?? 0}
            </span>
            <div className="flex justify-end">
              <TierToggleButton userId={p.id} tier={(p.tier as Tier) ?? 'free'} />
            </div>
          </div>
        ))}
        {total === 0 && (
          <p className="px-4 py-8 text-center text-[13px] text-cream/40">Belum ada user terdaftar.</p>
        )}
      </div>
    </div>
  );
}
