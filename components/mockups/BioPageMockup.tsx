import { BadgeCheck, Instagram, Music2, Youtube, ChevronRight, Play, Calendar, ShoppingBag } from 'lucide-react';

export default function BioPageMockup() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-6 pt-3 text-[11px] font-semibold text-ink-600">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <div className="h-2 w-4 rounded-sm border border-ink-600" />
          <div className="h-2 w-2 rounded-full border border-ink-600" />
        </div>
      </div>

      <div className="flex-1 overflow-hidden px-5 pb-5 pt-4">
        <div className="flex flex-col items-center text-center">
          <div className="h-20 w-20 overflow-hidden rounded-full ring-4 ring-white shadow-md">
            <img src="/images/avatar-1.jpg" alt="Avatar kreator" className="h-full w-full object-cover" />
          </div>
          <div className="mt-3 flex items-center gap-1">
            <span className="font-display text-[16px] font-bold text-ink">@lunacreates</span>
            <BadgeCheck className="h-4 w-4 fill-amber-400 text-cream" strokeWidth={2.5} />
          </div>
          <p className="mt-1 text-[12.5px] leading-snug text-ink-400">
            Content creator · Skincare &amp; lifestyle ✨<br />Produk baru tiap Jumat
          </p>

          <div className="mt-3 flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-ink/5 text-ink-600">
              <Instagram className="h-3.5 w-3.5" />
            </div>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-ink/5 text-ink-600">
              <Music2 className="h-3.5 w-3.5" />
            </div>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-ink/5 text-ink-600">
              <Youtube className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2.5">
          <button className="flex w-full items-center justify-between rounded-2xl bg-ink px-4 py-3 text-left text-cream shadow-sm">
            <span className="flex items-center gap-2 text-[13px] font-semibold">
              <Play className="h-4 w-4" /> Tonton video terbaruku
            </span>
            <ChevronRight className="h-4 w-4 opacity-60" />
          </button>
          <button className="flex w-full items-center justify-between rounded-2xl border border-ink/10 bg-white px-4 py-3 text-left shadow-sm">
            <span className="flex items-center gap-2 text-[13px] font-semibold text-ink">
              <Calendar className="h-4 w-4" /> Booking konsultasi 1:1
            </span>
            <ChevronRight className="h-4 w-4 text-ink-400" />
          </button>
          <button className="flex w-full items-center justify-between rounded-2xl border border-ink/10 bg-white px-4 py-3 text-left shadow-sm">
            <span className="flex items-center gap-2 text-[13px] font-semibold text-ink">
              <ShoppingBag className="h-4 w-4" /> Belanja paket skincare-ku
            </span>
            <ChevronRight className="h-4 w-4 text-ink-400" />
          </button>
        </div>

        <div className="mt-5">
          <p className="mb-2.5 text-left text-[12px] font-bold uppercase tracking-wide text-ink-400">Produk unggulan</p>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm">
              <div className="aspect-square w-full overflow-hidden">
                <img src="/images/product-hoodie.jpg" alt="Hoodie" className="h-full w-full object-cover" />
              </div>
              <div className="px-2.5 py-2">
                <p className="truncate text-[11.5px] font-semibold text-ink">Hoodie Nyaman</p>
                <p className="text-[11px] font-bold text-amber-600">Rp 148.000</p>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm">
              <div className="aspect-square w-full overflow-hidden">
                <img src="/images/product-mug.jpg" alt="Mug" className="h-full w-full object-cover" />
              </div>
              <div className="px-2.5 py-2">
                <p className="truncate text-[11.5px] font-semibold text-ink">Mug Pagi Hari</p>
                <p className="text-[11px] font-bold text-amber-600">Rp 55.000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
