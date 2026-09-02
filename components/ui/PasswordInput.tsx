'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

/**
 * Input password dengan ikon mata untuk toggle lihat/sembunyikan.
 * Pakai ini di SEMUA form password di project (login, daftar, ganti
 * password, dst.) — jangan bikin versi custom lain, biar konsisten.
 */
export default function PasswordInput(props: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        {...props}
        type={visible ? 'text' : 'password'}
        className={`w-full rounded-xl border border-ink/10 bg-cream-100 px-4 py-3 pr-11 text-[14.5px] text-ink outline-none focus:border-amber-400 ${props.className ?? ''}`}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink"
        aria-label={visible ? 'Sembunyikan kata sandi' : 'Lihat kata sandi'}
        tabIndex={-1}
      >
        {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}
