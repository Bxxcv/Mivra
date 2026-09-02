# STRUKTUR.md — Arsitektur Teknis MIVRA

## 1. Keputusan Teknologi (& alasannya)

### Framework: Next.js 15 (App Router), bukan "React + Vue"

Brief awal menyebut "React+Vue" untuk teknologi paling modern. Secara teknis, **menggabungkan React dan Vue dalam satu aplikasi tidak masuk akal** — dua framework ini punya rendering engine berbeda; menggabungkannya hanya menambah ukuran bundle & kompleksitas tanpa manfaat nyata. Rekomendasi sebagai senior dev:

- Tetap di ekosistem **React** (starter project yang sudah ada memakai React 19 + Vite + TypeScript + TailwindCSS 4 + framer-motion — semua komponennya reusable).
- **Migrasi dari Vite (SPA) ke Next.js 15 App Router**, karena:
  - Halaman publik `mivra.id/username` butuh **SEO & preview link (Open Graph) per-user** yang dinamis — ini butuh server-side rendering, bukan SPA murni.
  - Dashboard tetap bisa client-heavy (interaktif) di dalam Next.js yang sama — satu codebase untuk landing page, halaman publik, dan dashboard.
  - Dukungan native untuk image optimization, edge functions, dan deploy Vercel yang sudah dipilih.
- ~90% komponen landing page yang sudah ada bisa dipindah langsung (JSX & Tailwind sama persis), hanya penyesuaian routing.

### Backend: Supabase (rekomendasi utama)

Dipilih dibanding Firebase karena:
- Data MIVRA sangat relasional (user → produk → kategori → order → order_items → analytics) — cocok dengan **Postgres**, bukan NoSQL.
- **Row Level Security (RLS)** bawaan Postgres = fondasi keamanan multi-tenant yang kuat (tiap seller cuma bisa akses datanya sendiri).
- Auth, Storage (untuk gambar produk), Realtime, dan Edge Functions tersedia dalam satu platform.
- Table editor & SQL langsung bisa dipakai untuk debugging/analisis cepat.

Firebase tetap opsi valid kalau nanti butuh fitur realtime chat yang sangat berat, tapi untuk kebutuhan MIVRA saat ini Supabase lebih pas.

### Lainnya
- **State/data fetching**: TanStack Query (React Query) + Supabase client
- **Form & validasi**: react-hook-form + zod (validasi dipakai ulang di client & server)
- **UI primitives**: shadcn/ui (di atas Radix) dikombinasikan dengan design token existing, tetap pakai TailwindCSS + framer-motion + lucide-react yang sudah ada
- **Testing**: Vitest (unit) + Playwright (e2e) — mulai dipasang di Fase 1, isi test bertahap
- **Payment gateway**: belum ditentukan (Fase 8) — kandidat akan didiskusikan saat fase itu tiba

## 2. Struktur Folder (target setelah migrasi Next.js)

```
mivra/
├── app/
│   ├── (marketing)/              # landing page publik
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── (auth)/
│   │   ├── login/
│   │   ├── daftar/
│   │   └── lupa-password/
│   ├── (dashboard)/               # area admin seller, protected
│   │   ├── layout.tsx             # sidebar + topbar
│   │   ├── ringkasan/
│   │   ├── halaman-bio/
│   │   ├── katalog/
│   │   ├── gallery/
│   │   ├── pesanan/
│   │   ├── rekap/
│   │   ├── analitik/
│   │   ├── tema/
│   │   ├── pengaturan/
│   │   └── upgrade/
│   ├── [username]/                 # halaman publik bio — dynamic route
│   │   ├── page.tsx                # generateMetadata untuk OG per user
│   │   └── produk/[slug]/page.tsx
│   ├── api/                        # route handlers (webhook, dsb.)
│   ├── layout.tsx
│   └── globals.css                 # bekas index.css (token warna & font)
├── components/
│   ├── marketing/                  # Hero, Pricing, Navbar, dst. (dari starter project)
│   ├── dashboard/                  # sidebar, topbar, chart, table
│   ├── bio-page/                   # komponen halaman publik
│   └── ui/                         # button, card, badge, dst. (shared primitives)
├── lib/
│   ├── supabase/
│   │   ├── client.ts                # browser client
│   │   ├── server.ts                # server client (SSR)
│   │   └── middleware.ts
│   ├── validations/                 # skema zod (produk, order, profil, dst.)
│   ├── limits.ts                    # aturan limit tier Gratis/Premium (satu sumber kebenaran)
│   └── utils.ts
├── types/
│   └── database.ts                  # tipe hasil generate dari skema Supabase
├── public/
│   ├── mascot/                      # aset maskot hamster (sudah ada)
│   └── images/
├── supabase/
│   ├── migrations/                  # migrasi SQL bertahap
│   └── seed.sql
├── docs/
│   ├── PRD.md
│   ├── DESAIN.md
│   ├── ROADMAP.md
│   ├── STRUKTUR.md
│   ├── AI_AGENT_PROMPTS.md
│   ├── TASK_PROGRES.md
│   └── TASK_SELESAI.md
├── .env.example
└── README.md
```

## 3. Skema Database — Gambaran Awal (akan detail di migration SQL Fase 1)

Tabel inti:
- `profiles` — data seller: username, nama, bio, avatar, tier (`free`/`premium`), tema aktif
- `links` — link di halaman bio (label, url, urutan, ikon)
- `categories` — kategori produk (khusus Premium, tapi tabel disiapkan dari awal)
- `products` — produk (nama, deskripsi, harga, stok, foto, kategori_id)
- `gallery_items` — item portofolio (khusus Premium)
- `orders` — pesanan (buyer info, status, total)
- `order_items` — item per pesanan
- `analytics_events` — event klik/kunjungan (link_id/product_id, timestamp, metadata)
- `themes` — daftar tema (nama, token warna/font, `is_premium`)
- `subscriptions` — status langganan Premium (mulai kosong/manual sebelum Fase 8)

Semua tabel dengan data milik user wajib punya kolom `user_id` + RLS policy `auth.uid() = user_id`.

## 4. Enforcement Limit Tier (Penting — Keamanan)

Limit (5 produk, 10 link, dst.) **tidak boleh hanya dicek di frontend**. Validasi wajib dilakukan di:
- Row Level Security / Postgres function (mis. trigger `before insert` yang menolak insert ke-6 kalau tier masih `free`), atau
- Edge Function / server action yang mengecek jumlah sebelum insert.

Sumber aturan limit disatukan di `lib/limits.ts` agar frontend & backend selalu sinkron dan mudah diubah di satu tempat.

## 5. Environment & Secrets

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` — aman di client.
- `SUPABASE_SERVICE_ROLE_KEY` — **hanya di server**, tidak pernah dikirim ke browser atau di-commit ke Git.
- Semua secret payment gateway (nanti) mengikuti pola yang sama: service key server-only.
