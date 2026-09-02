import { CreditCard, Wallet, Smartphone, ShieldCheck, Zap, Globe2, ArrowDownToLine } from 'lucide-react';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';

const points = [
  {
    icon: CreditCard,
    title: 'Semua metode pembayaran yang penting',
    desc: 'Kartu, dompet digital, dan jalur pembayaran lokal supaya tidak ada pelanggan yang batal di checkout.',
  },
  {
    icon: Zap,
    title: 'Checkout instan satu halaman',
    desc: 'Tidak perlu akun untuk membeli. Produk digital terkirim otomatis begitu pembayaran masuk.',
  },
  {
    icon: Wallet,
    title: 'Wallet & penarikan dana built-in',
    desc: 'Pantau saldo secara real-time dan tarik ke rekening bank kapan pun kamu mau.',
  },
  {
    icon: Globe2,
    title: 'Siap multi-mata uang',
    desc: 'Jual dalam mata uang pelanggan, terima dalam mata uangmu — dikonversi otomatis.',
  },
];

export default function Commerce() {
  return (
    <section id="commerce" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow icon={<Wallet className="h-3.5 w-3.5" />}>Pembayaran &amp; commerce</Eyebrow>
            <h2 className="text-balance mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-[40px]">
              Dibayar dengan caramu, setiap saat.
            </h2>
            <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-ink-600">
              Dari penjualan pertama sampai penarikan dana ke seribu, Mivra
              menangani sisi keuangan bisnismu supaya kamu bisa fokus berkarya.
            </p>

            <div className="mt-8 flex flex-col gap-6">
              {points.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-forest-50 text-forest-600">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-[15px] font-bold text-ink">{title}</p>
                    <p className="mt-1 text-[14px] leading-relaxed text-ink-400">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="mx-auto max-w-sm rounded-3xl border border-ink/8 bg-cream p-6 shadow-card">
              <p className="text-[12px] font-bold uppercase tracking-wide text-ink-400">Checkout</p>
              <div className="mt-4 flex items-center gap-3 rounded-2xl bg-white p-3">
                <img src="/images/product-course.jpg" alt="Kelas Content Creator" className="h-14 w-14 rounded-xl object-cover" />
                <div className="flex-1">
                  <p className="text-[13.5px] font-semibold text-ink">Kelas Content Creator</p>
                  <p className="text-[12px] text-ink-400">Digital · Akses instan</p>
                </div>
                <p className="text-[14px] font-bold text-ink">Rp 249.000</p>
              </div>

              <div className="mt-4 space-y-2 text-[13px] text-ink-500">
                <div className="flex justify-between"><span>Subtotal</span><span>Rp 249.000</span></div>
                <div className="flex justify-between"><span>Biaya platform</span><span>Rp 0</span></div>
                <div className="flex justify-between border-t border-ink/8 pt-2 text-ink font-bold"><span>Total</span><span>Rp 249.000</span></div>
              </div>

              <div className="mt-5 flex items-center gap-2">
                <div className="flex h-9 flex-1 items-center justify-center rounded-lg border border-ink/10 bg-white text-ink-500">
                  <CreditCard className="h-4 w-4" />
                </div>
                <div className="flex h-9 flex-1 items-center justify-center rounded-lg border border-ink/10 bg-white text-ink-500">
                  <Smartphone className="h-4 w-4" />
                </div>
                <div className="flex h-9 flex-1 items-center justify-center rounded-lg border border-ink/10 bg-white text-ink-500">
                  <Wallet className="h-4 w-4" />
                </div>
              </div>

              <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-ink py-3 text-[14px] font-bold text-cream">
                <ShieldCheck className="h-4 w-4 text-amber-400" /> Bayar aman — Rp 249.000
              </button>
            </div>

            <div className="animate-float-slow absolute -right-4 -top-8 hidden w-52 rounded-2xl border border-ink/8 bg-ink p-4 text-cream shadow-card sm:block">
              <p className="text-[11px] font-medium text-cream/60">Saldo wallet</p>
              <p className="mt-1 font-display text-[22px] font-bold">Rp 12.850.000</p>
              <button className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-amber-400 py-2 text-[12px] font-bold text-ink">
                <ArrowDownToLine className="h-3.5 w-3.5" /> Tarik dana
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
