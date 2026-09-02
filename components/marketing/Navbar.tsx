'use client';

import { useEffect, useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import { navLinks } from '@/lib/nav';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-cream/85 backdrop-blur-lg border-b border-ink/8 shadow-[0_1px_0_rgba(23,20,15,0.04)]' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <Container>
        <nav className="flex h-18 items-center justify-between py-3.5">
          <a href="#hero" className="flex items-center gap-2.5 shrink-0">
            <img
              src="/mascot/mascot-main.png"
              alt="Maskot Mivra"
              className="h-10 w-10 object-contain"
            />
            <span className="font-display text-[22px] font-bold tracking-tight text-ink">
              Mivra
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-[14.5px] font-medium text-ink-600 transition-colors hover:bg-ink/5 hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <a
              href="#pricing"
              className="rounded-full px-4 py-2.5 text-[14.5px] font-semibold text-ink-600 transition-colors hover:text-ink"
            >
              Masuk
            </a>
            <a
              href="#cta"
              className="group inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-[14.5px] font-semibold text-cream transition-all hover:bg-amber-500 hover:text-ink"
            >
              Mulai gratis
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          <button
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white text-ink"
            onClick={() => setOpen((o) => !o)}
            aria-label="Buka/tutup menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </Container>

      {open && (
        <div className="lg:hidden border-t border-ink/8 bg-cream">
          <Container className="flex flex-col gap-1 py-5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-[16px] font-medium text-ink-700 hover:bg-ink/5"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-ink/8 pt-4">
              <a
                href="#pricing"
                onClick={() => setOpen(false)}
                className="rounded-full border border-ink/10 px-4 py-3 text-center text-[15px] font-semibold text-ink"
              >
                Masuk
              </a>
              <a
                href="#cta"
                onClick={() => setOpen(false)}
                className="rounded-full bg-ink px-4 py-3 text-center text-[15px] font-semibold text-cream"
              >
                Mulai gratis
              </a>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
