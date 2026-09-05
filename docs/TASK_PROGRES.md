# TASK_PROGRES.md

Daftar task yang sedang berjalan / belum selesai. Task yang sudah tuntas dipindah ke `TASK_SELESAI.md`.

Format: `- [ ] (Fase) Deskripsi task — catatan`

---

## Sedang Berjalan (Fase 4 — Katalog Produk & Gallery)

- [ ] **Jalankan migration 0002** (`supabase/migrations/0002_product_images_storage.sql`) di Supabase — belum otomatis, perlu di-push manual sama seperti 0001
- [ ] Kategori produk (tabel `categories` sudah ada, UI kelola kategori belum dibangun) — dibutuhkan sebelum search & filter Premium bisa dipakai
- [ ] **Saat Fase 6 dibangun**: ganti VisitChart.tsx & TrafficDonut.tsx (dashboard seller) dari data contoh ke query analytics_events asli — hapus DemoDataBadge setelah itu
- [ ] Gallery/portofolio (khusus Premium) — masih placeholder ComingSoon
- [ ] Halaman detail produk (`/username/produk/slug`) — sekarang klik produk di halaman publik belum ke mana-mana

## Sedang Berjalan (Polish teknis)

- [ ] Uji nyata di HP: pastikan bottom nav mobile & drawer "Lainnya" kerasa enak dipakai (baru dicek manual di kode, belum di-tes di device asli)
- [ ] Cek lebih lanjut kalau masih ada halaman lain yang belum diuji di layar kecil (produk grid, form upload foto)

## Fase 1 — Sisa Setup Manual (perlu dikonfirmasi Farid sudah/belum)

- [ ] Setup Google OAuth di Supabase Auth provider settings (dashboard Supabase → Authentication → Sign In/Providers → Google)
- [ ] **Isi ADMIN_EMAILS di Vercel env var** dengan email Farid — tanpa ini /admin akan 404 walau sudah login
- [ ] Setup GitHub Actions CI dasar (lint + type-check di tiap PR)
- [ ] Uji alur daftar → login → cek baris otomatis muncul di tabel `profiles`
- [ ] **Matikan "Confirm email"** di Supabase Auth settings (Authentication > Sign In/Providers) — kode sudah siap otomatis redirect ke dashboard begitu ini dimatikan, tinggal togglenya

## Menunggu Keputusan Farid

- [ ] Payment gateway langganan Premium & checkout produk (ditunda ke Fase 8 sesuai arahan)
- [ ] Harga final tier Premium (placeholder di `components/marketing/Pricing.tsx` & `app/(dashboard)/upgrade/page.tsx` masih Rp49rb/bln)
- [ ] Nama domain final — rencana beli lewat Vercel (dikonfirmasi 2026-09-01)

## Backlog (belum dimulai, urut sesuai ROADMAP.md)

- [ ] (Fase 3 lanjutan) Halaman Tema — pilih dari 5 tema gratis, terapkan ke halaman publik (tabel `themes` sudah ada isinya dari migration)
- [ ] (Fase 5) Alur checkout & manajemen pesanan
- [ ] (Fase 6) Dashboard analitik & rekap omset
- [ ] (Fase 7) Sistem enforcement tier & halaman upgrade beneran (sekarang baru pratinjau statis)
- [ ] (Fase 9) Fitur AI, custom domain, kupon, multi-admin, dll.
- [ ] (Fase 10) Polish visual menyeluruh setelah semua fitur inti selesai
