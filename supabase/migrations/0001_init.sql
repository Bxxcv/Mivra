-- =====================================================================
-- MIVRA — Migration 0001: Skema awal + Row Level Security
-- Lihat docs/STRUKTUR.md §3 untuk gambaran skema, docs/PRD.md untuk
-- definisi fitur tier Gratis/Premium.
--
-- PRINSIP KEAMANAN (WAJIB dipertahankan di migration berikutnya):
--   1. Setiap tabel milik user WAJIB punya kolom user_id + RLS ON.
--   2. Policy default: user hanya boleh baca/tulis baris miliknya sendiri.
--   3. Halaman publik (bio page) baca lewat view/policy khusus "published
--      only", TIDAK langsung query tabel utama dengan bypass RLS.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. PROFILES — data seller & pengaturan halaman bio
-- ---------------------------------------------------------------------
create type public.tier as enum ('free', 'premium');
create type public.order_status as enum ('baru', 'diproses', 'dikirim', 'selesai', 'batal');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null check (username ~ '^[a-z0-9_]{3,30}$'),
  display_name text,
  bio text,
  avatar_url text,
  tier public.tier not null default 'free',
  active_theme_id uuid, -- FK ke themes, ditambahkan setelah tabel themes dibuat
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Username reserved yang tidak boleh dipakai (bentrok dengan route app)
create table public.reserved_usernames (
  username text primary key
);
insert into public.reserved_usernames (username) values
  ('admin'), ('api'), ('dashboard'), ('login'), ('daftar'), ('www'),
  ('mivra'), ('app'), ('help'), ('support'), ('settings'), ('upgrade'),
  ('checkout'), ('static'), ('_next');

create or replace function public.check_username_not_reserved()
returns trigger as $$
begin
  if exists (select 1 from public.reserved_usernames where username = new.username) then
    raise exception 'Username "%" tidak boleh dipakai (reserved).', new.username;
  end if;
  return new;
end;
$$ language plpgsql security definer set search_path = public;

create trigger trg_check_username_reserved
  before insert or update of username on public.profiles
  for each row execute function public.check_username_not_reserved();

alter table public.profiles enable row level security;

create policy "Profil bisa dibaca publik (untuk halaman bio)"
  on public.profiles for select
  using (true);

create policy "User hanya bisa update profilnya sendiri"
  on public.profiles for update
  using (auth.uid() = id);

create policy "User hanya bisa insert profilnya sendiri"
  on public.profiles for insert
  with check (auth.uid() = id);


-- Otomatis buat baris profiles begitu user baru selesai signUp (email+password
-- atau OAuth). username diambil dari raw_user_meta_data yang dikirim saat
-- signUp (lihat app/(auth)/daftar/page.tsx). Kalau kosong/bentrok, gagal
-- dengan pesan jelas daripada silent-fail.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', 'user_' || substr(new.id::text, 1, 8))
  );
  return new;
end;
$$ language plpgsql security definer set search_path = public;

create trigger trg_on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- ---------------------------------------------------------------------
-- 2. THEMES — daftar tema (5 gratis + tema premium)
-- ---------------------------------------------------------------------
create table public.themes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  is_premium boolean not null default false,
  config jsonb not null default '{}'::jsonb, -- token warna/font per tema
  created_at timestamptz not null default now()
);

alter table public.profiles
  add constraint fk_profiles_active_theme
  foreign key (active_theme_id) references public.themes(id);

alter table public.themes enable row level security;

create policy "Semua tema bisa dibaca publik"
  on public.themes for select
  using (true);
-- Insert/update tema dilakukan lewat admin client (service role), bukan user.


-- ---------------------------------------------------------------------
-- 3. LINKS — link di halaman bio
-- ---------------------------------------------------------------------
create table public.links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  label text not null,
  url text not null,
  icon text,
  position int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index idx_links_user_id on public.links(user_id);

alter table public.links enable row level security;

