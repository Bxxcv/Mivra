import {
  GripVertical,
  Video,
  Newspaper,
  Timer,
  Download,
  Truck,
  CalendarClock,
  Layers,
  CreditCard,
  Wallet2,
  CheckCircle2,
  Palette,
  Type,
} from 'lucide-react';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';

const blocks = [
  { icon: Video, label: 'Video unggulan', tone: 'bg-ink text-amber-400' },
  { icon: Layers, label: 'Grid produk', tone: 'bg-amber-500 text-ink' },
  { icon: Timer, label: 'Countdown drop', tone: 'bg-forest-500 text-white' },
  { icon: Newspaper, label: 'Blok newsletter', tone: 'bg-white text-ink border border-ink/10' },
];

const catalogItems = [
  { icon: Download, label: 'Produk digital (download)' },
  { icon: Truck, label: 'Produk fisik & pengiriman' },
  { icon: CalendarClock, label: 'Booking & jasa' },
  { icon: Layers, label: 'Bundel & upsell' },
];

const orders = [
  { name: 'Aria M.', item: 'Paket Skincare', status: 'Selesai', color: 'bg-forest-50 text-forest-600' },
  { name: 'Devon K.', item: 'Paket Preset', status: 'Terkirim', color: 'bg-forest-50 text-forest-600' },
  { name: 'Priya S.', item: 'Sesi Coaching', status: 'Menunggu', color: 'bg-amber-50 text-amber-600' },
];

const swatches = ['bg-amber-400', 'bg-forest-500', 'bg-navy-500', 'bg-ink'];

export default function CoreFeatures() {
  return (
    <section id="features" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Fitur inti</Eyebrow>
          <h2 className="text-balance mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-[44px]">
            Dibangun seperti software bisnis sungguhan — bukan sekadar daftar link.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-600">
            Setiap fitur dirancang untuk bekerja bersama, jadi halaman, toko, dan
            back office kamu tidak pernah terasa seperti tools terpisah yang
            ditempel-tempel.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-6">
          {/* Page builder - large */}
          <div className="rounded-3xl border border-ink/8 bg-cream p-8 shadow-soft md:col-span-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-amber-400">
              <Layers className="h-5 w-5" />
            </div>
            <h3 className="mt-5 font-display text-[21px] font-bold text-ink">
              Page builder drag-and-drop
            </h3>
            <p className="mt-2 max-w-md text-[14.5px] leading-relaxed text-ink-400">
              Susun link, video, produk, formulir, dan countdown seperti blok.
              Tanpa kode, tanpa template yang semuanya terlihat sama.
            </p>

            <div className="mt-7 flex flex-col gap-2.5">
              {blocks.map(({ icon: Icon, label, tone }) => (
                <div
                  key={label}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 shadow-sm ${tone}`}
                >
                  <span className="flex items-center gap-2.5 text-[13.5px] font-semibold">
                    <Icon className="h-4 w-4" /> {label}
                  </span>
                  <GripVertical className="h-4 w-4 opacity-50" />
                </div>
              ))}
            </div>
          </div>

          {/* Right column: catalog + checkout stacked */}
          <div className="flex flex-col gap-5 md:col-span-2">
            <div className="flex-1 rounded-3xl border border-ink/8 bg-cream p-6 shadow-soft">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-ink">
                <Truck className="h-4.5 w-4.5" />
              </div>
              <h3 className="mt-4 font-display text-[16px] font-bold text-ink">
                Katalog digital &amp; fisik
              </h3>
              <div className="mt-4 flex flex-col gap-2">
                {catalogItems.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-[12.5px] font-medium text-ink-600">
                    <Icon className="h-3.5 w-3.5 text-amber-600" /> {label}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 rounded-3xl border border-ink/8 bg-ink p-6 text-cream shadow-soft">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-amber-400">
                <CreditCard className="h-4.5 w-4.5" />
              </div>
              <h3 className="mt-4 font-display text-[16px] font-bold">Checkout &amp; pembayaran</h3>
              <p className="mt-1.5 text-[12.5px] text-cream/60">Kartu, dompet digital &amp; metode lokal</p>
              <div className="mt-4 flex items-center justify-between rounded-xl bg-white/10 px-3.5 py-2.5">
                <span className="text-[13px] font-semibold">Total · Rp 148.000</span>
                <span className="rounded-full bg-amber-400 px-3 py-1 text-[11px] font-bold text-ink">Bayar sekarang</span>
              </div>
            </div>
          </div>

          {/* Orders & CRM */}
          <div className="rounded-3xl border border-ink/8 bg-cream p-7 shadow-soft md:col-span-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-forest-500 text-white">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <h3 className="mt-5 font-display text-[18px] font-bold text-ink">Pesanan &amp; manajemen pelanggan</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-400">
              Setiap penjualan, refund, dan pesan pelanggan ada di satu dashboard —
              otomatis tersinkron dengan pengiriman dan dukungan.
            </p>
            <div className="mt-5 overflow-hidden rounded-2xl border border-ink/8 bg-white">
              {orders.map((o, i) => (
                <div
                  key={o.name}
                  className={`flex items-center justify-between px-4 py-3 text-[13px] ${
                    i !== orders.length - 1 ? 'border-b border-ink/6' : ''
                  }`}
                >
                  <div>
                    <p className="font-semibold text-ink">{o.name}</p>
                    <p className="text-ink-400">{o.item}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${o.color}`}>
                    {o.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Themes & Customization */}
          <div className="rounded-3xl border border-ink/8 bg-cream p-7 shadow-soft md:col-span-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500 text-ink">
              <Palette className="h-5 w-5" />
            </div>
            <h3 className="mt-5 font-display text-[18px] font-bold text-ink">Tema &amp; kustomisasi</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-400">
              Sesuaikan dengan brand kamu lewat warna, font, layout custom, dan
              domain sendiri yang terhubung.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {swatches.map((c) => (
                <div key={c} className={`h-8 w-8 rounded-full border-2 border-white shadow ${c}`} />
              ))}
              <div className="ml-auto flex items-center gap-1.5 rounded-full border border-ink/10 bg-white px-3 py-1.5 text-[12px] font-semibold text-ink-600">
                <Type className="h-3.5 w-3.5" /> Aa
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-dashed border-ink/15 bg-white px-3.5 py-2.5 text-[12.5px] font-medium text-ink-400">
              <Wallet2 className="h-3.5 w-3.5" /> tokokamu.com terhubung
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
