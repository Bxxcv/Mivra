import { BarChart3 } from 'lucide-react';
import ComingSoon from '@/components/dashboard/ComingSoon';

export default function RekapPage() {
  return (
    <ComingSoon
      icon={BarChart3}
      title="Rekap & Omset"
      desc="Grafik penjualan, produk terlaris, dan export laporan — fitur khusus tier Premium."
      phase="Fase 6"
    />
  );
}
