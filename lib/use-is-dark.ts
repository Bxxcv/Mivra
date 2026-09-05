'use client';

import { useEffect, useState } from 'react';

/**
 * Chart (recharts) pakai warna lewat prop/style, bukan class Tailwind —
 * jadi class `dark:` gak bisa dipakai di situ. Hook ini baca class `.dark`
 * di <html> dan ikut berubah live saat ThemeToggle ditekan (lewat
 * MutationObserver), supaya warna chart ikut menyesuaikan tanpa reload.
 */
export function useIsDark() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const el = document.documentElement;
    setIsDark(el.classList.contains('dark'));

    const observer = new MutationObserver(() => setIsDark(el.classList.contains('dark')));
    observer.observe(el, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return isDark;
}
