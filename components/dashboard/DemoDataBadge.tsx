import { FlaskConical } from 'lucide-react';

/**
 * WAJIB dipasang di setiap widget yang datanya belum nyambung ke tabel
 * asli (analytics_events dsb — baru dibangun Fase 6). Jangan sampai user
 * mengira ini data sungguhan. Hapus badge ini SAAT widget yang
 * bersangkutan sudah pakai data database sesungguhnya.
 */
export default function DemoDataBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-navy-500/8 px-2 py-0.5 text-[10px] font-bold text-navy-500">
      <FlaskConical className="h-2.5 w-2.5" />
      Contoh data
    </span>
  );
}
