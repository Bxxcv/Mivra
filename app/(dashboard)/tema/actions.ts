'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export async function applyTheme(userId: string, themeId: string) {
  const supabase = await createClient();

  // Verifikasi user yang request adalah pemilik akun — jangan percaya userId dari client
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.id !== userId) {
    throw new Error('Unauthorized');
  }

  // Verifikasi themeId valid (ada di tabel themes)
  const { data: theme } = await supabase
    .from('themes')
    .select('id')
    .eq('id', themeId)
    .single();

  if (!theme) {
    throw new Error('Tema tidak ditemukan');
  }

  const { error } = await supabase
    .from('profiles')
    .update({ active_theme_id: themeId })
    .eq('id', user.id);

  if (error) throw new Error(error.message);

  revalidatePath('/tema');
}
