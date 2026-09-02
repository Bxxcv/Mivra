'use client';

import { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import Reveal from '@/components/ui/Reveal';

const plans = [
  {
    name: 'Gratis',
    tagline: 'Untuk yang baru mulai membangun halamannya',
    monthly: 0,
    yearly: 0,
    features: [
      '1 halaman Mivra',
      '5 tema gratis',
      'Maksimal 5 produk',
      'Maksimal 10 link medsos',
      'Checkout dasar',
      'Statistik dasar (kunjungan & klik)',
      'Dukungan komunitas',
    ],
    cta: 'Mulai gratis',
    highlighted: false,
  },
  {
    name: 'Premium',
    tagline: 'Untuk kreator & seller yang serius bertumbuh',
    monthly: 49000,
    yearly: 39000,
    features: [
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
      'Kode diskon & pengingat stok',
      'Dukungan prioritas',
    ],
    cta: 'Upgrade ke Premium',
    highlighted: true,
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="pricing" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Harga</Eyebrow>
          <h2 className="text-balance mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-[44px]">
            Harga simpel yang tumbuh bersamamu.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-600">
            Mulai gratis, upgrade hanya saat bisnismu butuh lebih. Tanpa biaya
            transaksi tersembunyi di paket berbayar.
          </p>

          <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-ink/10 bg-white p-1.5 shadow-soft">
            <button
              onClick={() => setYearly(false)}
              className={`rounded-full px-5 py-2 text-[13.5px] font-semibold transition-colors ${
                !yearly ? 'bg-ink text-cream' : 'text-ink-500'
              }`}
            >
              Bulanan
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`flex items-center gap-1.5 rounded-full px-5 py-2 text-[13.5px] font-semibold transition-colors ${
                yearly ? 'bg-ink text-cream' : 'text-ink-500'
              }`}
            >
              Tahunan
              <span className="rounded-full bg-amber-400 px-2 py-0.5 text-[10.5px] font-bold text-ink">
                Hemat 20%
              </span>
            </button>
          </div>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-3xl border p-8 ${
                plan.highlighted
                  ? 'border-amber-400 bg-ink text-cream shadow-[0_30px_60px_-20px_rgba(23,20,15,0.4)] sm:-translate-y-3'
                  : 'border-ink/8 bg-white text-ink shadow-soft'
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-amber-400 px-3.5 py-1.5 text-[11.5px] font-bold text-ink">
                  <Sparkles className="h-3 w-3" /> Paling populer
                </span>
              )}

              <p className={`font-display text-[19px] font-bold ${plan.highlighted ? 'text-cream' : 'text-ink'}`}>
                {plan.name}
              </p>
              <p className={`mt-1 text-[13.5px] ${plan.highlighted ? 'text-cream/60' : 'text-ink-400'}`}>
                {plan.tagline}
              </p>

              <div className="mt-6 flex items-end gap-1.5">
                <span className="font-display text-[36px] font-bold leading-none">
                  Rp{(yearly ? plan.yearly : plan.monthly).toLocaleString('id-ID')}
                </span>
                <span className={`pb-1.5 text-[13.5px] ${plan.highlighted ? 'text-cream/60' : 'text-ink-400'}`}>
                  / bulan
                </span>
              </div>
              {plan.monthly > 0 && (
                <p className={`mt-1 text-[12px] ${plan.highlighted ? 'text-cream/50' : 'text-ink-400'}`}>
                  Ditagih {yearly ? 'tahunan' : 'bulanan'}
                </p>
              )}

              <a
                href="#cta"
                className={`mt-7 flex w-full items-center justify-center rounded-full py-3 text-[14.5px] font-semibold transition-all ${
                  plan.highlighted
                    ? 'bg-amber-400 text-ink hover:bg-amber-300'
                    : 'bg-ink text-cream hover:bg-amber-500 hover:text-ink'
                }`}
              >
                {plan.cta}
              </a>

              <ul className="mt-8 flex flex-col gap-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[13.5px]">
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        plan.highlighted ? 'text-amber-400' : 'text-forest-500'
                      }`}
                    />
                    <span className={plan.highlighted ? 'text-cream/85' : 'text-ink-600'}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-[14px] text-ink-400">
          Butuh paket khusus untuk agensi atau marketplace? {' '}
          <a href="#cta" className="font-semibold text-ink underline decoration-amber-400 decoration-2 underline-offset-4">
            Hubungi kami
          </a>
        </p>
      </Container>
    </section>
  );
}
