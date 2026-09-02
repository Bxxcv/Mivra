'use client';

import { useRef, useState, useTransition } from 'react';
import { Plus } from 'lucide-react';
import { addLink } from '@/app/(dashboard)/halaman-bio/actions';

export default function AddLinkForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await addLink(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        formRef.current?.reset();
      }
    });
  }

  return (
    <div className="rounded-2xl border border-ink/8 bg-white p-5 shadow-soft">
      <p className="text-[13.5px] font-bold text-ink">Tambah link baru</p>
      <form ref={formRef} action={handleSubmit} className="mt-3 flex flex-col gap-2.5 sm:flex-row">
        <input
          name="label"
          required
          placeholder="Label (mis. Instagram)"
          className="flex-1 rounded-xl border border-ink/10 bg-cream-100 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-amber-400"
        />
        <input
          name="url"
          required
          placeholder="https://instagram.com/usernamekamu"
          className="flex-[1.5] rounded-xl border border-ink/10 bg-cream-100 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-amber-400"
        />
        <button
          type="submit"
          disabled={isPending}
          className="flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-ink px-4 py-2.5 text-[13.5px] font-semibold text-cream disabled:opacity-60"
        >
          <Plus className="h-4 w-4" /> {isPending ? 'Menambah…' : 'Tambah'}
        </button>
      </form>
      {error && <p className="mt-2.5 text-[12.5px] font-medium text-red-600">{error}</p>}
    </div>
  );
}
