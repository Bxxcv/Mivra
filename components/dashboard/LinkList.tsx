'use client';

import { useState, useTransition } from 'react';
import { ArrowUp, ArrowDown, Trash2, ExternalLink, EyeOff } from 'lucide-react';
import { deleteLink, moveLink, toggleLinkActive } from '@/app/(dashboard)/halaman-bio/actions';

type LinkRow = {
  id: string;
  label: string;
  url: string;
  is_active: boolean;
  position: number;
};

export default function LinkList({ links }: { links: LinkRow[] }) {
  const [isPending, startTransition] = useTransition();
  const [pendingId, setPendingId] = useState<string | null>(null);

  function runAction(id: string, fn: () => Promise<unknown>) {
    setPendingId(id);
    startTransition(async () => {
      await fn();
      setPendingId(null);
    });
  }

  if (links.length === 0) {
    return (
      <div className="mt-4 rounded-2xl border border-dashed border-ink/15 bg-white p-8 text-center dark:border-white/15 dark:bg-white/[0.03]">
        <p className="text-[13.5px] text-ink-400 dark:text-cream/40">
          Belum ada link. Tambahkan link pertamamu di form atas.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 flex flex-col gap-2.5">
      {links.map((link, i) => {
        const busy = isPending && pendingId === link.id;
        return (
          <div
            key={link.id}
            className={`flex items-center gap-3 rounded-2xl border border-ink/8 bg-white p-3.5 shadow-soft transition-opacity dark:border-white/10 dark:bg-[#1D1A16] ${
              busy ? 'opacity-50' : ''
            } ${!link.is_active ? 'opacity-60' : ''}`}
          >
            <div className="flex flex-col">
              <button
                type="button"
                disabled={i === 0 || busy}
                onClick={() => runAction(link.id, () => moveLink(link.id, 'up'))}
                className="rounded p-0.5 text-ink-300 hover:text-ink disabled:opacity-30"
                aria-label="Naikkan urutan"
              >
                <ArrowUp className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                disabled={i === links.length - 1 || busy}
                onClick={() => runAction(link.id, () => moveLink(link.id, 'down'))}
                className="rounded p-0.5 text-ink-300 hover:text-ink disabled:opacity-30"
                aria-label="Turunkan urutan"
              >
                <ArrowDown className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-semibold text-ink dark:text-cream">{link.label}</p>
              <p className="truncate text-[12px] text-ink-400 dark:text-cream/40">{link.url}</p>
            </div>

            <a
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink-400 hover:bg-ink/5 hover:text-ink dark:text-cream/40 dark:hover:bg-white/10 dark:hover:text-cream"
              aria-label="Buka link"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              disabled={busy}
              onClick={() => runAction(link.id, () => toggleLinkActive(link.id, !link.is_active))}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink-400 hover:bg-ink/5 hover:text-ink"
              aria-label={link.is_active ? 'Nonaktifkan link' : 'Aktifkan link'}
            >
              <EyeOff className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => runAction(link.id, () => deleteLink(link.id))}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-red-500 hover:bg-red-50"
              aria-label="Hapus link"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
