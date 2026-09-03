import { Check, Sparkles } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

const freeFeatures = [
  '1 halaman Mivra',
  '5 tema gratis',
  'Maksimal 5 produk',
  'Maksimal 10 link medsos',
  'Checkout dasar',
  'Statistik dasar',
];

const premiumFeatures = [
  'Semua fitur Gratis',
  'Tema premium tak terbatas',
  'Katalog hingga 500 produk',
  'Search, filter & kategori rapi',
  'Gallery portofolio tak terbatas',
  'Link medsos tak terbatas',
  'Rekap order & omset + export',
  'Analitik lanjutan',
  'Hapus badge "Dibuat dengan Mivra"',
  'Domain custom sendiri',
  'Asisten AI 24 jam',
  'Dukungan prioritas',
];

export default async function UpgradePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from('profiles')
    .select('tier')
    .eq('id', user!.id)
    .single();

  const isPremium = profile?.tier === 'premium';

  return (
    <div>
      <div className="flex items-center gap-3">
        <img src="/mascot/mascot-wallet.webp" alt="" className="h-11 w-11 object-contain" />
        <div>
          <h1 className="font-display text-[22px] font-bold text-ink">Upgrade ke Premium</h1>
          <p className="text-[13.5px] text-ink-400">
            Pembayaran langganan belum aktif (menyusul di Fase 8) — halaman ini pratinjau paket.
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="rounded-3xl border border-ink/8 bg-white p-6">
          <p className="font-display text-[17px] font-bold text-ink">Gratis</p>
          <p className="mt-1 text-[12.5px] text-ink-400">Paketmu saat ini{!isPremium ? ' ✓' : ''}</p>
          <ul className="mt-5 flex flex-col gap-2.5">
            {freeFeatures.map((f) => (
              <li key={f} className="flex items-start gap-2 text-[13px] text-ink-600">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-forest-500" /> {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-amber-400 bg-ink p-6 text-cream">
          <p className="flex items-center gap-1.5 font-display text-[17px] font-bold">
            <Sparkles className="h-4 w-4 text-amber-400" /> Premium
          </p>
          <p className="mt-1 text-[12.5px] text-cream/60">{isPremium ? 'Paketmu saat ini ✓' : 'Rp49.000/bulan'}</p>
          <ul className="mt-5 flex flex-col gap-2.5">
            {premiumFeatures.map((f) => (
              <li key={f} className="flex items-start gap-2 text-[13px] text-cream/85">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" /> {f}
              </li>
            ))}
          </ul>
          {!isPremium && (
            <button
              disabled
              className="mt-6 w-full cursor-not-allowed rounded-full bg-amber-400/40 py-3 text-[13.5px] font-bold text-ink/60"
              title="Payment gateway belum aktif — Fase 8"
            >
              Segera hadir
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
