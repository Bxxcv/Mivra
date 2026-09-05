'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({
  storageKey = 'mivra-theme',
  className,
}: {
  /** Beda key antara dashboard seller ('mivra-theme') dan admin
   *  ('mivra-admin-theme') karena default tema keduanya beda. */
  storageKey?: string;
  className?: string;
}) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem(storageKey, next ? 'dark' : 'light');
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'}
      className={
        className ||
        'flex h-9 w-9 items-center justify-center rounded-full text-ink-400 hover:bg-ink/5 hover:text-ink dark:text-cream/50 dark:hover:bg-white/10 dark:hover:text-cream'
      }
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
