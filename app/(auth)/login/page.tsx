'use client';

import { useState, useEffect, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Container from '@/components/ui/Container';
import PasswordInput from '@/components/ui/PasswordInput';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('error') === 'auth_callback_failed') {
      setError('Login dengan Google gagal. Coba lagi.');
    }
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);
    if (error) {
      setError('Email atau kata sandi salah. Coba lagi.');
      return;
    }
    router.push('/ringkasan');
    router.refresh();
  }

  async function handleGoogleLogin() {
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      queryParams: {
        prompt: 'select_account',
      },
    },
  });
}

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream py-16">
      <Container className="max-w-md">
        <div className="rounded-3xl border border-ink/8 bg-white p-8 shadow-soft">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/mascot/mascot-main.webp" alt="Mivra" className="h-9 w-9 object-contain" />
            <span className="font-display text-[19px] font-bold text-ink">Mivra</span>
          </Link>

          <h1 className="mt-6 font-display text-[24px] font-bold text-ink">Masuk ke akunmu</h1>
          <p className="mt-1.5 text-[14px] text-ink-400">
            Belum punya akun?{' '}
            <Link href="/daftar" className="font-semibold text-ink underline decoration-amber-400 decoration-2 underline-offset-2">
              Daftar gratis
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">
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
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-[13px] font-medium text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full rounded-full bg-ink py-3 text-[14.5px] font-semibold text-cream transition-colors hover:bg-amber-500 hover:text-ink disabled:opacity-60"
            >
              {loading ? 'Memproses…' : 'Masuk'}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-ink/8" />
            <span className="text-[12px] font-medium text-ink-400">atau</span>
            <div className="h-px flex-1 bg-ink/8" />
          </div>

          <button
            onClick={handleGoogleLogin}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-ink/10 py-3 text-[14.5px] font-semibold text-ink transition-colors hover:border-ink/25"
          >
            Lanjutkan dengan Google
          </button>
        </div>
      </Container>
    </div>
  );
}
