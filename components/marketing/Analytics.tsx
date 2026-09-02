import { BarChart3, MousePointerClick, TrendingUp, Users2 } from 'lucide-react';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import AnalyticsMockup from '@/components/mockups/AnalyticsMockup';

const points = [
  {
    icon: MousePointerClick,
    title: 'Pelacakan trafik & klik',
    desc: 'Lihat persis link, produk, dan blok mana yang paling menarik perhatian pengunjungmu.',
  },
  {
    icon: TrendingUp,
    title: 'Analitik omset & konversi',
    desc: 'Ikuti alur lengkap dari kunjungan ke klik ke pembelian, dalam satu funnel yang jelas.',
  },
  {
    icon: BarChart3,
    title: 'Performa terbaik, terurut',
    desc: 'Langsung tahu produk paling laku dan link dengan konversi tertinggi.',
  },
  {
    icon: Users2,
    title: 'Insight audiens',
    desc: 'Pahami dari mana pembelimu datang — perangkat, lokasi, dan sumber referral.',
  },
];

export default function Analytics() {
  return (
    <section id="analytics" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <AnalyticsMockup />
          </div>

          <div className="order-1 lg:order-2">
            <Eyebrow icon={<BarChart3 className="h-3.5 w-3.5" />}>Analitik &amp; insight</Eyebrow>
            <h2 className="text-balance mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-[40px]">
              Tahu apa yang berhasil, secara real-time.
            </h2>
            <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-ink-600">
              Berhenti menebak-nebak konten mana yang laku. Mivra mengubah
              setiap klik dan checkout jadi sinyal jelas yang bisa kamu tindak
              lanjuti.
            </p>

            <div className="mt-8 flex flex-col gap-6">
              {points.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
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
        </div>
      </Container>
    </section>
  );
}
