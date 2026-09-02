import { createBrowserClient } from '@supabase/ssr';

/**
 * Supabase client untuk dipakai di Client Component ('use client').
 * Pakai NEXT_PUBLIC_* env var — aman diekspos ke browser (lihat .env.example).
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