create policy "Link aktif bisa dibaca publik"
  on public.links for select
  using (is_active = true);

create policy "Owner bisa lihat semua link miliknya (termasuk nonaktif)"
  on public.links for select
  using (auth.uid() = user_id);

create policy "Owner bisa kelola link miliknya sendiri"
  on public.links for insert
  with check (auth.uid() = user_id);

create policy "Owner bisa update link miliknya sendiri"
  on public.links for update
  using (auth.uid() = user_id);

create policy "Owner bisa hapus link miliknya sendiri"
  on public.links for delete
  using (auth.uid() = user_id);

-- Enforcement limit 10 link untuk tier free — server-side, tidak bisa dibypass dari client.
create or replace function public.check_link_limit()
returns trigger as $$
declare
  user_tier public.tier;
  current_count int;
begin
  select tier into user_tier from public.profiles where id = new.user_id;
  select count(*) into current_count from public.links where user_id = new.user_id;

  if user_tier = 'free' and current_count >= 10 then
    raise exception 'Batas 10 link untuk tier Gratis sudah tercapai. Upgrade ke Premium untuk link tanpa batas.';
  end if;

  return new;
end;
$$ language plpgsql security definer set search_path = public;

create trigger trg_check_link_limit
  before insert on public.links
  for each row execute function public.check_link_limit();


-- ---------------------------------------------------------------------
-- 4. CATEGORIES — kategori produk (dipakai penuh di tier Premium)
-- ---------------------------------------------------------------------
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  position int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.categories enable row level security;

create policy "Kategori bisa dibaca publik"
  on public.categories for select using (true);

create policy "Owner bisa kelola kategori miliknya sendiri"
  on public.categories for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);


-- ---------------------------------------------------------------------
-- 5. PRODUCTS — katalog produk
-- ---------------------------------------------------------------------
create table public.products (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text not null,
  description text,
  price_cents bigint not null check (price_cents >= 0), -- simpan dalam sen/rupiah bulat, hindari float
  stock int, -- null = stok tak terbatas (mis. produk digital)
  images text[] not null default '{}',
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, slug)
);

create index idx_products_user_id on public.products(user_id);
create index idx_products_category_id on public.products(category_id);

alter table public.products enable row level security;

create policy "Produk published bisa dibaca publik"
  on public.products for select
  using (is_published = true);

create policy "Owner bisa lihat semua produknya (termasuk draft)"
  on public.products for select
  using (auth.uid() = user_id);

create policy "Owner bisa kelola produk miliknya sendiri"
  on public.products for insert
  with check (auth.uid() = user_id);

create policy "Owner bisa update produk miliknya sendiri"
  on public.products for update
  using (auth.uid() = user_id);

create policy "Owner bisa hapus produk miliknya sendiri"
  on public.products for delete
  using (auth.uid() = user_id);

-- Enforcement limit produk: 5 (free) / 500 (premium) — server-side.
create or replace function public.check_product_limit()
returns trigger as $$
declare
  user_tier public.tier;
  current_count int;
  max_allowed int;
begin
  select tier into user_tier from public.profiles where id = new.user_id;
  select count(*) into current_count from public.products where user_id = new.user_id;
  max_allowed := case when user_tier = 'premium' then 500 else 5 end;

  if current_count >= max_allowed then
    raise exception 'Batas % produk untuk tier % sudah tercapai.', max_allowed, user_tier;
  end if;

  return new;
end;
$$ language plpgsql security definer set search_path = public;

create trigger trg_check_product_limit
  before insert on public.products
  for each row execute function public.check_product_limit();


-- ---------------------------------------------------------------------
-- 6. GALLERY_ITEMS — portofolio (khusus Premium)
-- ---------------------------------------------------------------------
create table public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text,
  image_url text not null,
  position int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.gallery_items enable row level security;

create policy "Gallery bisa dibaca publik"
  on public.gallery_items for select using (true);

