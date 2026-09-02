import type { ReactNode } from 'react';
import { Lock } from 'lucide-react';

export default function BrowserFrame({
  url = 'mivra.id/lunacreates',
  children,
}: {
  url?: string;
  children: ReactNode;
}) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-card">
      <div className="flex items-center gap-3 border-b border-ink/8 bg-cream-100 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF7A6E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFC24B]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#3FCF6B]" />
        </div>
        <div className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-medium text-ink-400">
          <Lock className="h-3 w-3" />
          {url}
        </div>
      </div>
      <div className="bg-white">{children}</div>
    </div>
  );
}
