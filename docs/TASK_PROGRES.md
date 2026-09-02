# TASK_PROGRES.md

Daftar task yang sedang berjalan / belum selesai. Task yang sudah tuntas dipindah ke `TASK_SELESAI.md`.

Format: `- [ ] (Fase) Deskripsi task — catatan`

---

## Sedang Berjalan (Fase 1 — Fondasi Teknis)

- [ ] **Jalankan `npm install` secara lokal** — belum pernah dijalankan (sandbox pembuatan project ini tidak punya akses internet, lihat catatan di README.md)
- [ ] **Buat project di Supabase** (dashboard.supabase.com) → isi `.env` dari `.env.example`
- [ ] **Jalankan migration** `supabase/migrations/0001_init.sql` ke project Supabase (lewat Supabase CLI atau paste manual di SQL Editor)
- [ ] Setup Google OAuth di Supabase Auth provider settings (untuk tombol "Lanjutkan dengan Google")
- [ ] Push project ini ke GitHub repo baru
- [ ] Import repo ke Vercel → hubungkan env var yang sama dari `.env`
- [ ] Setup GitHub Actions CI dasar (lint + type-check di tiap PR)
- [ ] Setelah deploy pertama sukses: uji alur daftar → login → cek baris otomatis muncul di tabel `profiles`

## Menunggu Keputusan Farid

- [ ] Payment gateway langganan Premium & checkout produk (ditunda ke Fase 8 sesuai arahan)
- [ ] Harga final tier Premium (placeholder di `components/marketing/Pricing.tsx` masih Rp49rb/bln, perlu dikonfirmasi)
- [ ] Nama domain final — rencana beli lewat Vercel setelah deploy pertama jalan (dikonfirmasi 2026-09-01)

## Backlog (belum dimulai, urut sesuai ROADMAP.md)

- [ ] (Fase 3) Editor halaman bio drag-and-drop + render halaman publik `[username]`
- [ ] (Fase 3) Migration lanjutan: RLS policy dashboard routes + redirect middleware untuk user belum login
- [ ] (Fase 4) CRUD katalog produk + upload gambar ke Supabase Storage
- [ ] (Fase 5) Alur checkout & manajemen pesanan
- [ ] (Fase 6) Dashboard analitik & rekap omset
- [ ] (Fase 7) Sistem enforcement tier & halaman upgrade
- [ ] (Fase 9) Fitur AI, custom domain, kupon, multi-admin, dll.
