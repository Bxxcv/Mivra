import type { ReactNode } from 'react';

export default function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-[300px] rounded-[2.6rem] border-[6px] border-ink bg-ink p-2 shadow-[0_30px_60px_-20px_rgba(23,20,15,0.35)]">
      <div className="absolute left-1/2 top-2 z-10 h-5 w-28 -translate-x-1/2 rounded-full bg-ink" />
      <div className="relative h-[600px] w-full overflow-hidden rounded-[2.1rem] bg-cream">
        {children}
      </div>
    </div>
  );
}
