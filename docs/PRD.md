# PRD — MIVRA
Product Requirements Document

Versi: 0.1 (Draft awal) · Status: Disetujui untuk mulai development Fase 1
Pemilik produk: Farid ("rid")

---

## 1. Ringkasan Eksekutif

MIVRA adalah platform **link-in-bio generasi baru** untuk kreator, UMKM, dan online seller di Indonesia. Berbeda dari Linktree cs. yang cuma kumpulan tombol link, MIVRA menggabungkan empat hal dalam satu halaman:

1. **Link Bio** — satu halaman personal untuk semua tautan (medsos, WhatsApp, marketplace, dll).
2. **Katalog Produk** — etalase produk digital/fisik yang bisa dijelajahi (search, kategori).
3. **Gallery** — portofolio visual (karya, hasil kerja, testimoni foto).
4. **Checkout** — pembeli bisa memesan/membeli langsung dari halaman MIVRA tanpa keluar ke web lain.

Maskot brand: **hamster** (ramah, gemas, dipercaya) — palet warna cream/amber/forest/navy yang hangat.

## 2. Masalah yang Diselesaikan

- Kreator/seller punya link berserakan di banyak platform (bio Instagram cuma muat 1 link).
- Linktree & sejenisnya hanya kumpulan link, tidak bisa jualan produk dengan katalog rapi.
- Bikin toko online sendiri (website) mahal dan ribet untuk seller kecil.
- Seller butuh satu tempat untuk: profil publik, katalog, checkout, dan rekap penjualan — tanpa pindah-pindah aplikasi.

## 3. Target Pengguna (Persona)

| Persona | Kebutuhan utama |
|---|---|
| Kreator konten / influencer | Satu halaman untuk semua link + jual produk digital (e-book, preset, kelas) |
| UMKM / online shop kecil | Katalog produk rapi + checkout tanpa perlu website sendiri |
| Freelancer / jasa | Portofolio (gallery) + link booking/kontak |
| Reseller/dropshipper | Katalog banyak produk, kategori rapi, ganti tema cepat |

## 4. Model Bisnis & Monetisasi

Model **freemium**: tier Gratis berfungsi penuh tapi sengaja dibatasi supaya pengguna serius terdorong upgrade ke **Premium** (langganan bulanan/tahunan). Sumber pendapatan tambahan di masa depan: biaya transaksi kecil pada checkout tier Gratis, dan add-on (custom domain, dsb).

> Catatan: harga pasti & payment gateway langganan Premium **belum difinalkan** (lihat ROADMAP.md Fase 8). Gateway checkout produk untuk pembeli akhir juga menyusul di fase yang sama.

## 5. Fitur — Tier GRATIS

Prinsip: cukup untuk dicoba dan dirasakan manfaatnya, tapi ada batas jelas yang bikin pengguna serius ingin upgrade.

- 1 halaman MIVRA (`mivra.id/username`)
- **5 tema gratis** (desain dasar bawaan, tidak bisa custom warna/font)
- Katalog **maksimal 5 produk**
- **Maksimal 10 link** medsos/eksternal
- Checkout dasar — pesanan masuk ke dashboard, biaya transaksi platform berlaku (mis. persentase kecil per transaksi)
- Statistik dasar — total kunjungan & total klik saja, tanpa rincian sumber/waktu
- Badge **"Dibuat dengan MIVRA"** tampil permanen di halaman publik (tidak bisa dihapus)
- Tidak ada gallery/portofolio
- Tidak ada search & kategori produk (list polos)
- Tidak ada custom domain
- Dukungan via email/komunitas (waktu respons standar)
- Tidak ada fitur AI

## 6. Fitur — Tier PREMIUM

Prinsip: "over power" — begitu lengkap sehingga upgrade terasa jelas layak untuk seller/kreator serius.

Semua fitur Gratis, ditambah:

- **Tema premium eksklusif**, jumlah tema tak terbatas + rilis tema baru berkala
- Katalog **hingga 500 produk**
- **Search, filter, dan kategori** produk yang rapi
- **Gallery/portofolio** tak terbatas untuk showcase karya
- **Link medsos/eksternal tak terbatas**
- **Rekap order & omset** lengkap — grafik penjualan, breakdown produk terlaris, ekspor CSV/PDF
- **Analitik lanjutan** — sumber trafik, perangkat pengunjung, lokasi, jam ramai, link/produk dengan performa terbaik
- Biaya transaksi checkout lebih rendah / tanpa biaya platform tambahan
- **Hapus badge MIVRA** (white-label penuh)
- **Custom domain** sendiri (mis. `namatoko.com`)
- **Kode diskon/voucher** promo
- **Notifikasi stok habis** & pengingat keranjang ditinggalkan (abandoned cart)
- **Asisten AI** — auto-generate deskripsi produk, balas chat pelanggan otomatis 24 jam
- **Multi-admin/kolaborator** tim (lebih dari 1 pengelola akun)
- **Jadwalkan** publish/expire otomatis untuk link & produk (mis. flash sale terjadwal)
- **Dukungan prioritas** (live chat respons cepat)
- **Badge terverifikasi** (centang) di halaman profil
- Akses **API/webhook** untuk integrasi lanjutan (fase lanjutan, lihat ROADMAP)

