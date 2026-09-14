import { Palette, Check } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { getCurrentUserProfile } from '@/lib/supabase/get-user';
import type { Tier } from '@/lib/limits';
import ApplyThemeButton from '@/components/dashboard/ApplyThemeButton';

type ThemeConfig = {
  accent: string;
  bg: string;
  dark?: boolean;
};

type Theme = {
  id: string;
  name: string;
  is_premium: boolean;
  config: ThemeConfig;
};

export default async function TemaPage() {
  const [{ user, profile }, supabase] = await Promise.all([
    getCurrentUserProfile(),
    createClient(),
  ]);
  const tier: Tier = profile?.tier ?? 'free';

  const [{ data: themes }, { data: fullProfile }] = await Promise.all([
    supabase.from('themes').select('id, name, is_premium, config').order('created_at', { ascending: true }),
    supabase.from('profiles').select('active_theme_id').eq('id', user!.id).single(),
  ]);

  const activeThemeId = fullProfile?.active_theme_id ?? null;

  return (
    <div>
      <h1 className="font-display text-[22px] font-bold text-ink dark:text-cream">Tema</h1>
      <p className="mt-1 text-[13.5px] text-ink-400 dark:text-cream/40">
        Pilih tampilan halaman publik Mivra-mu.
        {tier === 'free' && ' Semua tema tersedia gratis.'}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {(themes ?? []).map((theme: Theme) => {
          const isActive = theme.id === activeThemeId;
          const cfg = theme.config as ThemeConfig;
          const isDark = cfg.dark === true;

          return (
            <div
              key={theme.id}
              className={`relative overflow-hidden rounded-2xl border-2 transition-all ${
                isActive
                  ? 'border-amber-400 shadow-md'
                  : 'border-ink/8 dark:border-white/10'
              }`}
            >
              {/* Preview strip */}
              <div
                className="flex h-20 flex-col gap-1.5 px-3 py-3"
                style={{ backgroundColor: cfg.bg }}
              >
                {/* Simulasi avatar */}
                <div
                  className="h-5 w-5 rounded-full"
                  style={{ backgroundColor: cfg.accent, opacity: 0.9 }}
                />
                {/* Simulasi link button */}
                <div
                  className="h-2.5 w-full rounded-full"
                  style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)' }}
                />
                <div
                  className="h-2.5 w-4/5 rounded-full"
                  style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.05)' }}
                />
                <div
                  className="mt-auto h-1.5 w-8 rounded-full"
                  style={{ backgroundColor: cfg.accent }}
                />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-3 py-2 bg-white dark:bg-[#1D1A16]">
                <div>
                  <p className="text-[12px] font-semibold text-ink dark:text-cream">{theme.name}</p>
                  {theme.is_premium && (
                    <p className="text-[10px] font-bold text-amber-500">Premium</p>
                  )}
                </div>
                <ApplyThemeButton
                  themeId={theme.id}
                  isActive={isActive}
                  userId={user!.id}
                />
              </div>

              {/* Active badge */}
              {isActive && (
                <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400">
                  <Check className="h-3 w-3 text-ink" strokeWidth={3} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-[12px] text-ink-400 dark:text-cream/40">
        Tema yang dipilih langsung diterapkan ke halaman publik{' '}
        {profile?.username ? (
          <a
            href={`/${profile.username}`}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-amber-600 hover:underline"
          >
            mivra-alpha.vercel.app/{profile.username}
          </a>
        ) : 'milikmu'}.
      </p>
    </div>
  );
}
