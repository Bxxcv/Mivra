import { createServerClient } from '@supabase/ssr';
import { createClient as createSupabaseJsClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

/**
 * Supabase client untuk dipakai di Server Component, Server Action, atau
 * Route Handler. Selalu buat instance baru per-request (jangan disimpan
 * global) karena membawa cookie sesi user.
 *
 * PENTING: hanya pakai anon key di sini (aman, dibatasi RLS). JANGAN pernah
 * pakai SUPABASE_SERVICE_ROLE_KEY di file yang bisa diimpor Client Component.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Dipanggil dari Server Component — boleh diabaikan karena
            // middleware.ts sudah menangani refresh session.
          }
        },
      },
    },
  );
}

/**
 * Client khusus operasi admin/server-only yang butuh bypass RLS
 * (mis. cron job, webhook payment gateway nanti). WAJIB hanya dipanggil
 * dari Route Handler/Server Action, TIDAK PERNAH dari kode yang bisa
 * ter-bundle ke client.
 */
export function createAdminClient() {
  return createSupabaseJsClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
