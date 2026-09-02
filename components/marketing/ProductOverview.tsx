import { Link2, Store, CreditCard, Users, BarChart3, MessagesSquare } from 'lucide-react';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';

const pillars = [
  {
    icon: Link2,
    title: 'Halaman link-in-bio',
    desc: 'Halaman personal yang cepat dan sesuai brand — menggantikan link yang berserakan dengan satu home base.',
  },
  {
    icon: Store,
    title: 'Etalase & katalog',
    desc: 'Jual produk digital, barang fisik, jasa, dan bundel berdampingan dalam satu katalog rapi.',
  },
  {
    icon: CreditCard,
    title: 'Checkout & pembayaran',
    desc: 'Terima kartu, dompet digital, dan metode pembayaran lokal dengan checkout instan dan aman.',
  },
  {
    icon: Users,
    title: 'Pesanan & pelanggan',
    desc: 'Lacak setiap pesanan, kelola pembeli, dan otomatisasi pengiriman tanpa spreadsheet.',
  },
  {
    icon: BarChart3,
    title: 'Analitik & insight',
    desc: 'Lihat konten, link, dan produk mana yang benar-benar mendatangkan omset — secara real-time.',
  },
  {
    icon: MessagesSquare,
    title: 'Dukungan bertenaga AI',
    desc: 'Asisten terlatih yang menjawab pertanyaan pelanggan untukmu, siang maupun malam.',
  },
];

export default function ProductOverview() {
  return (
    <section id="product" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Platform Mivra</Eyebrow>
          <h2 className="text-balance mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-[44px]">
            Satu platform. Semua tools yang bisnismu butuhkan.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-600">
            Mivra bukan sekadar tools link-in-bio biasa. Ini adalah "operating
            system" di balik halamanmu — commerce, pembayaran, pelanggan, dan
            dukungan, semua terhubung.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group rounded-3xl border border-ink/8 bg-white p-7 shadow-soft transition-all hover:-translate-y-1 hover:border-amber-300/60 hover:shadow-card"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-amber-400 transition-colors group-hover:bg-amber-500 group-hover:text-ink">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-[18px] font-bold text-ink">{title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-400">{desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
