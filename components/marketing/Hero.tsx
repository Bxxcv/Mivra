import { ArrowRight, PlayCircle, Star, Wallet, TrendingUp } from 'lucide-react';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import PhoneFrame from '@/components/mockups/PhoneFrame';
import BioPageMockup from '@/components/mockups/BioPageMockup';

const avatars = [
  '/images/avatar-1.jpg',
  '/images/avatar-2.jpg',
  '/images/avatar-3.jpg',
  '/images/avatar-4.jpg',
  '/images/avatar-5.jpg',
];

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
      <div
        className="absolute inset-0 -z-10 grid-fade opacity-70"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(23,20,15,0.11) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
        }}
      />
      <div className="absolute -top-24 right-[-8%] -z-10 h-[420px] w-[420px] rounded-full bg-amber-200/50 blur-[110px]" />
      <div className="absolute bottom-0 left-[-10%] -z-10 h-[380px] w-[380px] rounded-full bg-forest-100/60 blur-[100px]" />

      <Container>
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-10">
          <div className="max-w-xl">
            <Eyebrow icon={<img src="/mascot/mascot-main.png" alt="" className="h-4 w-4 object-contain" />}>
              Satu rumah untuk seluruh bisnis kreatormu
            </Eyebrow>

            <h1 className="text-balance mt-6 font-display text-[42px] font-bold leading-[1.06] tracking-tight text-ink sm:text-6xl">
              Seluruh bisnismu.
              <br />
              <span className="text-amber-500">Satu link.</span>
            </h1>

            <p className="text-balance mt-6 max-w-lg text-[17px] leading-relaxed text-ink-600">
              Mivra menggantikan link-in-bio, etalase toko, checkout, dan tools
              pelanggan kamu dengan satu halaman yang cepat dan cantik — dibuat
              untuk kreator, seller, dan bisnis kecil yang ingin mengelola semuanya
              dari satu tempat.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#cta"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[15px] font-semibold text-cream shadow-soft transition-all hover:bg-amber-500 hover:text-ink"
              >
                Mulai gratis
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#showcase"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-white px-6 py-3.5 text-[15px] font-semibold text-ink transition-colors hover:border-ink/30"
              >
                <PlayCircle className="h-4.5 w-4.5" />
                Lihat cara kerjanya
              </a>
            </div>

            <div className="mt-9 flex items-center gap-4">
              <div className="flex -space-x-3">
                {avatars.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className="h-9 w-9 rounded-full border-2 border-cream object-cover"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-[13px] font-medium text-ink-400">
                  Dipercaya oleh 50.000+ kreator &amp; seller
                </p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <div className="animate-float">
              <PhoneFrame>
                <BioPageMockup />
              </PhoneFrame>
            </div>

            <div className="animate-float-slow absolute -left-10 top-14 hidden w-44 rounded-2xl border border-ink/10 bg-white p-3.5 shadow-card sm:block">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-50 text-forest-600">
                  <Wallet className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-ink-400">Pesanan baru masuk</p>
                  <p className="text-[14px] font-bold text-ink">+ Rp 145.000</p>
                </div>
              </div>
            </div>

            <div className="animate-float absolute -right-6 bottom-24 hidden w-40 rounded-2xl border border-ink/10 bg-white p-3.5 shadow-card sm:block">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                  <TrendingUp className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-ink-400">Kunjungan hari ini</p>
                  <p className="text-[14px] font-bold text-ink">1.204</p>
                </div>
              </div>
            </div>

            <img
              src="/mascot/mascot-wave.png"
              alt="Maskot Mivra melambai"
              className="animate-float-slow pointer-events-none absolute -bottom-10 -left-6 h-28 w-28 object-contain drop-shadow-xl sm:h-32 sm:w-32"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
