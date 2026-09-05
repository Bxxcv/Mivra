import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { isAdminEmail } from '@/lib/admin';
import ThemeToggle from '@/components/dashboard/ThemeToggle';

/**
 * Proteksi ganda:
 *  1. Harus login (kalau tidak → /login).
 *  2. Email harus ada di ADMIN_EMAILS (kalau tidak → 404, BUKAN pesan
 *     "akses ditolak" — supaya user biasa yang nyasar ke sini tidak
 *     tahu halaman ini eksis sama sekali).
 *
 * Tema: panel ini didesain dark-first (beda dari dashboard seller yang
 * default terang) — makanya localStorage key & default-nya beda sendiri.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');
  if (!isAdminEmail(user.email)) notFound();

  return (
    <div className="min-h-screen bg-cream font-sans text-ink dark:bg-[#0B0A08] dark:text-cream">
      <script
        dangerouslySetInnerHTML={{
          __html: `try{var t=localStorage.getItem('mivra-admin-theme');if(t!=='light')document.documentElement.classList.add('dark')}catch(e){document.documentElement.classList.add('dark')}`,
        }}
      />
      <header className="flex items-center justify-between border-b border-ink/8 bg-white px-6 py-3.5 dark:border-amber-400/15 dark:bg-ink">
        <div className="flex items-center gap-2.5">
          <img src="/mascot/mascot-main.webp" alt="" className="h-7 w-7 object-contain grayscale" />
          <div>
            <p className="font-display text-[14px] font-bold leading-none text-ink dark:text-cream">Mivra Master</p>
            <p className="mt-0.5 text-[10.5px] font-medium leading-none text-ink-400 dark:text-cream/40">
              Panel internal — bukan untuk seller
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-forest-400 animate-pulse-dot" />
            <span className="hidden text-[11px] font-medium text-ink-400 dark:text-cream/50 sm:inline">{user.email}</span>
          </div>
          <ThemeToggle storageKey="mivra-admin-theme" />
        </div>
      </header>
      <main className="p-6 sm:p-8">{children}</main>
    </div>
  );
}
