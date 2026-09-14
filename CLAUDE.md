# CLAUDE.md

Guidance for AI assistants working in this repository.

---

## Commands

```bash
# Dev server
npm run dev

# Production build (run before declaring anything done)
npm run build

# Type check
npm run type-check

# Lint
npm run lint

# Regenerate Supabase TypeScript types (requires linked project)
npm run supabase:gen-types
```

No test runner is configured. Verification is manual + `type-check` + `build`.

---

## Stack

- **Framework**: Next.js 15 (App Router, React 19)
- **Auth/DB/Storage**: Supabase (SSR client via `@supabase/ssr`)
- **Styling**: Tailwind CSS v4
- **Forms**: react-hook-form + zod
- **Icons**: lucide-react
- **Charts**: recharts
- **Animation**: framer-motion

---

## App Route Structure

```
app/
  page.tsx                      # Landing page (public)
  layout.tsx                    # Root layout
  globals.css

  (auth)/
    login/page.tsx
    daftar/page.tsx             # Sign up — sends username in raw_user_meta_data

  (dashboard)/
    layout.tsx                  # Auth guard + Sidebar; fetches user via getCurrentUserProfile()
    ringkasan/page.tsx          # Dashboard home
    halaman-bio/                # Bio page editor + links
    katalog/                    # Product catalog (Server Actions in actions.ts)
    gallery/                    # Premium only
    pesanan/page.tsx            # Orders
    rekap/page.tsx              # Revenue recap — Premium only
    tema/                       # Theme picker
    pengaturan/page.tsx         # Profile settings
    upgrade/page.tsx

  (admin)/
    admin/                      # Admin master — guarded by isAdminEmail()

  [username]/page.tsx           # Public bio/store page

  auth/callback/route.ts        # Supabase OAuth callback
```

---

## Key Files

| File | Purpose |
|---|---|
| `lib/supabase/server.ts` | `createClient()` (anon, SSR) and `createAdminClient()` (service role, server-only) |
| `lib/supabase/client.ts` | Browser client for Client Components |
| `lib/supabase/get-user.ts` | `getCurrentUserProfile()` — React `cache()` deduped per request |
| `lib/limits.ts` | Single source of truth for free/premium tier limits — must stay in sync with DB triggers |
| `lib/admin.ts` | `isAdminEmail()` — reads `ADMIN_EMAILS` env var, never from DB |
| `middleware.ts` | Session refresh on every request |

---

## Database Schema (Supabase)

Migrations live in `supabase/migrations/`. Two migrations so far:

- `0001_init.sql` — full schema, RLS, triggers
- `0002_product_images_storage.sql` — storage bucket + policies

Tables: `profiles`, `themes`, `links`, `categories`, `products`, `gallery_items`, `orders`, `order_items`, `analytics_events`, `reserved_usernames`

Important DB rules:

- `price_cents` / `total_cents` — prices stored as integer cents/rupiah, never float
- `product_name_snapshot` / `price_cents_snapshot` in `order_items` — snapshot at order time, products can change later
- Tier limits enforced server-side via DB triggers (`trg_check_product_limit`, `trg_check_link_limit`, `trg_check_gallery_tier`) — not just in UI
- `handle_new_user` trigger auto-creates `profiles` row on auth signup
- `TIER_LIMITS` in `lib/limits.ts` must stay in sync with trigger thresholds in `0001_init.sql`

RLS summary:
- `profiles`, `themes`, `links` (active), `products` (published), `categories`, `gallery_items` — readable by public
- `orders`, `order_items`, `analytics_events` — seller-only, never public
- Insert/update on `orders` and `analytics_events` must go through Route Handlers using `createAdminClient()`, not directly from the browser

---

## Auth & Admin

- Auth via Supabase email+password (and OAuth callback at `/auth/callback`)
- Admin access: `isAdminEmail()` checks `ADMIN_EMAILS` env var (comma-separated). Not stored in DB.
- `createAdminClient()` uses `SUPABASE_SERVICE_ROLE_KEY` — only call from Route Handlers or Server Actions, never import into any file that could be bundled client-side

---

## Tier System

Two tiers: `free` and `premium`. Limits defined in `lib/limits.ts`:

- Free: 5 products, 10 links, 5 themes, no gallery, no analytics, no AI, shows Mivra badge
- Premium: 500 products, unlimited links/themes, all features unlocked

Enforcement is dual-layer: UI gates via `TIER_LIMITS` + DB triggers. Both must agree.

---

## Sidebar Navigation (Dashboard)

Defined in `components/dashboard/Sidebar.tsx`. Desktop sidebar + mobile bottom nav with "Lainnya" drawer for overflow items.

Menu routes (all under `/(dashboard)/`):
`/ringkasan`, `/halaman-bio`, `/katalog`, `/gallery` (premium), `/pesanan`, `/rekap` (premium), `/tema`, `/pengaturan`, `/upgrade`

Adding a new dashboard page requires adding it to the `menu` array in `Sidebar.tsx`.

---

## ENV Variables

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY       # server-only, never expose to client
ADMIN_EMAILS                    # comma-separated admin emails
```

See `.env.example` for full list. Never commit `.env.local`.

---

## Critical Rules

1. **Never call `createAdminClient()` from a file that can be imported by a Client Component.**
2. **Never trust price/total values from the client.** Always recompute on the server.
3. **`lib/limits.ts` and DB triggers must stay in sync.** Changing one without the other creates a split-brain enforcement gap.
4. **Orders and analytics inserts go through Route Handlers only**, not direct from browser with anon key.
5. **Do not add a new migration just to patch a bug in an existing function.** Use `CREATE OR REPLACE FUNCTION` in a surgical migration instead.
6. **Before any schema change**: audit active functions (`pg_get_functiondef`), triggers, RLS policies, grants, and constraints first.
