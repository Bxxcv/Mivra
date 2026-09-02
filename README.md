# MIVRA 🐹

Platform link-in-bio all-in-one untuk kreator & seller Indonesia — Link Bio, Katalog Produk, Gallery, dan Checkout dalam satu halaman.

> Status: **Fase 1 — Fondasi Teknis (scaffold selesai, butuh setup manual).** Lihat `docs/TASK_PROGRES.md` untuk langkah berikutnya.

## ⚠️ Penting — dibaca dulu sebelum jalan

Project ini di-scaffold di lingkungan sandbox **tanpa akses internet**, jadi:
- `npm install` **belum pernah dijalankan** — dependency di `package.json` belum terverifikasi ter-install bersih. Kemungkinan ada penyesuaian versi kecil saat kamu install pertama kali.
- Belum terhubung ke project Supabase, repo GitHub, atau project Vercel sungguhan — semua kredensial/koneksi ini perlu kamu setup sendiri (langkah di bawah).
- Kode sudah ditulis & dicek konsistensinya (import path, penutup kurung/tanda kutip) secara manual, tapi **belum pernah di-build/dijalankan sungguhan**. Kemungkinan ada error kecil yang baru ketahuan saat `npm run dev` pertama kali — wajar untuk kode yang belum pernah dieksekusi, laporkan ke AI agent berikutnya kalau ada.

## Setup dari Nol

1. **Install dependency**
   ```bash
   npm install
   ```
2. **Buat project Supabase** di [supabase.com/dashboard](https://supabase.com/dashboard) → New Project.
3. **Isi environment variable** — copy `.env.example` jadi `.env.local`, isi dari Project Settings → API di dashboard Supabase.
4. **Jalankan migration database**:
   ```bash
   npx supabase login
   npx supabase link --project-ref <project-ref-kamu>
   npx supabase db push
   ```
   (atau paste isi `supabase/migrations/0001_init.sql` manual ke SQL Editor di dashboard Supabase kalau belum mau install Supabase CLI)

   **Penting**: ada 2 file migration sekarang — jalankan **keduanya secara urut**: `0001_init.sql` dulu, baru `0002_product_images_storage.sql` (tanpa yang kedua, upload foto produk akan gagal).
5. **Aktifkan Google OAuth** (opsional, untuk tombol "Lanjutkan dengan Google"): Authentication → Providers → Google, di dashboard Supabase.
6. **Jalankan dev server**:
   ```bash
   npm run dev
   ```
   Buka `http://localhost:3000`.

## Deploy

1. Push repo ini ke GitHub.
2. Import repo di [vercel.com/new](https://vercel.com/new).
3. Tambahkan environment variable yang sama seperti `.env.local` di pengaturan project Vercel.
4. Deploy. Domain custom bisa dibeli & dihubungkan langsung lewat dashboard Vercel setelah deploy pertama sukses.

## Dokumentasi

| Dokumen | Isi |
|---|---|
| [`docs/PRD.md`](./docs/PRD.md) | Kebutuhan produk lengkap, fitur tier Gratis/Premium |
| [`docs/DESAIN.md`](./docs/DESAIN.md) | Design system — warna, tipografi, layout dashboard & halaman publik |
| [`docs/ROADMAP.md`](./docs/ROADMAP.md) | Rencana pengembangan per fase |
| [`docs/STRUKTUR.md`](./docs/STRUKTUR.md) | Arsitektur teknis & alasan keputusan (Next.js, Supabase) |
| [`docs/AI_AGENT_PROMPTS.md`](./docs/AI_AGENT_PROMPTS.md) | Prompt siap pakai untuk AI coding agent per fase |
| [`docs/TASK_PROGRES.md`](./docs/TASK_PROGRES.md) | Daftar task yang sedang berjalan — **cek ini dulu** sebelum mulai kerja |
| [`docs/TASK_SELESAI.md`](./docs/TASK_SELESAI.md) | Log task yang sudah selesai |

## Tech Stack

- **Frontend**: Next.js 15 (App Router) + React 19 + TypeScript + TailwindCSS 4 + framer-motion
- **Backend**: Supabase (Postgres, Auth, Storage, Row Level Security)
- **Deploy**: Vercel
- **Payment gateway**: belum ditentukan (Fase 8 di roadmap)

## Struktur Folder

```
app/
├── layout.tsx, globals.css, page.tsx    # landing page
├── (auth)/login/, (auth)/daftar/         # autentikasi
components/
├── marketing/                             # section landing page (14 komponen)
├── mockups/                               # mockup visual (bio page, dashboard, dst.)
├── ui/                                    # Container, Eyebrow
lib/
├── supabase/client.ts, server.ts          # koneksi Supabase
├── limits.ts                              # satu sumber kebenaran limit tier
├── nav.ts
supabase/
├── migrations/0001_init.sql               # skema database + RLS lengkap
docs/                                       # dokumentasi produk (lihat tabel di atas)
middleware.ts                               # refresh sesi Supabase
```

## Alur Kerja

1. Cek `docs/TASK_PROGRES.md` sebelum mulai kerja — jangan duplikasi task.
2. Setiap task baru dicatat di `docs/TASK_PROGRES.md`.
3. Task yang selesai dipindah ke `docs/TASK_SELESAI.md` dengan tanggal.
4. Ikuti `docs/DESAIN.md` untuk konsistensi visual.
5. Perubahan skema database = migration baru di `supabase/migrations/`, jangan edit `0001_init.sql` yang sudah ada.
6. Kalau pakai AI coding agent, tempel `docs/AI_AGENT_PROMPTS.md` di awal sesi.

## Lisensi

Proprietary — seluruh hak cipta milik pemilik proyek MIVRA.
