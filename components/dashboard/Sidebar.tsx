'use client';

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

export default function Sidebar({ tier }: { tier: Tier }) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-ink/8 bg-cream-100 p-4 sm:flex">
      <Link href="/" className="flex items-center gap-2 px-2 py-2">
        <img src="/mascot/mascot-main.webp" alt="Mivra" className="h-8 w-8 object-contain" />
        <span className="font-display text-[17px] font-bold text-ink">Mivra</span>
      </Link>

      <nav className="mt-6 flex flex-1 flex-col gap-1">
        {menu.map(({ href, label, icon: Icon, premiumOnly }) => {
          const active = pathname === href;
          const locked = premiumOnly && tier === 'free';
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-[13.5px] font-semibold transition-colors ${
                active ? 'bg-ink text-cream' : 'text-ink-600 hover:bg-white'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Icon className="h-4 w-4" />
                {label}
              </span>
              {locked && <Lock className="h-3.5 w-3.5 opacity-60" />}
            </Link>
          );
        })}
      </nav>

      {tier === 'free' && (
        <Link
          href="/upgrade"
          className="mt-4 flex items-center gap-2 rounded-xl bg-ink px-3 py-3 text-[12.5px] font-bold text-cream"
        >
          <Sparkles className="h-4 w-4 text-amber-400" />
          Upgrade ke Premium
        </Link>
      )}
    </aside>
  );
}
