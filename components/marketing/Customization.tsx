import { Paintbrush, Type, LayoutTemplate, Globe, Check } from 'lucide-react';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';

const themes = [
  { name: 'Amber', bg: 'bg-[#FFF4E8]', accent: 'bg-amber-500', active: true },
  { name: 'Forest', bg: 'bg-forest-50', accent: 'bg-forest-500', active: false },
  { name: 'Ink', bg: 'bg-ink', accent: 'bg-amber-400', dark: true, active: false },
  { name: 'Blush', bg: 'bg-[#FDECEA]', accent: 'bg-[#E8776A]', active: false },
];

const points = [
  {
    icon: Paintbrush,
    title: 'Kontrol tema penuh',
    desc: 'Warna, background, radius sudut, dan gaya tombol — disesuaikan dengan brand kamu.',
  },
  {
    icon: Type,
    title: 'Tipografi custom',
    desc: 'Pilih dari kombinasi font pilihan atau pakai fontmu sendiri untuk kesan yang khas.',
  },
  {
    icon: LayoutTemplate,
    title: 'Layout fleksibel',
    desc: 'Urutkan ulang section dan blok sesuai cara audiensmu benar-benar menjelajah.',
  },
  {
    icon: Globe,
    title: 'Domain custom',
    desc: 'Hubungkan tokokamu.com — tanpa perlu "mivra.id" lagi begitu kamu siap.',
  },
];

export default function Customization() {
  return (
    <section id="customization" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              {themes.map((t) => (
                <div
                  key={t.name}
                  className={`relative overflow-hidden rounded-3xl border p-5 shadow-soft transition-transform hover:-translate-y-1 ${
                    t.bg
                  } ${t.active ? 'border-amber-400 ring-2 ring-amber-300/60' : 'border-ink/8'}`}
                >
                  {t.active && (
                    <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-ink">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                  )}
                  <div className={`h-8 w-8 rounded-full ${t.accent}`} />
                  <div className={`mt-4 h-2.5 w-16 rounded-full ${t.dark ? 'bg-white/25' : 'bg-ink/15'}`} />
                  <div className={`mt-2 h-2.5 w-10 rounded-full ${t.dark ? 'bg-white/15' : 'bg-ink/10'}`} />
                  <div className={`mt-4 h-8 w-full rounded-xl ${t.accent}`} />
                  <p className={`mt-3 text-[12.5px] font-bold ${t.dark ? 'text-white' : 'text-ink'}`}>
                    {t.name}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between rounded-2xl border border-ink/8 bg-white p-4 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-50 text-forest-600">
                  <Globe className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-ink">lunacreates.com</p>
                  <p className="text-[11.5px] text-ink-400">Terhubung &amp; terverifikasi</p>
                </div>
              </div>
              <span className="h-2.5 w-2.5 rounded-full bg-forest-500 animate-pulse-dot" />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <Eyebrow icon={<Paintbrush className="h-3.5 w-3.5" />}>Tema &amp; kustomisasi</Eyebrow>
            <h2 className="text-balance mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-[40px]">
              Buat jadi jelas-jelas milikmu.
            </h2>
            <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-ink-600">
              Halamanmu harus terasa seperti brand kamu, bukan sekadar template.
              Mivra memberi kontrol desain sungguhan tanpa menyentuh satu baris
              kode pun.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {points.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-[14.5px] font-bold text-ink">{title}</p>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-ink-400">{desc}</p>
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
