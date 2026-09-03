import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { isAdminEmail } from '@/lib/admin';

/**
 * Proteksi ganda:
 *  1. Harus login (kalau tidak → /login).
 *  2. Email harus ada di ADMIN_EMAILS (kalau tidak → 404, BUKAN pesan
 *     "akses ditolak" — supaya user biasa yang nyasar ke sini tidak
 *     tahu halaman ini eksis sama sekali).
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');
  if (!isAdminEmail(user.email)) notFound();

  return (
    <div className="min-h-screen bg-[#0B0A08] font-sans text-cream">
      <header className="flex items-center justify-between border-b border-amber-400/15 bg-ink px-6 py-3.5">
        <div className="flex items-center gap-2.5">
          <img src="/mascot/mascot-main.webp" alt="" className="h-7 w-7 object-contain grayscale" />
          <div>
            <p className="font-display text-[14px] font-bold leading-none text-cream">Mivra Master</p>
            <p className="mt-0.5 text-[10.5px] font-medium leading-none text-cream/40">Panel internal — bukan untuk seller</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-forest-400 animate-pulse-dot" />
          <span className="text-[11px] font-medium text-cream/50">{user.email}</span>
        </div>
      </header>
      <main className="p-6 sm:p-8">{children}</main>
    </div>
  );
}
