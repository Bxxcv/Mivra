import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Sidebar from '@/components/dashboard/Sidebar';
import Topbar from '@/components/dashboard/Topbar';
import type { Tier } from '@/lib/limits';

/**
 * Guard auth untuk semua route dashboard dilakukan DI SINI (server-side,
 * di layout), bukan di middleware.ts. Kenapa: layout jalan sebelum semua
 * child page render, dan redirect() di sini lebih eksplisit/mudah dilacak
 * daripada regex matcher di middleware. Ini pola resmi yang disarankan
 * Next.js App Router untuk route group terproteksi.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('username, display_name, tier')
    .eq('id', user.id)
    .single();

  const tier: Tier = (profile?.tier as Tier) ?? 'free';
  const displayName = profile?.display_name || profile?.username || 'Seller';

  return (
    <div className="flex min-h-screen bg-cream-100">
      <Sidebar tier={tier} />
      <div className="flex flex-1 flex-col">
        <Topbar displayName={displayName} tier={tier} />
        <main className="flex-1 p-6 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
