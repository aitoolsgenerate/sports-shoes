import { useEffect, useMemo, useState } from 'react';
import { Heart, Search, SlidersHorizontal, X } from 'lucide-react';
import { CartDrawer } from './components/CartDrawer';
import { FilterSidebar } from './components/FilterSidebar';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { PRICE_TIERS, SHOES_CATALOG, formatRs } from './data/shoes';
import {
  CartItem,
  FilterState,
  PriceTier,
  ShoeProduct,
  SortOption,
  Subcategory,
} from './types/store';

const INITIAL_FILTERS: FilterState = {
  prices: [],
  subcategories: [],
  brands: [],
  sizes: [],
  colors: [],
  searchQuery: '',
  onlySaved: false,
};

function toggleArrayItem<T>(list: T[], item: T): T[] {
  return list.includes(item)
    ? list.filter((entry) => entry !== item)
    : [...list, item];
}

export default function App() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [selectedProduct, setSelectedProduct] = useState<ShoeProduct | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('sports-shoes-saved');
      return stored ? (JSON.parse(stored) as string[]) : [];
    } catch {
      return [];
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('sports-shoes-cart');
      if (!stored) return [];
      const parsed = JSON.parse(stored) as CartItem[];
      return parsed
        .map((item) => {
          const freshProduct = SHOES_CATALOG.find(
            (shoe) => shoe.id === item.product.id
          );
          return freshProduct ? { ...item, product: freshProduct } : null;
        })
        .filter((item): item is CartItem => item !== null);
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sports-shoes-saved', JSON.stringify(savedIds));
    } catch {
      // Ignore storage errors in restricted environments
    }
  }, [savedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('sports-shoes-cart', JSON.stringify(cart));
    } catch {
      // Ignore storage errors in restricted environments
    }
  }, [cart]);

  const handleToggleSave = (id: string) => {
    setSavedIds((prev) => toggleArrayItem(prev, id));
  };

  const handleAddToCart = (product: ShoeProduct, size: number) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, size, quantity: 1 }];
    });
  };

  const handleUpdateQty = (productId: string, size: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId && item.size === size
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string, size: number) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.size === size)
      )
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleSelectNavCategory = (subcategory: Subcategory | null) => {
    setFilters((prev) => ({
      ...prev,
      subcategories: subcategory ? [subcategory] : [],
      onlySaved: false,
    }));
  };

  const handleSelectPriceTab = (price: PriceTier | null) => {
    setFilters((prev) => ({
      ...prev,
      prices: price ? [price] : [],
    }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setSortBy('featured');
  };

  const activeFilterCount =
    filters.prices.length +
    filters.subcategories.length +
    filters.brands.length +
    filters.sizes.length +
    filters.colors.length +
    (filters.searchQuery.trim() ? 1 : 0) +
    (filters.onlySaved ? 1 : 0);

  const filteredShoes = useMemo(() => {
    const query = filters.searchQuery.trim().toLowerCase();

    const matches = SHOES_CATALOG.filter((shoe) => {
      if (filters.onlySaved && !savedIds.includes(shoe.id)) return false;
      if (filters.prices.length > 0 && !filters.prices.includes(shoe.price)) {
        return false;
      }
      if (
        filters.subcategories.length > 0 &&
        !filters.subcategories.includes(shoe.subcategory)
      ) {
        return false;
      }
      if (filters.brands.length > 0 && !filters.brands.includes(shoe.brand)) {
        return false;
      }
      if (
        filters.sizes.length > 0 &&
        !filters.sizes.some((size) => shoe.sizes.includes(size))
      ) {
        return false;
      }
      if (
        filters.colors.length > 0 &&
        !filters.colors.some((color) => shoe.colors.includes(color))
      ) {
        return false;
      }
      if (query) {
        const haystack =
          `${shoe.name} ${shoe.brand} ${shoe.subcategory} ${shoe.sku} ${shoe.price}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });

    const sorted = [...matches];
    if (sortBy === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    }
    return sorted;
  }, [filters, sortBy, savedIds]);

  const totalBagCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const activeNavCategory =
    filters.subcategories.length === 1 ? filters.subcategories[0] : null;
  const activePriceTab =
    filters.prices.length === 1 ? filters.prices[0] : null;

  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900">
      <Header
        activeSubcategory={activeNavCategory}
        onSelectCategory={handleSelectNavCategory}
        cartCount={totalBagCount}
        onOpenCart={() => setIsCartOpen(true)}
        showBanner={showBanner}
        onDismissBanner={() => setShowBanner(false)}
      />

      <HeroBanner
        onShopClick={() => {
          document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <main id="catalog" className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-60 shrink-0">
            <div className="pb-4 mb-4 border-b border-zinc-200 text-xs text-zinc-500 flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetFilters}
                className="hover:text-zinc-900 cursor-pointer"
              >
                Store
              </button>
              <span aria-hidden="true">/</span>
              <span className="text-zinc-900 font-medium">Sports Shoes</span>
            </div>

            <FilterSidebar
              filters={filters}
              onTogglePrice={(price) =>
                setFilters((prev) => ({
                  ...prev,
                  prices: toggleArrayItem(prev.prices, price),
                }))
              }
              onToggleSubcategory={(sub) =>
                setFilters((prev) => ({
                  ...prev,
                  subcategories: toggleArrayItem(prev.subcategories, sub),
                }))
              }
              onToggleBrand={(brand) =>
                setFilters((prev) => ({
                  ...prev,
                  brands: toggleArrayItem(prev.brands, brand),
                }))
              }
              onToggleSize={(size) =>
                setFilters((prev) => ({
                  ...prev,
                  sizes: toggleArrayItem(prev.sizes, size),
                }))
              }
              onToggleColor={(color) =>
                setFilters((prev) => ({
                  ...prev,
                  colors: toggleArrayItem(prev.colors, color),
                }))
              }
              onResetFilters={handleResetFilters}
              activeFilterCount={activeFilterCount}
            />
          </aside>

          <section className="flex-1 min-w-0">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-zinc-200">
              <div className="space-y-1.5">
                <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 text-balance">
                  Sports Shoes
                </h1>
                <p className="text-sm text-zinc-600 max-w-2xl">
                  Shop all styles of running, football turf, basketball, training,
                  and court shoes priced at Rs 6,000, Rs 7,000, and Rs 8,000.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <span className="text-sm font-semibold text-orange-600 underline underline-offset-4 tabular-nums">
                  {filteredShoes.length}{' '}
                  {filteredShoes.length === 1 ? 'Product' : 'Products'}
                </span>

                <label className="sr-only" htmlFor="sort-select">
                  Sort products
                </label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="h-10 px-3 text-sm font-medium bg-white border border-zinc-300 rounded-md text-zinc-800 focus:outline-none focus:border-zinc-900 cursor-pointer"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>
            </div>

            <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsMobileFiltersOpen(true)}
                  className="lg:hidden inline-flex items-center gap-1.5 h-9 px-3 text-xs font-semibold border border-zinc-300 rounded-md text-zinc-800 hover:bg-zinc-50 cursor-pointer whitespace-nowrap"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="tabular-nums text-orange-600">
                      ({activeFilterCount})
                    </span>
                  )}
                </button>

                <div
                  role="group"
                  aria-label="Filter by price tier"
                  className="inline-flex items-center gap-1 p-1 bg-zinc-100 rounded-lg"
                >
                  <button
                    type="button"
                    onClick={() => handleSelectPriceTab(null)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      filters.prices.length === 0
                        ? 'bg-white text-zinc-900 shadow-xs'
                        : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    All Prices
                  </button>
                  {PRICE_TIERS.map((tier) => {
                    const isActive = activePriceTab === tier;
                    return (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => handleSelectPriceTab(tier)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors tabular-nums whitespace-nowrap shrink-0 cursor-pointer ${
                          isActive
                            ? 'bg-zinc-900 text-white shadow-xs'
                            : 'text-zinc-600 hover:text-zinc-900'
                        }`}
                      >
                        {formatRs(tier)}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      onlySaved: !prev.onlySaved,
                    }))
                  }
                  className={`inline-flex items-center gap-1.5 h-9 px-3 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    filters.onlySaved
                      ? 'bg-orange-50 border-orange-300 text-orange-700'
                      : 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300'
                  }`}
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      filters.onlySaved ? 'fill-orange-600 text-orange-600' : ''
                    }`}
                  />
                  <span>Saved</span>
                  <span className="tabular-nums">({savedIds.length})</span>
                </button>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={filters.searchQuery}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      searchQuery: e.target.value,
                    }))
                  }
                  placeholder="Search shoes or price..."
                  aria-label="Search shoes"
                  className="w-full h-9 pl-9 pr-3 text-sm bg-white border border-zinc-200 rounded-md focus:outline-none focus:border-zinc-900"
                />
              </div>
            </div>

            {filteredShoes.length === 0 ? (
              <div className="my-8 p-12 border border-zinc-200 rounded-lg bg-zinc-50 text-center space-y-3">
                <p className="font-display text-lg font-bold text-zinc-900">
                  No sports shoes match your active filters
                </p>
                <p className="text-sm text-zinc-600">
                  Try clearing a size, color, or price tier filter to view more
                  footwear.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-zinc-900 hover:bg-orange-600 rounded-md transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 pt-2">
                {filteredShoes.map((shoe) => (
                  <ProductCard
                    key={shoe.id}
                    product={shoe}
                    isSaved={savedIds.includes(shoe.id)}
                    onToggleSave={handleToggleSave}
                    onSelectProduct={setSelectedProduct}
                    onQuickAdd={(product, size) => {
                      handleAddToCart(product, size);
                    }}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="border-t border-zinc-200 bg-zinc-50 mt-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-zinc-600">
          <div className="space-y-1">
            <p className="font-display text-sm font-bold text-zinc-900">
              Sports Shoes
            </p>
            <p>
              Flat three-tier athletic pricing: Rs 6,000 · Rs 7,000 · Rs 8,000.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-zinc-500">
            <span>Cash on Delivery Nationwide</span>
            <span aria-hidden="true">·</span>
            <span>7-Day Size Exchange</span>
            <span aria-hidden="true">·</span>
            <span>© {new Date().getFullYear()} Sports Shoes</span>
          </div>
        </div>
      </footer>

      {isMobileFiltersOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden flex bg-zinc-950/45"
          onClick={() => setIsMobileFiltersOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Filter shoes"
        >
          <div
            className="w-80 max-w-[85vw] bg-white h-full overflow-y-auto p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-200">
              <span className="font-display text-lg font-bold text-zinc-900">
                Filters
              </span>
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(false)}
                aria-label="Close filters"
                className="p-1.5 text-zinc-500 hover:text-zinc-900 rounded-md hover:bg-zinc-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <FilterSidebar
              filters={filters}
              onTogglePrice={(price) =>
                setFilters((prev) => ({
                  ...prev,
                  prices: toggleArrayItem(prev.prices, price),
                }))
              }
              onToggleSubcategory={(sub) =>
                setFilters((prev) => ({
                  ...prev,
                  subcategories: toggleArrayItem(prev.subcategories, sub),
                }))
              }
              onToggleBrand={(brand) =>
                setFilters((prev) => ({
                  ...prev,
                  brands: toggleArrayItem(prev.brands, brand),
                }))
              }
              onToggleSize={(size) =>
                setFilters((prev) => ({
                  ...prev,
                  sizes: toggleArrayItem(prev.sizes, size),
                }))
              }
              onToggleColor={(color) =>
                setFilters((prev) => ({
                  ...prev,
                  colors: toggleArrayItem(prev.colors, color),
                }))
              }
              onResetFilters={handleResetFilters}
              activeFilterCount={activeFilterCount}
            />
          </div>
        </div>
      )}

      <ProductModal
        product={selectedProduct}
        isSaved={selectedProduct ? savedIds.includes(selectedProduct.id) : false}
        onClose={() => setSelectedProduct(null)}
        onToggleSave={handleToggleSave}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        items={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
