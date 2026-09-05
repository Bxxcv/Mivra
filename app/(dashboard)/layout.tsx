import { redirect } from 'next/navigation';
import { getCurrentUserProfile } from '@/lib/supabase/get-user';
import Sidebar from '@/components/dashboard/Sidebar';
import Topbar from '@/components/dashboard/Topbar';
import type { Tier } from '@/lib/limits';

/**
 * Guard auth untuk semua route dashboard dilakukan DI SINI (server-side,
 * di layout) — pola resmi Next.js App Router untuk route group terproteksi.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, profile } = await getCurrentUserProfile();

  if (!user) redirect('/login');

  const tier: Tier = profile?.tier ?? 'free';
  const displayName = profile?.display_name || profile?.username || 'Seller';

  return (
    <div className="flex min-h-screen flex-col bg-cream-100 dark:bg-[#141210] sm:flex-row">
      <script
        dangerouslySetInnerHTML={{
          __html: `try{if(localStorage.getItem('mivra-theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}`,
        }}
      />
      <Sidebar tier={tier} />
      <div className="flex flex-1 flex-col pb-16 sm:pb-0">
        <Topbar displayName={displayName} tier={tier} />
        <main className="flex-1 p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
