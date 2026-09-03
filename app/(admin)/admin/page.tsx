import { createAdminClient } from '@/lib/supabase/server';
import TierToggleButton from '@/components/admin/TierToggleButton';
import type { Tier } from '@/lib/limits';
import { Users2, Sparkles } from 'lucide-react';

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
      <div className="mb-6 flex items-baseline justify-between">
        <h1 className="font-display text-[22px] font-bold text-cream">Semua User</h1>
        <p className="font-mono text-[11px] text-cream/30">{total} total · {premiumCount} premium</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-2xl bg-white/[0.04] p-5">
          <Users2 className="h-4 w-4 text-cream/30" />
          <p className="mt-3 font-display text-[26px] font-bold leading-none text-cream">{total}</p>
          <p className="mt-1 text-[11.5px] font-medium text-cream/40">Total user terdaftar</p>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-amber-400/15 to-transparent p-5 ring-1 ring-inset ring-amber-400/20">
          <Sparkles className="h-4 w-4 text-amber-400" />
          <p className="mt-3 font-display text-[26px] font-bold leading-none text-amber-400">{premiumCount}</p>
          <p className="mt-1 text-[11.5px] font-medium text-cream/40">Berlangganan Premium</p>
        </div>
        <div className="rounded-2xl bg-white/[0.04] p-5">
          <p className="text-[16px]">🐹</p>
          <p className="mt-3 font-display text-[26px] font-bold leading-none text-cream">{total - premiumCount}</p>
          <p className="mt-1 text-[11.5px] font-medium text-cream/40">Masih tier Gratis</p>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl bg-white/[0.03]">
        <div className="grid grid-cols-6 gap-2 border-b border-white/5 px-5 py-3 text-[10.5px] font-bold uppercase tracking-wider text-cream/30">
          <span className="col-span-2">User</span>
          <span>Tier</span>
          <span>Link</span>
          <span>Produk</span>
          <span className="text-right">Aksi</span>
        </div>
        {(profiles ?? []).map((p) => (
          <div
            key={p.id}
            className="grid grid-cols-6 items-center gap-2 border-b border-white/5 px-5 py-3.5 text-[13px] last:border-b-0 hover:bg-white/[0.02]"
          >
            <div className="col-span-2">
              <p className="font-semibold text-cream">@{p.username}</p>
              <p className="text-[11px] text-cream/35">{p.display_name || '—'}</p>
            </div>
            <span
              className={`w-fit rounded-full px-2.5 py-1 text-[10.5px] font-bold ${
                p.tier === 'premium' ? 'bg-amber-400/15 text-amber-400' : 'bg-white/[0.06] text-cream/50'
              }`}
            >
              {p.tier === 'premium' ? 'Premium' : 'Gratis'}
            </span>
            <span className="font-mono text-[12.5px] text-cream/50">{linkCountMap.get(p.id) ?? 0}</span>
            <span className="font-mono text-[12.5px] text-cream/50">{productCountMap.get(p.id) ?? 0}</span>
            <div className="flex justify-end">
              <TierToggleButton userId={p.id} tier={(p.tier as Tier) ?? 'free'} />
            </div>
          </div>
        ))}
        {total === 0 && (
          <p className="px-5 py-10 text-center text-[13px] text-cream/30">Belum ada user terdaftar.</p>
        )}
      </div>
    </div>
  );
}