create policy "Owner bisa kelola gallery miliknya sendiri"
  on public.gallery_items for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Enforcement: gallery khusus tier premium.
create or replace function public.check_gallery_tier()
returns trigger as $$
declare
  user_tier public.tier;
begin
  select tier into user_tier from public.profiles where id = new.user_id;
  if user_tier <> 'premium' then
    raise exception 'Fitur Gallery khusus tier Premium.';
  end if;
  return new;
end;
$$ language plpgsql security definer set search_path = public;

create trigger trg_check_gallery_tier
  before insert on public.gallery_items
  for each row execute function public.check_gallery_tier();


-- ---------------------------------------------------------------------
-- 7. ORDERS & ORDER_ITEMS — pesanan (checkout guest, tanpa akun pembeli)
-- ---------------------------------------------------------------------
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade, -- seller
  buyer_name text not null,
  buyer_contact text not null, -- email atau nomor WhatsApp
  buyer_address text,
  status public.order_status not null default 'baru',
  total_cents bigint not null check (total_cents >= 0),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_orders_user_id on public.orders(user_id);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name_snapshot text not null, -- simpan nama saat order dibuat (produk bisa berubah/dihapus nanti)
  price_cents_snapshot bigint not null,
  quantity int not null check (quantity > 0)
);

alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Pesanan HANYA bisa dilihat oleh seller pemiliknya — TIDAK publik
-- (beda dari products/links yang memang untuk ditampilkan ke pengunjung).
create policy "Seller hanya bisa lihat order miliknya sendiri"
  on public.orders for select
  using (auth.uid() = user_id);

create policy "Seller hanya bisa update status order miliknya sendiri"
  on public.orders for update
  using (auth.uid() = user_id);

-- Insert order dilakukan lewat Route Handler pakai admin client (bukan
-- langsung dari browser dengan anon key) supaya bisa validasi stok &
-- hitung total di server — cegah manipulasi harga dari client.

create policy "Seller bisa lihat item order miliknya sendiri"
  on public.order_items for select
  using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );


-- ---------------------------------------------------------------------
-- 8. ANALYTICS_EVENTS — event klik/kunjungan (tanpa PII pengunjung)
-- ---------------------------------------------------------------------
create table public.analytics_events (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  event_type text not null check (event_type in ('page_view', 'link_click', 'product_view')),
  link_id uuid references public.links(id) on delete set null,
  product_id uuid references public.products(id) on delete set null,
  referrer text,
  device_type text,
  country text,
  created_at timestamptz not null default now()
);

create index idx_analytics_user_id_created_at on public.analytics_events(user_id, created_at desc);

alter table public.analytics_events enable row level security;

create policy "Seller hanya bisa lihat analytics miliknya sendiri"
  on public.analytics_events for select
  using (auth.uid() = user_id);

-- Insert event dilakukan lewat Route Handler (bukan langsung dari client)
-- supaya bisa di-rate-limit dan divalidasi — cegah spam/manipulasi statistik.


-- ---------------------------------------------------------------------
-- 9. updated_at otomatis
-- ---------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();
create trigger trg_products_updated_at before update on public.products
  for each row execute function public.set_updated_at();
create trigger trg_orders_updated_at before update on public.orders
  for each row execute function public.set_updated_at();


-- ---------------------------------------------------------------------
-- 10. Seed 5 tema gratis awal (tema premium ditambah di migration lanjutan)
-- ---------------------------------------------------------------------
insert into public.themes (name, is_premium, config) values
  ('Amber',  false, '{"accent": "#F5810F", "bg": "#FBF8F2"}'),
  ('Forest', false, '{"accent": "#26714A", "bg": "#EAF3EE"}'),
  ('Ink',    false, '{"accent": "#FF9C3A", "bg": "#17140F", "dark": true}'),
  ('Blush',  false, '{"accent": "#E8776A", "bg": "#FDECEA"}'),
  ('Navy',   false, '{"accent": "#1E2A4A", "bg": "#F5F0E6"}');
