import { Instagram, Youtube, Twitter, MessageCircleMore, Music2 } from 'lucide-react';
import Container from '@/components/ui/Container';

const columns = [
  {
    title: 'Produk',
    links: ['Page builder bio', 'Etalase toko', 'Pembayaran & checkout', 'Analitik', 'Dukungan AI', 'Harga'],
  },
  {
    title: 'Solusi',
    links: ['Kreator & influencer', 'Bisnis kecil & UMKM', 'Musisi & seniman', 'Affiliate', 'Freelancer'],
  },
  {
    title: 'Sumber Daya',
    links: ['Pusat bantuan', 'Blog', 'Dokumentasi API', 'Komunitas', 'Aset brand'],
  },
  {
    title: 'Perusahaan',
    links: ['Tentang Mivra', 'Karier', 'Hubungi kami', 'Mitra'],
  },
];

const socials = [
  { icon: Instagram, label: 'Instagram' },
  { icon: Twitter, label: 'X (Twitter)' },
  { icon: Music2, label: 'TikTok' },
  { icon: Youtube, label: 'YouTube' },
  { icon: MessageCircleMore, label: 'Discord' },
];

export default function Footer() {
  return (
    <footer className="bg-white pt-16">
      <Container>
        <div className="grid grid-cols-2 gap-10 border-b border-ink/8 pb-14 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <a href="#hero" className="flex items-center gap-2.5">
              <img src="/mascot/mascot-main.webp" alt="Mivra" className="h-10 w-10 object-contain" />
              <span className="font-display text-[21px] font-bold tracking-tight text-ink">Mivra</span>
            </a>
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-ink-400">
              Platform all-in-one untuk kreator dan bisnis digital — halamanmu,
              tokomu, dan pembayaranmu, jadi satu.
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              {socials.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-ink-500 transition-colors hover:border-amber-300 hover:text-ink"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-[13px] font-bold uppercase tracking-wide text-ink-400">{col.title}</p>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[14px] text-ink-600 transition-colors hover:text-ink">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
          <p className="text-[13px] text-ink-400">© {new Date().getFullYear()} Mivra Technologies. Seluruh hak cipta dilindungi.</p>
          <div className="flex items-center gap-6 text-[13px] text-ink-400">
            <a href="#" className="hover:text-ink">Kebijakan privasi</a>
            <a href="#" className="hover:text-ink">Syarat layanan</a>
            <a href="#" className="hover:text-ink">Cookies</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
