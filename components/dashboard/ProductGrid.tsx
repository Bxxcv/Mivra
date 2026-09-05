'use client';

import { useState, useTransition } from 'react';
import { Trash2, EyeOff, Eye } from 'lucide-react';
import { deleteProduct, toggleProductPublished } from '@/app/(dashboard)/katalog/actions';

type ProductRow = {
  id: string;
  name: string;
  price_cents: number;
  stock: number | null;
  images: string[];
  is_published: boolean;
};

export default function ProductGrid({ products }: { products: ProductRow[] }) {
  const [isPending, startTransition] = useTransition();
  const [pendingId, setPendingId] = useState<string | null>(null);

  function runAction(id: string, fn: () => Promise<unknown>) {
    setPendingId(id);
    startTransition(async () => {
      await fn();
      setPendingId(null);
    });
  }

  if (products.length === 0) {
    return (
      <div className="mt-4 rounded-2xl border border-dashed border-ink/15 bg-white p-8 text-center dark:border-white/15 dark:bg-white/[0.03]">
        <p className="text-[13.5px] text-ink-400 dark:text-cream/40">Belum ada produk. Tambahkan produk pertamamu di form atas.</p>
      </div>
    );
  }

  return (
    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => {
        const busy = isPending && pendingId === p.id;
        return (
          <div
            key={p.id}
            className={`overflow-hidden rounded-2xl border border-ink/8 bg-white shadow-soft transition-opacity dark:border-white/10 dark:bg-[#1D1A16] ${
              busy ? 'opacity-50' : ''
            } ${!p.is_published ? 'opacity-60' : ''}`}
          >
            <div className="aspect-square w-full bg-cream-100 dark:bg-white/5">
              {p.images[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-[11px] text-ink-300 dark:text-cream/25">
                  Tanpa foto
                </div>
              )}
            </div>
            <div className="p-3">
              <p className="truncate text-[12.5px] font-semibold text-ink dark:text-cream">{p.name}</p>
              <p className="text-[12px] font-bold text-amber-600">
                Rp{p.price_cents.toLocaleString('id-ID')}
              </p>
              <p className="text-[10.5px] text-ink-400 dark:text-cream/40">{p.stock === null ? 'Stok tak terbatas' : `Stok: ${p.stock}`}</p>

              <div className="mt-2 flex gap-1.5">
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => runAction(p.id, () => toggleProductPublished(p.id, !p.is_published))}
                  className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-ink/10 py-1.5 text-[10.5px] font-semibold text-ink-500 hover:bg-ink/5 dark:border-white/15 dark:text-cream/60 dark:hover:bg-white/10"
                >
                  {p.is_published ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                  {p.is_published ? 'Sembunyikan' : 'Tampilkan'}
                </button>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => runAction(p.id, () => deleteProduct(p.id))}
                  className="flex items-center justify-center rounded-lg border border-red-100 px-2 text-red-500 hover:bg-red-50"
                  aria-label="Hapus produk"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
