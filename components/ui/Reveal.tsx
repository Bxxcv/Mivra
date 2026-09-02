'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay dalam detik — dipakai untuk stagger antar elemen */
  delay?: number;
  /** Jarak geser awal dalam px. Default 22 — cukup terasa tanpa berlebihan. */
  y?: number;
};

const variants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Bungkus section/elemen dengan ini supaya muncul dengan fade+slide halus
 * saat pertama kali masuk viewport (scroll-reveal). Dipakai di seluruh
 * landing page — lihat docs/DESAIN.md §7 Motion & Animasi.
 *
 * `once: true` supaya animasi cuma jalan sekali per elemen (tidak
 * berulang tiap scroll naik-turun — itu yang bikin terasa mengganggu,
 * bukan halus).
 */
export default function Reveal({ children, className, delay = 0, y = 22 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
