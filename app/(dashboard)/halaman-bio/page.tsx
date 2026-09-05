import { createClient } from '@/lib/supabase/server';
import { getCurrentUserProfile } from '@/lib/supabase/get-user';
import { getLimits, type Tier } from '@/lib/limits';
import AddLinkForm from '@/components/dashboard/AddLinkForm';
import LinkList from '@/components/dashboard/LinkList';

export default async function HalamanBioPage() {
  const { user, profile } = await getCurrentUserProfile();
  const supabase = await createClient();
  const tier: Tier = profile?.tier ?? 'free';
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
      <h1 className="font-display text-[22px] font-bold text-ink dark:text-cream">Halaman Bio</h1>
      <p className="mt-1 text-[13.5px] text-ink-400 dark:text-cream/40">
        Kelola link yang tampil di halaman publikmu. Urutkan dengan panah ↑↓.
      </p>

      {tier === 'free' && (
        <div
          className={`mt-4 rounded-2xl border px-4 py-3.5 ${
            atLimit ? 'border-amber-300 bg-amber-50 dark:border-amber-400/40 dark:bg-amber-400/10' : 'border-ink/8 bg-white dark:border-white/10 dark:bg-[#1D1A16]'
          }`}
        >
          <div className="flex items-center justify-between text-[13px] font-medium">
            <span className={atLimit ? 'text-amber-700 dark:text-amber-400' : 'text-ink-500 dark:text-cream/60'}>
              {atLimit
                ? `Slot link Gratis penuh — upgrade untuk tanpa batas`
                : `${linkCount}/${limits.maxLinks} link terpakai`}
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink/8 dark:bg-white/10">
            <div
              className={`h-full rounded-full transition-all ${atLimit ? 'bg-amber-500' : 'bg-forest-500'}`}
              style={{ width: `${Math.min(100, (linkCount / limits.maxLinks) * 100)}%` }}
            />
          </div>
        </div>
      )}

      <div className="mt-4">{!atLimit && <AddLinkForm />}</div>

      <LinkList links={links ?? []} />
    </div>
  );
}
