'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, Store, LayoutDashboard, BarChart3 } from 'lucide-react';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import Reveal from '@/components/ui/Reveal';
import PhoneFrame from '@/components/mockups/PhoneFrame';
import BioPageMockup from '@/components/mockups/BioPageMockup';
import StorefrontMockup from '@/components/mockups/StorefrontMockup';
import DashboardMockup from '@/components/mockups/DashboardMockup';
import AnalyticsMockup from '@/components/mockups/AnalyticsMockup';

const tabs = [
  {
    key: 'bio',
    icon: Link2,
    label: 'Halaman bio',
    desc: 'Halaman personal yang rapi, jauh lebih dari sekadar daftar link.',
  },
  {
    key: 'store',
    icon: Store,
    label: 'Etalase toko',
    desc: 'Pengalaman katalog lengkap untuk produk digital dan fisik.',
  },
  {
    key: 'dashboard',
    icon: LayoutDashboard,
    label: 'Dashboard',
    desc: 'Kelola pesanan, pelanggan, dan saldo dari satu layar.',
  },
  {
    key: 'analytics',
    icon: BarChart3,
    label: 'Analitik',
    desc: 'Pahami persis apa yang mendorong klik, penjualan, dan pertumbuhan.',
  },
] as const;

type TabKey = (typeof tabs)[number]['key'];

export default function ProductShowcase() {
  const [active, setActive] = useState<TabKey>('bio');

  return (
    <section id="showcase" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Lihat langsung aksinya</Eyebrow>
          <h2 className="text-balance mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-[44px]">
            Satu halaman. Empat pengalaman.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-600">
            Beralih antara tampilan yang dilihat audiensmu dan cara kamu
            menjalankan bisnis di baliknya.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div className="flex gap-3 overflow-x-auto pb-2 lg:col-span-4 lg:flex-col lg:overflow-visible lg:pb-0">
            {tabs.map(({ key, icon: Icon, label, desc }) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`flex shrink-0 items-start gap-3.5 rounded-2xl border px-5 py-4 text-left transition-all lg:w-full ${
                  active === key
                    ? 'border-amber-300 bg-white shadow-card'
                    : 'border-transparent bg-transparent hover:bg-white/60'
                }`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                    active === key ? 'bg-ink text-amber-400' : 'bg-ink/5 text-ink-400'
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-[160px] lg:min-w-0">
                  <p className={`text-[15px] font-bold ${active === key ? 'text-ink' : 'text-ink-500'}`}>
                    {label}
                  </p>
                  <p className="mt-0.5 hidden text-[13px] leading-snug text-ink-400 lg:block">
                    {desc}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-8">
            <div className="relative flex min-h-[560px] items-center justify-center rounded-[2rem] border border-ink/8 bg-gradient-to-b from-white to-cream-100 p-6 sm:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="w-full"
                >
                  {active === 'bio' && (
                    <div className="mx-auto scale-90 sm:scale-100">
                      <PhoneFrame>
                        <BioPageMockup />
                      </PhoneFrame>
                    </div>
                  )}
                  {active === 'store' && <StorefrontMockup />}
                  {active === 'dashboard' && <DashboardMockup />}
                  {active === 'analytics' && <AnalyticsMockup />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
