import { Settings } from 'lucide-react';
import ComingSoon from '@/components/dashboard/ComingSoon';

export default function PengaturanPage() {
  return (
    <ComingSoon
      icon={Settings}
      title="Pengaturan"
      desc="Kelola profil, domain custom, tim/kolaborator, dan keamanan akun."
      phase="Fase 7"
    />
  );
}
