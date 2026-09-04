import { createClient } from '@/lib/supabase/server';
import { getLimits, type Tier } from '@/lib/limits';
import { Link2, ShoppingBag, Eye, ArrowUpRight, Sparkles } from 'lucide-react';
import VisitChart from '@/components/dashboard/VisitChart';
import TrafficDonut from '@/components/dashboard/TrafficDonut';

export default async function RingkasanPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select('tier, username, display_name')
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

  const linkDisplay = `${linkCount ?? 0}${limits.maxLinks === Infinity ? '' : ` / ${limits.maxLinks}`}`;
  const productDisplay = `${productCount ?? 0} / ${limits.maxProducts}`;

  return (
    <div>
      {/* Hero banner — bukan cuma judul polos, ada maskot & CTA lihat halaman publik */}
      <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-7 sm:px-8">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="relative flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-wide text-amber-400">
              @{profile?.username}
            </p>
            <h1 className="mt-1 font-display text-[24px] font-bold text-cream sm:text-[28px]">
              Halamanmu siap dilihat dunia.
            </h1>
          </div>
          <a
            href={`/${profile?.username}`}
            target="_blank"
            className="group flex shrink-0 items-center gap-1.5 rounded-full bg-amber-400 px-5 py-2.5 text-[13.5px] font-bold text-ink transition-transform hover:-translate-y-0.5"
          >
            Lihat halaman publik
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
        <img
          src="/mascot/mascot-wave.webp"
          alt=""
          className="pointer-events-none absolute -bottom-4 right-6 hidden h-24 w-24 object-contain opacity-90 sm:block"
        />
      </div>

      {/* Stat cards — tiap kartu punya warna & karakter sendiri, bukan template seragam */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-ink/8 bg-white p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-50 text-forest-600">
              <Link2 className="h-4.5 w-4.5" />
            </div>
            {tier === 'free' && linkCount === limits.maxLinks && (
              <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-600">Penuh</span>
            )}
          </div>
          <p className="mt-3.5 font-display text-[28px] font-bold leading-none text-ink">{linkDisplay}</p>
          <p className="mt-1 text-[12.5px] font-medium text-ink-400">Link di halaman bio</p>
        </div>

        <div className="rounded-2xl border border-ink/8 bg-white p-5 shadow-soft">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <ShoppingBag className="h-4.5 w-4.5" />
          </div>
          <p className="mt-3.5 font-display text-[28px] font-bold leading-none text-ink">{productDisplay}</p>
          <p className="mt-1 text-[12.5px] font-medium text-ink-400">Produk di katalog</p>
        </div>

        <div className="rounded-2xl border border-ink/8 bg-white p-5 shadow-soft">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-500/10 text-navy-500">
            <Eye className="h-4.5 w-4.5" />
          </div>
          <p className="mt-3.5 font-display text-[28px] font-bold leading-none text-ink">0</p>
          <p className="mt-1 text-[12.5px] font-medium text-ink-400">Kunjungan 30 hari terakhir</p>
        </div>
      </div>

      {/* Chart — datanya masih contoh, ditandai jelas, sampai Fase 6 (Dashboard Analitik) dibangun */}
      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <VisitChart />
        </div>
        <div className="lg:col-span-2">
          <TrafficDonut />
        </div>
      </div>

      {/* Empty state yang ada karakter, bukan kotak putus-putus generik */}
      <div className="mt-5 flex flex-col items-center gap-3 rounded-2xl border border-ink/8 bg-cream-100 px-6 py-10 text-center sm:flex-row sm:gap-5 sm:text-left">
        <img src="/mascot/mascot-support.webp" alt="" className="h-16 w-16 shrink-0 object-contain" />
        <div>
          <p className="text-[14px] font-bold text-ink">Rekap order & omset belum ada data</p>
          <p className="mt-0.5 text-[13px] text-ink-400">
            Bagian ini otomatis terisi begitu ada pesanan masuk lewat fitur Checkout (segera hadir).
          </p>
        </div>
      </div>

      {tier === 'free' && (
        <a
          href="/upgrade"
          className="mt-5 flex items-center gap-3 rounded-2xl border border-amber-300/60 bg-amber-50 px-5 py-4 transition-colors hover:bg-amber-100/60"
        >
          <Sparkles className="h-5 w-5 shrink-0 text-amber-600" />
          <span className="text-[13px] font-semibold text-amber-800">
            Upgrade ke Premium untuk analitik lanjutan, katalog 500 produk, dan hapus badge Mivra.
          </span>
        </a>
      )}
    </div>
  );
}
