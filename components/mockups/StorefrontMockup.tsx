import { ShoppingCart, Search } from 'lucide-react';
import BrowserFrame from './BrowserFrame';

const products = [
  { img: '/images/product-hoodie.jpg', name: 'Hoodie Nyaman', price: 'Rp 148.000', tag: 'Fisik' },
  { img: '/images/product-mug.jpg', name: 'Mug Pagi Hari', price: 'Rp 55.000', tag: 'Fisik' },
  { img: '/images/product-course.jpg', name: 'Kelas Konten', price: 'Rp 249.000', tag: 'Digital' },
  { img: '/images/product-vinyl.jpg', name: 'Vinyl Bertanda Tangan', price: 'Rp 99.000', tag: 'Terbatas' },
];

export default function StorefrontMockup() {
  return (
    <BrowserFrame>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-display text-[18px] font-bold text-ink">Toko Luna</p>
            <p className="text-[12px] text-ink-400">4 produk · Kirim ke seluruh Indonesia</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-ink-500">
              <Search className="h-4 w-4" />
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-amber-400">
              <ShoppingCart className="h-4 w-4" />
            </div>
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          {['Semua', 'Digital', 'Fisik', 'Bundel'].map((t, i) => (
            <span
              key={t}
              className={`rounded-full px-3.5 py-1.5 text-[12px] font-semibold ${
                i === 0 ? 'bg-ink text-cream' : 'bg-cream-100 text-ink-500'
              }`}
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {products.map((p) => (
            <div key={p.name} className="overflow-hidden rounded-2xl border border-ink/8">
              <div className="aspect-square w-full overflow-hidden bg-cream-100">
                <img src={p.img} alt={p.name} className="h-full w-full object-cover" />
              </div>
              <div className="p-3">
                <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-600">
                  {p.tag}
                </span>
                <p className="mt-1.5 text-[13px] font-semibold text-ink">{p.name}</p>
                <p className="text-[12.5px] font-bold text-ink-500">{p.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}
