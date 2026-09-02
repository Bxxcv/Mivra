# DESAIN.md — Design System MIVRA

Versi: 0.1 · Berlaku untuk landing page, halaman publik bio, dan dashboard admin seller.

---

## 1. Filosofi Desain

MIVRA harus terasa **hangat, ramah, dan bisa dipercaya** — bukan platform SaaS yang dingin/korporat, tapi juga bukan norak. Maskot hamster jadi jangkar kepribadian brand: lucu tapi profesional.

Prinsip:
1. **Hangat, bukan generik** — palet cream/amber/forest, bukan biru-ungu gradient khas "AI slop".
2. **Rapi seperti software bisnis sungguhan** — dashboard harus terasa serius & bisa diandalkan untuk urusan uang (order, omset), bukan cuma cantik.
3. **Mobile-first** — mayoritas pengunjung halaman publik datang dari HP (klik dari bio Instagram/TikTok).
4. **Micro-interaction hidup, bukan berlebihan** — animasi halus (float, fade) untuk menghidupkan halaman, bukan mengganggu.
5. **Jangan meniru template default AI** — hindari drop shadow generik, gradient ungu-pink pasaran, font default tanpa karakter. Pertahankan identitas warna & tipografi khas MIVRA di setiap halaman baru yang dibuat.

## 2. Design Tokens

Sumber kebenaran ada di `src/index.css` (Tailwind v4 `@theme`). Jangan buat warna baru di luar token ini kecuali didiskusikan dulu.

### Warna

| Token | Hex | Pemakaian |
|---|---|---|
| `cream` | `#FBF8F2` | Background utama |
| `cream-100` | `#F5F0E6` | Background sekunder/panel |
| `paper` | `#FFFFFF` | Card, surface |
| `ink` | `#17140F` | Teks utama, elemen gelap dominan |
| `ink-800/600/400` | — | Teks sekunder, hierarki |
| `amber-50…900` | `#FFF4E8 → #5C2C08` | Warna aksen utama brand (CTA, highlight, harga) |
| `forest-50…900` | `#EAF3EE → #0D2F1E` | Warna sukses/positif (status "Lunas", "Terkirim", tren naik) |
| `navy-500/700/900` | `#1E2A4A…` | Aksen sekunder (AI/asisten, elemen premium) |

### Tipografi

- **Display** (judul): `Space Grotesk` — tegas, karakter kuat, dipakai di heading besar & angka statistik.
- **Sans** (body): `Inter` — dipakai untuk paragraf, label, UI teks.
- Skala: heading landing page 42–56px (mobile 32–42px), heading section dashboard 18–24px, body 13.5–16px.

### Radius, Shadow, Spacing

- Radius besar & konsisten: `rounded-2xl`/`rounded-3xl` (16–24px) untuk card, `rounded-full` untuk button/badge/avatar.
- Shadow: `shadow-soft` untuk elevasi ringan (card biasa), `shadow-card` untuk elevasi lebih tinggi (modal, elemen mengambang).
- Spacing section landing page: `py-20 sm:py-28`. Spacing dashboard lebih rapat: `p-5`–`p-6`.

## 3. Komponen UI Dasar

| Komponen | Aturan |
|---|---|
| Button primer | `bg-ink text-cream`, hover `bg-amber-500 text-ink`, `rounded-full` |
| Button CTA premium | `bg-amber-400 text-ink`, dipakai untuk ajakan upgrade |
| Card | `border border-ink/8`, `bg-white`, `shadow-soft`, hover `-translate-y-1` |
| Badge status sukses | `bg-forest-50 text-forest-600` |
| Badge status pending | `bg-amber-50 text-amber-600` |
| Badge status info | `bg-navy-500/10 text-navy-500` |
| Input | `rounded-full`/`rounded-xl` border `ink/10`, focus ring `amber-400` |
| Modal/drawer | latar `ink/40` blur, panel `bg-white rounded-3xl shadow-card` |

## 4. Struktur Landing Page (sudah ada, dipertahankan & diterjemahkan)

Navbar → Hero → TrustBar → ProductOverview → CoreFeatures → ProductShowcase → UseCases → Customization → Commerce → Analytics → AISupport → Pricing → FinalCTA → Footer.

