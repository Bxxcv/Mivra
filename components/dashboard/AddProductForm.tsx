'use client';

import { useRef, useState, useTransition } from 'react';
import { Plus, ImagePlus } from 'lucide-react';
import { addProduct } from '@/app/(dashboard)/katalog/actions';

export default function AddProductForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await addProduct(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        formRef.current?.reset();
        setPreview(null);
      }
    });
  }

  return (
    <div className="rounded-2xl border border-ink/8 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-[#1D1A16]">
      <p className="text-[13.5px] font-bold text-ink dark:text-cream">Tambah produk baru</p>
      <form ref={formRef} action={handleSubmit} className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-start">
        <label className="flex h-24 w-24 shrink-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-ink/15 bg-cream-100 text-ink-400 hover:border-amber-400 dark:border-white/15 dark:bg-white/5 dark:text-cream/40">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="" className="h-full w-full rounded-xl object-cover" />
          ) : (
            <>
              <ImagePlus className="h-5 w-5" />
              <span className="text-[10px] font-semibold">Foto</span>
            </>
          )}
          <input
            type="file"
            name="image"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              setPreview(file ? URL.createObjectURL(file) : null);
            }}
          />
        </label>

        <div className="grid flex-1 grid-cols-1 gap-2.5 sm:grid-cols-2">
          <input
            name="name"
            required
            placeholder="Nama produk"
            className="rounded-xl border border-ink/10 bg-cream-100 px-3.5 py-2.5 text-[13.5px] text-ink outline-none focus:border-amber-400 dark:border-white/15 dark:bg-white/5 dark:text-cream dark:placeholder:text-cream/30 sm:col-span-2"
          />
          <input
            name="price"
            required
            inputMode="numeric"
            placeholder="Harga (Rp)"
            className="rounded-xl border border-ink/10 bg-cream-100 px-3.5 py-2.5 text-[13.5px] text-ink outline-none focus:border-amber-400 dark:border-white/15 dark:bg-white/5 dark:text-cream dark:placeholder:text-cream/30"
          />
          <input
            name="stock"
            inputMode="numeric"
            placeholder="Stok (kosongkan = tak terbatas)"
            className="rounded-xl border border-ink/10 bg-cream-100 px-3.5 py-2.5 text-[13.5px] text-ink outline-none focus:border-amber-400 dark:border-white/15 dark:bg-white/5 dark:text-cream dark:placeholder:text-cream/30"
          />
          <textarea
            name="description"
            placeholder="Deskripsi singkat (opsional)"
            rows={2}
            className="rounded-xl border border-ink/10 bg-cream-100 px-3.5 py-2.5 text-[13.5px] text-ink outline-none focus:border-amber-400 dark:border-white/15 dark:bg-white/5 dark:text-cream dark:placeholder:text-cream/30 sm:col-span-2"
          />
          <button
            type="submit"
            disabled={isPending}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-ink px-4 py-2.5 text-[13.5px] font-semibold text-cream disabled:opacity-60 sm:col-span-2"
          >
            <Plus className="h-4 w-4" /> {isPending ? 'Menyimpan…' : 'Tambah produk'}
          </button>
        </div>
      </form>
      {error && <p className="mt-2.5 text-[12.5px] font-medium text-red-600">{error}</p>}
    </div>
  );
}
