import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * Dituju Supabase setelah user selesai login lewat Google OAuth
 * (dirujuk dari app/(auth)/login/page.tsx). Menukar `code` jadi sesi,
 * lalu redirect ke dashboard.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/ringkasan';
  
  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Gagal tukar code — balikin ke login dengan pesan error.
  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
