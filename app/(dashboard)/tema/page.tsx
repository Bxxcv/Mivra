import { Palette } from 'lucide-react';
import ComingSoon from '@/components/dashboard/ComingSoon';

export default function TemaPage() {
  return (
    <ComingSoon
      icon={Palette}
      title="Tema"
      desc="Pilih dan sesuaikan tema halaman publikmu dari 5 tema gratis (atau tema premium tak terbatas)."
      phase="Fase 3 lanjutan"
    />
  );
}
