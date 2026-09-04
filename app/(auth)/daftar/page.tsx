'use client';

import { useState, useEffect, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Container from '@/components/ui/Container';
import PasswordInput from '@/components/ui/PasswordInput';

export default function DaftarPage() {
  const router = useRouter();
  const supabase = createClient();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [needsEmailConfirm, setNeedsEmailConfirm] = useState(false);

  // Prefill email kalau datang dari form di landing page (FinalCTA).
  useEffect(() => {
    const prefill = new URLSearchParams(window.location.search).get('email');
    if (prefill) setEmail(prefill);
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const usernameValid = /^[a-z0-9_]{3,30}$/.test(username);
    if (!usernameValid) {
      setError('Username hanya boleh huruf kecil, angka, underscore (3-30 karakter).');
      return;
    }

    setLoading(true);

    // Baris profiles otomatis dibuat lewat trigger on_auth_user_created di
    // Supabase (lihat supabase/migrations/0001_init.sql), termasuk validasi
    // username & reserved-word check.
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });

    setLoading(false);

    if (signUpError) {
      setError(
        signUpError.message.includes('already registered')
          ? 'Email ini sudah terdaftar. Coba masuk.'
          : 'Gagal mendaftar. Coba lagi.',
      );
      return;
    }

    // Kalau "Confirm email" MATI di pengaturan Supabase, signUp langsung
    // mengembalikan session aktif — langsung masuk dashboard tanpa harus
    // cek email. Kalau "Confirm email" MASIH aktif, session-nya kosong dan
    // kita tampilkan layar "cek email" sebagai fallback.
    if (data.session) {
      router.push('/ringkasan');
      router.refresh();
      return;
    }

    if (data.user) setNeedsEmailConfirm(true);
  }

  if (needsEmailConfirm) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream py-16">
        <Container className="max-w-md text-center">
          <img src="/mascot/mascot-wave.webp" alt="" className="mx-auto h-24 w-24 object-contain" />
          <h1 className="mt-4 font-display text-[22px] font-bold text-ink">Cek email kamu!</h1>
          <p className="mt-2 text-[14.5px] text-ink-500">
            Kami sudah mengirim link konfirmasi ke <strong>{email}</strong>. Klik link
            itu untuk mengaktifkan akun @{username}.
          </p>
        </Container>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream py-16">
      <Container className="max-w-md">
        <div className="rounded-3xl border border-ink/8 bg-white p-8 shadow-soft">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/mascot/mascot-main.webp" alt="Mivra" className="h-9 w-9 object-contain" />
            <span className="font-display text-[19px] font-bold text-ink">Mivra</span>
          </Link>

          <h1 className="mt-6 font-display text-[24px] font-bold text-ink">Buat halaman Mivra-mu</h1>
          <p className="mt-1.5 text-[14px] text-ink-400">
            Sudah punya akun?{' '}
            <Link href="/login" className="font-semibold text-ink underline decoration-amber-400 decoration-2 underline-offset-2">
              Masuk
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">
            <div>
              <label htmlFor="username" className="mb-1.5 block text-[13px] font-semibold text-ink-600">
                Username
              </label>
              <div className="flex items-center rounded-xl border border-ink/10 bg-cream-100 pl-4 focus-within:border-amber-400">
                <span className="text-[14.5px] text-ink-400">mivra.id/</span>
                <input
                  id="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase())}
                  placeholder="usernamekamu"
                  className="w-full bg-transparent py-3 pl-0.5 pr-4 text-[14.5px] text-ink outline-none"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-[13px] font-semibold text-ink-600">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-ink/10 bg-cream-100 px-4 py-3 text-[14.5px] text-ink outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-[13px] font-semibold text-ink-600">
                Kata sandi
              </label>
              <PasswordInput
                id="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="mt-1.5 text-[12px] text-ink-400">Minimal 8 karakter.</p>
            </div>

            {error && <p className="text-[13px] font-medium text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full rounded-full bg-ink py-3 text-[14.5px] font-semibold text-cream transition-colors hover:bg-amber-500 hover:text-ink disabled:opacity-60"
            >
              {loading ? 'Memproses…' : 'Buat akun gratis'}
            </button>
          </form>

          <p className="mt-5 text-center text-[12px] text-ink-400">
            Dengan mendaftar, kamu menyetujui Syarat Layanan &amp; Kebijakan Privasi Mivra.
          </p>
        </div>
      </Container>
    </div>
  );
}
