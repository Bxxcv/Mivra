import { ClipboardList } from 'lucide-react';
import ComingSoon from '@/components/dashboard/ComingSoon';

export default function PesananPage() {
  return (
    <ComingSoon
      icon={ClipboardList}
      title="Pesanan"
      desc="Lihat dan kelola semua pesanan yang masuk dari halaman publikmu."
      phase="Fase 5"
    />
  );
}
