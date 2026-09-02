import { Sparkles, Clock3, Languages, UserCheck, Send } from 'lucide-react';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';

const points = [
  {
    icon: Clock3,
    title: 'Selalu aktif, siang maupun malam',
    desc: 'Asisten AI-mu menjawab pertanyaan pelanggan secara instan — bahkan saat kamu sedang tidur.',
  },
  {
    icon: Sparkles,
    title: 'Paham tokomu',
    desc: 'Dilatih dari produk, pesanan, dan kebijakanmu untuk memberi jawaban yang akurat dan spesifik.',
  },
  {
    icon: UserCheck,
    title: 'Eskalasi saat dibutuhkan',
    desc: 'Menyerahkan percakapan yang rumit atau sensitif kepadamu, lengkap dengan konteksnya.',
  },
  {
    icon: Languages,
    title: 'Bicara bahasa pelangganmu',
    desc: 'Balasan multibahasa otomatis, jadi bahasa tidak pernah jadi penghalang penjualan.',
  },
];

export default function AISupport() {
  return (
    <section id="ai-support" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow icon={<Sparkles className="h-3.5 w-3.5 text-amber-500" />}>Dukungan bertenaga AI</Eyebrow>
            <h2 className="text-balance mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-[40px]">
              Tim dukungan yang tidak pernah tidur.
            </h2>
            <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-ink-600">
              Asisten AI bawaan Mivra menangani pertanyaan yang biasanya
              menghabiskan malammu — pengiriman, refund, detail produk — jadi
              kamu bisa tetap fokus berkarya.
            </p>

            <div className="mt-8 flex flex-col gap-6">
              {points.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-500/10 text-navy-500">
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

          <div className="mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-ink/8 bg-cream shadow-card">
            <div className="flex items-center gap-3 border-b border-ink/8 bg-ink px-5 py-4">
              <img src="/mascot/mascot-support.webp" alt="Asisten AI Mivra" className="h-9 w-9 rounded-full bg-amber-400/20 object-contain p-0.5" />
              <div>
                <p className="text-[13.5px] font-bold text-cream">Asisten AI Mivra</p>
                <p className="flex items-center gap-1.5 text-[11px] text-cream/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-forest-400" /> Online · balas instan
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 px-5 py-6">
              <div className="ml-auto max-w-[75%] rounded-2xl rounded-tr-sm bg-ink px-4 py-2.5 text-[13.5px] text-cream">
                Halo! Hoodie-nya bisa dikirim ke Surabaya, kan?
              </div>

              <div className="flex max-w-[85%] items-end gap-2">
                <img src="/mascot/mascot-support.webp" alt="" className="h-6 w-6 shrink-0 object-contain" />
                <div className="rounded-2xl rounded-tl-sm border border-ink/8 bg-white px-4 py-2.5 text-[13.5px] text-ink-600">
                  Bisa banget! 🌍 Pengiriman reguler ke Surabaya sekitar
                  2–4 hari kerja dan ongkirnya Rp 15.000.
                </div>
              </div>

              <div className="flex max-w-[85%] items-end gap-2">
                <span className="h-6 w-6 shrink-0" />
                <div className="rounded-2xl rounded-tl-sm border border-ink/8 bg-white px-4 py-2.5 text-[13.5px] text-ink-600">
                  Mau langsung aku masukkan ke keranjang sekarang?
                </div>
              </div>

              <div className="ml-8 flex flex-wrap gap-2 pt-1">
                {['Lacak pesananku', 'Kebijakan retur', 'Bicara dengan CS'].map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-ink/10 bg-white px-3 py-1.5 text-[11.5px] font-semibold text-ink-500"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 border-t border-ink/8 bg-white px-4 py-3.5">
              <div className="flex-1 rounded-full bg-cream-100 px-4 py-2.5 text-[13px] text-ink-400">
                Tanyakan apa saja soal toko ini…
              </div>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-500 text-ink">
                <Send className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
