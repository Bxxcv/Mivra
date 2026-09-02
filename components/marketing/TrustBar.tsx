import { Users2, Globe2, PackageCheck, ShieldCheck } from 'lucide-react';
import Container from '@/components/ui/Container';
import Reveal from '@/components/ui/Reveal';

const brands = [
  'Northlane',
  'Kōra Studio',
  'Petal & Co.',
  'Vantage Media',
  'Loomwork',
  'Solace',
  'Bright Foundry',
  'Aurelia',
];

const stats = [
  { icon: PackageCheck, value: 'Rp 1,8T+', label: 'Penjualan kreator diproses' },
  { icon: Users2, value: '50.000+', label: 'Kreator & seller aktif' },
  { icon: Globe2, value: '40+', label: 'Negara terjangkau' },
  { icon: ShieldCheck, value: '99,95%', label: 'Uptime platform' },
];

export default function TrustBar() {
  const loop = [...brands, ...brands];
  return (
    <section className="border-y border-ink/8 bg-white/60 py-12">
      <Container>
        <p className="text-center text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-400">
          Menopang bisnis independen di seluruh dunia
        </p>

        <div className="relative mt-7 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee items-center gap-14">
            {loop.map((brand, i) => (
              <span
                key={i}
                className="font-display text-xl font-semibold tracking-tight text-ink-400/70 grayscale transition-colors hover:text-ink"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>

        <Reveal className="mt-12 grid grid-cols-2 gap-6 border-t border-ink/8 pt-10 sm:grid-cols-4">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center text-center sm:items-start sm:text-left">
              <div className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                <Icon className="h-4.5 w-4.5" />
              </div>
              <p className="font-display text-2xl font-bold text-ink">{value}</p>
              <p className="text-[13px] text-ink-400">{label}</p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
