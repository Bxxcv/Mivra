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
    <div className="min-h-screen bg-ink">
      <header className="border-b border-white/10 px-6 py-4">
        <p className="font-display text-[16px] font-bold text-cream">Mivra · Admin Master</p>
        <p className="text-[11.5px] text-cream/50">Masuk sebagai {user.email}</p>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
