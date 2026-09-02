# ROADMAP.md — MIVRA

Roadmap bertahap. Setiap fase harus selesai & stabil sebelum lanjut ke fase berikutnya — jangan lompat fase untuk menghindari fitur setengah jadi.

---

## Fase 0 — Perencanaan & Dokumentasi ✅ (sedang berjalan)
- [x] Audit starter project (landing page React/Vite yang sudah ada)
- [x] Susun PRD.md, DESAIN.md, ROADMAP.md, STRUKTUR.md
- [x] Terjemahkan landing page ke Bahasa Indonesia
- [ ] Review & persetujuan dokumen oleh Farid

## Fase 1 — Fondasi Teknis
- [ ] Setup project Next.js 15 (App Router) — migrasi dari Vite (lihat STRUKTUR.md untuk alasan)
- [ ] Setup Supabase project (Auth, Postgres, Storage)
- [ ] Desain skema database awal + Row Level Security
- [ ] Setup repo GitHub + branch protection + CI dasar (lint, type-check)
- [ ] Setup deploy otomatis ke Vercel (preview per PR + production)
- [ ] Autentikasi: daftar/masuk (email+password, Google OAuth)

## Fase 2 — Landing Page Produksi
- [ ] Finalisasi landing page Bahasa Indonesia (sudah diterjemahkan di Fase 0, tinggal polish copy & SEO)
- [ ] Meta tag SEO, Open Graph, sitemap, favicon
- [ ] Hapus semua script pihak ketiga bawaan tool generator (tracking/recording) — **sudah dilakukan**, pastikan tidak muncul lagi di build berikutnya

## Fase 3 — Core: Halaman Bio & Profil
- [ ] Onboarding: pilih username unik, isi profil
- [ ] Editor halaman bio (tambah/urutkan link, drag-and-drop)
- [ ] 5 tema gratis siap pakai
- [ ] Render halaman publik `mivra.id/username` (SSR untuk SEO & preview cepat)
- [ ] Enforcement limit tier Gratis: maks 10 link (validasi di server, bukan cuma UI)

## Fase 4 — Katalog Produk & Gallery
- [ ] CRUD produk (nama, harga, foto, stok, deskripsi)
- [ ] Upload gambar produk ke Supabase Storage (validasi tipe & ukuran file)
- [ ] Kategori produk & search (khusus Premium — tapi struktur data disiapkan dari awal)
- [ ] Gallery/portofolio (khusus Premium)
- [ ] Enforcement limit produk: 5 (Gratis) / 500 (Premium), validasi server-side

## Fase 5 — Checkout & Pesanan
- [ ] Alur checkout dari halaman publik (keranjang/direct order)
- [ ] Tabel & status pesanan (baru → diproses → dikirim/selesai → batal)
- [ ] Notifikasi pesanan masuk ke seller (email/dashboard)
- [ ] Checkout awal: metode manual dulu (konfirmasi transfer/WhatsApp) sebagai MVP sebelum payment gateway terpasang

## Fase 6 — Dashboard Analitik & Rekap
- [ ] Tracking klik link & tampilan halaman (event table di Supabase)
- [ ] Rekap order & omset (grafik, produk terlaris) — khusus Premium
- [ ] Analitik dasar (Gratis): total kunjungan & klik saja
- [ ] Analitik lanjutan (Premium): sumber trafik, perangkat, lokasi, jam ramai

## Fase 7 — Sistem Tier & Upgrade
- [ ] Middleware pengecekan tier di server (enforcement semua limit terpusat, bukan tersebar)
- [ ] Halaman perbandingan & upgrade paket
- [ ] Status langganan (mekanisme upgrade sementara: manual/admin toggle sebelum payment gateway aktif)
- [ ] Badge "Dibuat dengan MIVRA" muncul/hilang otomatis sesuai tier

## Fase 8 — Payment Gateway (menyusul, sesuai arahan Farid)
- [ ] Riset & pilih payment gateway (kandidat ramah UMKM Indonesia, syarat onboarding tidak ribet — didiskusikan saat fase ini dimulai)
- [ ] Integrasi pembayaran langganan Premium (recurring)
- [ ] Integrasi pembayaran checkout produk (sekali bayar)
- [ ] Uji keamanan transaksi (webhook signature verification, idempotency)

## Fase 9 — Fitur Over-Power Premium (bertahap)
- [ ] Custom domain per akun Premium
- [ ] Asisten AI: generate deskripsi produk otomatis
- [ ] Asisten AI: auto-reply chat pelanggan
- [ ] Kode diskon/voucher
- [ ] Reminder stok habis & abandoned cart
- [ ] Multi-admin/kolaborator tim
- [ ] Jadwal publish/expire otomatis (link & produk)
- [ ] Badge terverifikasi
- [ ] Akses API/webhook untuk integrasi eksternal

## Fase 10 — QA, Keamanan, & Peluncuran
- [ ] Audit keamanan menyeluruh (RLS, validasi input, rate limiting, XSS/CSRF)
- [ ] Uji performa (Lighthouse, load testing halaman publik)
- [ ] Uji aksesibilitas
- [ ] Soft launch → kumpulan feedback awal → perbaikan → launch publik

---

### Prinsip Kerja di Setiap Fase
- Setiap task yang dikerjakan dicatat di `TASK_PROGRES.md`.
- Task yang selesai dipindah/dicatat di `TASK_SELESAI.md` dengan tanggal.
- Tidak boleh mulai fase berikutnya sebelum fase sebelumnya stabil & sudah direview.
