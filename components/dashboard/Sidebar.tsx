'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutGrid,
  Link2,
  ShoppingBag,
  Images,
  ClipboardList,
  BarChart3,
  Palette,
  Settings,
  Sparkles,
  Lock,
  MoreHorizontal,
  X,
} from 'lucide-react';
import type { Tier } from '@/lib/limits';

const menu = [
  { href: '/ringkasan', label: 'Ringkasan', icon: LayoutGrid, premiumOnly: false },
  { href: '/halaman-bio', label: 'Halaman Bio', icon: Link2, premiumOnly: false },
  { href: '/katalog', label: 'Katalog Produk', icon: ShoppingBag, premiumOnly: false },
  { href: '/gallery', label: 'Gallery', icon: Images, premiumOnly: true },
  { href: '/pesanan', label: 'Pesanan', icon: ClipboardList, premiumOnly: false },
  { href: '/rekap', label: 'Rekap & Omset', icon: BarChart3, premiumOnly: true },
  { href: '/tema', label: 'Tema', icon: Palette, premiumOnly: false },
  { href: '/pengaturan', label: 'Pengaturan', icon: Settings, premiumOnly: false },
] as const;

// 4 menu tersering dipakai tampil langsung di bottom nav mobile; sisanya di
// balik tombol "Lainnya" biar bottom nav gak sesak di layar kecil.
const mobilePrimary = menu.slice(0, 4);
const mobileMore = menu.slice(4);

export default function Sidebar({ tier }: { tier: Tier }) {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <>
      {/* ===== Sidebar desktop ===== */}
      <aside className="hidden w-64 shrink-0 flex-col bg-ink p-4 dark:bg-black/40 sm:flex">
        <Link href="/" className="flex items-center gap-2.5 px-2 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400/15">
            <img src="/mascot/mascot-main.webp" alt="Mivra" className="h-6 w-6 object-contain" />
          </div>
          <span className="font-display text-[17px] font-bold tracking-tight text-cream">Mivra</span>
        </Link>

        <nav className="mt-7 flex flex-1 flex-col gap-0.5">
          {menu.map(({ href, label, icon: Icon, premiumOnly }) => {
            const active = pathname === href;
            const locked = premiumOnly && tier === 'free';
            return (
              <Link
                key={href}
                href={href}
                className={`group relative flex items-center justify-between rounded-xl px-3 py-2.5 text-[13.5px] font-semibold transition-all ${
                  active ? 'bg-white/[0.07] text-cream' : 'text-cream/50 hover:bg-white/[0.04] hover:text-cream/85'
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-r-full bg-amber-400" />
                )}
                <span className="flex items-center gap-2.5">
                  <Icon className={`h-4 w-4 ${active ? 'text-amber-400' : ''}`} />
                  {label}
                </span>
                {locked && <Lock className="h-3 w-3 opacity-40" />}
              </Link>
            );
          })}
        </nav>

        {tier === 'free' ? (
          <Link
            href="/upgrade"
            className="group relative mt-4 overflow-hidden rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 p-4 text-ink shadow-[0_8px_24px_-8px_rgba(245,129,15,0.5)] transition-transform hover:-translate-y-0.5"
          >
            <img
              src="/mascot/mascot-wallet.webp"
              alt=""
              className="pointer-events-none absolute -bottom-3 -right-3 h-16 w-16 object-contain opacity-90"
            />
            <p className="flex items-center gap-1.5 text-[12px] font-bold">
              <Sparkles className="h-3.5 w-3.5" /> Upgrade
            </p>
            <p className="mt-1 max-w-[110px] text-[11px] font-medium leading-snug text-ink/70">
              Buka katalog 500 produk & fitur AI
            </p>
          </Link>
        ) : (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-white/[0.06] px-3 py-2.5">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-[11.5px] font-bold text-cream/80">Akun Premium aktif</span>
          </div>
        )}
      </aside>

      {/* ===== Bottom nav mobile ===== */}
      <nav className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t border-ink/10 bg-cream/95 py-1.5 backdrop-blur-lg dark:border-white/10 dark:bg-ink/95 sm:hidden">
        {mobilePrimary.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 ${
                active ? 'text-amber-500' : 'text-ink-400 dark:text-cream/40'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-semibold">{label.split(' ')[0]}</span>
            </Link>
          );
        })}
        <button
          onClick={() => setMoreOpen(true)}
          className="flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 text-ink-400 dark:text-cream/40"
        >
          <MoreHorizontal className="h-5 w-5" />
          <span className="text-[10px] font-semibold">Lainnya</span>
        </button>
      </nav>

      {/* ===== Drawer "Lainnya" mobile ===== */}
      {moreOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:hidden">
          <div className="absolute inset-0 bg-ink/50" onClick={() => setMoreOpen(false)} />
          <div className="relative w-full rounded-t-3xl bg-cream p-5 pb-8 dark:bg-[#1A1712]">
            <div className="flex items-center justify-between">
              <p className="font-display text-[15px] font-bold text-ink dark:text-cream">Menu lainnya</p>
              <button onClick={() => setMoreOpen(false)} className="text-ink-400 dark:text-cream/50">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {mobileMore.map(({ href, label, icon: Icon, premiumOnly }) => {
                const locked = premiumOnly && tier === 'free';
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMoreOpen(false)}
                    className="flex flex-col items-center gap-1.5 rounded-xl px-2 py-3 text-center"
                  >
                    <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-ink/5 text-ink-600 dark:bg-white/10 dark:text-cream/80">
                      <Icon className="h-4.5 w-4.5" />
                      {locked && <Lock className="absolute -bottom-0.5 -right-0.5 h-3 w-3 text-ink-400" />}
                    </span>
                    <span className="text-[10.5px] font-semibold text-ink-600 dark:text-cream/70">{label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