## 7. Perbandingan Cepat

| Fitur | Gratis | Premium |
|---|---|---|
| Tema | 5 tema dasar | Tema premium tak terbatas |
| Produk | Maks 5 | Hingga 500 |
| Link medsos | Maks 10 | Tak terbatas |
| Search & kategori | ❌ | ✅ |
| Gallery portofolio | ❌ | ✅ |
| Rekap order & omset | ❌ (data mentah saja) | ✅ Lengkap + export |
| Analitik | Dasar | Lanjutan |
| Badge MIVRA | Tampil, tidak bisa hilang | Bisa dihapus |
| Custom domain | ❌ | ✅ |
| Asisten AI | ❌ | ✅ |
| Multi-admin | ❌ | ✅ |
| Kupon/diskon | ❌ | ✅ |
| Dukungan | Standar | Prioritas |

## 8. Alur Pengguna Utama (User Flow)

1. **Sign up** (email/password atau Google) → pilih username unik → onboarding singkat (isi nama, bio, foto profil).
2. **Setup halaman** → tambah link, pilih tema, tambah produk pertama.
3. **Publish** → halaman publik aktif di `mivra.id/username`.
4. **Share** → seller sebar link ke bio Instagram/TikTok/dll.
5. **Pengunjung** membuka halaman → klik link / lihat katalog → checkout produk.
6. **Seller** menerima notifikasi order → kelola di dashboard (proses, kirim, selesai).
7. **Seller** memantau performa via halaman Analitik/Rekap.
8. Saat menyentuh limit tier Gratis (produk ke-6, link ke-11, dst.) → muncul prompt upgrade ke Premium.

## 9. Halaman Admin / Dashboard Seller

Modul yang dibutuhkan (rincian desain di `DESAIN.md`):

- **Ringkasan (Overview)** — statistik cepat, order terbaru, quick actions
- **Editor Halaman Bio** — susun link & blok drag-and-drop
- **Katalog Produk** — CRUD produk, kategori, upload gambar, atur stok
- **Gallery** — kelola portofolio (khusus Premium)
- **Pesanan (Orders)** — daftar & status pesanan, detail pembeli
- **Rekap & Omset** — grafik pendapatan, produk terlaris (khusus Premium)
- **Analitik** — trafik, klik, konversi
- **Tema & Kustomisasi** — pilih/atur tema, warna, font, domain custom
- **Pengaturan Akun** — profil, keamanan, tim/kolaborator (Premium)
- **Upgrade / Langganan** — status paket, upgrade ke Premium

## 10. Kebutuhan Non-Fungsional

- **Keamanan**: Row Level Security per user di semua tabel, validasi input di client & server, proteksi upload file, rate limiting halaman publik, enforcement limit tier di server (bukan cuma UI).
- **Performa**: halaman publik harus cepat di koneksi mobile Indonesia (target < 2 detik First Contentful Paint).
- **SEO & Social Sharing**: setiap halaman `mivra.id/username` perlu meta tag dinamis (Open Graph) agar preview link bagus saat dibagikan.
- **Skalabilitas**: arsitektur harus tahan lonjakan trafik saat produk viral.
- **Aksesibilitas**: kontras warna cukup, navigasi keyboard, alt text gambar.
- **Bahasa**: UI utama Bahasa Indonesia (opsi multi-bahasa untuk fase lanjutan Premium).

## 11. Batasan & Asumsi Saat Ini

- Payment gateway langganan & checkout **belum ditentukan** — dipilih di Fase 8 ROADMAP, prioritas: proses onboarding merchant yang tidak ribet.
- Harga langganan Premium di dokumen ini bersifat **placeholder**, akan difinalkan bareng payment gateway.
- Fitur Premium akan dirilis bertahap (lihat ROADMAP.md) — tidak semua langsung ada di MVP.

## 12. Indikator Sukses (KPI Awal)

- Jumlah halaman MIVRA aktif (published)
- Conversion rate Gratis → Premium
- Rata-rata jumlah produk per katalog
- Total transaksi checkout per bulan
- Retensi bulanan seller aktif
