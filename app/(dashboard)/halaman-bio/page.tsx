import { createClient } from '@/lib/supabase/server';
import { getLimits, type Tier } from '@/lib/limits';
import AddLinkForm from '@/components/dashboard/AddLinkForm';
import LinkList from '@/components/dashboard/LinkList';

export default async function HalamanBioPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select('tier')
    .eq('id', user!.id)
    .single();
  const tier: Tier = (profile?.tier as Tier) ?? 'free';
  const limits = getLimits(tier);

  const { data: links } = await supabase
    .from('links')
    .select('id, label, url, is_active, position')
    .eq('user_id', user!.id)
    .order('position', { ascending: true });

  const linkCount = links?.length ?? 0;
  const atLimit = tier === 'free' && linkCount >= limits.maxLinks;

  return (
    <div>
      <h1 className="font-display text-[22px] font-bold text-ink">Halaman Bio</h1>
      <p className="mt-1 text-[13.5px] text-ink-400">
        Kelola link yang tampil di halaman publikmu. Urutkan dengan panah ↑↓.
      </p>

      {tier === 'free' && (
        <div
          className={`mt-4 rounded-xl border px-4 py-3 text-[13px] font-medium ${
            atLimit
              ? 'border-amber-300 bg-amber-50 text-amber-700'
              : 'border-ink/8 bg-white text-ink-500'
          }`}
        >
          {atLimit
            ? `Kamu sudah pakai ${linkCount}/${limits.maxLinks} slot link Gratis. Upgrade ke Premium untuk link tanpa batas.`
            : `${linkCount}/${limits.maxLinks} link terpakai (tier Gratis).`}
        </div>
      )}

      <div className="mt-4">{!atLimit && <AddLinkForm />}</div>

      <LinkList links={links ?? []} />
    </div>
  );
}
