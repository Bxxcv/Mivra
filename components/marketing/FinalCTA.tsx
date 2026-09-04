'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';

export default function FinalCTA() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    router.push(trimmed ? `/daftar?email=${encodeURIComponent(trimmed)}` : '/daftar');
  }

  return (
    <section id="cta" className="scroll-mt-24 relative overflow-hidden bg-ink py-24 sm:py-28">
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="absolute -top-32 left-1/2 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-amber-500/20 blur-[110px]" />

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance font-display text-4xl font-bold tracking-tight text-cream sm:text-5xl">
            Bangun bisnismu dalam satu link.
          </h2>
          <p className="mt-5 text-[16.5px] leading-relaxed text-cream/65">
            Bergabung dengan kreator, seller, dan bisnis kecil yang menjalankan
            etalase, pembayaran, dan dukungan pelanggan lewat Mivra.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="kamu@contoh.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-full border border-white/15 bg-white/10 px-5 py-3.5 text-[14.5px] text-cream placeholder:text-cream/40 outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              className="group inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-amber-400 px-6 py-3.5 text-[14.5px] font-bold text-ink transition-colors hover:bg-amber-300"
            >
              Mulai gratis
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>

          <p className="mt-4 text-[12.5px] text-cream/40">
            Tanpa kartu kredit · Paket gratis selamanya tersedia
          </p>
        </div>
      </Container>

      <img
        src="/mascot/mascot-wallet.webp"
        alt=""
        className="animate-float-slow pointer-events-none absolute bottom-0 right-4 hidden h-36 w-36 object-contain opacity-95 sm:block lg:right-16 lg:h-44 lg:w-44"
      />
    </section>
  );
}
