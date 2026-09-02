import {
  Mic2,
  Music4,
  Briefcase,
  Store,
  Share2,
  Gamepad2,
  Sparkles,
  ShoppingBag,
  ArrowUpRight,
} from 'lucide-react';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';

const featured = [
  {
    img: '/images/usecase-creator.webp',
    title: 'Kreator & influencer',
    desc: 'Ubah followers jadi pelanggan lewat satu halaman untuk konten, merchandise, dan penawaran berbayar.',
  },
  {
    img: '/images/usecase-business.webp',
    title: 'Bisnis kecil & UMKM',
    desc: 'Jalankan seluruh etalase tokomu — katalog, checkout, dan pengiriman — tanpa perlu website sendiri.',
  },
];

const grid = [
  { icon: Music4, title: 'Musisi & seniman' },
  { icon: Briefcase, title: 'Freelancer & profesional' },
  { icon: Share2, title: 'Affiliate & marketer' },
  { icon: Gamepad2, title: 'Gamer & streamer' },
  { icon: Sparkles, title: 'Personal brand' },
  { icon: ShoppingBag, title: 'Online seller' },
];

export default function UseCases() {
  return (
    <section id="usecases" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow icon={<Mic2 className="h-3.5 w-3.5" />}>Dibuat untuk semua jenis bisnis</Eyebrow>
          <h2 className="text-balance mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-[44px]">
            Apa pun yang kamu jual, bagaimanapun cara jualnya.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-600">
            Dari seller pertama kali sampai bisnis kreator full-time — Mivra
            tumbuh bersamamu.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {featured.map((f) => (
            <div
              key={f.title}
              className="group relative overflow-hidden rounded-3xl border border-ink/8 shadow-soft"
            >
              <div className="aspect-[16/10] w-full overflow-hidden">
                <img
                  src={f.img}
                  alt={f.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-[19px] font-bold text-white">{f.title}</h3>
                <p className="mt-1.5 max-w-sm text-[13.5px] leading-relaxed text-white/80">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {grid.map(({ icon: Icon, title }) => (
            <div
              key={title}
              className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-ink/8 bg-cream px-4 py-7 text-center transition-all hover:-translate-y-0.5 hover:border-amber-300/60 hover:bg-white hover:shadow-card"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink/5 text-ink-500 transition-colors group-hover:bg-amber-500 group-hover:text-ink">
                <Icon className="h-4.5 w-4.5" />
              </div>
              <p className="text-[13px] font-semibold leading-tight text-ink-600">{title}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href="#cta"
            className="group inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-ink underline decoration-amber-400 decoration-2 underline-offset-4"
          >
            Temukan paket yang cocok untuk bisnismu
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </Container>
    </section>
  );
}