Setiap section punya `Eyebrow` (label kecil di atas judul) + heading `font-display` + deskripsi singkat — pola ini **wajib dipertahankan** untuk section baru agar konsisten.

## 5. Dashboard / Halaman Admin Seller

### 5.1 Layout Umum

Layout dua kolom khas SaaS dashboard, konsisten dengan gaya `DashboardMockup.tsx` yang sudah ada di landing page:

- **Sidebar kiri** (collapsible di mobile jadi bottom nav/hamburger): logo mascot kecil + menu ikon.
- **Topbar**: sapaan personal ("Selamat pagi, {nama}"), search, notifikasi, avatar akun.
- **Konten utama**: cream-100 background, card-card putih di atasnya (kontras dengan sidebar `bg-ink` atau `bg-cream-100`).

### 5.2 Modul Halaman (menu sidebar)

1. **Ringkasan** — kartu statistik (pendapatan hari ini, order baru, saldo), tabel order terbaru.
2. **Halaman Bio** — editor drag-and-drop blok link (video, produk, countdown, dst — mengikuti pola `CoreFeatures.tsx`).
3. **Katalog Produk** — grid produk + tombol tambah, filter kategori, indikator sisa kuota (mis. "3/5 produk" untuk tier Gratis agar limitasi terasa jelas).
4. **Gallery** — grid portofolio (badge "🔒 Premium" & CTA upgrade jika masih Gratis).
5. **Pesanan** — tabel order dengan status berwarna (pola sama seperti `DashboardMockup.tsx`), detail slide-over saat diklik.
6. **Rekap & Omset** — grafik batang (pola `AnalyticsMockup.tsx`), tombol export (Premium).
7. **Analitik** — trafik & top link/produk performer.
8. **Tema** — grid pilihan tema (pola swatch di `Customization.tsx`), kunci gembok untuk tema premium jika masih Gratis.
9. **Pengaturan** — profil, domain custom (Premium), tim/kolaborator (Premium), keamanan akun.
10. **Upgrade ke Premium** — halaman perbandingan tier + tombol upgrade, selalu bisa diakses dari sidebar (bukan cuma saat limit tercapai).

### 5.3 Pola "Batasan Tier yang Terasa, Bukan Menyebalkan"

Saat pengguna Gratis mencapai limit (produk ke-6, link ke-11, klik fitur terkunci):
- Tampilkan **state jelas** (bukan tombol disabled diam-diam) — mis. banner amber kecil: "Kamu sudah pakai 5/5 slot produk gratis. Upgrade ke Premium untuk hingga 500 produk."
- Fitur terkunci (Gallery, Rekap Omset, Tema Premium) tetap **terlihat** di menu dengan badge/gembok, bukan disembunyikan — supaya pengguna tahu fitur itu ada dan tergoda upgrade.

## 6. Halaman Publik Bio (`mivra.id/username`)

Mobile-first, mengikuti pola `BioPageMockup.tsx`:
- Avatar + nama + bio singkat + ikon sosial di atas.
- Stack tombol link (block-style, bukan cuma teks biru).
- Grid produk unggulan (2 kolom di HP).
- Jika Premium & punya banyak produk: tambahkan search bar + filter kategori di atas grid produk.
- Badge "Dibuat dengan MIVRA" di bagian paling bawah untuk tier Gratis (kecil, tidak mengganggu, tapi permanen).
- Checkout: drawer/bottom-sheet muncul dari bawah saat pengunjung menekan produk (bukan pindah halaman) agar terasa cepat.

## 7. Motion & Animasi

Pertahankan pola animasi yang sudah ada di `index.css`: `animate-float`, `animate-float-slow`, `animate-marquee`, `animate-pulse-dot`. Gunakan secukupnya — 1–2 elemen mengambang per section, jangan semua elemen bergerak sekaligus.

## 8. Aksesibilitas

- Kontras teks minimal WCAG AA terhadap background (`ink` di atas `cream` sudah aman).
- Semua ikon interaktif (`button`) wajib `aria-label` bila tanpa teks.
- Gambar produk wajib `alt` deskriptif (nama produk), bukan `alt=""`.
- Fokus keyboard terlihat jelas (jangan hilangkan outline tanpa pengganti).
