import { Images } from 'lucide-react';
import ComingSoon from '@/components/dashboard/ComingSoon';

export default function GalleryPage() {
  return (
    <ComingSoon
      icon={Images}
      title="Gallery"
      desc="Pamerkan portofolio karyamu — fitur khusus tier Premium."
      phase="Fase 4"
    />
  );
}
