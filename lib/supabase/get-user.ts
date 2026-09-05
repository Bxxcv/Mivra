import { cache } from 'react';
import { createClient } from './server';
import type { Tier } from '@/lib/limits';

/**
 * React cache() dedup query ini per-request — jadi walau dipanggil dari
 * app/(dashboard)/layout.tsx DAN dari page.tsx di dalamnya, Supabase cuma
 * di-hit SEKALI, bukan dobel. Ini penyebab utama navigasi dashboard terasa
 * lambat sebelumnya: tiap halaman fetch user+profile ulang dari nol,
 * padahal layout udah fetch duluan.
 */
export const getCurrentUserProfile = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { user: null, profile: null };

  const { data: profile } = await supabase
    .from('profiles')
    .select('username, display_name, tier')
    .eq('id', user.id)
    .single();

  return {
    user,
    profile: profile
      ? { ...profile, tier: (profile.tier as Tier) ?? 'free' }
      : null,
  };
});
