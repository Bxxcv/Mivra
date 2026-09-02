-- =====================================================================
-- MIVRA — Migration 0002: Storage bucket untuk gambar produk
-- =====================================================================

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- Siapa saja boleh LIHAT gambar produk (memang untuk ditampilkan publik
-- di katalog/halaman bio).
create policy "Gambar produk bisa dilihat publik"
  on storage.objects for select
  using (bucket_id = 'product-images');

-- User hanya boleh upload ke folder bernama user_id miliknya sendiri
-- (path wajib: {user_id}/nama-file.jpg) — dicek dari (storage.foldername(name))[1].
create policy "User bisa upload gambar produk ke folder miliknya sendiri"
  on storage.objects for insert
  with check (
    bucket_id = 'product-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "User bisa hapus gambar produk miliknya sendiri"
  on storage.objects for delete
  using (
    bucket_id = 'product-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
