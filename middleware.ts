import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Refresh token sesi Supabase di setiap request (pola resmi @supabase/ssr).
 * Juga jadi tempat pusat nanti untuk redirect user belum login yang coba
 * akses (dashboard) — lihat docs/ROADMAP.md Fase 1.
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Wajib dipanggil agar token ter-refresh sebelum expired.
  await supabase.auth.getUser();

  // TODO Fase 3: redirect ke /login kalau path (dashboard) diakses tanpa
  // sesi aktif. Belum diaktifkan karena halaman dashboard belum dibangun.

  return response;
}

export const config = {
  matcher: [
    /*
     * Jalankan di semua path KECUALI file statis & asset Next.js internal,
     * supaya middleware tidak memperlambat load gambar/font.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
