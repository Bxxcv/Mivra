import { createClient } from '@/lib/supabase/server';
import { getLimits, type Tier } from '@/lib/limits';
import AddProductForm from '@/components/dashboard/AddProductForm';
import ProductGrid from '@/components/dashboard/ProductGrid';

export default async function KatalogPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase.from('profiles').select('tier').eq('id', user!.id).single();
  const tier: Tier = (profile?.tier as Tier) ?? 'free';
  const limits = getLimits(tier);

  const { data: products } = await supabase
    .from('products')
    .select('id, name, price_cents, stock, images, is_published')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false });

  const productCount = products?.length ?? 0;
  const atLimit = productCount >= limits.maxProducts;

  return (
    <div>
      <h1 className="font-display text-[22px] font-bold text-ink">Katalog Produk</h1>
      <p className="mt-1 text-[13.5px] text-ink-400">
        Produk yang aktif akan tampil di halaman publikmu.
      </p>

      <div
        className={`mt-4 rounded-xl border px-4 py-3 text-[13px] font-medium ${
          atLimit ? 'border-amber-300 bg-amber-50 text-amber-700' : 'border-ink/8 bg-white text-ink-500'
        }`}
      >
        {atLimit
          ? `Kamu sudah pakai ${productCount}/${limits.maxProducts} slot produk ${tier === 'premium' ? 'Premium' : 'Gratis'}.${
              tier === 'free' ? ' Upgrade ke Premium untuk hingga 500 produk.' : ''
            }`
          : `${productCount}/${limits.maxProducts} produk terpakai (tier ${tier === 'premium' ? 'Premium' : 'Gratis'}).`}
      </div>

      <div className="mt-4">{!atLimit && <AddProductForm />}</div>

      <ProductGrid products={products ?? []} />

      {!limits.hasSearchAndCategory && (
        <p className="mt-4 text-[12px] text-ink-400">
          Search &amp; kategori produk khusus tier Premium — di tier Gratis produk tampil sebagai list polos di halaman publik.
        </p>
      )}
    </div>
  );
}
