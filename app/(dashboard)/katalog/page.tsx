import { createClient } from '@/lib/supabase/server';
import { getCurrentUserProfile } from '@/lib/supabase/get-user';
import { getLimits, type Tier } from '@/lib/limits';
import AddProductForm from '@/components/dashboard/AddProductForm';
import ProductGrid from '@/components/dashboard/ProductGrid';

export default async function KatalogPage() {
  const { user, profile } = await getCurrentUserProfile();
  const supabase = await createClient();
  const tier: Tier = profile?.tier ?? 'free';
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
      <h1 className="font-display text-[22px] font-bold text-ink dark:text-cream">Katalog Produk</h1>
      <p className="mt-1 text-[13.5px] text-ink-400 dark:text-cream/40">
        Produk yang aktif akan tampil di halaman publikmu.
      </p>

      <div
        className={`mt-4 rounded-2xl border px-4 py-3.5 ${
          atLimit ? 'border-amber-300 bg-amber-50 dark:border-amber-400/40 dark:bg-amber-400/10' : 'border-ink/8 bg-white dark:border-white/10 dark:bg-[#1D1A16]'
        }`}
      >
        <div className="flex items-center justify-between text-[13px] font-medium">
          <span className={atLimit ? 'text-amber-700 dark:text-amber-400' : 'text-ink-500 dark:text-cream/60'}>
            {atLimit
              ? `Slot produk ${tier === 'premium' ? 'Premium' : 'Gratis'} penuh${
                  tier === 'free' ? ' — upgrade untuk hingga 500 produk' : ''
                }`
              : `${productCount}/${limits.maxProducts} produk terpakai`}
          </span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink/8 dark:bg-white/10">
          <div
            className={`h-full rounded-full transition-all ${atLimit ? 'bg-amber-500' : 'bg-forest-500'}`}
            style={{ width: `${Math.min(100, (productCount / limits.maxProducts) * 100)}%` }}
          />
        </div>
      </div>

      <div className="mt-4">{!atLimit && <AddProductForm />}</div>

      <ProductGrid products={products ?? []} />

      {!limits.hasSearchAndCategory && (
        <p className="mt-4 text-[12px] text-ink-400 dark:text-cream/40">
          Search &amp; kategori produk khusus tier Premium — di tier Gratis produk tampil sebagai list polos di halaman publik.
        </p>
      )}
    </div>
  );
}
