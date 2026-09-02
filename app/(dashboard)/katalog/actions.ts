'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { canAddProduct, type Tier } from '@/lib/limits';

const MAX_IMAGE_MB = 4;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 60);
}

export async function addProduct(formData: FormData) {
  const name = String(formData.get('name') ?? '').trim();
  const priceStr = String(formData.get('price') ?? '').trim();
  const stockStr = String(formData.get('stock') ?? '').trim();
  const description = String(formData.get('description') ?? '').trim();
  const image = formData.get('image') as File | null;

  if (!name) return { error: 'Nama produk wajib diisi.' };

  const price = Number(priceStr.replace(/[^0-9]/g, ''));
  if (!price || price <= 0) return { error: 'Harga tidak valid.' };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: 'Sesi berakhir, silakan masuk lagi.' };

  const { data: profile } = await supabase.from('profiles').select('tier').eq('id', user.id).single();
  const tier: Tier = (profile?.tier as Tier) ?? 'free';

  const { count } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id);

  if (!canAddProduct(tier, count ?? 0)) {
    const max = tier === 'premium' ? 500 : 5;
    return {
      error: `Batas ${max} produk untuk tier ${tier === 'premium' ? 'Premium' : 'Gratis'} sudah tercapai.${
        tier === 'free' ? ' Upgrade ke Premium untuk hingga 500 produk.' : ''
      }`,
    };
  }

  // Upload gambar dulu (kalau ada) sebelum insert row produk.
  const images: string[] = [];
  if (image && image.size > 0) {
    if (!ALLOWED_TYPES.includes(image.type)) {
      return { error: 'Format gambar harus JPG, PNG, atau WebP.' };
    }
    if (image.size > MAX_IMAGE_MB * 1024 * 1024) {
      return { error: `Ukuran gambar maksimal ${MAX_IMAGE_MB}MB.` };
    }

    const ext = image.name.split('.').pop() || 'jpg';
    const path = `${user.id}/${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(path, image, { contentType: image.type });

    if (uploadError) return { error: `Gagal upload gambar: ${uploadError.message}` };

    const { data: publicUrl } = supabase.storage.from('product-images').getPublicUrl(path);
    images.push(publicUrl.publicUrl);
  }

  // slug unik per user — tambah suffix acak kalau sudah ada slug sama.
  const baseSlug = slugify(name) || 'produk';
  const slug = `${baseSlug}-${Date.now().toString(36).slice(-5)}`;

  const { error } = await supabase.from('products').insert({
    user_id: user.id,
    name,
    slug,
    description: description || null,
    price_cents: price, // simpan sebagai angka Rupiah bulat, bukan sen (lihat komentar di migration)
    stock: stockStr ? Number(stockStr) : null,
    images,
  });

  if (error) return { error: error.message };

  revalidatePath('/katalog');
  return { error: null };
}

export async function deleteProduct(productId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: 'Sesi berakhir, silakan masuk lagi.' };

  const { error } = await supabase.from('products').delete().eq('id', productId).eq('user_id', user.id);
  if (error) return { error: error.message };

  revalidatePath('/katalog');
  return { error: null };
}

export async function toggleProductPublished(productId: string, isPublished: boolean) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: 'Sesi berakhir, silakan masuk lagi.' };

  const { error } = await supabase
    .from('products')
    .update({ is_published: isPublished })
    .eq('id', productId)
    .eq('user_id', user.id);

  if (error) return { error: error.message };
  revalidatePath('/katalog');
  return { error: null };
}
