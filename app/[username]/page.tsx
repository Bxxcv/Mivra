import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { Sparkles } from 'lucide-react';

type Props = { params: Promise<{ username: string }> };

async function getProfile(username: string) {
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from('profiles')
    .select('id, username, display_name, bio, avatar_url, tier')
    .eq('username', username)
    .single();

  if (!profile) return null;

  const { data: links } = await supabase
    .from('links')
    .select('id, label, url')
    .eq('user_id', profile.id)
    .eq('is_active', true)
    .order('position', { ascending: true });

  const { data: products } = await supabase
    .from('products')
    .select('id, name, slug, price_cents, images')
    .eq('user_id', profile.id)
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  return { profile, links: links ?? [], products: products ?? [] };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const data = await getProfile(username);
  if (!data) return { title: 'Halaman tidak ditemukan · Mivra' };

  const { profile } = data;
  const name = profile.display_name || profile.username;

  return {
    title: `${name} · Mivra`,
    description: profile.bio ?? `Lihat halaman ${name} di Mivra.`,
    openGraph: {
      title: name,
      description: profile.bio ?? undefined,
      images: profile.avatar_url ? [profile.avatar_url] : undefined,
      type: 'profile',
    },
  };
}

export default async function PublicBioPage({ params }: Props) {
  const { username } = await params;
  const data = await getProfile(username);
  if (!data) notFound();

  const { profile, links, products } = data;
  const name = profile.display_name || profile.username;

  return (
    <div className="flex min-h-screen flex-col items-center bg-cream px-5 py-12">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center text-center">
          <div className="h-24 w-24 overflow-hidden rounded-full bg-cream-100 ring-4 ring-white shadow-md">
            {profile.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profile.avatar_url} alt={name} className="h-full w-full object-cover" />
            ) : (
              <img src="/mascot/mascot-main.webp" alt="" className="h-full w-full object-contain p-3" />
            )}
          </div>
          <p className="mt-3 font-display text-[19px] font-bold text-ink">@{profile.username}</p>
          {profile.bio && <p className="mt-1.5 max-w-xs text-[13.5px] leading-snug text-ink-400">{profile.bio}</p>}
        </div>

        <div className="mt-7 flex flex-col gap-2.5">
          {links.length === 0 ? (
            <p className="text-center text-[13px] text-ink-400">Belum ada link ditambahkan.</p>
          ) : (
            links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center rounded-2xl border border-ink/10 bg-white px-4 py-3.5 text-center text-[14px] font-semibold text-ink shadow-sm transition-transform hover:-translate-y-0.5"
              >
                {link.label}
              </a>
            ))
          )}
        </div>

        {products.length > 0 && (
          <div className="mt-8">
            <p className="mb-2.5 text-left text-[11.5px] font-bold uppercase tracking-wide text-ink-400">
              Produk
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {products.map((p) => (
                <div key={p.id} className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm">
                  <div className="aspect-square w-full overflow-hidden bg-cream-100">
                    {p.images[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" />
                    ) : (
                      <img src="/mascot/mascot-main.webp" alt="" className="h-full w-full object-contain p-6 opacity-40" />
                    )}
                  </div>
                  <div className="px-2.5 py-2">
                    <p className="truncate text-[11.5px] font-semibold text-ink">{p.name}</p>
                    <p className="text-[11px] font-bold text-amber-600">
                      Rp{p.price_cents.toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gallery portofolio menyusul Fase 4 lanjutan (khusus Premium) — lihat docs/ROADMAP.md */}

        {profile.tier === 'free' && (
          <a
            href="https://mivra.id"
            className="mx-auto mt-10 flex w-fit items-center gap-1.5 rounded-full border border-ink/8 bg-white px-3.5 py-1.5 text-[11px] font-semibold text-ink-400"
          >
            <Sparkles className="h-3 w-3 text-amber-500" />
            Dibuat dengan Mivra
          </a>
        )}
      </div>
    </div>
  );
}
