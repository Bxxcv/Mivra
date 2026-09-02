'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { canAddLink } from '@/lib/limits';
import type { Tier } from '@/lib/limits';

/**
 * Semua validasi limit di sini HANYA untuk pesan error yang cepat/ramah
 * di UI. Penegak yang sesungguhnya tetap trigger `trg_check_link_limit`
 * di database (lihat supabase/migrations/0001_init.sql) — jadi walau ada
 * bug di sini, limit tidak bisa ditembus.
 */

export async function addLink(formData: FormData) {
  const label = String(formData.get('label') ?? '').trim();
  const url = String(formData.get('url') ?? '').trim();

  if (!label || !url) {
    return { error: 'Label dan URL wajib diisi.' };
  }

  let normalizedUrl = url;
  if (!/^https?:\/\//i.test(normalizedUrl)) {
    normalizedUrl = `https://${normalizedUrl}`;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: 'Sesi berakhir, silakan masuk lagi.' };

  const { data: profile } = await supabase
    .from('profiles')
    .select('tier')
    .eq('id', user.id)
    .single();
  const tier: Tier = (profile?.tier as Tier) ?? 'free';

  const { count } = await supabase
    .from('links')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id);

  if (!canAddLink(tier, count ?? 0)) {
    return {
      error:
        'Batas 10 link untuk tier Gratis sudah tercapai. Upgrade ke Premium untuk link tanpa batas.',
    };
  }

  const { error } = await supabase.from('links').insert({
    user_id: user.id,
    label,
    url: normalizedUrl,
    position: count ?? 0,
  });

  if (error) return { error: error.message };

  revalidatePath('/halaman-bio');
  return { error: null };
}

export async function deleteLink(linkId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: 'Sesi berakhir, silakan masuk lagi.' };

  const { error } = await supabase.from('links').delete().eq('id', linkId).eq('user_id', user.id);
  if (error) return { error: error.message };

  revalidatePath('/halaman-bio');
  return { error: null };
}

export async function moveLink(linkId: string, direction: 'up' | 'down') {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: 'Sesi berakhir, silakan masuk lagi.' };

  const { data: links } = await supabase
    .from('links')
    .select('id, position')
    .eq('user_id', user.id)
    .order('position', { ascending: true });

  if (!links) return { error: null };

  const index = links.findIndex((l) => l.id === linkId);
  const swapIndex = direction === 'up' ? index - 1 : index + 1;
  if (index === -1 || swapIndex < 0 || swapIndex >= links.length) return { error: null };

  const a = links[index]!;
  const b = links[swapIndex]!;

  await supabase.from('links').update({ position: b.position }).eq('id', a.id);
  await supabase.from('links').update({ position: a.position }).eq('id', b.id);

  revalidatePath('/halaman-bio');
  return { error: null };
}

export async function toggleLinkActive(linkId: string, isActive: boolean) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: 'Sesi berakhir, silakan masuk lagi.' };

  const { error } = await supabase
    .from('links')
    .update({ is_active: isActive })
    .eq('id', linkId)
    .eq('user_id', user.id);

  if (error) return { error: error.message };
  revalidatePath('/halaman-bio');
  return { error: null };
}
