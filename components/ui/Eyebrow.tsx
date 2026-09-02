import type { ReactNode } from 'react';

export default function Eyebrow({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-3.5 py-1.5 text-[13px] font-semibold tracking-wide text-ink-600 shadow-[0_1px_2px_rgba(23,20,15,0.04)]">
      {icon}
      {children}
    </div>
  );
}
