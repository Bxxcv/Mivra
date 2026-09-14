import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { createClient } from '@/lib/supabase/server';
import { Sparkles } from 'lucide-react';

type Props = { params: Promise<{ username: string }> };

type ThemeConfig = {
  accent: string;
  bg: string;
  dark?: boolean;
};

const DEFAULT_THEME: ThemeConfig = {
  accent: '#F5810F',
  bg: '#FBF8F2',
  dark: false,
};

async function getProfile(username: string) {
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from('profiles')
    .select('id, username, display_name, bio, avatar_url, tier, active_theme_id')
    .eq('username', username)
    .single();

  if (!profile) return null;

  const [{ data: links }, { data: products }, { data: theme }] = await Promise.all([
    supabase
      .from('links')
      .select('id, label, url')
      .eq('user_id', profile.id)
      .eq('is_active', true)
      .order('position', { ascending: true }),
    supabase
      .from('products')
      .select('id, name, slug, price_cents, images')
      .eq('user_id', profile.id)
      .eq('is_published', true)
      .order('created_at', { ascending: false }),
    profile.active_theme_id
      ? supabase
          .from('themes')
          .select('config')
          .eq('id', profile.active_theme_id)
          .single()
      : Promise.resolve({ data: null }),
  ]);

  const themeConfig: ThemeConfig = (theme?.config as ThemeConfig) ?? DEFAULT_THEME;

  return {
    profile,
    links: links ?? [],
    products: products ?? [],
    themeConfig,
  };
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

  const { profile, links, products, themeConfig } = data;
  const name = profile.display_name || profile.username;
  const isDark = themeConfig.dark === true;

  // CSS vars inline — hanya di-scope ke halaman publik ini, tidak bocor ke dashboard
  const cssVars = {
    '--bio-bg': themeConfig.bg,
    '--bio-accent': themeConfig.accent,
    '--bio-text': isDark ? '#FBF8F2' : '#17140F',
    '--bio-text-muted': isDark ? 'rgba(251,248,242,0.55)' : 'rgba(23,20,15,0.5)',
    '--bio-card-bg': isDark ? 'rgba(255,255,255,0.08)' : '#FFFFFF',
    '--bio-card-border': isDark ? 'rgba(255,255,255,0.12)' : 'rgba(23,20,15,0.08)',
  } as CSSProperties;

  return (
    <div
      className="flex min-h-screen flex-col items-center px-5 py-12"
      style={{ backgroundColor: 'var(--bio-bg)', ...cssVars }}
    >
      <div className="w-full max-w-md">
        {/* Avatar & nama */}
        <div className="flex flex-col items-center text-center">
          <div
            className="h-24 w-24 overflow-hidden rounded-full ring-4 shadow-md"
            style={{
              backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : '#F5F0E6',
              ringColor: isDark ? 'rgba(255,255,255,0.15)' : '#FFFFFF',
            }}
          >
            {profile.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profile.avatar_url} alt={name} className="h-full w-full object-cover" />
            ) : (
              <img src="/mascot/mascot-main.webp" alt="" className="h-full w-full object-contain p-3" />
            )}
          </div>
          <p
            className="mt-3 font-display text-[19px] font-bold"
            style={{ color: 'var(--bio-text)' }}
          >
            @{profile.username}
          </p>
          {profile.bio && (
            <p
              className="mt-1.5 max-w-xs text-[13.5px] leading-snug"
              style={{ color: 'var(--bio-text-muted)' }}
            >
              {profile.bio}
            </p>
          )}
        </div>

        {/* Links */}
        <div className="mt-7 flex flex-col gap-2.5">
          {links.length === 0 ? (
            <p className="text-center text-[13px]" style={{ color: 'var(--bio-text-muted)' }}>
              Belum ada link ditambahkan.
            </p>
          ) : (
            links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center rounded-2xl border px-4 py-3.5 text-center text-[14px] font-semibold shadow-sm transition-transform hover:-translate-y-0.5"
                style={{
                  backgroundColor: 'var(--bio-card-bg)',
                  borderColor: 'var(--bio-card-border)',
                  color: 'var(--bio-text)',
                }}
              >
                {link.label}
              </a>
            ))
          )}
        </div>

        {/* Produk */}
        {products.length > 0 && (
          <div className="mt-8">
            <p
              className="mb-2.5 text-left text-[11.5px] font-bold uppercase tracking-wide"
              style={{ color: 'var(--bio-text-muted)' }}
            >
              Produk
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="overflow-hidden rounded-2xl border shadow-sm"
                  style={{
                    backgroundColor: 'var(--bio-card-bg)',
                    borderColor: 'var(--bio-card-border)',
                  }}
                >
                  <div
                    className="aspect-square w-full overflow-hidden"
                    style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : '#F5F0E6' }}
                  >
                    {p.images[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" />
                    ) : (
                      <img
                        src="/mascot/mascot-main.webp"
                        alt=""
                        className="h-full w-full object-contain p-6 opacity-40"
                      />
                    )}
                  </div>
                  <div className="px-2.5 py-2">
                    <p
                      className="truncate text-[11.5px] font-semibold"
                      style={{ color: 'var(--bio-text)' }}
                    >
                      {p.name}
                    </p>
                    <p className="text-[11px] font-bold" style={{ color: themeConfig.accent }}>
                      Rp{p.price_cents.toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mivra badge — hanya tier free */}
        {profile.tier === 'free' && (
          <a
            href="https://mivra.id"
            className="mx-auto mt-10 flex w-fit items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold"
            style={{
              borderColor: 'var(--bio-card-border)',
              backgroundColor: 'var(--bio-card-bg)',
              color: 'var(--bio-text-muted)',
            }}
          >
            <Sparkles className="h-3 w-3" style={{ color: themeConfig.accent }} />
            Dibuat dengan Mivra
          </a>
        )}
      </div>
    </div>
  );
}
