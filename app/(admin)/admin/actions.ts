'use server';

import { revalidatePath } from 'next/cache';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { isAdminEmail } from '@/lib/admin';
import type { Tier } from '@/lib/limits';

/**
 * PENTING: setiap server action di sini WAJIB cek isAdminEmail() ULANG di
 * dalam function-nya sendiri — jangan cuma andalkan proteksi di
 * app/(admin)/admin/layout.tsx. Server Action bisa dipanggil langsung
 * (bukan cuma lewat halaman), jadi tiap action harus aman berdiri sendiri.
 */
async function assertAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !isAdminEmail(user.email)) {
    throw new Error('Akses ditolak.');
  }
  return user;
}

export async function adminSetUserTier(userId: string, tier: Tier) {
  await assertAdmin();

  // Pakai admin client (service role) — sengaja bypass RLS karena ini
  // operasi lintas-user yang memang cuma boleh dilakukan admin.
  const admin = createAdminClient();
  const { error } = await admin.from('profiles').update({ tier }).eq('id', userId);

  if (error) return { error: error.message };
  revalidatePath('/admin');
  return { error: null };
}
