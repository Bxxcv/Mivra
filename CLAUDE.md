# CLAUDE.md

Guidance for AI assistants working in this repository.

---

## Commands

```bash
# Development
npm run dev           # Next.js dev server (localhost:3000)

# Build & type safety
npm run build         # production build
npm run type-check    # tsc --noEmit — run before every change
npm run lint          # eslint

# Supabase
npm run supabase:gen-types   # regenerate types/database.ts from linked project
```

No test runner configured yet (Vitest + Playwright planned, not set up).

Migrations are applied manually via Supabase dashboard or `supabase db push`, not automatically on deploy.

---

## Architecture

**Stack:** Next.js 15 App Router · React 19 · TypeScript · TailwindCSS 4 · Supabase (Auth + Postgres + Storage) · TanStack Query · react-hook-form + zod · framer-motion · recharts · shadcn/ui primitives

**Deploy:** Vercel · **DB/Auth/Storage:** Supabase · **Repo:** GitHub

### Route groups

```
app/
  (marketing)/          # landing page, public, no auth
  (auth)/               # login, daftar
  (dashboard)/          # seller dashboard — server-side auth guard in layout.tsx
    layout.tsx          # calls getCurrentUserProfile(), redirects to /login if no session
    ringkasan/          # seller home / summary
    halaman-bio/        # bio page editor
    katalog/            # product CRUD
    gallery/            # portfolio — Premium only, currently ComingSoon placeholder
    pesanan/            # orders
    rekap/              # order recap — Premium only
    tema/               # theme picker
    pengaturan/         # settings
    upgrade/            # tier upgrade page (static preview, payment not wired yet)
  (admin)/              # admin master area — gated by ADMIN_EMAILS env var
  [username]/           # public bio page — SSR, generateMetadata for OG
    produk/[slug]/      # public product detail — not yet built
  api/                  # route handlers (webhooks, etc.)
```

### Key lib files

- `lib/limits.ts` — single source of truth for free/premium tier limits. Must stay in sync with constraints/triggers in `supabase/migrations/0001_init.sql`. Changing one without the other will cause enforcement drift.
- `lib/admin.ts` — admin check via `ADMIN_EMAILS` env var only. No DB flag controls this.
- `lib/supabase/client.ts` — browser Supabase client
- `lib/supabase/server.ts` — server Supabase client (SSR cookies)
- `lib/supabase/get-user.ts` — `getCurrentUserProfile()` used by dashboard layout
- `lib/nav.ts` — marketing nav anchor links only (not dashboard nav)
- `middleware.ts` — refreshes Supabase session on every request. Does not redirect yet — auth redirect lives in `app/(dashboard)/layout.tsx`.

### Components

```
components/
  dashboard/
    VisitChart.tsx      # uses placeholder/demo data — replace when Fase 6 built
    TrafficDonut.tsx    # same — DemoDataBadge should be removed after real data wired
  marketing/            # landing page sections
  mockups/              # PhoneFrame, StorefrontMockup — used in landing page
  ui/                   # shared primitives: Container, Eyebrow, PasswordInput, Reveal
```

### Database

Migrations in `supabase/migrations/`. Types auto-generated into `types/database.ts` — do not edit manually.

- `0001_init.sql` — core schema: `profiles`, `links`, `products`, `categories`, `gallery_items`, `orders`, `order_items`, `analytics_events`, `themes`, `subscriptions` + RLS + triggers
- `0002_product_images_storage.sql` — Storage bucket `product-images` + RLS policies. **Not yet applied to production** — must be pushed manually.

All user-owned tables use `user_id` + RLS `auth.uid() = user_id`.

Tier limits enforced at two layers: server actions AND DB triggers. Changing `lib/limits.ts` alone is not enough.

Storage path convention for product images: `{user_id}/filename.ext` — enforced by RLS policy on the bucket.

### Tier model

- `free` — 5 products, 10 links, 5 themes, no gallery, no advanced analytics, no order recap, Mivra badge shown, 5% transaction fee (placeholder)
- `premium` — 500 products, unlimited links/themes, gallery, advanced analytics, order recap, AI, custom domain, coupon, multi-admin, no badge, 0% fee

### Environment variables

```
NEXT_PUBLIC_SUPABASE_URL         # safe for client
NEXT_PUBLIC_SUPABASE_ANON_KEY    # safe for client
SUPABASE_SERVICE_ROLE_KEY        # server only — never expose to browser or commit
ADMIN_EMAILS                     # comma-separated emails, controls /admin access
```

---

## Conventions

- Server actions live in `actions.ts` co-located with their page/route.
- Zod schemas validate on both client (form) and server (action).
- `types/database.ts` is generated — run `supabase:gen-types` after any schema change.
- Dashboard home is `/ringkasan`, not `/dashboard`.
- `lib/nav.ts` is marketing-only anchor links. Dashboard navigation is separate.

---

## Current phase (per ROADMAP.md)

Fase 0–3 complete. Currently in Fase 4 (Katalog Produk & Gallery).

Active gaps:
- `0002_product_images_storage.sql` not yet applied to production
- Category management UI not built (table exists in DB)
- Gallery page is a ComingSoon placeholder
- Public product detail page (`/[username]/produk/[slug]`) not yet built
- VisitChart/TrafficDonut use demo data until Fase 6
- Payment gateway deferred to Fase 8
- Premium upgrade page is static — no payment wired
- Google OAuth needs enabling in Supabase dashboard
- `ADMIN_EMAILS` must be set in Vercel env or `/admin` returns 404
