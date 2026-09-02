/**
 * Daftar email admin diambil dari environment variable ADMIN_EMAILS
 * (pisah pakai koma), BUKAN dari database — supaya siapa yang jadi admin
 * cuma bisa diubah lewat pengaturan Vercel/`.env`, tidak bisa dari dalam
 * aplikasi sama sekali (walau ada bug di UI/RLS, tetap aman).
 *
 * Contoh isi .env: ADMIN_EMAILS=farid@email.com,partner@email.com
 */
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const list = (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return list.includes(email.toLowerCase());
}
